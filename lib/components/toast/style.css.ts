import { style, styleVariants, globalStyle, keyframes } from '@vanilla-extract/css';

import { vars } from 'lib/core/styles/theme.css';
import { palette, spacing, radius, font, shadows, motion } from 'lib/core/styles/tokens';

const slideIn = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
});

const fadeOut = keyframes({
  from: { opacity: '1' },
  to: { opacity: '0' },
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
  pointerEvents: 'auto',
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
  transition: `background ${motion.duration.normal} ${motion.easing.ease}, opacity ${motion.duration.normal} ${motion.easing.ease}`,
  animation: `${slideIn} ${motion.duration.slow} ${motion.easing.easeOut}`,
  selectors: {
    '&[data-state="closed"]': {
      animation: `${fadeOut} ${motion.duration.normal} ${motion.easing.ease} forwards`,
    },
    '&[data-swipe="cancel"]': {
      transform: 'translateX(0)',
      transition: `transform ${motion.duration.fast} ${motion.easing.ease}`,
    },
    '&[data-swipe="move"]': {
      transform: 'translateX(var(--radix-toast-swipe-move-x))',
      transition: 'none',
    },
    '&[data-swipe="end"]': {
      transform: 'translateX(100%)',
      transition: `transform ${motion.duration.fast} ${motion.easing.ease}`,
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

globalStyle(`${toastTitle} + div`, {
  fontSize: font.size.xs,
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
  opacity: 0,
  outline: 'none',
  border: 'none',
  background: 'transparent',
  color: `color-mix(in oklch, ${vars.color.foreground} 50%, transparent)`,
  cursor: 'pointer',
  transition: `opacity ${motion.duration.fast} ${motion.easing.ease}`,
  '@media': {
    '(hover: none)': {
      opacity: 1,
    },
  },
  selectors: {
    '&:hover': {
      color: vars.color.foreground,
      opacity: 1,
    },
    '&:focus': {
      opacity: 1,
      boxShadow: `0 0 0 2px ${vars.color.ring}`,
    },
  },
});

globalStyle(`${toastBase}:hover ${toastCloseButton}`, {
  opacity: 1,
});

globalStyle(`${toastVariant.destructive} ${toastCloseButton}`, {
  color: palette.red[300],
});

globalStyle(`${toastVariant.destructive} ${toastCloseButton}:hover`, {
  color: palette.red[50],
});

globalStyle(`${toastVariant.destructive} ${toastCloseButton}:focus`, {
  boxShadow: `0 0 0 2px ${palette.red[400]}`,
});

export const toastAction = style({
  display: 'inline-flex',
  height: spacing[32],
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderRadius: radius.md,
  border: `1px solid ${vars.color.border}`,
  paddingInline: spacing[12],
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
    '&:disabled': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
  },
});

globalStyle(`${toastVariant.destructive} ${toastAction}`, {
  borderColor: `color-mix(in oklch, ${vars.color.muted} 40%, transparent)`,
});

globalStyle(`${toastVariant.destructive} ${toastAction}:hover`, {
  borderColor: `color-mix(in oklch, ${vars.color.destructive.base} 30%, transparent)`,
  background: vars.color.destructive.base,
  color: vars.color.destructive.foreground,
});

globalStyle(`${toastVariant.destructive} ${toastAction}:focus-visible`, {
  boxShadow: `0 0 0 2px ${vars.color.destructive.base}`,
});

export const toastContent = style({
  display: 'grid',
  gap: spacing[4],
});
