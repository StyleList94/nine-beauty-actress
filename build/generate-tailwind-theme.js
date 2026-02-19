// @ts-check

/**
 * Post-build script: VE tokens → Tailwind v4 @theme CSS
 *
 * Reads compiled token JS files from dist/ and generates dist/tailwind-theme.css.
 * Run after vite build: `node build/generate-tailwind-theme.js`
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
 * palette → `--color-*` (alpha variants skipped)
 * @param {PaletteMap} palette
 */
function mapPalette(palette) {
  /** @type {string[]} */
  const lines = [];
  for (const [colorName, value] of Object.entries(palette)) {
    if (typeof value === 'string') {
      lines.push(`--color-${colorName}: ${value};`);
    } else {
      for (const [level, colorValue] of Object.entries(value)) {
        if (isAlphaVariant(level)) continue;
        lines.push(`--color-${colorName}-${level}: ${colorValue};`);
      }
    }
  }
  return lines.join('\n  ');
}

/**
 * spacing → single `--spacing` base unit
 * @param {TokenMap} spacing
 */
function mapSpacing(spacing) {
  const baseUnit = spacing[1] || spacing['1'];
  if (!baseUnit) {
    throw new Error(
      'spacing[1] not found — cannot derive base unit for --spacing',
    );
  }
  return `--spacing: ${baseUnit};`;
}

/**
 * font.family → `--font-*`
 * @param {TokenMap} family
 */
function mapFontFamily(family) {
  return Object.entries(family)
    .map(([name, value]) => `--font-${name}: ${value};`)
    .join('\n  ');
}

/**
 * font.size → `--text-*`
 * @param {TokenMap} size
 */
function mapFontSize(size) {
  return Object.entries(size)
    .map(([name, value]) => `--text-${name}: ${value};`)
    .join('\n  ');
}

/**
 * font.weight → `--font-weight-*`
 * @param {TokenMap} weight
 */
function mapFontWeight(weight) {
  return Object.entries(weight)
    .map(([name, value]) => `--font-weight-${name}: ${value};`)
    .join('\n  ');
}

/**
 * font.lineHeight → `--leading-*`
 * @param {TokenMap} lineHeight
 */
function mapLineHeight(lineHeight) {
  return Object.entries(lineHeight)
    .map(([name, value]) => `--leading-${name}: ${value};`)
    .join('\n  ');
}

/**
 * font.letterSpacing → `--tracking-*`
 * @param {TokenMap} letterSpacing
 */
function mapLetterSpacing(letterSpacing) {
  return Object.entries(letterSpacing)
    .map(([name, value]) => `--tracking-${name}: ${value};`)
    .join('\n  ');
}

/**
 * radius → `--radius-*` (`default` → bare `--radius`)
 * @param {TokenMap} radius
 */
function mapRadius(radius) {
  return Object.entries(radius)
    .map(([name, value]) =>
      name === 'default'
        ? `--radius: ${value};`
        : `--radius-${name}: ${value};`,
    )
    .join('\n  ');
}

/**
 * shadows → `--shadow-*` (`default` → bare `--shadow`)
 * @param {TokenMap} shadows
 */
function mapShadows(shadows) {
  return Object.entries(shadows)
    .map(([name, value]) =>
      name === 'default'
        ? `--shadow: ${value};`
        : `--shadow-${name}: ${value};`,
    )
    .join('\n  ');
}

/**
 * motion.duration → `--duration-*`
 * @param {TokenMap} duration
 */
function mapDuration(duration) {
  return Object.entries(duration)
    .map(([name, value]) => `--duration-${name}: ${value};`)
    .join('\n  ');
}

/**
 * motion.easing → `--ease-*`
 * @param {TokenMap} easing
 */
function mapEasing(easing) {
  return Object.entries(easing)
    .map(([name, value]) => `--ease-${easingKeyToTailwind(name)}: ${value};`)
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
    '/* Spacing — base unit (p-16 = 1rem = 16px) */',
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

  return `${HEADER}\n\n@theme prefix(nine) {\n${body}\n}\n`;
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
