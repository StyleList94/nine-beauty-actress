import { globalStyle, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, font } from 'lib/core/styles/tokens';

export const formControlBase = recipe({
  base: {
    display: 'flex',
    width: '100%',
  },
  variants: {
    layout: {
      vertical: {
        flexDirection: 'column',
        gap: spacing[6],
      },
      horizontal: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: spacing[8],
      },
    },
  },
  defaultVariants: {
    layout: 'vertical',
  },
});

export type FormControlVariants = RecipeVariants<typeof formControlBase>;

const horizontalSelector =
  formControlBase.classNames.variants.layout.horizontal;

globalStyle(`${horizontalSelector} [data-slot="form-control-caption"]`, {
  flexBasis: '100%',
  marginTop: `calc(-1 * ${spacing[4]})`,
});

globalStyle(`${horizontalSelector} [data-slot="form-control-validation"]`, {
  flexBasis: '100%',
  marginTop: `calc(-1 * ${spacing[4]})`,
});

export const formControlLabelBase = style({});

export const requiredIndicator = style({
  color: vars.color.error.base,
  fontSize: font.size.sm,
  lineHeight: font.lineHeight.none,
  userSelect: 'none',
});

export const formControlCaptionBase = style({
  fontSize: font.size.xs,
  lineHeight: font.lineHeight.normal,
  color: vars.color.mutedForeground,
  margin: 0,
});

export const formControlValidationBase = recipe({
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

export type FormControlValidationVariants = RecipeVariants<
  typeof formControlValidationBase
>;
