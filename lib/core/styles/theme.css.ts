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
    background: palette.neutral[50],
    /** 메인 텍스트색 */
    foreground: palette.neutral[900],
    /** 약한 배경색 - hover, disabled 등에 사용 */
    muted: palette.neutral[100],
    /** 약한 텍스트색 - 보조 텍스트에 사용 */
    mutedForeground: palette.neutral[500],
    /** 테두리색 */
    border: palette.neutral[200],
    /** 입력 필드 테두리색 */
    input: palette.neutral[300],
    /** 강조 배경색 */
    accent: palette.neutral[100],
    /** 강조 텍스트색 */
    accentForeground: palette.neutral[900],

    // Primary (nested - 주요 액션 색상)
    primary: {
      /** 기본 색상 */
      base: palette.purple[500],
      /** 강조 색상 (hover, active) */
      strong: palette.purple[600],
      /** 약한 색상 (disabled, subtle) */
      muted: palette.purple[300],
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

    // Surface & Ring (반투명 UI 요소)
    /** 반투명 표면 배경 */
    surfaceSubtle: palette.neutral['100/80'],
    /** 반투명 보더 */
    borderSubtle: palette.neutral['200/80'],
    /** 포커스 링 */
    ring: palette.neutral['300/50'],
  },
});

/**
 * 다크모드 오버라이드 (Class/Attribute 기반)
 * Layout 색상만 오버라이드, action/status는 동일 유지
 */
globalStyle('.dark, :root.dark, [data-theme="dark"]', {
  vars: {
    [vars.color.background]: palette.neutral[900],
    [vars.color.foreground]: palette.neutral[50],
    [vars.color.muted]: palette.neutral[800],
    [vars.color.mutedForeground]: palette.neutral[400],
    [vars.color.border]: palette.neutral[700],
    [vars.color.input]: palette.neutral[700],
    [vars.color.accent]: palette.neutral[800],
    [vars.color.accentForeground]: palette.neutral[50],
    [vars.color.surfaceSubtle]: palette.neutral['800/80'],
    [vars.color.borderSubtle]: palette.neutral['700/80'],
    [vars.color.ring]: palette.neutral['600/50'],
  },
});

/**
 * 시스템 다크모드 자동 감지
 */
globalStyle(':root:not(.light):not([data-theme="light"])', {
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [vars.color.background]: palette.neutral[900],
        [vars.color.foreground]: palette.neutral[50],
        [vars.color.muted]: palette.neutral[800],
        [vars.color.mutedForeground]: palette.neutral[400],
        [vars.color.border]: palette.neutral[700],
        [vars.color.input]: palette.neutral[700],
        [vars.color.accent]: palette.neutral[800],
        [vars.color.accentForeground]: palette.neutral[50],
        [vars.color.surfaceSubtle]: palette.neutral['800/80'],
        [vars.color.borderSubtle]: palette.neutral['700/80'],
        [vars.color.ring]: palette.neutral['600/50'],
      },
    },
  },
});
