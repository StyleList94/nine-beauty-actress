import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from 'lib/core/styles/theme.css';
import { font, spacing, radius, motion } from 'lib/core/styles/tokens';

export const toggleGroupRoot = style({
  display: 'inline-flex',
  alignItems: 'center',
  width: 'fit-content',
  borderRadius: radius.lg,
  selectors: {
    '&[data-orientation="vertical"]': {
      flexDirection: 'column',
    },
  },
});

const base = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: radius.md,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  fontWeight: font.weight.medium,
  transition: `color ${motion.duration.normal} ${motion.easing.ease}, background-color ${motion.duration.normal} ${motion.easing.ease}, border-color ${motion.duration.normal} ${motion.easing.ease}, box-shadow ${motion.duration.normal} ${motion.easing.ease}`,
  cursor: 'pointer',
  outline: 'none',
  selectors: {
    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${vars.color.muted}`,
    },
    '&[data-disabled]': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    '[data-orientation="vertical"] &': {
      width: '100%',
    },
  },
});

export const toggleGroupItem = recipe({
  base: [base],

  variants: {
    size: {
      sm: {
        height: spacing[32],
        paddingLeft: spacing[8],
        paddingRight: spacing[8],
        paddingTop: spacing[4],
        paddingBottom: spacing[4],
        fontSize: font.size.xs,
      },
      default: {
        height: spacing[36],
        paddingLeft: spacing[12],
        paddingRight: spacing[12],
        paddingTop: spacing[6],
        paddingBottom: spacing[6],
        fontSize: font.size.sm,
      },
      lg: {
        height: spacing[40],
        paddingLeft: spacing[16],
        paddingRight: spacing[16],
        paddingTop: spacing[8],
        paddingBottom: spacing[8],
        fontSize: font.size.sm,
      },
    },

    variant: {
      default: {
        backgroundColor: 'transparent',
        color: vars.color.foreground,
        boxShadow: 'none',
        selectors: {
          '&:hover': {
            boxShadow: `inset 0 0 0 1px ${vars.color.border}`,
          },
          '&[data-state="on"]': {
            backgroundColor: vars.color.accent,
            color: vars.color.accentForeground,
          },
          '&[data-state="on"]:hover': {
            boxShadow: `inset 0 0 0 1px ${vars.color.input}`,
          },
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: vars.color.foreground,
        borderColor: vars.color.border,
        boxShadow: 'none',
        selectors: {
          '&:hover': {
            boxShadow: `inset 0 0 0 1px ${vars.color.input}`,
          },
          '&[data-state="on"]': {
            backgroundColor: vars.color.accent,
            color: vars.color.accentForeground,
          },
          '&[data-state="on"]:hover': {
            boxShadow: `inset 0 0 0 2px ${vars.color.input}`,
          },
        },
      },
    },
  },

  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

export type ToggleGroupItemVariants = RecipeVariants<typeof toggleGroupItem>;

export const toggleGroupItemTightSpacing = style({
  borderRadius: 0,
  selectors: {
    '&:first-of-type': {
      borderTopLeftRadius: radius.lg,
      borderBottomLeftRadius: radius.lg,
    },
    '&:last-of-type': {
      borderTopRightRadius: radius.lg,
      borderBottomRightRadius: radius.lg,
    },
    '&:not(:first-of-type)': {
      marginLeft: '-1px',
    },
    '[data-orientation="vertical"] &:first-of-type': {
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      borderBottomLeftRadius: 0,
    },
    '[data-orientation="vertical"] &:last-of-type': {
      borderBottomLeftRadius: radius.lg,
      borderBottomRightRadius: radius.lg,
      borderTopRightRadius: 0,
    },
    '[data-orientation="vertical"] &:not(:first-of-type)': {
      marginLeft: 0,
      marginTop: '-1px',
    },
  },
});

export const toggleGroupItemLooseSpacing = style({
  borderRadius: radius.md,
});
