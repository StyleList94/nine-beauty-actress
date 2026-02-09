import { forwardRef, type ComponentProps } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

import { cn } from 'lib/core/utils';

import * as styles from './style.css';

export type DialogProps = ComponentProps<typeof DialogPrimitive.Root>;

export function Dialog(props: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}
Dialog.displayName = 'Dialog';

export type DialogTriggerProps = ComponentProps<
  typeof DialogPrimitive.Trigger
>;

export function DialogTrigger(props: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}
DialogTrigger.displayName = 'DialogTrigger';

export type DialogPortalProps = ComponentProps<
  typeof DialogPrimitive.Portal
>;

export function DialogPortal(props: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}
DialogPortal.displayName = 'DialogPortal';

export type DialogCloseProps = ComponentProps<typeof DialogPrimitive.Close>;

export function DialogClose(props: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}
DialogClose.displayName = 'DialogClose';

export type DialogOverlayProps = ComponentProps<
  typeof DialogPrimitive.Overlay
>;

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
          <XIcon size={16} />
          <span className={styles.srOnly}>Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = 'DialogContent';

export type DialogHeaderProps = ComponentProps<'div'>;

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

export type DialogFooterProps = ComponentProps<'div'>;

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(styles.dialogFooter, className)}
      {...props}
    />
  );
}
DialogFooter.displayName = 'DialogFooter';

export type DialogTitleProps = ComponentProps<
  typeof DialogPrimitive.Title
>;

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
