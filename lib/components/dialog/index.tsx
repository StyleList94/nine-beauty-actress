import { forwardRef, type ComponentProps } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

import { cn } from 'lib/core/utils';
import { Button } from 'lib/components/button';

import * as styles from './style.css';

export type DialogProps = ComponentProps<typeof DialogPrimitive.Root>;

/**
 * 오버레이 위에 컨텐츠를 표시하는 모달 다이얼로그입니다.
 *
 * @remarks
 * - Radix UI Dialog 기반
 * - DialogTrigger, DialogContent, DialogHeader, DialogFooter 조합으로 구성
 * - 포커스 트래핑과 ESC 닫기 내장
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button>열기</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>제목</DialogTitle>
 *       <DialogDescription>설명</DialogDescription>
 *     </DialogHeader>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
export function Dialog(props: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}
Dialog.displayName = 'Dialog';

export type DialogTriggerProps = ComponentProps<
  typeof DialogPrimitive.Trigger
>;

/** 다이얼로그를 여는 트리거 요소 */
export function DialogTrigger(props: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}
DialogTrigger.displayName = 'DialogTrigger';

export type DialogPortalProps = ComponentProps<
  typeof DialogPrimitive.Portal
>;

/** 다이얼로그를 DOM 트리 외부에 렌더링하는 포탈 */
export function DialogPortal(props: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}
DialogPortal.displayName = 'DialogPortal';

export type DialogCloseProps = ComponentProps<typeof DialogPrimitive.Close>;

/** 다이얼로그를 닫는 트리거 요소 */
export function DialogClose(props: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}
DialogClose.displayName = 'DialogClose';

export type DialogOverlayProps = ComponentProps<
  typeof DialogPrimitive.Overlay
>;

/** 반투명 배경 오버레이 */
export const DialogOverlay = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="dialog-overlay"
    className={cn(styles.dialogOverlay, className)}
    {...props}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

export type DialogContentProps = ComponentProps<
  typeof DialogPrimitive.Content
> & {
  showCloseButton?: boolean;
};

/** 오버레이 위에 표시되는 다이얼로그 본문 */
export const DialogContent = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, showCloseButton = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-slot="dialog-content"
      className={cn(styles.dialogContent, className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          className={styles.dialogCloseButton}
        >
          <XIcon />
          <span className={styles.srOnly}>Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = 'DialogContent';

export type DialogHeaderProps = ComponentProps<'div'>;

/** 제목과 설명을 담는 헤더 영역 */
export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(styles.dialogHeader, className)}
      {...props}
    />
  );
}
DialogHeader.displayName = 'DialogHeader';

export type DialogFooterProps = ComponentProps<'div'> & {
  showCloseButton?: boolean;
};

/** 액션 버튼을 배치하는 푸터 영역 */
export function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(styles.dialogFooter, className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  );
}
DialogFooter.displayName = 'DialogFooter';

export type DialogTitleProps = ComponentProps<
  typeof DialogPrimitive.Title
>;

/** 다이얼로그 제목 */
export const DialogTitle = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    data-slot="dialog-title"
    className={cn(styles.dialogTitle, className)}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

export type DialogDescriptionProps = ComponentProps<
  typeof DialogPrimitive.Description
>;

/** 다이얼로그 부가 설명 */
export const DialogDescription = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="dialog-description"
    className={cn(styles.dialogDescription, className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';
