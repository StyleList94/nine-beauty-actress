import { forwardRef, type ComponentProps } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';

import { cn } from 'lib/core/utils';
import { useFormControlInputProps } from 'lib/components/form-control/context';

import { checkboxBase, checkboxIndicator } from './style.css';

export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root>;

/**
 * 체크할게 말 안 해도
 *
 * @remarks
 * - Radix UI Checkbox 기반 체크박스
 * - checked / indeterminate 상태 지원
 * - FormControl 연동 (id, disabled, required, aria 자동 전파)
 *
 * @example
 * ```tsx
 * <Checkbox checked={checked} onCheckedChange={setChecked} />
 * ```
 */
export const Checkbox = forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
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
      <CheckboxPrimitive.Root
        ref={ref}
        data-slot="checkbox"
        className={cn(checkboxBase, className)}
        {...fcProps}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className={checkboxIndicator}
        >
          <CheckIcon size={14} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);

Checkbox.displayName = 'Checkbox';
