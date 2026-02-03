/**
 * Font 원시 토큰
 *
 * @description
 * 폰트 패밀리, 사이즈, 굵기, 행간, 자간의 개별 원시값입니다.
 * 조합된 타이포그래피 스타일은 typography.css.ts를 참조하세요.
 *
 * @example
 * ```typescript
 * import { font } from '@stylelist94/nine-beauty-actress/tokens';
 *
 * const customStyle = style({
 *   fontFamily: font.family.sans,
 *   fontSize: font.size['2xl'],
 *   fontWeight: font.weight.bold,
 * });
 * ```
 */
export const font = {
  family: {
    sans: 'Pretendard, system-ui, sans-serif',
    mono: 'Roboto Mono, monospace',
  },

  size: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
  },

  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
} as const;
