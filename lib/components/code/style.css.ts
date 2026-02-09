import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, radius, font } from 'lib/core/styles/tokens';

export const codeBase = style({
  paddingInline: spacing[8],
  paddingBlock: spacing[4],
  height: 'fit-content',
  fontFamily: font.family.mono,
  fontWeight: font.weight.normal,
  display: 'inline-block',
  whiteSpace: 'nowrap',
  background: vars.color.muted,
  color: vars.color.foreground,
  fontSize: font.size.sm,
  borderRadius: radius.md,
});
