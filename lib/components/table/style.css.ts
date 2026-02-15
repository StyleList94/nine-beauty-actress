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
  background: `color-mix(in oklch, ${vars.color.muted} 50%, transparent)`,
  borderTop: `1px solid ${vars.color.border}`,
  fontWeight: font.weight.medium,
});

globalStyle(`${tableFooter} > tr:last-child`, {
  borderBottom: 'none',
});

export const tableRow = style({
  borderBottom: `1px solid ${vars.color.border}`,
  transition: `background ${motion.duration.normal} ${motion.easing.ease}`,
  selectors: {
    '&:hover': {
      background: `color-mix(in oklch, ${vars.color.muted} 50%, transparent)`,
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
  selectors: {
    '&:has([role="checkbox"])': {
      paddingRight: 0,
    },
  },
});

globalStyle(`${tableHead} > [role="checkbox"]`, {
  transform: 'translateY(2px)',
});

export const tableCell = style({
  padding: spacing[8],
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  selectors: {
    '&:has([role="checkbox"])': {
      paddingRight: 0,
    },
  },
});

globalStyle(`${tableCell} > [role="checkbox"]`, {
  transform: 'translateY(2px)',
});

export const tableCaption = style({
  color: vars.color.mutedForeground,
  marginTop: spacing[16],
  fontSize: font.size.sm,
});
