/**
 * Semantic 토큰 (CSS 변수)
 *
 * @description
 * 의미가 부여된 CSS 변수 참조입니다.
 * 다크모드 등 런타임 테마 전환을 지원합니다.
 *
 * @example
 * ```typescript
 * import { vars } from '@stylelist94/nine-beauty-actress/styles';
 *
 * const customStyle = style({
 *   background: vars.color.background,
 *   color: vars.color.foreground,
 * });
 * ```
 */
export { vars } from './styles/theme.css';

// Component styles
export { default as footer } from '../components/footer/style.css';
export {
  headerContainer,
  headerContentBox,
} from '../components/header/style.css';
export {
  backdrop,
  mainContainer,
} from '../components/main-container/style.css';
export { default as button } from '../components/button/style.css';
