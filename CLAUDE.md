# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Nine Beauty Actress (구미호)** - A React UI component library with type-safe CSS-in-TS via Vanilla Extract, zero runtime CSS, and Motion animations. Published to GitHub Packages as `@stylelist94/nine-beauty-actress`.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start Storybook dev server (port 6006)
pnpm build            # Type check + Vite build
pnpm test             # Run Vitest once
pnpm test:watch       # Run Vitest in watch mode
pnpm lint             # ESLint check
pnpm build-storybook  # Build static Storybook
```

## Architecture

### Library Structure (`lib/`)

```text
lib/
├── main.ts                    # Main entry - exports all components/hooks
├── core/
│   ├── utils.ts               # cn(), isFileAccepted(), debounce()
│   ├── styles.ts              # Re-exports all style exports
│   ├── tokens.ts              # Re-exports all token exports
│   └── styles/
│       ├── theme.css.ts       # Semantic color variables (vars)
│       └── tokens/            # Primitive tokens
│           ├── colors.css.ts  # palette (OKLCH colors + alpha variants)
│           ├── font.css.ts    # font (family, size, weight, lineHeight)
│           ├── typography.css.ts # typography (compositions)
│           ├── spacing.css.ts # spacing (px-keyed rem scale)
│           ├── radius.css.ts  # radius (border-radius)
│           ├── shadows.css.ts # shadows (box-shadow)
│           └── motion.css.ts  # motion (duration, easing)
├── components/                # UI components (Button, Card, Input, Label, Switch, Dialog, Tooltip, etc.)
└── hooks/                     # useDebounce, useMounted, useVirtualScroll
```

### Component Pattern

Each component follows:

```text
component-name/
├── index.tsx        # Component + types (uses forwardRef)
└── style.css.ts     # Vanilla Extract styles
```

### Styling System

- **Vanilla Extract**: Type-safe CSS-in-TS with zero runtime
- **@vanilla-extract/recipes**: Used for component variant management (CVA equivalent)
- **OKLCH color space**: Perceptually uniform colors
- **Dark mode**: Media queries + `.dark` class + `[data-theme="dark"]` attribute
- **Data attributes**: `data-slot`, `data-variant`, `data-size` for styling hooks

### Token System (`lib/core/styles/tokens/`)

**Primitives** (raw design values):

- `font` - family, size, weight, lineHeight, letterSpacing
- `palette` - OKLCH colors with alpha variants (e.g., `palette.purple['500/10']`)
- `spacing` - rem-based spacing scale
- `radius`, `motion`, `shadows` - other design tokens

**Semantic** (meaningful CSS variables via `vars`):

- `vars.color.*` - auto-handles dark mode via CSS variables
- Layout: `background`, `foreground`, `muted`, `border`, `accent`
- Status: `primary`, `brand`, `success`, `warning`, `error`, `info` (with `.base`, `.strong`, `.muted`, `.foreground`)
- Overlay: `success.overlay`, `error.overlay`, `surfaceSubtle`, `borderSubtle`, `ring`

**Compositions** (`typography`):

- Predefined text styles combining font tokens: `heading`, `body`, `label`, `caption`, `code`

**Import Patterns**:

```typescript
// In component style.css.ts files
import { vars } from 'lib/core/styles/theme.css';
import {
  palette,
  spacing,
  radius,
  motion,
  font,
  shadows,
} from 'lib/core/styles/tokens';

// For library consumers
import { palette, spacing } from '@stylelist94/nine-beauty-actress/tokens';
import { vars } from '@stylelist94/nine-beauty-actress/styles';
```

**Usage Rules**:

```typescript
// ✅ Use semantic tokens for theme-aware colors
background: vars.color.primary.base;

// ✅ Use palette for fixed colors (gradients, brand)
background: `linear-gradient(${palette.purple[500]}, ${palette.orange[400]})`;

// ✅ Alpha variants in palette (format: 'level/opacity')
background: palette.purple['500/10']; // 10% opacity

// ❌ Don't wrap OKLCH in oklch() - already OKLCH format
background: `oklch(from ${palette.green[500]} l c h / 0.5)`; // Wrong!
```

### Styling Gotchas

- **VE CSS vars are hashed** - `vars.color.*` compiles to `--_1ndu90r0` etc, can't reference in plain CSS
- **Tailwind + VE incompatible in same file** - use one per file (PostCSS vs build-time)
- **Library shouldn't set global body styles** - app-level responsibility, use `src/styles.css` for Storybook only
- **CSS transition needs initial value** - e.g., `boxShadow: 'none'` required for shadow transitions
- **Token tests sync** - update `src/tests/tokens.test.ts` when adding new tokens

### Key Technologies

- **CSS**: Vanilla Extract + TailwindCSS v4
- **Animation**: Motion library (Framer Motion successor)
- **UI Primitives**: Radix UI (Switch, ToggleGroup)
- **Testing**: Vitest + React Testing Library (jsdom environment, globals enabled)
- **Storybook**: React + Vite with autodocs

### Build Outputs

Vite builds to `dist/` with ESM-only output:

- `main.es.js` - Components and hooks
- `styles.es.js` - Style exports only
- `style.css` - All CSS bundled

### Peer Dependencies

React ≥18, React-DOM ≥18, Motion ≥12 (not bundled)

## Development Workflow

1. **Components**: Create in `lib/components/` with `index.tsx` + `style.css.ts`
2. **Stories**: Add to `src/stories/*.stories.tsx` with Meta + argTypes
3. **Tests**: Add to `src/tests/*.test.tsx` using React Testing Library role queries
4. **Export**: Add to `lib/main.ts`

### Storybook Conventions

- Use **Tailwind classes** for story layout (not inline styles) — Storybook has TailwindCSS configured
- List components **vertically** (`flex flex-col`) by default; use **horizontal** (`flex flex-wrap`) only for size comparisons
- Group variants together in a single story (e.g., all button variants in one `Variants` story)
- Use `noControls` helper function for showcase stories: `const noControls = (story: string) => ({ parameters: { controls: { disable: true }, docs: { description: { story } } } })`
- Use `parameters.docs.description.component` on meta for component-level description (matches TSDoc summary)
- For composition components (Card), use custom `StoryObj<CustomArgs>` type with `_prefixed` internal arg keys, `name` for display, and `table.category` for sub-component grouping
- Use library's own components in stories (Label, Input, Switch, etc.) instead of raw HTML elements

### TSDoc Convention

- Main component: one-line summary + `@remarks` (bullet points) + `@example` (tsx code block)
- Sub-components: single-line `/** description */`
- Storybook `docs.description.component` should match the TSDoc summary line

## Code Quality

- ESLint flat config with TypeScript, React, Vitest, Testing Library, Storybook plugins
- Prettier: 80 char width, single quotes, trailing commas
- Pre-commit: Husky runs lint-staged (ESLint --fix, Prettier --write)
- TypeScript strict mode enabled

## Distribution

Published to GitHub Packages. Users configure `.npmrc`:

```ini
@stylelist94:registry=https://npm.pkg.github.com
```
