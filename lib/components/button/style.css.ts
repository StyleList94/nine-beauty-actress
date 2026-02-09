import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import {
  palette,
  spacing,
  radius,
  motion,
  font,
  shadows,
} from 'lib/core/styles/tokens';

export const buttonBase = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing[8],
  whiteSpace: 'nowrap',
  borderRadius: radius.md,
  fontSize: font.size.sm,
  fontWeight: font.weight.medium,
  cursor: 'pointer',
  outline: 'none',
  overflow: 'hidden',
  transition: `all ${motion.duration.normal} ${motion.easing.ease}`,
  userSelect: 'none',
  flexShrink: 0,
  WebkitTapHighlightColor: 'transparent',
  selectors: {
    '&:focus-visible': {
      borderColor: vars.color.ring,
      boxShadow: `0 0 0 3px ${vars.color.ring}`,
    },
    '&:disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
    '&[aria-invalid="true"]': {
      borderColor: vars.color.destructive.base,
      boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.destructive.base} 20%, transparent)`,
    },
    ':is(.dark, [data-theme="dark"]) &[aria-invalid="true"]': {
      boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.destructive.base} 40%, transparent)`,
    },
  },
});

globalStyle(`${buttonBase} svg`, {
  pointerEvents: 'none',
  flexShrink: 0,
});

globalStyle(`${buttonBase} svg:not([class*="size-"])`, {
  width: '1rem',
  height: '1rem',
});

export const buttonVariant = styleVariants({
  default: {
    background: vars.color.primary.base,
    color: vars.color.primary.foreground,
    border: 'none',
    boxShadow: shadows.sm,
    selectors: {
      '&:hover:not(:disabled)': {
        background: `color-mix(in oklch, ${vars.color.primary.base} 90%, transparent)`,
      },
    },
  },
  destructive: {
    background: vars.color.destructive.base,
    color: 'white',
    border: 'none',
    boxShadow: shadows.sm,
    selectors: {
      '&:hover:not(:disabled)': {
        background: `color-mix(in oklch, ${vars.color.destructive.base} 90%, transparent)`,
      },
      '&:focus-visible': {
        boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.destructive.base} 20%, transparent)`,
      },
      ':is(.dark, [data-theme="dark"]) &': {
        background: `color-mix(in oklch, ${vars.color.destructive.base} 60%, transparent)`,
      },
      ':is(.dark, [data-theme="dark"]) &:focus-visible': {
        boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.destructive.base} 40%, transparent)`,
      },
    },
  },
  outline: {
    background: vars.color.background,
    color: vars.color.foreground,
    border: `1px solid ${vars.color.border}`,
    boxShadow: shadows.sm,
    selectors: {
      '&:hover:not(:disabled)': {
        background: vars.color.accent,
        color: vars.color.accentForeground,
      },
      ':is(.dark, [data-theme="dark"]) &': {
        background: `color-mix(in oklch, ${vars.color.input} 30%, transparent)`,
        borderColor: vars.color.input,
      },
      ':is(.dark, [data-theme="dark"]) &:hover:not(:disabled)': {
        background: `color-mix(in oklch, ${vars.color.input} 50%, transparent)`,
      },
    },
  },
  secondary: {
    background: vars.color.secondary.base,
    color: vars.color.secondary.foreground,
    border: 'none',
    boxShadow: shadows.sm,
    selectors: {
      '&:hover:not(:disabled)': {
        background: `color-mix(in oklch, ${vars.color.secondary.base} 80%, transparent)`,
      },
    },
  },
  ghost: {
    background: 'transparent',
    color: vars.color.foreground,
    border: 'none',
    boxShadow: 'none',
    selectors: {
      '&:hover:not(:disabled)': {
        background: vars.color.accent,
        color: vars.color.accentForeground,
      },
      ':is(.dark, [data-theme="dark"]) &:hover:not(:disabled)': {
        background: `color-mix(in oklch, ${vars.color.accent} 50%, transparent)`,
      },
    },
  },
  link: {
    background: 'transparent',
    color: vars.color.primary.base,
    border: 'none',
    boxShadow: 'none',
    textDecoration: 'none',
    selectors: {
      '&:hover:not(:disabled)': {
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
      },
    },
  },
  glow: {
    background: `linear-gradient(135deg, ${palette.purple[500]}, ${palette.orange[400]})`,
    color: vars.color.primary.foreground,
    border: 'none',
    boxShadow: `0 0 8px ${palette.purple['500/20']}`,
    selectors: {
      '&:hover:not(:disabled)': {
        boxShadow: `0 0 12px ${palette.purple['500/20']}, 0 0 24px ${palette.orange[400]}40`,
      },
      '&:active:not(:disabled)': {
        boxShadow: `0 0 6px ${palette.purple['500/15']}`,
      },
    },
  },
});

export const buttonSize = styleVariants({
  sm: {
    height: spacing[32],
    paddingInline: spacing[12],
    gap: spacing[6],
    selectors: {
      '&:has(> svg)': {
        paddingInline: spacing[10],
      },
    },
  },
  md: {
    height: spacing[36],
    paddingInline: spacing[16],
    selectors: {
      '&:has(> svg)': {
        paddingInline: spacing[12],
      },
    },
  },
  lg: {
    height: spacing[40],
    paddingInline: spacing[24],
    selectors: {
      '&:has(> svg)': {
        paddingInline: spacing[16],
      },
    },
  },
  icon: {
    height: spacing[36],
    width: spacing[36],
    padding: 0,
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
  borderRadius: radius.full,
  backgroundColor: 'currentColor',
  willChange: 'opacity, transform',
});

const button = buttonBase;
export default button;
