import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';

import { palette } from './tokens';

/**
 * Semantic 색상 토큰
 *
 * @description
 * Primitive 색상에 의미를 부여한 CSS 변수 시스템입니다.
 * 다크모드를 자동으로 지원합니다.
 *
 * 다음 3가지 방식을 지원합니다:
 *
 * 1. Class 기반 (Tailwind CSS 방식)
 *    - Dark 모드: class="dark"
 *    - Light 모드: class="light"
 *
 * 2. Data Attribute 기반 (next-themes 방식)
 *    - Dark 모드: data-theme="dark"
 *    - Light 모드: data-theme="light"
 *
 * 3. 시스템 테마 자동 감지
 *    - 클래스/속성 없이 prefers-color-scheme 자동 감지
 *
 * @example
 * ```typescript
 * // Vanilla Extract에서 사용
 * import { vars } from '@stylelist94/nine-beauty-actress/styles';
 *
 * const customButton = style({
 *   background: vars.color.primary.base,
 *   color: vars.color.primary.foreground,
 * });
 *
 * // 일반 CSS에서 사용
 * // .custom { background: var(--color-primary-base); }
 * ```
 *
 * @public
 */
export const vars = createGlobalTheme(':root', {
  color: {
    // Layout (flat - 단일값)
    /** 메인 배경색 */
    background: palette.white,
    /** 메인 텍스트색 */
    foreground: palette.neutral[950],
    /** 약한 배경색 - hover, disabled 등에 사용 */
    muted: palette.neutral[100],
    /** 약한 텍스트색 - 보조 텍스트에 사용 */
    mutedForeground: palette.neutral[500],
    /** 테두리색 */
    border: palette.neutral[200],
    /** 입력 필드 테두리색 */
    input: palette.neutral[200],
    /** 강조 배경색 */
    accent: palette.neutral[100],
    /** 강조 텍스트색 */
    accentForeground: palette.neutral[900],

    // Primary (nested - 주요 액션 색상)
    primary: {
      /** 기본 색상 */
      base: palette.neutral[900],
      /** 강조 색상 (hover, active) */
      strong: palette.neutral[950],
      /** 약한 색상 (disabled, subtle) */
      muted: palette.neutral[400],
      /** 전경 색상 (텍스트) */
      foreground: palette.neutral[50],
    },

    // Brand (nested - 브랜드 색상)
    brand: {
      /** 기본 색상 */
      base: palette.orange[400],
      /** 강조 색상 */
      strong: palette.orange[500],
      /** 약한 색상 */
      muted: palette.orange[200],
      /** 전경 색상 */
      foreground: palette.neutral[50],
    },

    // Status (nested)
    success: {
      base: palette.green[500],
      strong: palette.green[600],
      muted: palette.green[200],
      foreground: palette.neutral[50],
      /** 반투명 오버레이 (드래그, 선택 등) */
      overlay: palette.green['500/50'],
    },
    warning: {
      base: palette.yellow[500],
      strong: palette.yellow[600],
      muted: palette.yellow[200],
      foreground: palette.neutral[900],
    },
    error: {
      base: palette.red[500],
      strong: palette.red[600],
      muted: palette.red[200],
      foreground: palette.neutral[50],
      /** 반투명 오버레이 (에러 보더 등) */
      overlay: palette.red['500/50'],
    },
    info: {
      base: palette.blue[500],
      strong: palette.blue[600],
      muted: palette.blue[200],
      foreground: palette.neutral[50],
    },

    // Popover (팝오버/드롭다운)
    /** 팝오버 배경색 */
    popover: palette.white,
    /** 팝오버 텍스트색 */
    popoverForeground: palette.neutral[950],

    // Card (카드 컨테이너)
    /** 카드 배경색 */
    card: palette.white,
    /** 카드 텍스트색 */
    cardForeground: palette.neutral[950],

    // Secondary (보조 색상)
    secondary: {
      /** 보조 배경색 */
      base: palette.neutral[100],
      /** 보조 전경색 */
      foreground: palette.neutral[900],
    },

    // Destructive (파괴적 액션 색상)
    destructive: {
      /** 파괴적 액션 기본 색상 */
      base: 'oklch(57.7% 0.245 27.325)',
      /** 파괴적 액션 강조 색상 */
      strong: 'oklch(50% 0.213 27.325)',
      /** 파괴적 액션 전경색 */
      foreground: palette.neutral[50],
    },

    // Surface & Ring (반투명 UI 요소)
    /** 반투명 표면 배경 */
    surfaceSubtle: palette.neutral['100/80'],
    /** 반투명 보더 */
    borderSubtle: palette.neutral['200/80'],
    /** 포커스 링 */
    ring: palette.neutral[400],
  },
});

const darkVars = {
  [vars.color.background]: palette.neutral[950],
  [vars.color.foreground]: palette.neutral[50],
  [vars.color.muted]: palette.neutral[800],
  [vars.color.mutedForeground]: palette.neutral[400],
  [vars.color.border]: 'oklch(100% 0 0 / 0.1)',
  [vars.color.input]: 'oklch(100% 0 0 / 0.15)',
  [vars.color.accent]: palette.neutral[800],
  [vars.color.accentForeground]: palette.neutral[50],
  [vars.color.primary.base]: palette.neutral[200],
  [vars.color.primary.strong]: palette.neutral[300],
  [vars.color.primary.muted]: palette.neutral[600],
  [vars.color.primary.foreground]: palette.neutral[900],
  [vars.color.popover]: palette.neutral[900],
  [vars.color.popoverForeground]: palette.neutral[50],
  [vars.color.card]: palette.neutral[900],
  [vars.color.cardForeground]: palette.neutral[50],
  [vars.color.secondary.base]: palette.neutral[800],
  [vars.color.secondary.foreground]: palette.neutral[50],
  [vars.color.destructive.base]: 'oklch(70.4% 0.191 22.216)',
  [vars.color.surfaceSubtle]: palette.neutral['800/80'],
  [vars.color.borderSubtle]: palette.neutral['700/80'],
  [vars.color.ring]: palette.neutral[500],
};

/**
 * 다크모드 오버라이드 (Class/Attribute 기반)
 */
globalStyle('.dark, :root.dark, [data-theme="dark"]', {
  vars: darkVars,
});

/**
 * 시스템 다크모드 자동 감지
 */
globalStyle(':root:not(.light):not([data-theme="light"])', {
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: darkVars,
    },
  },
});
