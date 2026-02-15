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
  selectors: {
    '&[data-size="sm"]': {
      gap: spacing[16],
      paddingBlock: spacing[16],
    },
  },
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
    '[data-size="sm"] &': {
      paddingInline: spacing[16],
    },
  },
});

export const cardTitle = style({
  lineHeight: font.lineHeight.none,
  fontWeight: font.weight.semibold,
  selectors: {
    '[data-size="sm"] &': {
      fontSize: font.size.sm,
    },
  },
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
  selectors: {
    '[data-size="sm"] &': {
      paddingInline: spacing[16],
    },
  },
});

export const cardFooter = style({
  display: 'flex',
  alignItems: 'center',
  paddingInline: spacing[24],
  selectors: {
    '[data-size="sm"] &': {
      paddingInline: spacing[16],
    },
  },
});
