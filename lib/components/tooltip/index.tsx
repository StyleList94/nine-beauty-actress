import { type ComponentProps } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from 'lib/core/utils';

import * as styles from './style.css';

export type TooltipProviderProps = ComponentProps<
  typeof TooltipPrimitive.Provider
>;

/** 툴팁 딜레이 및 전역 설정 프로바이더 */
export function TooltipProvider({
  delayDuration = 0,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}
TooltipProvider.displayName = 'TooltipProvider';

export type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root>;

/**
 * 보조 정보를 표시하는 툴팁 컴포넌트입니다.
 *
 * @remarks
 * - Radix Tooltip 기반, TooltipProvider 자동 포함
 * - 4방향(top/right/bottom/left) 위치 지원
 * - 화살표(Arrow) 자동 표시
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <Button variant="outline">마우스를 올려보세요</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>보조 설명 텍스트</TooltipContent>
 * </Tooltip>
 * ```
 */
export function Tooltip(props: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}
Tooltip.displayName = 'Tooltip';

export type TooltipTriggerProps = ComponentProps<
  typeof TooltipPrimitive.Trigger
>;

/** 툴팁을 트리거하는 요소 */
export function TooltipTrigger(props: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
  );
}
TooltipTrigger.displayName = 'TooltipTrigger';

export type TooltipContentProps = ComponentProps<
  typeof TooltipPrimitive.Content
>;

/** 툴팁 콘텐츠 팝오버 */
export function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(styles.tooltipContent, className)}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className={styles.tooltipArrow} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
TooltipContent.displayName = 'TooltipContent';
