import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { radius, shadows, motion } from 'lib/core/styles/tokens';

export const sliderBase = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  touchAction: 'none',
  alignItems: 'center',
  userSelect: 'none',
  selectors: {
    '&[data-disabled]': {
      opacity: 0.5,
    },
    '&[data-orientation="vertical"]': {
      height: '100%',
      minHeight: '11rem',
      width: 'auto',
      flexDirection: 'column',
    },
  },
});

export const sliderTrack = style({
  position: 'relative',
  flexGrow: 1,
  overflow: 'hidden',
  borderRadius: radius.full,
  background: vars.color.muted,
  selectors: {
    '&[data-orientation="horizontal"]': {
      height: '6px',
      width: '100%',
    },
    '&[data-orientation="vertical"]': {
      height: '100%',
      width: '6px',
    },
  },
});

export const sliderRange = style({
  position: 'absolute',
  background: vars.color.primary.base,
  selectors: {
    '&[data-orientation="horizontal"]': {
      height: '100%',
    },
    '&[data-orientation="vertical"]': {
      width: '100%',
    },
  },
});

export const sliderThumb = style({
  display: 'block',
  width: '1rem',
  height: '1rem',
  flexShrink: 0,
  borderRadius: radius.full,
  border: `1px solid ${vars.color.primary.base}`,
  background: vars.color.background,
  boxShadow: shadows.sm,
  transition: `color ${motion.duration.normal} ${motion.easing.ease}, box-shadow ${motion.duration.normal} ${motion.easing.ease}`,
  selectors: {
    '&:hover': {
      boxShadow: `0 0 0 4px ${vars.color.ring}`,
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 4px ${vars.color.ring}`,
    },
    '&:disabled': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
  },
});
