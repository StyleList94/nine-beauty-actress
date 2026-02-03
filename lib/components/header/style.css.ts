import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing } from 'lib/core/styles/tokens';

export const headerContainer = style({
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  width: '100%',
  height: spacing[56],
  zIndex: 10,
  backgroundColor: vars.color.background,
});

export const headerContentBox = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  paddingLeft: spacing[24],
  paddingRight: spacing[24],
  paddingTop: spacing[12],
  paddingBottom: spacing[12],
  marginLeft: 'auto',
  marginRight: 'auto',
});
