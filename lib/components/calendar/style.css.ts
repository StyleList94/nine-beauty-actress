import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, radius, motion, font } from 'lib/core/styles/tokens';

const cellSize = `var(--nine-cell-size, ${spacing[32]})`;

export const calendar = style({
  padding: spacing[12],
  background: vars.color.background,
  width: 'fit-content',
  border: `1px solid ${vars.color.border}`,
  borderRadius: radius.xl,
});

export const months = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[16],
  '@media': {
    '(min-width: 640px)': {
      flexDirection: 'row',
      gap: spacing[16],
    },
  },
});

export const month = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: spacing[16],
});

export const monthCaption = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: cellSize,
  width: '100%',
  paddingInline: cellSize,
});

export const captionLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[4],
  fontSize: font.size.sm,
  fontWeight: font.weight.medium,
  userSelect: 'none',
  borderRadius: radius.md,
});

globalStyle(`${captionLabel} svg`, {
  color: vars.color.mutedForeground,
  width: '0.875rem',
  height: '0.875rem',
});

export const dropdowns = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  height: cellSize,
  gap: spacing[6],
  fontSize: font.size.sm,
  fontWeight: font.weight.medium,
});

export const dropdownRoot = style({
  position: 'relative',
  borderRadius: radius.md,
});

export const dropdown = style({
  position: 'absolute',
  inset: 0,
  background: vars.color.popover,
  opacity: 0,
});

export const nav = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 1,
  pointerEvents: 'none',
});

export const navButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: cellSize,
  width: cellSize,
  background: 'transparent',
  border: 'none',
  borderRadius: radius.md,
  padding: 0,
  cursor: 'pointer',
  outline: 'none',
  pointerEvents: 'auto',
  color: vars.color.foreground,
  boxShadow: 'none',
  transition: `background-color ${motion.duration.normal} ${motion.easing.ease}, color ${motion.duration.normal} ${motion.easing.ease}, box-shadow ${motion.duration.normal} ${motion.easing.ease}`,
  userSelect: 'none',
  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.accent,
      color: vars.color.accentForeground,
    },
    '&:focus-visible': {
      boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.ring} 50%, transparent)`,
    },
    '&[aria-disabled="true"]': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
});

globalStyle(`${navButton} svg`, {
  width: spacing[16],
  height: spacing[16],
  pointerEvents: 'none',
  flexShrink: 0,
});

export const monthGrid = style({
  width: '100%',
  borderCollapse: 'collapse',
});

export const weekdays = style({
  display: 'flex',
});

export const weekday = style({
  color: vars.color.mutedForeground,
  borderRadius: radius.md,
  flex: 1,
  fontWeight: font.weight.normal,
  fontSize: '0.8rem',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const weeks = style({
  display: 'flex',
  flexDirection: 'column',
});

export const week = style({
  display: 'flex',
  width: '100%',
  marginTop: spacing[8],
});

export const day = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  padding: 0,
  textAlign: 'center',
  aspectRatio: '1',
  userSelect: 'none',
});

export const dayButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minWidth: cellSize,
  aspectRatio: '1',
  padding: 0,
  fontWeight: font.weight.normal,
  fontSize: font.size.sm,
  lineHeight: font.lineHeight.none,
  borderRadius: radius.md,
  border: 'none',
  background: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  outline: 'none',
  boxShadow: 'none',
  transition: `background-color ${motion.duration.normal} ${motion.easing.ease}, color ${motion.duration.normal} ${motion.easing.ease}, box-shadow ${motion.duration.normal} ${motion.easing.ease}`,
  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.accent,
      color: vars.color.accentForeground,
    },
    '&:focus-visible': {
      position: 'relative',
      zIndex: 10,
      boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.ring} 50%, transparent)`,
    },
    '&:disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
});

globalStyle(`${day}[data-selected="true"] ${dayButton}`, {
  background: vars.color.primary.base,
  color: vars.color.primary.foreground,
});

globalStyle(`${day}[data-selected="true"] ${dayButton}:hover`, {
  background: `color-mix(in oklch, ${vars.color.primary.base} 90%, black)`,
  color: vars.color.primary.foreground,
});

globalStyle(`${day}[data-selected="true"] ${dayButton}:focus`, {
  background: vars.color.primary.base,
  color: vars.color.primary.foreground,
});

export const rangeStart = style({
  borderRadius: `${radius.md} 0 0 ${radius.md}`,
  background: vars.color.accent,
});

export const rangeMiddle = style({
  borderRadius: 0,
  background: vars.color.accent,
});

globalStyle(`${rangeMiddle} ${dayButton}`, {
  borderRadius: 0,
  background: 'transparent',
});

globalStyle(
  `${rangeMiddle}[data-selected="true"] ${dayButton}, ${rangeMiddle}[data-selected="true"] ${dayButton}:focus`,
  {
    background: 'transparent',
    color: vars.color.accentForeground,
  },
);

globalStyle(`${rangeMiddle}[data-selected="true"] ${dayButton}:hover`, {
  background: `color-mix(in oklch, ${vars.color.foreground} 10%, transparent)`,
  color: vars.color.accentForeground,
});

/* Row-edge rounding: first day cell of week row (td:first-of-type skips week-number th) */
globalStyle(`${week} > td:first-of-type:is(${rangeMiddle})`, {
  borderRadius: `${radius.md} 0 0 ${radius.md}`,
});

/* Row-edge rounding: last day cell of week row */
globalStyle(`${week} > td:last-of-type:is(${rangeMiddle})`, {
  borderRadius: `0 ${radius.md} ${radius.md} 0`,
});

export const rangeEnd = style({
  borderRadius: `0 ${radius.md} ${radius.md} 0`,
  background: vars.color.accent,
});

/* Same-day range: both start and end on one cell */
globalStyle(`:is(${rangeStart})${rangeEnd}`, {
  borderRadius: radius.md,
});

export const today = style({
  background: vars.color.accent,
  color: vars.color.accentForeground,
  borderRadius: radius.md,
  selectors: {
    '&[data-selected="true"]': {
      borderRadius: 0,
    },
  },
});

/* Preserve asymmetric rounding when today is a range edge */
globalStyle(`:is(${rangeStart})${today}`, {
  borderRadius: `${radius.md} 0 0 ${radius.md}`,
});

globalStyle(`:is(${rangeEnd})${today}`, {
  borderRadius: `0 ${radius.md} ${radius.md} 0`,
});

export const outside = style({
  color: vars.color.mutedForeground,
  selectors: {
    '&[data-selected="true"]': {
      color: vars.color.mutedForeground,
    },
  },
});

export const disabled = style({
  color: vars.color.mutedForeground,
  opacity: 0.5,
});

export const hidden = style({
  visibility: 'hidden',
});

export const weekNumber = style({
  fontSize: '0.8rem',
  fontWeight: font.weight.normal,
  color: vars.color.mutedForeground,
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: cellSize,
  height: cellSize,
  flexShrink: 0,
});

export const weekNumberHeader = style({
  userSelect: 'none',
  width: cellSize,
  flexShrink: 0,
});
