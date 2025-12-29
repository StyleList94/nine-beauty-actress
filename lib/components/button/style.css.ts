import { style, styleVariants } from '@vanilla-extract/css';

const buttonColors = {
  violet: 'oklch(60% 0.25 280)',
  indigo: 'oklch(55% 0.22 270)',
  glow: 'oklch(75% 0.15 280)',
  foxfireAmber: 'oklch(70% 0.18 50)',
} as const;

const buttonColorsDark = {
  violet: 'oklch(65% 0.28 280)',
  indigo: 'oklch(60% 0.25 270)',
  glow: 'oklch(80% 0.18 280)',
  foxfireAmber: 'oklch(75% 0.20 50)',
} as const;

export const buttonBase = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  borderRadius: '0.5rem',
  fontWeight: 500,
  cursor: 'pointer',
  outline: 'none',
  overflow: 'hidden',
  transition: 'all 200ms ease',
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  selectors: {
    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${buttonColors.glow}`,
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const buttonVariant = styleVariants({
  solid: {
    background: `linear-gradient(135deg, ${buttonColors.violet}, ${buttonColors.indigo})`,
    color: '#ffffff',
    border: 'none',
    boxShadow: `0 1px 3px oklch(60% 0.25 280 / 0.12)`,
    selectors: {
      '&:hover:not(:disabled)': {
        boxShadow: `0 2px 6px oklch(60% 0.25 280 / 0.2)`,
      },
      '.dark &, [data-theme="dark"] &': {
        background: `linear-gradient(135deg, ${buttonColorsDark.violet}, ${buttonColorsDark.indigo})`,
        boxShadow: `0 1px 4px oklch(65% 0.28 280 / 0.2)`,
      },
      '.dark &:hover:not(:disabled), [data-theme="dark"] &:hover:not(:disabled)': {
        boxShadow: `0 2px 8px oklch(65% 0.28 280 / 0.3)`,
      },
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        selectors: {
          ':root:not(.light):not([data-theme="light"]) &': {
            background: `linear-gradient(135deg, ${buttonColorsDark.violet}, ${buttonColorsDark.indigo})`,
            boxShadow: `0 1px 4px oklch(65% 0.28 280 / 0.2)`,
          },
          ':root:not(.light):not([data-theme="light"]) &:hover:not(:disabled)': {
            boxShadow: `0 2px 8px oklch(65% 0.28 280 / 0.3)`,
          },
        },
      },
    },
  },
  outline: {
    background: 'transparent',
    color: buttonColors.violet,
    border: `1.5px solid ${buttonColors.violet}`,
    selectors: {
      '&:hover:not(:disabled)': {
        background: `oklch(60% 0.25 280 / 0.1)`,
        borderColor: buttonColors.glow,
      },
      '&:active:not(:disabled)': {
        background: `oklch(60% 0.25 280 / 0.15)`,
      },
      '.dark &, [data-theme="dark"] &': {
        color: buttonColorsDark.glow,
        borderColor: buttonColorsDark.violet,
      },
      '.dark &:hover:not(:disabled), [data-theme="dark"] &:hover:not(:disabled)': {
        background: `oklch(65% 0.28 280 / 0.15)`,
        borderColor: buttonColorsDark.glow,
      },
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        selectors: {
          ':root:not(.light):not([data-theme="light"]) &': {
            color: buttonColorsDark.glow,
            borderColor: buttonColorsDark.violet,
          },
          ':root:not(.light):not([data-theme="light"]) &:hover:not(:disabled)': {
            background: `oklch(65% 0.28 280 / 0.15)`,
            borderColor: buttonColorsDark.glow,
          },
        },
      },
    },
  },
  glow: {
    background: `linear-gradient(135deg, ${buttonColors.violet}, ${buttonColors.foxfireAmber})`,
    color: '#ffffff',
    border: 'none',
    boxShadow: `0 0 6px oklch(60% 0.25 280 / 0.2)`,
    selectors: {
      '&:hover:not(:disabled)': {
        boxShadow: `0 0 10px oklch(60% 0.25 280 / 0.3), 0 0 20px oklch(70% 0.18 50 / 0.15)`,
      },
      '.dark &, [data-theme="dark"] &': {
        background: `linear-gradient(135deg, ${buttonColorsDark.violet}, ${buttonColorsDark.foxfireAmber})`,
        boxShadow: `0 0 8px oklch(65% 0.28 280 / 0.25)`,
      },
      '.dark &:hover:not(:disabled), [data-theme="dark"] &:hover:not(:disabled)': {
        boxShadow: `0 0 12px oklch(65% 0.28 280 / 0.35), 0 0 24px oklch(75% 0.20 50 / 0.2)`,
      },
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        selectors: {
          ':root:not(.light):not([data-theme="light"]) &': {
            background: `linear-gradient(135deg, ${buttonColorsDark.violet}, ${buttonColorsDark.foxfireAmber})`,
            boxShadow: `0 0 8px oklch(65% 0.28 280 / 0.25)`,
          },
          ':root:not(.light):not([data-theme="light"]) &:hover:not(:disabled)': {
            boxShadow: `0 0 12px oklch(65% 0.28 280 / 0.35), 0 0 24px oklch(75% 0.20 50 / 0.2)`,
          },
        },
      },
    },
  },
});

export const buttonSize = styleVariants({
  sm: {
    height: '2rem',
    paddingInline: '0.75rem',
    fontSize: '0.75rem',
  },
  md: {
    height: '2.5rem',
    paddingInline: '1rem',
    fontSize: '0.875rem',
  },
  lg: {
    height: '3rem',
    paddingInline: '1.5rem',
    fontSize: '1rem',
  },
});

export const rippleContainer = style({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  borderRadius: 'inherit',
  pointerEvents: 'none',
});

export const ripple = style({
  position: 'absolute',
  borderRadius: '50%',
  backgroundColor: 'currentColor',
  willChange: 'opacity, transform',
});

const button = buttonBase;
export default button;
