/**
 * Spacing 토큰
 *
 * @description
 * px 값을 키로 사용하는 간격 스케일입니다.
 * spacing[16]은 16px (1rem)을 의미합니다.
 *
 * @example
 * ```typescript
 * import { spacing } from '@stylelist94/nine-beauty-actress/tokens';
 *
 * const cardStyle = style({
 *   padding: spacing[16],      // 16px
 *   marginBottom: spacing[24], // 24px
 *   gap: spacing[8],           // 8px
 * });
 * ```
 */
export const spacing = {
  0: '0',
  1: '0.0625rem', // 1px
  2: '0.125rem', // 2px
  4: '0.25rem', // 4px
  6: '0.375rem', // 6px
  8: '0.5rem', // 8px
  10: '0.625rem', // 10px
  12: '0.75rem', // 12px
  14: '0.875rem', // 14px
  16: '1rem', // 16px
  20: '1.25rem', // 20px
  24: '1.5rem', // 24px
  28: '1.75rem', // 28px
  32: '2rem', // 32px
  36: '2.25rem', // 36px
  40: '2.5rem', // 40px
  48: '3rem', // 48px
  56: '3.5rem', // 56px
  64: '4rem', // 64px
  80: '5rem', // 80px
  96: '6rem', // 96px
} as const;
