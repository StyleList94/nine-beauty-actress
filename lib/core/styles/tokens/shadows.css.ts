/**
 * Box Shadow 토큰
 *
 * @description
 * OKLCH 색공간 기반 그림자입니다.
 * Tailwind CSS 그림자 스케일을 기반으로 합니다.
 *
 * @example
 * ```typescript
 * import { shadows } from '@stylelist94/nine-beauty-actress/tokens';
 *
 * const cardStyle = style({
 *   boxShadow: shadows.md,
 * });
 *
 * const modalStyle = style({
 *   boxShadow: shadows.xl,
 * });
 * ```
 */
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 oklch(15% 0 0 / 0.05)',
  default:
    '0 1px 3px 0 oklch(15% 0 0 / 0.1), 0 1px 2px -1px oklch(15% 0 0 / 0.1)',
  md: '0 4px 6px -1px oklch(15% 0 0 / 0.1), 0 2px 4px -2px oklch(15% 0 0 / 0.1)',
  lg: '0 10px 15px -3px oklch(15% 0 0 / 0.1), 0 4px 6px -4px oklch(15% 0 0 / 0.1)',
  xl: '0 20px 25px -5px oklch(15% 0 0 / 0.1), 0 8px 10px -6px oklch(15% 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px oklch(15% 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 oklch(15% 0 0 / 0.05)',
} as const;
