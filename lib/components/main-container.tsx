import { type ReactNode } from 'react';

import { backdropStyle, mainContainerStyle } from 'lib/core/styles/layout';
import { cn } from 'lib/core/utils';

export type MainContainerProps = {
  /* 본문에 해당하는 컨텐츠 요소를 렌더링 합니다. */
  children: ReactNode;
  /* main 요소의 스타일을 추가지정할 때 지정합니다. */
  className?: string;
  /* 배경 요소의 스타일을 추가지정할 때 지정합니다. */
  backdropClassName?: string;
};

/* 페이지 레이아웃의 본문 컨텐츠 영역 컨테이너 */
export const MainContainer = ({
  children,
  className,
  backdropClassName,
}: MainContainerProps) => (
  <>
    <div className={cn(backdropStyle, backdropClassName)} />
    <main className={cn(mainContainerStyle, className)}>{children}</main>
  </>
);

export default MainContainer;
