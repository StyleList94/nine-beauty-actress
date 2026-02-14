import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, font } from 'lib/core/styles/tokens';

export const checkboxGroupBase = style({
  display: 'flex',
  flexDirection: 'column',
  border: 'none',
  margin: 0,
  padding: 0,
  width: '100%',
});

export const checkboxGroupLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[8],
  fontSize: font.size.sm,
  lineHeight: font.lineHeight.none,
  fontWeight: font.weight.medium,
  padding: 0,
  marginBottom: spacing[8],
});

export const checkboxGroupContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[10],
});

export const requiredIndicator = style({
  color: vars.color.error.base,
  fontSize: font.size.sm,
  lineHeight: font.lineHeight.none,
  userSelect: 'none',
});

export const checkboxGroupCaptionBase = style({
  fontSize: font.size.xs,
  lineHeight: font.lineHeight.normal,
  color: vars.color.mutedForeground,
  margin: 0,
  marginBottom: spacing[12],
});

export const checkboxGroupValidationBase = recipe({
  base: {
    fontSize: font.size.xs,
    lineHeight: font.lineHeight.normal,
    fontWeight: font.weight.medium,
    margin: 0,
  },
  variants: {
    variant: {
      error: {
        color: vars.color.error.base,
      },
      success: {
        color: vars.color.success.base,
      },
    },
  },
  defaultVariants: {
    variant: 'error',
  },
});

export type CheckboxGroupValidationVariants = RecipeVariants<
  typeof checkboxGroupValidationBase
>;
