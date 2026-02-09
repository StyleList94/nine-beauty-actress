import { forwardRef, type ComponentProps } from 'react';

import { cn } from 'lib/core/utils';

import { inputBase } from './style.css';

export type InputProps = ComponentProps<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(inputBase, className)}
      {...props}
    />
  ),
);

Input.displayName = 'Input';
