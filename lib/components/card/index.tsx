import { forwardRef, type ComponentProps } from 'react';

import { cn } from 'lib/core/utils';

import * as styles from './style.css';

export type CardSize = 'default' | 'sm';

export type CardProps = ComponentProps<'div'> & {
  /**
   * 카드 크기를 지정합니다
   * @defaultValue 'default'
   */
  size?: CardSize;
};

/**
 * 뭐든 보여줄 수 있습니다.
 *
 * @remarks
 * - 7개 서브컴포넌트 조합으로 구성
 * - CardHeader 안에 CardTitle, CardDescription, CardAction 배치
 * - CardContent, CardFooter는 선택 사용
 * - size="sm"으로 컴팩트한 카드 구성 가능
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>제목</CardTitle>
 *     <CardDescription>설명</CardDescription>
 *   </CardHeader>
 *   <CardContent>내용</CardContent>
 * </Card>
 *
 * <Card size="sm">
 *   <CardHeader>
 *     <CardTitle>컴팩트</CardTitle>
 *   </CardHeader>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, size = 'default', ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card"
      data-size={size}
      className={cn(styles.cardBase, className)}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

/** grid 레이아웃 헤더 — CardAction이 있으면 자동으로 2열 배치 */
export const CardHeader = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(styles.cardHeader, className)}
      {...props}
    />
  ),
);
CardHeader.displayName = 'CardHeader';

/** 카드 제목 */
export const CardTitle = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn(styles.cardTitle, className)}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

/** 카드 설명 */
export const CardDescription = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-description"
    className={cn(styles.cardDescription, className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

/** 헤더 우측 액션 영역 — CardHeader 내부에 배치 */
export const CardAction = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn(styles.cardAction, className)}
      {...props}
    />
  ),
);
CardAction.displayName = 'CardAction';

/** 카드 본문 영역 */
export const CardContent = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn(styles.cardContent, className)}
      {...props}
    />
  ),
);
CardContent.displayName = 'CardContent';

/** 카드 하단 액션 영역 */
export const CardFooter = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn(styles.cardFooter, className)}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';
