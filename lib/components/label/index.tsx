import { type ComponentProps } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from 'lib/core/utils';

import { labelBase } from './style.css';

export type LabelProps = ComponentProps<typeof LabelPrimitive.Root>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelBase, className)}
      {...props}
    />
  );
}

Label.displayName = 'Label';
