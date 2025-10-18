import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';

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
  minHeight: 'calc(100vh - 3.5rem - 10rem)',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 0,
  marginBottom: 0,
  padding: '1.5rem',
  color: vars.color.foreground,
  '@media': {
    '(min-width: 640px)': {
      minHeight: 'calc(100vh - 4rem - 8rem)',
    },
  },
});
