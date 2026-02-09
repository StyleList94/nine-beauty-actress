import { style } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, radius, font, shadows, motion } from 'lib/core/styles/tokens';
import {
  fadeIn,
  fadeOut,
  zoomIn95,
  zoomOut95,
} from 'lib/core/styles/animations.css';

export const dialogOverlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  background: 'oklch(0% 0 0 / 0.5)',
  selectors: {
    '&[data-state="open"]': {
      animation: `${fadeIn} ${motion.duration.normal} ${motion.easing.ease}`,
    },
    '&[data-state="closed"]': {
      animation: `${fadeOut} ${motion.duration.normal} ${motion.easing.ease}`,
    },
  },
});

export const dialogContent = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: 50,
  display: 'grid',
  width: '100%',
  maxWidth: 'calc(100% - 2rem)',
  transform: 'translate(-50%, -50%)',
  gap: spacing[16],
  borderRadius: radius.lg,
  border: `1px solid ${vars.color.border}`,
  padding: spacing[24],
  background: vars.color.background,
  boxShadow: shadows.lg,
  '@media': {
    '(min-width: 640px)': {
      maxWidth: '32rem',
    },
  },
  selectors: {
    '&[data-state="open"]': {
      animation: `${fadeIn} 200ms ${motion.easing.ease}, ${zoomIn95} 200ms ${motion.easing.ease}`,
    },
    '&[data-state="closed"]': {
      animation: `${fadeOut} 200ms ${motion.easing.ease}, ${zoomOut95} 200ms ${motion.easing.ease}`,
    },
  },
});

export const dialogCloseButton = style({
  position: 'absolute',
  top: spacing[16],
  right: spacing[16],
  borderRadius: radius.sm,
  opacity: 0.7,
  transition: `opacity ${motion.duration.normal} ${motion.easing.ease}`,
  outline: 'none',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  selectors: {
    '&:hover': {
      opacity: 1,
    },
    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${vars.color.ring}`,
    },
    '&:disabled': {
      pointerEvents: 'none',
    },
  },
});

export const dialogHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[8],
  textAlign: 'center',
  '@media': {
    '(min-width: 640px)': {
      textAlign: 'left',
    },
  },
});

export const dialogFooter = style({
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: spacing[8],
  '@media': {
    '(min-width: 640px)': {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },
});

export const dialogTitle = style({
  fontSize: font.size.lg,
  lineHeight: font.lineHeight.none,
  fontWeight: font.weight.semibold,
});

export const dialogDescription = style({
  color: vars.color.mutedForeground,
  fontSize: font.size.sm,
});

export const srOnly = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
});
