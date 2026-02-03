import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import {
  palette,
  spacing,
  radius,
  motion,
  shadows,
} from 'lib/core/styles/tokens';

export const switchTrack = style({
  position: 'relative',
  display: 'inline-flex',
  height: spacing[24],
  width: spacing[48],
  flexShrink: 0,
  alignItems: 'center',
  borderRadius: radius.full,
  border: '1px solid transparent',
  backgroundColor: vars.color.surfaceSubtle,
  boxShadow: shadows.sm,
  transition: `all ${motion.duration.normal} ${motion.easing.easeInOut}`,
  outline: 'none',
  selectors: {
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

export const switchThumb = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: spacing[24],
  height: spacing[24],
  backgroundColor: palette.neutral[50],
  color: palette.neutral[600],
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: radius.full,
  pointerEvents: 'none',
  transition: `transform ${motion.duration.normal} ${motion.easing.easeInOut}`,
  selectors: {
    '&[data-state="checked"]': {
      transform: 'translateX(calc(100%))',
    },
    '&[data-state="unchecked"]': {
      transform: 'translateX(0)',
    },
    '.dark &, [data-theme="dark"] &': {
      backgroundColor: palette.neutral[900],
      color: palette.neutral[300],
    },
  },
});

export const switchIconBase = style({
  position: 'absolute',
  left: spacing[4],
  color: palette.neutral[700],
  transition: `transform ${motion.duration.normal} ${motion.easing.easeInOut}`,
  selectors: {
    '.dark &, [data-theme="dark"] &': {
      color: palette.neutral[300],
    },
  },
});

export const switchIconChecked = style({
  transform: 'translateX(0)',
});

export const switchIconUnchecked = style({
  transform: `translateX(calc(100% + ${spacing[6]}))`,
});
