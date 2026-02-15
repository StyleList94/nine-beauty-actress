import { type ComponentProps } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from 'lib/core/utils';

import { separatorBase } from './style.css';

export type SeparatorProps = ComponentProps<typeof SeparatorPrimitive.Root>;

/**
 * 콘텐츠를 시각적으로 구분하는 구분선입니다.
 *
 * @remarks
 * - Radix UI 기반의 접근성 지원 구분선
 * - orientation 속성으로 가로/세로 방향 지정
 * - decorative 속성으로 접근성 트리 포함 여부 제어
 *
 * @example
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" />
 * ```
 */
export function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorBase, className)}
      {...props}
    />
  );
}

Separator.displayName = 'Separator';
