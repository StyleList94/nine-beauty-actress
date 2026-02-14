import { style, globalStyle } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, radius, font } from 'lib/core/styles/tokens';

export const commandBase = style({
  display: 'flex',
  height: '100%',
  width: '100%',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: radius.md,
  background: vars.color.popover,
  color: vars.color.popoverForeground,
});

export const commandInputWrapper = style({
  padding: spacing[4],
  paddingBottom: 0,
});

export const commandInputGroup = style({
  display: 'flex',
  height: spacing[36],
  alignItems: 'center',
  gap: spacing[8],
  background: `color-mix(in oklch, ${vars.color.input} 30%, transparent)`,
  border: `1px solid color-mix(in oklch, ${vars.color.input} 30%, transparent)`,
  borderRadius: radius.lg,
  paddingInline: spacing[8],
});

export const commandInputIcon = style({
  width: '1rem',
  height: '1rem',
  flexShrink: 0,
  opacity: 0.5,
});

export const commandInput = style({
  display: 'flex',
  width: '100%',
  background: 'transparent',
  fontSize: font.size.sm,
  outline: 'none',
  border: 'none',
  selectors: {
    '&::placeholder': {
      color: vars.color.mutedForeground,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
});

export const commandList = style({
  maxHeight: '300px',
  scrollPaddingBlock: spacing[4],
  overflowX: 'hidden',
  overflowY: 'auto',
});

export const commandEmpty = style({
  paddingBlock: spacing[24],
  textAlign: 'center',
  fontSize: font.size.sm,
});

export const commandGroup = style({
  overflow: 'hidden',
  padding: spacing[4],
  color: vars.color.foreground,
});

globalStyle(`${commandGroup} [cmdk-group-heading]`, {
  color: vars.color.mutedForeground,
  paddingInline: spacing[8],
  paddingBlock: spacing[6],
  fontSize: font.size.xs,
  fontWeight: font.weight.medium,
});

export const commandSeparator = style({
  height: '1px',
  marginInline: `-${spacing[4]}`,
  background: vars.color.border,
});

export const commandItem = style({
  position: 'relative',
  display: 'flex',
  cursor: 'default',
  alignItems: 'center',
  gap: spacing[8],
  borderRadius: radius.sm,
  paddingInline: spacing[8],
  paddingBlock: spacing[6],
  fontSize: font.size.sm,
  outline: 'none',
  userSelect: 'none',
  selectors: {
    '&[data-selected="true"]': {
      background: vars.color.accent,
      color: vars.color.accentForeground,
    },
    '&[data-disabled="true"]': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
  },
});

globalStyle(`${commandItem} svg`, {
  pointerEvents: 'none',
  flexShrink: 0,
  width: '1rem',
  height: '1rem',
  color: vars.color.mutedForeground,
});

export const commandShortcut = style({
  color: vars.color.mutedForeground,
  marginLeft: 'auto',
  fontSize: font.size.xs,
  letterSpacing: font.letterSpacing.wider,
});

export const commandDialogContent = style({
  overflow: 'hidden',
  padding: 0,
});


export const srOnly = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
});
