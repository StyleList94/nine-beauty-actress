import { forwardRef, type ComponentProps } from 'react';

import { cn } from 'lib/core/utils';
import { useFormControlInputProps } from 'lib/components/form-control/context';

import { inputBase } from './style.css';

export type InputProps = ComponentProps<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      id,
      disabled,
      required,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref,
  ) => {
    const fcProps = useFormControlInputProps({
      id,
      disabled,
      required,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedby,
    });

    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(inputBase, className)}
        {...fcProps}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
