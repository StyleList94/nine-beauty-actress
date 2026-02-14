import { type ComponentProps } from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

export type CollapsibleProps = ComponentProps<
  typeof CollapsiblePrimitive.Root
>;

/**
 * 컨텐츠를 접고 펼칠 수 있는 토글 패널입니다.
 *
 * @remarks
 * - Radix UI Collapsible 기반
 * - open/onOpenChange로 제어 모드 지원
 * - CollapsibleTrigger, CollapsibleContent와 조합하여 사용
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>더 보기</CollapsibleTrigger>
 *   <CollapsibleContent>숨겨진 내용</CollapsibleContent>
 * </Collapsible>
 * ```
 */
export function Collapsible(props: CollapsibleProps) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

Collapsible.displayName = 'Collapsible';

export type CollapsibleTriggerProps = ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleTrigger
>;

/** 컨텐츠를 토글하는 버튼 */
export function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export type CollapsibleContentProps = ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleContent
>;

/** 펼쳐지는 컨텐츠 영역 */
export function CollapsibleContent(props: CollapsibleContentProps) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

CollapsibleContent.displayName = 'CollapsibleContent';
