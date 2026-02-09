import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { radius, motion } from 'lib/core/styles/tokens';

export const scrollAreaBase = style({
  position: 'relative',
});

export const scrollAreaViewport = style({
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
  outline: 'none',
  transition: `color ${motion.duration.normal} ${motion.easing.ease}, box-shadow ${motion.duration.normal} ${motion.easing.ease}`,
  selectors: {
    '&:focus-visible': {
      boxShadow: `0 0 0 3px ${vars.color.ring}`,
    },
  },
});

export const scrollBarBase = style({
  display: 'flex',
  touchAction: 'none',
  padding: '1px',
  transition: `background ${motion.duration.normal} ${motion.easing.ease}`,
  userSelect: 'none',
  selectors: {
    '&[data-orientation="vertical"]': {
      height: '100%',
      width: '10px',
      borderLeft: '1px solid transparent',
    },
    '&[data-orientation="horizontal"]': {
      height: '10px',
      flexDirection: 'column',
      borderTop: '1px solid transparent',
    },
  },
});

export const scrollBarThumb = style({
  position: 'relative',
  flex: 1,
  borderRadius: radius.full,
  background: vars.color.border,
});
