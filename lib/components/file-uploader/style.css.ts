import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { palette, spacing, radius } from 'lib/core/styles/tokens';

export const fileUploaderContainer = style({
  position: 'relative',
});

export const fileUploaderBox = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px dashed',
  borderRadius: radius.sm,
  padding: spacing[16],
  userSelect: 'none',
});

export const fileUploaderBoxNeutral = style({
  borderColor: palette.neutral[400],
});

export const fileUploaderBoxDragging = style({
  borderColor: vars.color.success.overlay,
});

export const fileUploaderBoxError = style({
  borderColor: vars.color.error.overlay,
  borderStyle: 'solid',
});

export const fileUploaderBoxSelected = style({
  borderColor: palette.neutral[700],
  borderStyle: 'solid',
  selectors: {
    '.dark &, [data-theme="dark"] &': {
      borderColor: palette.neutral[300],
    },
  },
});

export const fileUploaderInput = style({
  position: 'absolute',
  bottom: 0,
  zIndex: -10,
  opacity: 0,
  width: '100%',
});
