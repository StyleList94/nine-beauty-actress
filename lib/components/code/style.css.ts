import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, radius, font } from 'lib/core/styles/tokens';

export const codeBase = style({
  position: 'relative',
  paddingInline: spacing[6],
  paddingBlock: spacing[4],
  fontFamily: font.family.mono,
  fontWeight: font.weight.medium,
  background: vars.color.muted,
  color: vars.color.foreground,
  fontSize: font.size.sm,
  borderRadius: radius.default,
});
