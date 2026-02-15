import { type ComponentProps, type ReactElement } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { XIcon } from 'lucide-react';

import { cn } from 'lib/core/utils';

import {
  toastRecipe,
  toastViewport,
  toastTitle as toastTitleStyle,
  toastDescription as toastDescriptionStyle,
  toastCloseButton,
  toastAction as toastActionStyle,
  toastContent,
} from './style.css';
import { useToastStore, dismiss, type ToastVariant } from './toast-store';

export type ToastProps = ComponentProps<typeof ToastPrimitive.Root> & {
  variant?: ToastVariant;
};

/** 토스트 알림 항목 */
export function Toast({
  className,
  variant = 'default',
  ref,
  ...props
}: ToastProps) {
  return (
    <ToastPrimitive.Root
      ref={ref}
      data-slot="toast"
      data-variant={variant}
      className={cn(toastRecipe({ variant }), className)}
      {...props}
    />
  );
}

export type ToastTitleProps = ComponentProps<typeof ToastPrimitive.Title>;

/** 토스트 제목 */
export function ToastTitle({ className, ref, ...props }: ToastTitleProps) {
  return (
    <ToastPrimitive.Title
      ref={ref}
      data-slot="toast-title"
      className={cn(toastTitleStyle, className)}
      {...props}
    />
  );
}

export type ToastDescriptionProps = ComponentProps<
  typeof ToastPrimitive.Description
>;

/** 토스트 설명 텍스트 */
export function ToastDescription({
  className,
  ref,
  ...props
}: ToastDescriptionProps) {
  return (
    <ToastPrimitive.Description
      ref={ref}
      data-slot="toast-description"
      className={cn(toastDescriptionStyle, className)}
      {...props}
    />
  );
}

export type ToastCloseProps = ComponentProps<typeof ToastPrimitive.Close>;

/** 토스트 닫기 버튼 */
export function ToastClose({ className, ref, ...props }: ToastCloseProps) {
  return (
    <ToastPrimitive.Close
      ref={ref}
      data-slot="toast-close"
      className={cn(toastCloseButton, className)}
      {...props}
    >
      <XIcon size={14} />
    </ToastPrimitive.Close>
  );
}

export type ToastActionProps = ComponentProps<typeof ToastPrimitive.Action>;

/** 토스트 액션 버튼 */
export function ToastAction({ className, ref, ...props }: ToastActionProps) {
  return (
    <ToastPrimitive.Action
      ref={ref}
      data-slot="toast-action"
      className={cn(toastActionStyle, className)}
      {...props}
    />
  );
}

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
          <div className={toastContent}>
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
        className={toastViewport}
      />
    </ToastPrimitive.Provider>
  );
}

export { toast, dismiss, dismissAll, useToastStore } from './toast-store';
export type { ToastData, ToastVariant } from './toast-store';
