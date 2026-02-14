import { forwardRef, type ComponentProps } from 'react';

import { cn } from 'lib/core/utils';
import { useFormControlInputProps } from 'lib/components/form-control/context';

import { inputBase } from './style.css';

export type TextInputProps = ComponentProps<'input'>;

/**
 * 텍스트를 입력해줘
 *
 * @remarks
 * - 텍스트 입력에 최적화된 단일 라인 입력 필드
 * - FormControl 연동 (id, disabled, required, aria 자동 전파)
 * - 포커스 링, 유효성 상태, 파일 업로드 버튼 스타일 내장
 *
 * @example
 * ```tsx
 * <TextInput placeholder="이메일을 입력하세요" />
 * ```
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
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

TextInput.displayName = 'TextInput';
