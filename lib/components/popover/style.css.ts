import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, radius, shadows, motion, font } from 'lib/core/styles/tokens';
import {
  fadeIn,
  fadeOut,
  zoomIn95,
  zoomOut95,
  slideInFromTop,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
} from 'lib/core/styles/animations.css';

export const popoverContent = style({
  zIndex: 50,
  width: '18rem',
  borderRadius: radius.md,
  border: `1px solid ${vars.color.border}`,
  padding: spacing[16],
  background: vars.color.popover,
  color: vars.color.popoverForeground,
  boxShadow: shadows.md,
  outline: 'none',
  transformOrigin: 'var(--radix-popover-content-transform-origin)',
  selectors: {
    '&[data-state="closed"]': {
      animation: `${fadeOut} ${motion.duration.fast} ${motion.easing.ease}, ${zoomOut95} ${motion.duration.fast} ${motion.easing.ease}`,
    },
    '&[data-side="bottom"]': {
      animation: `${fadeIn} ${motion.duration.fast} ${motion.easing.ease}, ${zoomIn95} ${motion.duration.fast} ${motion.easing.ease}, ${slideInFromTop} ${motion.duration.fast} ${motion.easing.ease}`,
    },
    '&[data-side="left"]': {
      animation: `${fadeIn} ${motion.duration.fast} ${motion.easing.ease}, ${zoomIn95} ${motion.duration.fast} ${motion.easing.ease}, ${slideInFromRight} ${motion.duration.fast} ${motion.easing.ease}`,
    },
    '&[data-side="right"]': {
      animation: `${fadeIn} ${motion.duration.fast} ${motion.easing.ease}, ${zoomIn95} ${motion.duration.fast} ${motion.easing.ease}, ${slideInFromLeft} ${motion.duration.fast} ${motion.easing.ease}`,
    },
    '&[data-side="top"]': {
      animation: `${fadeIn} ${motion.duration.fast} ${motion.easing.ease}, ${zoomIn95} ${motion.duration.fast} ${motion.easing.ease}, ${slideInFromBottom} ${motion.duration.fast} ${motion.easing.ease}`,
    },
  },
});

export const popoverHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
  fontSize: font.size.sm,
});

export const popoverTitle = style({
  fontWeight: font.weight.medium,
});

export const popoverDescription = style({
  color: vars.color.mutedForeground,
});
