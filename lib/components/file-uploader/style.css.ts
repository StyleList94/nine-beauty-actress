import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from 'lib/core/styles/theme.css';
import { palette, spacing, radius } from 'lib/core/styles/tokens';

export const fileUploaderContainer = style({
  position: 'relative',
});

const fileUploaderBoxBase = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px dashed',
  borderRadius: radius.sm,
  padding: spacing[16],
  userSelect: 'none',
});

export const fileUploaderBox = recipe({
  base: [fileUploaderBoxBase],
  variants: {
    state: {
      neutral: {
        borderColor: palette.neutral[400],
      },
      dragging: {
        borderColor: vars.color.success.overlay,
      },
      error: {
        borderColor: vars.color.error.overlay,
        borderStyle: 'solid',
      },
      selected: {
        borderColor: palette.neutral[700],
        borderStyle: 'solid',
        selectors: {
          '.dark &, [data-theme="dark"] &': {
            borderColor: palette.neutral[300],
          },
        },
      },
    },
  },
  defaultVariants: {
    state: 'neutral',
  },
});

export type FileUploaderBoxVariants = RecipeVariants<typeof fileUploaderBox>;

export const fileUploaderInput = style({
  position: 'absolute',
  bottom: 0,
  zIndex: -10,
  opacity: 0,
  width: '100%',
});
