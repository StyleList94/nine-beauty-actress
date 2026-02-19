// @ts-check

/**
 * Post-build script: VE tokens → Tailwind v4 @theme CSS
 *
 * Reads compiled token JS files from dist/ and generates dist/tailwind-theme.css.
 * Run after vite build: `node build/generate-tailwind-theme.js`
 *
 * All CSS variable names are prefixed with `nine-` to avoid
 * overriding Tailwind defaults (e.g. `--color-nine-red-500`).
 * Utility classes: `bg-nine-red-500`, `shadow-nine-sm`, etc.
 */

import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(__dirname, '../dist');
const TOKENS_DIR = resolve(DIST_DIR, 'core/styles/tokens');

/** @typedef {Record<string, string>} TokenMap */
/** @typedef {Record<string, string | Record<string, string>>} PaletteMap */

const PREFIX = 'nine';

// ── Helpers ──

/** @param {string} key */
function isAlphaVariant(key) {
  return key.includes('/');
}

/** @param {string} str */
function camelToKebab(str) {
  return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

/**
 * Map easing key names to Tailwind convention.
 * `easeIn` → `in`, `easeOut` → `out`, `easeInOut` → `in-out`
 * @param {string} key
 */
function easingKeyToTailwind(key) {
  if (key.startsWith('ease') && key.length > 4) {
    const rest = key.slice(4);
    return camelToKebab(rest).replace(/^-/, '');
  }
  return camelToKebab(key);
}

// ── Mapping Functions ──

/**
 * palette → `--color-nine-*` (alpha variants skipped)
 * @param {PaletteMap} palette
 */
function mapPalette(palette) {
  /** @type {string[]} */
  const lines = [];
  for (const [colorName, value] of Object.entries(palette)) {
    if (typeof value === 'string') {
      lines.push(`--color-${PREFIX}-${colorName}: ${value};`);
    } else {
      for (const [level, colorValue] of Object.entries(value)) {
        if (isAlphaVariant(level)) continue;
        lines.push(`--color-${PREFIX}-${colorName}-${level}: ${colorValue};`);
      }
    }
  }
  return lines.join('\n  ');
}

/**
 * spacing → individual `--spacing-nine-*` values
 * @param {TokenMap} spacing
 */
function mapSpacing(spacing) {
  return Object.entries(spacing)
    .map(([key, value]) => `--spacing-${PREFIX}-${key}: ${value};`)
    .join('\n  ');
}

/**
 * font.family → `--font-nine-*`
 * @param {TokenMap} family
 */
function mapFontFamily(family) {
  return Object.entries(family)
    .map(([name, value]) => `--font-${PREFIX}-${name}: ${value};`)
    .join('\n  ');
}

/**
 * font.size → `--text-nine-*`
 * @param {TokenMap} size
 */
function mapFontSize(size) {
  return Object.entries(size)
    .map(([name, value]) => `--text-${PREFIX}-${name}: ${value};`)
    .join('\n  ');
}

/**
 * font.weight → `--font-weight-nine-*`
 * @param {TokenMap} weight
 */
function mapFontWeight(weight) {
  return Object.entries(weight)
    .map(([name, value]) => `--font-weight-${PREFIX}-${name}: ${value};`)
    .join('\n  ');
}

/**
 * font.lineHeight → `--leading-nine-*`
 * @param {TokenMap} lineHeight
 */
function mapLineHeight(lineHeight) {
  return Object.entries(lineHeight)
    .map(([name, value]) => `--leading-${PREFIX}-${name}: ${value};`)
    .join('\n  ');
}

/**
 * font.letterSpacing → `--tracking-nine-*`
 * @param {TokenMap} letterSpacing
 */
function mapLetterSpacing(letterSpacing) {
  return Object.entries(letterSpacing)
    .map(([name, value]) => `--tracking-${PREFIX}-${name}: ${value};`)
    .join('\n  ');
}

/**
 * radius → `--radius-nine-*` (`default` → bare `--radius-nine`)
 * @param {TokenMap} radius
 */
function mapRadius(radius) {
  return Object.entries(radius)
    .map(([name, value]) =>
      name === 'default'
        ? `--radius-${PREFIX}: ${value};`
        : `--radius-${PREFIX}-${name}: ${value};`,
    )
    .join('\n  ');
}

/**
 * shadows → `--shadow-nine-*` (`default` → bare `--shadow-nine`)
 * @param {TokenMap} shadows
 */
function mapShadows(shadows) {
  return Object.entries(shadows)
    .map(([name, value]) =>
      name === 'default'
        ? `--shadow-${PREFIX}: ${value};`
        : `--shadow-${PREFIX}-${name}: ${value};`,
    )
    .join('\n  ');
}

/**
 * motion.duration → `--duration-nine-*`
 * @param {TokenMap} duration
 */
function mapDuration(duration) {
  return Object.entries(duration)
    .map(([name, value]) => `--duration-${PREFIX}-${name}: ${value};`)
    .join('\n  ');
}

/**
 * motion.easing → `--ease-nine-*`
 * @param {TokenMap} easing
 */
function mapEasing(easing) {
  return Object.entries(easing)
    .map(([name, value]) => `--ease-${PREFIX}-${easingKeyToTailwind(name)}: ${value};`)
    .join('\n  ');
}

// ── Token Import ──

/**
 * @param {string} filename
 * @param {string} exportName
 */
async function importToken(filename, exportName) {
  const filePath = resolve(TOKENS_DIR, filename);
  const fileUrl = pathToFileURL(filePath).href;
  const mod = await import(`${fileUrl}?t=${Date.now()}`);
  const value = mod[exportName];
  if (value === undefined) {
    throw new Error(
      `Expected export "${exportName}" from ${filename}, got: [${Object.keys(mod).join(', ')}]`,
    );
  }
  return value;
}

// ── Generate ──

const HEADER = `/* Nine Beauty Actress — Tailwind v4 Theme
 * Auto-generated from Vanilla Extract tokens
 * Usage: @import '@stylelist94/nine-beauty-actress/tailwind-theme.css';
 * Utilities: bg-nine-red-500, shadow-nine-sm, p-nine-16, etc.
 */`;

async function generate() {
  const [palette, spacing, font, radius, shadows, motion] = await Promise.all([
    importToken('colors.css.js', 'palette'),
    importToken('spacing.css.js', 'spacing'),
    importToken('font.css.js', 'font'),
    importToken('radius.css.js', 'radius'),
    importToken('shadows.css.js', 'shadows'),
    importToken('motion.css.js', 'motion'),
  ]);

  const sections = [
    '/* Colors — OKLCH */',
    mapPalette(palette),
    '',
    '/* Spacing — px-keyed rem scale (p-nine-16 = 1rem = 16px) */',
    mapSpacing(spacing),
    '',
    '/* Font Family */',
    mapFontFamily(font.family),
    '',
    '/* Font Size */',
    mapFontSize(font.size),
    '',
    '/* Font Weight */',
    mapFontWeight(font.weight),
    '',
    '/* Line Height */',
    mapLineHeight(font.lineHeight),
    '',
    '/* Letter Spacing */',
    mapLetterSpacing(font.letterSpacing),
    '',
    '/* Border Radius */',
    mapRadius(radius),
    '',
    '/* Box Shadow */',
    mapShadows(shadows),
    '',
    '/* Duration */',
    mapDuration(motion.duration),
    '',
    '/* Easing */',
    mapEasing(motion.easing),
  ];

  const body = sections
    .map((line) => (line === '' ? '' : `  ${line}`))
    .join('\n');

  return `${HEADER}\n\n@theme extend {\n${body}\n}\n`;
}

// ── Main ──

try {
  const css = await generate();
  const outputPath = resolve(DIST_DIR, 'tailwind-theme.css');
  await writeFile(outputPath, css, 'utf-8');
  console.log(
    `\x1b[32m[tailwind-theme]\x1b[0m Generated tailwind-theme.css (${css.length} bytes)`,
  );
} catch (error) {
  console.error(
    '\x1b[31m[tailwind-theme]\x1b[0m Failed to generate tailwind-theme.css:',
    error,
  );
  process.exit(1);
}
