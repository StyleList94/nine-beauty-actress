import type { ReactNode } from 'react';

import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from 'lib/core/utils';
import { useFormControlInputProps } from 'lib/components/form-control/context';

import {
  switchTrack,
  switchThumb,
  switchIconBase,
  switchIconChecked,
  switchIconUnchecked,
  type SwitchVariants,
} from './style.css';

export type SwitchProps = {
  /** 비활성화 상태, 활성화 상태 순서로 아이콘을 구성합니다. */
  children?: [ReactNode, ReactNode];
  /** 스위치 활성화 여부를 결정합니다. */
  checked?: boolean;
  /** 스위치를 클릭했을 때 호출되는 핸들러입니다. */
  onCheckedChange?: (checked: boolean) => void;
  /** 스위치 크기를 지정합니다. */
  size?: NonNullable<SwitchVariants>['size'];
  /** 스위치를 비활성화합니다. */
  disabled?: boolean;
  /** HTML id 속성 */
  id?: string;
  /** 필수 입력 여부 */
  required?: boolean;
  /** aria-invalid 속성 */
  'aria-invalid'?: boolean;
  /** aria-describedby 속성 */
  'aria-describedby'?: string;
  /** 트랙(루트)에 대한 커스텀 클래스를 지정합니다. */
  className?: string;
  /** 썸(버튼)에 대한 커스텀 클래스를 지정합니다. */
  thumbClassName?: string;
  /** 아이콘에 대한 커스텀 클래스를 지정합니다. */
  iconClassName?: string;
};

/** 스위치 모양을 내맘대로! */
export const Switch = ({
  children,
  checked,
  onCheckedChange,
  size,
  disabled,
  id,
  required,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
  className,
  thumbClassName,
  iconClassName,
}: SwitchProps) => {
  const fcProps = useFormControlInputProps({
    id,
    disabled,
    required,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedby,
  });

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(switchTrack({ size }), className)}
      checked={checked}
      onCheckedChange={onCheckedChange}
      {...fcProps}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(switchThumb({ size }), thumbClassName)}
      />
      {children && (
        <span
          className={cn(
            switchIconBase,
            checked ? switchIconChecked : switchIconUnchecked,
            iconClassName,
          )}
        >
          {checked ? children[1] : children[0]}
        </span>
      )}
    </SwitchPrimitive.Root>
  );
};

export default Switch;
