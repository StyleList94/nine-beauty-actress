/**
 * Border Radius 토큰
 *
 * @example
 * ```typescript
 * import { radius } from '@stylelist94/nine-beauty-actress/tokens';
 *
 * const buttonStyle = style({
 *   borderRadius: radius.md,
 * });
 *
 * const avatarStyle = style({
 *   borderRadius: radius.full,
 * });
 * ```
 */
export const radius = {
  none: '0',
  sm: '0.125rem', // 2px
  default: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  full: '9999px',
} as const;
