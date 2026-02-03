import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing } from 'lib/core/styles/tokens';

export const backdrop = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: -1,
  backgroundColor: vars.color.background,
});

export const mainContainer = style({
  minHeight: 'calc(100vh - 3.5rem - 10rem)', // 레이아웃 계산값 유지
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 0,
  marginBottom: 0,
  padding: spacing[24],
  color: vars.color.foreground,
  '@media': {
    '(min-width: 640px)': {
      minHeight: 'calc(100vh - 4rem - 8rem)', // 레이아웃 계산값 유지
    },
  },
});
