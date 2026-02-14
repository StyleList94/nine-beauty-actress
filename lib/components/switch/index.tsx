import type { ReactNode } from 'react';

import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from 'lib/core/utils';

import {
  switchTrack,
  switchThumb,
  switchIconBase,
  switchIconChecked,
  switchIconUnchecked,
  type SwitchVariants,
} from './style.css';

export type SwitchProps = {
  /** 비활성화 상태, 활성화 상태 순서로 노드를 구성해야 합니다. */
  children?: [ReactNode, ReactNode];
  /** 스위치 트랙에 대한 커스텀 스타일을 구성할 때 사용합니다. */
  trackClassName?: string;
  /** 스위치 버튼에 대한 커스텀 스타일을 구성할 때 사용합니다. */
  thumbClassName?: string;
  /** 스위치 트랙 아이콘에 대한 커스텀 스타일을 구성할 때 사용합니다. */
  iconClassName?: string;
  /** 스위치가 활성화 된 여부를 결정할 때, 사용합니다. */
  isChecked?: boolean;
  /** 스위치를 클릭 했을 때 발생되는 이벤트 핸들러를 정의합니다. */
  onCheckedChange?: (checked: boolean) => void;
  /** 스위치 크기를 지정합니다. */
  size?: NonNullable<SwitchVariants>['size'];
};

/** 스위치 모양을 내맘대로! */
export const Switch = ({
  children,
  trackClassName,
  thumbClassName,
  iconClassName,
  isChecked,
  onCheckedChange,
  size,
}: SwitchProps) => (
  <SwitchPrimitive.Root
    data-slot="switch"
    data-size={size}
    className={cn(switchTrack({ size }), trackClassName)}
    checked={isChecked}
    onCheckedChange={onCheckedChange}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(switchThumb({ size }), thumbClassName)}
    />
    {children && (
      <span
        className={cn(
          switchIconBase,
          isChecked ? switchIconChecked : switchIconUnchecked,
          iconClassName,
        )}
      >
        {isChecked ? children[1] : children[0]}
      </span>
    )}
  </SwitchPrimitive.Root>
);

export default Switch;
