import { keyframes } from '@vanilla-extract/css';

export const fadeIn = keyframes({
  from: { opacity: '0' },
  to: { opacity: '1' },
});

export const fadeOut = keyframes({
  from: { opacity: '1' },
  to: { opacity: '0' },
});

export const zoomIn95 = keyframes({
  from: { transform: 'scale(0.95)' },
  to: { transform: 'scale(1)' },
});

export const zoomOut95 = keyframes({
  from: { transform: 'scale(1)' },
  to: { transform: 'scale(0.95)' },
});

export const slideInFromTop = keyframes({
  from: { transform: 'translateY(-0.5rem)' },
  to: { transform: 'translateY(0)' },
});

export const slideInFromBottom = keyframes({
  from: { transform: 'translateY(0.5rem)' },
  to: { transform: 'translateY(0)' },
});

export const slideInFromLeft = keyframes({
  from: { transform: 'translateX(-0.5rem)' },
  to: { transform: 'translateX(0)' },
});

export const slideInFromRight = keyframes({
  from: { transform: 'translateX(0.5rem)' },
  to: { transform: 'translateX(0)' },
});
