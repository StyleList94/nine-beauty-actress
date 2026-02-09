import { type ComponentProps } from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

export type CollapsibleProps = ComponentProps<
  typeof CollapsiblePrimitive.Root
>;

export function Collapsible(props: CollapsibleProps) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

Collapsible.displayName = 'Collapsible';

export type CollapsibleTriggerProps = ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleTrigger
>;

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

export function CollapsibleContent(props: CollapsibleContentProps) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

CollapsibleContent.displayName = 'CollapsibleContent';
