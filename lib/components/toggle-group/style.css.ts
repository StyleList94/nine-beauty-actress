import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';

export const toggleGroupRoot = style({
  display: 'inline-flex',
  alignItems: 'center',
  width: 'fit-content',
  borderRadius: '0.5rem',
  selectors: {
    '&[data-orientation="vertical"]': {
      flexDirection: 'column',
    },
  },
});

export const toggleGroupItemBase = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.375rem',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  fontWeight: 500,
  transition: 'color 150ms ease, background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease',
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

export const toggleGroupItemSize = styleVariants({
  sm: {
    height: '2rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
    fontSize: '0.75rem',
  },
  default: {
    height: '2.25rem',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    paddingTop: '0.375rem',
    paddingBottom: '0.375rem',
    fontSize: '0.875rem',
  },
  lg: {
    height: '2.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    fontSize: '0.9rem',
  },
});

export const toggleGroupItemVariant = styleVariants({
  default: {
    backgroundColor: 'transparent',
    color: vars.color.foreground,
    selectors: {
      '&:hover': {
        backgroundColor: vars.color.muted,
      },
      '&[data-state="on"]': {
        backgroundColor: vars.color.accent,
        color: vars.color.accentForeground,
      },
      '.dark &:hover, [data-theme="dark"] &:hover': {
        backgroundColor: vars.color.muted,
      },
      '.dark &[data-state="on"], [data-theme="dark"] &[data-state="on"]': {
        backgroundColor: vars.color.accent,
        color: vars.color.accentForeground,
      },
    },
  },
  outline: {
    backgroundColor: 'transparent',
    color: vars.color.foreground,
    borderColor: vars.color.border,
    selectors: {
      '&:hover': {
        backgroundColor: vars.color.muted,
      },
      '&[data-state="on"]': {
        backgroundColor: vars.color.accent,
        color: vars.color.accentForeground,
        borderColor: vars.color.border,
      },
      '.dark &:hover, [data-theme="dark"] &:hover': {
        backgroundColor: vars.color.muted,
      },
      '.dark &[data-state="on"], [data-theme="dark"] &[data-state="on"]': {
        backgroundColor: vars.color.accent,
        color: vars.color.accentForeground,
        borderColor: vars.color.border,
      },
    },
  },
});

export const toggleGroupItemTightSpacing = style({
  borderRadius: 0,
  selectors: {
    '&:first-of-type': {
      borderTopLeftRadius: '0.5rem',
      borderBottomLeftRadius: '0.5rem',
    },
    '&:last-of-type': {
      borderTopRightRadius: '0.5rem',
      borderBottomRightRadius: '0.5rem',
    },
    '&:not(:first-of-type)': {
      marginLeft: '-1px',
    },
    '[data-orientation="vertical"] &:first-of-type': {
      borderTopLeftRadius: '0.5rem',
      borderTopRightRadius: '0.5rem',
      borderBottomLeftRadius: 0,
    },
    '[data-orientation="vertical"] &:last-of-type': {
      borderBottomLeftRadius: '0.5rem',
      borderBottomRightRadius: '0.5rem',
      borderTopRightRadius: 0,
    },
    '[data-orientation="vertical"] &:not(:first-of-type)': {
      marginLeft: 0,
      marginTop: '-1px',
    },
  },
});

export const toggleGroupItemLooseSpacing = style({
  borderRadius: '0.375rem',
});
