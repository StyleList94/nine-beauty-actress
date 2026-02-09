import { forwardRef, type ComponentProps } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';

import { cn } from 'lib/core/utils';

import { checkboxBase, checkboxIndicator } from './style.css';

export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root>;

export const Checkbox = forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(checkboxBase, className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className={checkboxIndicator}
    >
      <CheckIcon size={14} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = 'Checkbox';
