import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, radius, font, shadows } from 'lib/core/styles/tokens';

export const cardBase = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[24],
  borderRadius: radius.xl,
  border: `1px solid ${vars.color.border}`,
  paddingBlock: spacing[24],
  background: vars.color.card,
  color: vars.color.cardForeground,
  boxShadow: shadows.sm,
});

export const cardHeader = style({
  display: 'grid',
  gridAutoRows: 'min-content',
  gridTemplateRows: 'auto auto',
  alignItems: 'start',
  gap: spacing[6],
  paddingInline: spacing[24],
  selectors: {
    '&:has([data-slot="card-action"])': {
      gridTemplateColumns: '1fr auto',
    },
  },
});

export const cardTitle = style({
  lineHeight: font.lineHeight.none,
  fontWeight: font.weight.semibold,
});

export const cardDescription = style({
  color: vars.color.mutedForeground,
  fontSize: font.size.sm,
});

export const cardAction = style({
  gridColumnStart: 2,
  gridRow: '1 / span 2',
  gridRowStart: 1,
  alignSelf: 'start',
  justifySelf: 'end',
});

export const cardContent = style({
  paddingInline: spacing[24],
});

export const cardFooter = style({
  display: 'flex',
  alignItems: 'center',
  paddingInline: spacing[24],
});
