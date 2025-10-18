import { style } from '@vanilla-extract/css';

export const switchTrack = style({
  position: 'relative',
  display: 'inline-flex',
  height: '1.5rem',
  width: '3rem',
  flexShrink: 0,
  alignItems: 'center',
  borderRadius: '9999px',
  border: '1px solid transparent',
  backgroundColor: 'rgba(244, 244, 245, 0.8)',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  transition: 'all 200ms ease-in-out',
  outline: 'none',
  selectors: {
    '&:focus-visible': {
      borderColor: '#d1d5db',
      boxShadow: '0 0 0 2px rgba(209, 213, 219, 0.5)',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    '.dark &, [data-theme="dark"] &': {
      backgroundColor: 'rgba(39, 39, 42, 0.8)',
    },
    '.dark &:focus-visible, [data-theme="dark"] &:focus-visible': {
      borderColor: '#4b5563',
      boxShadow: '0 0 0 2px rgba(75, 85, 99, 0.5)',
    },
  },
});

export const switchThumb = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '1.5rem',
  height: '1.5rem',
  backgroundColor: '#fafafa',
  color: '#52525b',
  border: '1px solid rgba(228, 228, 231, 0.8)',
  borderRadius: '9999px',
  pointerEvents: 'none',
  transition: 'transform 200ms ease-in-out',
  selectors: {
    '&[data-state="checked"]': {
      transform: 'translateX(calc(100%))',
    },
    '&[data-state="unchecked"]': {
      transform: 'translateX(0)',
    },
    '.dark &, [data-theme="dark"] &': {
      backgroundColor: '#18181b',
      color: '#d4d4d8',
      borderColor: 'rgba(63, 63, 70, 0.8)',
    },
  },
});

export const switchIconBase = style({
  position: 'absolute',
  left: '0.25rem',
  color: '#3f3f46',
  transition: 'transform 200ms ease-in-out',
  selectors: {
    '.dark &, [data-theme="dark"] &': {
      color: '#d4d4d8',
    },
  },
});

export const switchIconChecked = style({
  transform: 'translateX(0)',
});

export const switchIconUnchecked = style({
  transform: 'translateX(calc(100% + 0.375rem))',
});
