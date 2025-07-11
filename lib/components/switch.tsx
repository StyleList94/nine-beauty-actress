import type { ReactNode } from 'react';

import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from 'lib/core/utils';

export type SwitchProps = {
  /* 비활성화 상태, 활성화 상태 순서로 노드를 구성해야 합니다. */
  children?: [ReactNode, ReactNode];
  /* 스위치 트랙에 대한 커스텀 스타일을 구성할 때 사용합니다. */
  trackClassName?: string;
  /* 스위치 버튼에 대한 커스텀 스타일을 구성할 때 사용합니다. */
  thumbClassName?: string;
  /* 스위치 트랙 아이콘에 대한 커스텀 스타일을 구성할 때 사용합니다. */
  iconClassName?: string;
  /* 스위치가 활성화 된 여부를 결정할 때, 사용합니다. */
  isChecked?: boolean;
  /* 스위치를 클릭 했을 때 발생되는 이벤트 핸들러를 정의합니다. */
  onCheckedChange?: (checked: boolean) => void;
};

/* 스위치 모양을 내맘대로! */
export const Switch = ({
  children,
  trackClassName,
  thumbClassName,
  iconClassName,
  isChecked,
  onCheckedChange,
}: SwitchProps) => (
  <SwitchPrimitive.Root
    data-slot="switch"
    className={cn(
      'relative peer bg-zinc-100/80 focus-visible:border-gray-300 focus-visible:ring-gray-300/50 inline-flex h-6 w-12 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all ease-in-out duration-200 outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50',
      'dark:bg-zinc-800/80 dark:focus-visible:border-gray-700 dark:focus-visible:ring-gray-700/50',
      trackClassName,
    )}
    checked={isChecked}
    onCheckedChange={onCheckedChange}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        'flex justify-center items-center bg-zinc-50 text-zinc-600 border border-zinc-200/80 pointer-events-none size-6 rounded-full ring-0 transition-transform ease-in-out duration-200 data-[state=checked]:translate-x-[calc(100%)] data-[state=unchecked]:translate-x-0',
        'dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700/80',
        thumbClassName,
      )}
    />
    {children && (
      <span
        className={cn(
          'absolute left-1 text-zinc-700 dark:text-zinc-300 transition-transform translate-x-[calc(100%+0.375rem)]',
          isChecked && 'translate-x-0',
          iconClassName,
        )}
      >
        {isChecked ? children[1] : children[0]}
      </span>
    )}
  </SwitchPrimitive.Root>
);

export default Switch;
