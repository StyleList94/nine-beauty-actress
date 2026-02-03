/**
 * Motion 토큰
 *
 * @description
 * 애니메이션 duration과 easing curve 정의입니다.
 *
 * @example
 * ```typescript
 * import { motion } from '@stylelist94/nine-beauty-actress/tokens';
 *
 * const fadeStyle = style({
 *   transition: `opacity ${motion.duration.normal} ${motion.easing.easeOut}`,
 * });
 *
 * const bounceStyle = style({
 *   transition: `transform ${motion.duration.slow} ${motion.easing.spring}`,
 * });
 * ```
 */
export const motion = {
  duration: {
    instant: '0ms',
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
} as const;
