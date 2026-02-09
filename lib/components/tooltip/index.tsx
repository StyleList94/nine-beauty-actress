import { type ComponentProps } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from 'lib/core/utils';

import * as styles from './style.css';

export type TooltipProviderProps = ComponentProps<
  typeof TooltipPrimitive.Provider
>;

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

export function TooltipTrigger(props: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
  );
}
TooltipTrigger.displayName = 'TooltipTrigger';

export type TooltipContentProps = ComponentProps<
  typeof TooltipPrimitive.Content
>;

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
