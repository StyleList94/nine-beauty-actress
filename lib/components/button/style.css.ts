import { style, styleVariants } from '@vanilla-extract/css';

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
  borderRadius: radius.lg,
  fontWeight: font.weight.medium,
  cursor: 'pointer',
  outline: 'none',
  overflow: 'hidden',
  transition: `all ${motion.duration.normal} ${motion.easing.ease}`,
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  selectors: {
    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${vars.color.ring}`,
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const buttonVariant = styleVariants({
  default: {
    background: vars.color.primary.base,
    color: vars.color.primary.foreground,
    border: 'none',
    boxShadow: shadows.sm,
    selectors: {
      '&:hover:not(:disabled)': {
        background: vars.color.primary.strong,
        boxShadow: shadows.md,
      },
      '&:active:not(:disabled)': {
        background: vars.color.primary.strong,
        boxShadow: shadows.sm,
      },
    },
  },
  destructive: {
    background: vars.color.destructive.base,
    color: vars.color.destructive.foreground,
    border: 'none',
    boxShadow: shadows.sm,
    selectors: {
      '&:hover:not(:disabled)': {
        background: vars.color.destructive.strong,
        boxShadow: shadows.md,
      },
      '&:active:not(:disabled)': {
        background: vars.color.destructive.strong,
        boxShadow: shadows.sm,
      },
    },
  },
  outline: {
    background: 'transparent',
    color: vars.color.foreground,
    border: `1px solid ${vars.color.input}`,
    boxShadow: shadows.sm,
    selectors: {
      '&:hover:not(:disabled)': {
        background: vars.color.accent,
        color: vars.color.accentForeground,
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
        opacity: 0.8,
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
    fontSize: font.size.xs,
  },
  md: {
    height: spacing[36],
    paddingInline: spacing[16],
    fontSize: font.size.sm,
  },
  lg: {
    height: spacing[40],
    paddingInline: spacing[24],
    fontSize: font.size.sm,
  },
  icon: {
    height: spacing[36],
    width: spacing[36],
    padding: 0,
    fontSize: font.size.sm,
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
