import { forwardRef, type ComponentProps } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from 'lib/core/utils';

import * as styles from './style.css';

export type ScrollBarProps = ComponentProps<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>;

/** 스크롤 영역의 스크롤바 */
export const ScrollBar = forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    data-slot="scroll-area-scrollbar"
    orientation={orientation}
    className={cn(styles.scrollBarBase, className)}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      data-slot="scroll-area-thumb"
      className={styles.scrollBarThumb}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = 'ScrollBar';

export type ScrollAreaProps = ComponentProps<
  typeof ScrollAreaPrimitive.Root
>;

/**
 * 콘텐츠가 영역을 초과할 때 스크롤바를 제공하는 스크롤 영역입니다.
 *
 * @remarks
 * - Radix UI 기반의 크로스 브라우저 스크롤 영역
 * - ScrollBar를 자동으로 포함하며, 가로/세로 스크롤 지원
 * - 키보드 포커스 시 링 표시
 *
 * @example
 * ```tsx
 * <ScrollArea className="h-48 w-64">
 *   <div className="p-4">긴 콘텐츠...</div>
 * </ScrollArea>
 * ```
 */
export const ScrollArea = forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    data-slot="scroll-area"
    className={cn(styles.scrollAreaBase, className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport"
      className={styles.scrollAreaViewport}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = 'ScrollArea';
