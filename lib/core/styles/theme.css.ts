import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';

/**
 * 테마 색상 변수
 *
 * @description
 * 다크모드를 자동으로 지원하는 CSS 변수 시스템입니다.
 * 다음 방식으로 다크모드가 자동 감지됩니다:
 * - Tailwind CSS: `<html class="dark">`
 * - next-themes: `<html data-theme="dark">`
 * - 시스템 테마: `prefers-color-scheme: dark`
 *
 * @example
 * ```typescript
 * import { style } from '@vanilla-extract/css';
 * import { vars } from '@stylelist94/nine-beauty-actress/styles';
 *
 * const customButton = style({
 *   background: vars.color.background,
 *   color: vars.color.foreground,
 *   border: `1px solid ${vars.color.border}`,
 * });
 * ```
 *
 * @public
 */
export const vars = createGlobalTheme(':root', {
  color: {
    /** 메인 배경색 (light: #ffffff, dark: #18181b) */
    background: '#ffffff',
    /** 메인 텍스트색 (light: #18181b, dark: #fafafa) */
    foreground: '#18181b',
    /** 약한 배경색 - hover, disabled 등에 사용 (light: #f4f4f5, dark: #27272a) */
    muted: '#f4f4f5',
    /** 약한 텍스트색 - 보조 텍스트에 사용 (light: #71717a, dark: #a1a1aa) */
    mutedForeground: '#71717a',
    /** 테두리색 (light: #e4e4e7, dark: #3f3f46) */
    border: '#e4e4e7',
    /** 입력 필드 테두리색 (light: #d4d4d8, dark: #52525b) */
    input: '#d4d4d8',
    /** 강조 배경색 (light: #f4f4f5, dark: #27272a) */
    accent: '#f4f4f5',
    /** 강조 텍스트색 (light: #18181b, dark: #fafafa) */
    accentForeground: '#18181b',
  },
});

/**
 * CSS 변수 export
 *
 * @description
 * Tailwind CSS 및 순수 CSS에서 사용 가능한 CSS 변수를 제공합니다.
 *
 * @example
 * ```css
 * // Tailwind config
 * colors: {
 *   'nine-fox': 'var(--color-nine-tailed-fox)',
 * }
 *
 * // 순수 CSS
 * .custom {
 *   background: var(--color-nine-tailed-fox);
 * }
 * ```
 */
globalStyle(':root', {
  vars: {
    '--color-nine-tailed-fox': 'oklch(81% 0.117 11.638)',
  },
});

globalStyle('.dark, :root.dark, [data-theme="dark"]', {
  vars: {
    [vars.color.background]: '#18181b',
    [vars.color.foreground]: '#fafafa',
    [vars.color.muted]: '#27272a',
    [vars.color.mutedForeground]: '#a1a1aa',
    [vars.color.border]: '#3f3f46',
    [vars.color.input]: '#52525b',
    [vars.color.accent]: '#27272a',
    [vars.color.accentForeground]: '#fafafa',
  },
});

globalStyle(':root:not(.light):not([data-theme="light"])', {
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [vars.color.background]: '#18181b',
        [vars.color.foreground]: '#fafafa',
        [vars.color.muted]: '#27272a',
        [vars.color.mutedForeground]: '#a1a1aa',
        [vars.color.border]: '#3f3f46',
        [vars.color.input]: '#52525b',
        [vars.color.accent]: '#27272a',
        [vars.color.accentForeground]: '#fafafa',
      },
    },
  },
});
