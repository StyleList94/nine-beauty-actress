import { cn } from 'lib/core/utils';

import type { MouseEventHandler, ReactNode } from 'react';

export type AppearanceSwitchProps = {
  /* 비활성화 상태, 활성화 상태 순서로 노드를 구성해야 합니다. */
  children: [ReactNode, ReactNode];
  /* 커스텀 스타일을 구성할 때 사용합니다. */
  className?: string;
  /* 스위치가 활성화 된 여부를 결정할 때, 사용합니다. */
  isActive?: boolean;
  /* 스위치를 클릭 했을 때 발생되는 이벤트 핸들러를 정의합니다. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

/* 스위치 모양을 내맘대로! */
export const AppearanceSwitch = ({
  children,
  className,
  isActive,
  onClick,
}: AppearanceSwitchProps) => (
  <button
    type="button"
    className={cn(
      'w-8 h-8',
      'flex items-center justify-center text-2xl rounded-lg text-neutral-600',
      className,
    )}
    onClick={onClick}
  >
    {isActive ? children[1] : children[0]}
  </button>
);

export default AppearanceSwitch;
