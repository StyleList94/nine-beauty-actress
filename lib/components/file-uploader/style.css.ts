import { style } from '@vanilla-extract/css';

export const fileUploaderContainer = style({
  position: 'relative',
});

export const fileUploaderBox = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px dashed',
  borderRadius: '2px',
  padding: '1rem',
  userSelect: 'none',
});

export const fileUploaderBoxNeutral = style({
  borderColor: '#a1a1aa',
});

export const fileUploaderBoxDragging = style({
  borderColor: 'rgba(22, 163, 74, 0.5)',
});

export const fileUploaderBoxError = style({
  borderColor: 'rgba(239, 68, 68, 0.5)',
  borderStyle: 'solid',
});

export const fileUploaderBoxSelected = style({
  borderColor: '#3f3f46',
  borderStyle: 'solid',
  selectors: {
    '.dark &, [data-theme="dark"] &': {
      borderColor: '#d4d4d8',
    },
  },
});

export const fileUploaderInput = style({
  position: 'absolute',
  bottom: 0,
  zIndex: -10,
  opacity: 0,
  width: '100%',
});
