import { forwardRef, type ComponentProps } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from 'lib/core/utils';

import * as styles from './style.css';

export type PopoverProps = ComponentProps<typeof PopoverPrimitive.Root>;

/**
 * 트리거 요소 주변에 떠오르는 팝오버 컨테이너입니다.
 *
 * @remarks
 * - Radix UI 기반의 접근성 지원 팝오버
 * - PopoverTrigger, PopoverContent, PopoverHeader 조합으로 구성
 * - side, align 속성으로 위치 조정 가능
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>열기</PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverHeader>
 *       <PopoverTitle>제목</PopoverTitle>
 *       <PopoverDescription>설명</PopoverDescription>
 *     </PopoverHeader>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export function Popover(props: PopoverProps) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}
Popover.displayName = 'Popover';

export type PopoverTriggerProps = ComponentProps<
  typeof PopoverPrimitive.Trigger
>;

/** 팝오버를 여는 트리거 요소 */
export function PopoverTrigger(props: PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}
PopoverTrigger.displayName = 'PopoverTrigger';

export type PopoverContentProps = ComponentProps<
  typeof PopoverPrimitive.Content
>;

/** 팝오버 콘텐츠 영역 (Portal 포함) */
export const PopoverContent = forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(styles.popoverContent, className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = 'PopoverContent';

export type PopoverAnchorProps = ComponentProps<typeof PopoverPrimitive.Anchor>;

/** 팝오버 위치를 기준으로 잡는 앵커 요소 */
export function PopoverAnchor(props: PopoverAnchorProps) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}
PopoverAnchor.displayName = 'PopoverAnchor';

export type PopoverHeaderProps = ComponentProps<'div'>;

/** 팝오버 내 제목과 설명을 감싸는 헤더 */
export function PopoverHeader({ className, ...props }: PopoverHeaderProps) {
  return (
    <div
      data-slot="popover-header"
      className={cn(styles.popoverHeader, className)}
      {...props}
    />
  );
}
PopoverHeader.displayName = 'PopoverHeader';

export type PopoverTitleProps = ComponentProps<'div'>;

/** 팝오버 제목 */
export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return (
    <div
      data-slot="popover-title"
      className={cn(styles.popoverTitle, className)}
      {...props}
    />
  );
}
PopoverTitle.displayName = 'PopoverTitle';

export type PopoverDescriptionProps = ComponentProps<'p'>;

/** 팝오버 설명 텍스트 */
export function PopoverDescription({
  className,
  ...props
}: PopoverDescriptionProps) {
  return (
    <p
      data-slot="popover-description"
      className={cn(styles.popoverDescription, className)}
      {...props}
    />
  );
}
PopoverDescription.displayName = 'PopoverDescription';
