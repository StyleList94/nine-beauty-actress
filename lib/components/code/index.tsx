import { type ComponentProps } from 'react';

import { cn } from 'lib/core/utils';

import { codeBase } from './style.css';

export type CodeProps = ComponentProps<'code'>;

/**
 * 인라인 코드 스니펫을 표시합니다.
 *
 * @remarks
 * - 모노스페이스 폰트와 muted 배경으로 코드를 시각적으로 구분
 * - 문단 내 인라인 사용에 최적화
 *
 * @example
 * ```tsx
 * <p>패키지 설치: <Code>pnpm add nine-beauty-actress</Code></p>
 * ```
 */
export function Code({ className, children, ...props }: CodeProps) {
  return (
    <code data-slot="code" className={cn(codeBase, className)} {...props}>
      {children}
    </code>
  );
}

Code.displayName = 'Code';
