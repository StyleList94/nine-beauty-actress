import { style } from '@vanilla-extract/css';

const button = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: '0.75rem',
  paddingRight: '0.75rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  outline: 0,
  border: '1px solid #a1a1aa',
  borderRadius: '2px',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: 'inherit',
  selectors: {
    '.dark &, [data-theme="dark"] &': {
      color: '#fafafa',
    },
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      selectors: {
        ':root:not(.light):not([data-theme="light"]) &': {
          color: '#fafafa',
        },
      },
    },
  },
});

export default button;
