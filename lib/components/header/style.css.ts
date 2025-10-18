import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';

export const headerContainer = style({
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  width: '100%',
  height: '3.5rem',
  zIndex: 10,
  backgroundColor: vars.color.background,
});

export const headerContentBox = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  paddingTop: '0.75rem',
  paddingBottom: '0.75rem',
  marginLeft: 'auto',
  marginRight: 'auto',
});
