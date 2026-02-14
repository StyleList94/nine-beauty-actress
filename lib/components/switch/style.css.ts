import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from 'lib/core/styles/theme.css';
import {
  palette,
  spacing,
  radius,
  motion,
  shadows,
} from 'lib/core/styles/tokens';

const trackBase = style({
  position: 'relative',
  display: 'inline-flex',
  flexShrink: 0,
  alignItems: 'center',
  borderRadius: radius.full,
  border: '1px solid transparent',
  backgroundColor: vars.color.input,
  boxShadow: shadows.sm,
  transition: `all ${motion.duration.normal} ${motion.easing.easeInOut}`,
  outline: 'none',
  selectors: {
    '&[data-state="checked"]': {
      backgroundColor: vars.color.primary.base,
      borderColor: vars.color.primary.base,
    },
    '&:focus-visible': {
      borderColor: palette.neutral[300],
      boxShadow: `0 0 0 2px ${vars.color.ring}`,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    '.dark &:focus-visible, [data-theme="dark"] &:focus-visible': {
      borderColor: palette.neutral[600],
    },
  },
});

export const switchTrack = recipe({
  base: [trackBase],

  variants: {
    size: {
      sm: {
        height: spacing[20],
        width: spacing[36],
        padding: spacing[2],
      },
      md: {
        height: spacing[24],
        width: spacing[48],
        padding: spacing[2],
      },
      lg: {
        height: spacing[28],
        width: spacing[56],
        padding: spacing[2],
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

export type SwitchVariants = RecipeVariants<typeof switchTrack>;

const thumbBase = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: palette.neutral[50],
  color: palette.neutral[600],
  boxShadow: shadows.sm,
  borderRadius: radius.full,
  pointerEvents: 'none',
  transition: `transform ${motion.duration.normal} ${motion.easing.easeInOut}, background-color ${motion.duration.normal} ${motion.easing.easeInOut}, color ${motion.duration.normal} ${motion.easing.easeInOut}`,
  selectors: {
    '&[data-state="checked"]': {
      backgroundColor: vars.color.background,
      color: vars.color.foreground,
    },
    '&[data-state="unchecked"]': {
      transform: 'translateX(0)',
    },
    '.dark &, [data-theme="dark"] &': {
      backgroundColor: palette.neutral[900],
      color: palette.neutral[300],
    },
    '.dark &[data-state="checked"], [data-theme="dark"] &[data-state="checked"]':
      {
        backgroundColor: vars.color.background,
      },
  },
});

export const switchThumb = recipe({
  base: [thumbBase],

  variants: {
    size: {
      sm: {
        width: spacing[16],
        height: spacing[16],
        selectors: {
          '&[data-state="checked"]': {
            transform: `translateX(calc(100% + ${spacing[2]}))`,
          },
        },
      },
      md: {
        width: spacing[20],
        height: spacing[20],
        selectors: {
          '&[data-state="checked"]': {
            transform: `translateX(calc(100% + ${spacing[2]}))`,
          },
        },
      },
      lg: {
        width: spacing[24],
        height: spacing[24],
        selectors: {
          '&[data-state="checked"]': {
            transform: `translateX(calc(100% + ${spacing[2]}))`,
          },
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

export const switchIconBase = style({
  position: 'absolute',
  left: spacing[4],
  color: palette.neutral[700],
  transition: `transform ${motion.duration.normal} ${motion.easing.easeInOut}, color ${motion.duration.normal} ${motion.easing.easeInOut}`,
  selectors: {
    '[data-state="checked"] &': {
      color: vars.color.primary.foreground,
    },
    '.dark &, [data-theme="dark"] &': {
      color: palette.neutral[300],
    },
    '.dark [data-state="checked"] &, [data-theme="dark"] [data-state="checked"] &':
      {
        color: vars.color.primary.foreground,
      },
  },
});

export const switchIconChecked = style({
  transform: 'translateX(0)',
});

export const switchIconUnchecked = style({
  transform: `translateX(calc(100% + ${spacing[6]}))`,
});
