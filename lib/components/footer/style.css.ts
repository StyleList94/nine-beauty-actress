import { style } from '@vanilla-extract/css';

const footer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  width: '100%',
  maxWidth: '96rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  paddingTop: '2rem',
  paddingBottom: '2rem',
});

export default footer;
