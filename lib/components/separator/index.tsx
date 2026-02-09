import { type ComponentProps } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from 'lib/core/utils';

import { separatorBase } from './style.css';

export type SeparatorProps = ComponentProps<typeof SeparatorPrimitive.Root>;

export function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorBase, className)}
      {...props}
    />
  );
}

Separator.displayName = 'Separator';
