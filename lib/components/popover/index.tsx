import { forwardRef, type ComponentProps } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from 'lib/core/utils';

import { popoverContent } from './style.css';

export type PopoverProps = ComponentProps<typeof PopoverPrimitive.Root>;

export function Popover(props: PopoverProps) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}
Popover.displayName = 'Popover';

export type PopoverTriggerProps = ComponentProps<
  typeof PopoverPrimitive.Trigger
>;

export function PopoverTrigger(props: PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
  );
}
PopoverTrigger.displayName = 'PopoverTrigger';

export type PopoverContentProps = ComponentProps<
  typeof PopoverPrimitive.Content
>;

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
      className={cn(popoverContent, className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = 'PopoverContent';

export type PopoverAnchorProps = ComponentProps<
  typeof PopoverPrimitive.Anchor
>;

export function PopoverAnchor(props: PopoverAnchorProps) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}
PopoverAnchor.displayName = 'PopoverAnchor';
