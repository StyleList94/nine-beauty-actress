import { font } from './font.css';

/**
 * Typography 조합 토큰
 *
 * @description
 * font 원시값의 조합으로 만들어진 타이포그래피 스타일 세트입니다.
 * Vanilla Extract style에서 스프레드로 사용할 수 있습니다.
 *
 * @example
 * ```typescript
 * import { typography } from '@stylelist94/nine-beauty-actress/tokens';
 *
 * const titleStyle = style({
 *   ...typography.heading.lg,
 *   color: vars.color.foreground,
 * });
 *
 * const paragraphStyle = style({
 *   ...typography.body.md,
 * });
 * ```
 */
export const typography = {
  /**
   * 제목용 스타일
   * bold, tight lineHeight
   */
  heading: {
    '2xl': {
      fontSize: font.size['3xl'],
      fontWeight: font.weight.bold,
      lineHeight: font.lineHeight.tight,
      letterSpacing: font.letterSpacing.tight,
    },
    xl: {
      fontSize: font.size['2xl'],
      fontWeight: font.weight.bold,
      lineHeight: font.lineHeight.tight,
      letterSpacing: font.letterSpacing.tight,
    },
    lg: {
      fontSize: font.size.xl,
      fontWeight: font.weight.semibold,
      lineHeight: font.lineHeight.snug,
      letterSpacing: font.letterSpacing.tight,
    },
    md: {
      fontSize: font.size.lg,
      fontWeight: font.weight.semibold,
      lineHeight: font.lineHeight.snug,
      letterSpacing: font.letterSpacing.normal,
    },
    sm: {
      fontSize: font.size.base,
      fontWeight: font.weight.semibold,
      lineHeight: font.lineHeight.snug,
      letterSpacing: font.letterSpacing.normal,
    },
  },

  /**
   * 본문용 스타일
   * normal weight, relaxed lineHeight
   */
  body: {
    lg: {
      fontSize: font.size.lg,
      fontWeight: font.weight.normal,
      lineHeight: font.lineHeight.relaxed,
      letterSpacing: font.letterSpacing.normal,
    },
    md: {
      fontSize: font.size.base,
      fontWeight: font.weight.normal,
      lineHeight: font.lineHeight.normal,
      letterSpacing: font.letterSpacing.normal,
    },
    sm: {
      fontSize: font.size.sm,
      fontWeight: font.weight.normal,
      lineHeight: font.lineHeight.normal,
      letterSpacing: font.letterSpacing.normal,
    },
  },

  /**
   * 라벨/버튼용 스타일
   * medium weight, snug lineHeight
   */
  label: {
    lg: {
      fontSize: font.size.base,
      fontWeight: font.weight.medium,
      lineHeight: font.lineHeight.snug,
      letterSpacing: font.letterSpacing.normal,
    },
    md: {
      fontSize: font.size.sm,
      fontWeight: font.weight.medium,
      lineHeight: font.lineHeight.snug,
      letterSpacing: font.letterSpacing.normal,
    },
    sm: {
      fontSize: font.size.xs,
      fontWeight: font.weight.medium,
      lineHeight: font.lineHeight.snug,
      letterSpacing: font.letterSpacing.normal,
    },
  },

  /**
   * 캡션/보조 텍스트 스타일
   */
  caption: {
    fontSize: font.size.xs,
    fontWeight: font.weight.normal,
    lineHeight: font.lineHeight.normal,
    letterSpacing: font.letterSpacing.normal,
  },

  /**
   * 코드 스타일
   */
  code: {
    fontFamily: font.family.mono,
    fontSize: font.size.sm,
    fontWeight: font.weight.normal,
    lineHeight: font.lineHeight.normal,
    letterSpacing: font.letterSpacing.normal,
  },
} as const;
