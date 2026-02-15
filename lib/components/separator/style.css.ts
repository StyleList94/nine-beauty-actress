import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';

export const separatorBase = style({
  flexShrink: 0,
  background: vars.color.border,
  selectors: {
    '&[data-orientation="horizontal"]': {
      height: '1px',
      width: '100%',
    },
    '&[data-orientation="vertical"]': {
      height: '100%',
      width: '1px',
    },
  },
});
