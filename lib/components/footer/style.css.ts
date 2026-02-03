import { style } from '@vanilla-extract/css';

import { spacing } from 'lib/core/styles/tokens';

const footer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[24],
  width: '100%',
  maxWidth: '96rem', // 레이아웃 특수값 유지
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: spacing[24],
  paddingRight: spacing[24],
  paddingTop: spacing[32],
  paddingBottom: spacing[32],
});

export default footer;
