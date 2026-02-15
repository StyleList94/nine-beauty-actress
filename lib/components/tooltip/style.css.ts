import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, radius, font, motion } from 'lib/core/styles/tokens';
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

export const tooltipContent = style({
  zIndex: 50,
  width: 'fit-content',
  transformOrigin: 'var(--radix-tooltip-content-transform-origin)',
  borderRadius: radius.md,
  paddingInline: spacing[12],
  paddingBlock: spacing[6],
  fontSize: font.size.xs,
  background: vars.color.primary.base,
  color: vars.color.primary.foreground,
  textWrap: 'balance',
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

export const tooltipArrow = style({
  zIndex: 50,
  width: '10px',
  height: '10px',
  fill: vars.color.primary.base,
  background: vars.color.primary.base,
  transform: 'translateY(calc(-50% - 2px)) rotate(45deg)',
  borderRadius: '2px',
});
