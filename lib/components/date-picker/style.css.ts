import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, radius, motion } from 'lib/core/styles/tokens';

export const datePickerTrigger = style({
  width: '100%',
  justifyContent: 'flex-start',
  gap: spacing[8],
  selectors: {
    '&[aria-invalid="true"]': {
      borderColor: vars.color.destructive.base,
      boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.destructive.base} 20%, transparent)`,
    },
    ':is(.dark, [data-theme="dark"]) &[aria-invalid="true"]': {
      boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.destructive.base} 40%, transparent)`,
    },
  },
});

export const datePickerPlaceholder = style({
  color: vars.color.mutedForeground,
});

export const datePickerIcon = style({
  flexShrink: 0,
  opacity: 0.5,
});

export const datePickerClearBtn = style({
  marginLeft: 'auto',
  opacity: 0,
  transition: `opacity ${motion.duration.fast} ${motion.easing.ease}`,
  selectors: {
    '&:hover': {
      opacity: 1,
    },
    [`${datePickerTrigger}:hover &`]: {
      opacity: 0.5,
    },
    [`${datePickerTrigger}:hover &:hover`]: {
      opacity: 1,
    },
  },
});

export const datePickerContent = style({
  width: 'auto',
  padding: 0,
  border: 'none',
  boxShadow: 'none',
  background: 'transparent',
});

export const datePickerTimePicker = style({
  borderTop: `1px solid ${vars.color.border}`,
  padding: spacing[12],
});

export const datePickerTimeInputWrap = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const datePickerTimeIcon = style({
  position: 'absolute',
  left: spacing[10],
  color: vars.color.mutedForeground,
  pointerEvents: 'none',
});

export const datePickerTimeInput = style({
  paddingLeft: spacing[32],
  selectors: {
    '&::-webkit-calendar-picker-indicator': {
      display: 'none',
    },
  },
});

export const datePickerCardWrap = style({
  background: vars.color.background,
  border: `1px solid ${vars.color.border}`,
  borderRadius: radius.xl,
  overflow: 'hidden',
});

export const datePickerPanel = style([
  datePickerCardWrap,
  { display: 'flex', flexDirection: 'row' },
]);

export const datePickerCalendarNoBorder = style({
  border: 'none',
  borderRadius: 0,
});

export const datePickerPresets = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
  padding: spacing[12],
  borderRight: `1px solid ${vars.color.border}`,
  minWidth: '8rem',
});

export const datePickerPresetBtn = style({
  justifyContent: 'flex-start',
  whiteSpace: 'nowrap',
});
