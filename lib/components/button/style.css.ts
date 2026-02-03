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
  solid: {
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
  outline: {
    background: 'transparent',
    color: vars.color.primary.base,
    border: `1.5px solid ${vars.color.primary.base}`,
    selectors: {
      '&:hover:not(:disabled)': {
        background: palette.purple['500/10'],
        borderColor: vars.color.primary.muted,
      },
      '&:active:not(:disabled)': {
        background: palette.purple['500/15'],
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
    height: spacing[40],
    paddingInline: spacing[16],
    fontSize: font.size.sm,
  },
  lg: {
    height: spacing[48],
    paddingInline: spacing[24],
    fontSize: font.size.base,
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
