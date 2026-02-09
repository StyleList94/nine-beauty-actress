import { style, styleVariants, keyframes } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { spacing, radius, font, shadows, motion } from 'lib/core/styles/tokens';

const slideIn = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
});

const slideOut = keyframes({
  from: { transform: 'translateX(0)', opacity: '1' },
  to: { transform: 'translateX(100%)', opacity: '0' },
});

export const toastViewport = style({
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 100,
  display: 'flex',
  maxHeight: '100vh',
  width: '100%',
  flexDirection: 'column-reverse',
  padding: spacing[16],
  gap: spacing[8],
  '@media': {
    '(min-width: 640px)': {
      bottom: 0,
      top: 'auto',
      flexDirection: 'column',
      maxWidth: '420px',
    },
  },
  outline: 'none',
});

export const toastBase = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing[16],
  overflow: 'hidden',
  borderRadius: radius.lg,
  border: `1px solid ${vars.color.border}`,
  padding: spacing[16],
  paddingRight: spacing[32],
  boxShadow: shadows.lg,
  transition: `all ${motion.duration.normal} ${motion.easing.ease}`,
  animation: `${slideIn} ${motion.duration.slow} ${motion.easing.easeOut}`,
  selectors: {
    '&[data-state="closed"]': {
      animation: `${slideOut} ${motion.duration.normal} ${motion.easing.ease}`,
    },
  },
});

export const toastVariant = styleVariants({
  default: {
    background: vars.color.background,
    color: vars.color.foreground,
  },
  destructive: {
    background: vars.color.destructive.base,
    color: vars.color.destructive.foreground,
    borderColor: vars.color.destructive.base,
  },
});

export const toastTitle = style({
  fontSize: font.size.sm,
  fontWeight: font.weight.semibold,
});

export const toastDescription = style({
  fontSize: font.size.sm,
  opacity: 0.9,
});

export const toastCloseButton = style({
  position: 'absolute',
  top: spacing[8],
  right: spacing[8],
  borderRadius: radius.sm,
  padding: spacing[4],
  opacity: 0.5,
  outline: 'none',
  border: 'none',
  background: 'transparent',
  color: 'currentColor',
  cursor: 'pointer',
  transition: `opacity ${motion.duration.fast} ${motion.easing.ease}`,
  selectors: {
    '&:hover': {
      opacity: 1,
    },
  },
});

export const toastAction = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderRadius: radius.md,
  border: `1px solid ${vars.color.border}`,
  paddingInline: spacing[12],
  paddingBlock: spacing[4],
  fontSize: font.size.sm,
  fontWeight: font.weight.medium,
  background: 'transparent',
  cursor: 'pointer',
  outline: 'none',
  transition: `background ${motion.duration.fast} ${motion.easing.ease}`,
  selectors: {
    '&:hover': {
      background: vars.color.muted,
    },
    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${vars.color.ring}`,
    },
  },
});
