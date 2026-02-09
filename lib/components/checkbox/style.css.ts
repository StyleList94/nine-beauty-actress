import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { radius, shadows, motion } from 'lib/core/styles/tokens';

export const checkboxBase = style({
  width: '1rem',
  height: '1rem',
  flexShrink: 0,
  borderRadius: radius.default,
  border: `1px solid ${vars.color.input}`,
  boxShadow: shadows.sm,
  outline: 'none',
  transition: `box-shadow ${motion.duration.normal} ${motion.easing.ease}`,
  selectors: {
    '&[data-state="checked"]': {
      background: vars.color.primary.base,
      color: vars.color.primary.foreground,
      borderColor: vars.color.primary.base,
    },
    '&:focus-visible': {
      borderColor: vars.color.ring,
      boxShadow: `0 0 0 3px ${vars.color.ring}`,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    '&[aria-invalid="true"]': {
      borderColor: vars.color.destructive.base,
      boxShadow: `0 0 0 3px ${vars.color.destructive.base}20`,
    },
  },
});

export const checkboxIndicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'currentColor',
});
