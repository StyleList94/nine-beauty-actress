import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, radius, font, motion } from 'lib/core/styles/tokens';

export const container = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: radius.lg,
  overflow: 'hidden',
});

export const sortableHeader = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing[4],
  cursor: 'pointer',
  userSelect: 'none',
  borderRadius: radius.sm,
  padding: `${spacing[2]} ${spacing[4]}`,
  marginLeft: `-${spacing[4]}`,
  transition: `background ${motion.duration.fast} ${motion.easing.ease}`,
  selectors: {
    '&:hover': {
      background: `color-mix(in oklch, ${vars.color.muted} 50%, transparent)`,
    },
  },
});

export const sortIcon = style({
  width: spacing[16],
  height: spacing[16],
  flexShrink: 0,
  color: vars.color.mutedForeground,
});

export const paginationBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${spacing[8]} ${spacing[16]}`,
  borderTop: `1px solid ${vars.color.border}`,
});

export const paginationInfo = style({
  fontSize: font.size.sm,
  color: vars.color.mutedForeground,
});

export const paginationControls = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[4],
});

export const emptyState = style({
  textAlign: 'center',
  padding: `${spacing[40]} ${spacing[16]}`,
  color: vars.color.mutedForeground,
  fontSize: font.size.sm,
});
