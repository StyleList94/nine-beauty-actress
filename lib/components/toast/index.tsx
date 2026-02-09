import { forwardRef, type ComponentProps, type ReactElement } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { XIcon } from 'lucide-react';

import { cn } from 'lib/core/utils';

import * as styles from './style.css';
import { useToastStore, type ToastVariant } from './toast-store';

export type ToastProps = ComponentProps<typeof ToastPrimitive.Root> & {
  variant?: ToastVariant;
};

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

export type ToastActionProps = ComponentProps<
  typeof ToastPrimitive.Action
>;

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

export function Toaster(): ReactElement {
  const toasts = useToastStore();

  return (
    <ToastPrimitive.Provider>
      {toasts.map((t) => (
        <Toast key={t.id} variant={t.variant} duration={t.duration}>
          <div>
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
