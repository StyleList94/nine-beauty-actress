import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, radius, font, shadows } from 'lib/core/styles/tokens';

export const chartContainer = style({
  width: '100%',
  position: 'relative',
});

export const chartTooltipContainer = style({
  background: vars.color.popover,
  color: vars.color.popoverForeground,
  border: `1px solid ${vars.color.border}`,
  borderRadius: radius.md,
  padding: `${spacing[6]} ${spacing[8]}`,
  boxShadow: shadows.md,
  fontSize: font.size.xs,
  lineHeight: font.lineHeight.normal,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
  pointerEvents: 'none',
  zIndex: 50,
  minWidth: '8rem',
});

export const chartTooltipRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[6],
});

export const chartTooltipIndicator = style({
  width: '6px',
  height: '6px',
  borderRadius: radius.full,
  flexShrink: 0,
});

export const chartTooltipLabel = style({
  color: vars.color.mutedForeground,
});

export const chartTooltipValue = style({
  fontWeight: font.weight.medium,
  marginLeft: 'auto',
});

export const chartLegendContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing[16],
  paddingBlock: spacing[8],
  flexWrap: 'wrap',
});

export const chartLegendItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[6],
  fontSize: font.size.sm,
  color: vars.color.mutedForeground,
});

export const chartLegendIndicator = style({
  width: '8px',
  height: '8px',
  borderRadius: radius.full,
  flexShrink: 0,
});
