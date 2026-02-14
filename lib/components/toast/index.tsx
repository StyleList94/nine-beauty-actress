import { forwardRef, type ComponentProps, type ReactElement } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { XIcon } from 'lucide-react';

import { cn } from 'lib/core/utils';

import * as styles from './style.css';
import { useToastStore, dismiss, type ToastVariant } from './toast-store';

export type ToastProps = ComponentProps<typeof ToastPrimitive.Root> & {
  variant?: ToastVariant;
};

/** 토스트 알림 항목 */
export const Toast = forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant = 'default', ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    data-slot="toast"
    className={cn(styles.toastBase, styles.toastVariant[variant], className)}
    {...props}
  />
));
Toast.displayName = 'Toast';

export type ToastTitleProps = ComponentProps<typeof ToastPrimitive.Title>;

/** 토스트 제목 */
export const ToastTitle = forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Title>,
  ToastTitleProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    data-slot="toast-title"
    className={cn(styles.toastTitle, className)}
    {...props}
  />
));
ToastTitle.displayName = 'ToastTitle';

export type ToastDescriptionProps = ComponentProps<
  typeof ToastPrimitive.Description
>;

/** 토스트 설명 텍스트 */
export const ToastDescription = forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Description>,
  ToastDescriptionProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    data-slot="toast-description"
    className={cn(styles.toastDescription, className)}
    {...props}
  />
));
ToastDescription.displayName = 'ToastDescription';

export type ToastCloseProps = ComponentProps<typeof ToastPrimitive.Close>;

/** 토스트 닫기 버튼 */
export const ToastClose = forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Close>,
  ToastCloseProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    data-slot="toast-close"
    className={cn(styles.toastCloseButton, className)}
    {...props}
  >
    <XIcon size={14} />
  </ToastPrimitive.Close>
));
ToastClose.displayName = 'ToastClose';

export type ToastActionProps = ComponentProps<typeof ToastPrimitive.Action>;

/** 토스트 액션 버튼 */
export const ToastAction = forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Action>,
  ToastActionProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    data-slot="toast-action"
    className={cn(styles.toastAction, className)}
    {...props}
  />
));
ToastAction.displayName = 'ToastAction';

/**
 * 토스트 알림을 화면에 렌더링하는 프로바이더 컴포넌트입니다.
 *
 * @remarks
 * - toast() 함수로 알림을 트리거하고 Toaster가 렌더링
 * - default, destructive 두 가지 variant 지원
 * - 스와이프로 해제 가능
 *
 * @example
 * ```tsx
 * // 앱 루트에 Toaster 배치
 * <Toaster />
 *
 * // 어디서든 toast() 호출
 * toast({ title: '저장 완료', description: '변경사항이 저장되었습니다.' })
 * ```
 */
export function Toaster(): ReactElement {
  const toasts = useToastStore();

  return (
    <ToastPrimitive.Provider>
      {toasts.map((t) => (
        <Toast
          key={t.id}
          open={t.open}
          variant={t.variant}
          duration={t.duration}
          onOpenChange={(open) => {
            if (!open) dismiss(t.id);
          }}
        >
          <div className={styles.toastContent}>
            {t.title && <ToastTitle>{t.title}</ToastTitle>}
            {t.description && (
              <ToastDescription>{t.description}</ToastDescription>
            )}
          </div>
          {t.action}
          <ToastClose />
        </Toast>
      ))}
      <ToastPrimitive.Viewport
        data-slot="toast-viewport"
        className={styles.toastViewport}
      />
    </ToastPrimitive.Provider>
  );
}
Toaster.displayName = 'Toaster';

export { toast, dismiss, dismissAll, useToastStore } from './toast-store';
export type { ToastData, ToastVariant } from './toast-store';
