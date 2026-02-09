import { style, globalStyle } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, font, motion } from 'lib/core/styles/tokens';

export const tableContainer = style({
  position: 'relative',
  width: '100%',
  overflowX: 'auto',
});

export const tableBase = style({
  width: '100%',
  captionSide: 'bottom',
  fontSize: font.size.sm,
});

export const tableHeader = style({});

globalStyle(`${tableHeader} tr`, {
  borderBottom: `1px solid ${vars.color.border}`,
});

export const tableBody = style({});

globalStyle(`${tableBody} tr:last-child`, {
  borderBottom: 'none',
});

export const tableFooter = style({
  background: vars.color.muted,
  borderTop: `1px solid ${vars.color.border}`,
  fontWeight: font.weight.medium,
});

export const tableRow = style({
  borderBottom: `1px solid ${vars.color.border}`,
  transition: `background ${motion.duration.normal} ${motion.easing.ease}`,
  selectors: {
    '&:hover': {
      background: vars.color.muted,
    },
    '&[data-state="selected"]': {
      background: vars.color.muted,
    },
  },
});

export const tableHead = style({
  color: vars.color.foreground,
  height: spacing[40],
  paddingInline: spacing[8],
  textAlign: 'left',
  verticalAlign: 'middle',
  fontWeight: font.weight.medium,
  whiteSpace: 'nowrap',
});

export const tableCell = style({
  padding: spacing[8],
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
});

export const tableCaption = style({
  color: vars.color.mutedForeground,
  marginTop: spacing[16],
  fontSize: font.size.sm,
});
