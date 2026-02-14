import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, radius, font, shadows, motion } from 'lib/core/styles/tokens';

export const inputBase = style({
  display: 'flex',
  height: spacing[36],
  width: '100%',
  minWidth: 0,
  borderRadius: radius.md,
  border: `1px solid ${vars.color.input}`,
  background: 'transparent',
  paddingInline: spacing[12],
  paddingBlock: spacing[4],
  fontSize: font.size.sm,
  boxShadow: shadows.sm,
  outline: 'none',
  transition: `color ${motion.duration.normal} ${motion.easing.ease}, box-shadow ${motion.duration.normal} ${motion.easing.ease}`,
  selectors: {
    '&::placeholder': {
      color: vars.color.mutedForeground,
    },
    '&::selection': {
      background: vars.color.primary.base,
      color: vars.color.primary.foreground,
    },
    '&:focus-visible': {
      borderColor: vars.color.ring,
      boxShadow: `0 0 0 3px ${vars.color.ring}`,
    },
    '&:disabled': {
      pointerEvents: 'none',
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    '&[aria-invalid="true"]': {
      borderColor: vars.color.destructive.base,
      boxShadow: `0 0 0 3px ${vars.color.destructive.base}20`,
    },
    '&::-webkit-file-upload-button': {
      display: 'inline-flex',
      height: spacing[28],
      border: 'none',
      background: 'transparent',
      fontSize: font.size.sm,
      fontWeight: font.weight.medium,
      color: vars.color.foreground,
    },
  },
});
