import { type ReactNode } from 'react';

import { cn } from 'lib/core/utils';

import { headerContainer, headerContentBox } from './style.css';

export type HeaderProps = {
  /** 컨텐츠 요소를 지정합니다 */
  children: ReactNode;
  /** Header 전체를 감싸고 있는 박스에 대한 스타일을 추가할 때 지정합니다.(외부 스타일링) */
  wrapperStyle?: string;
  /** Header 내부 컨텐츠를 감싸는 박스에 대한 스타일을 추가할 때 지정합니다.(내부 스타일링) */
  boxStyle?: string;
};

/** 페이지 레이아웃의 Header 영역 컨테이너 */
export const Header = ({ children, wrapperStyle, boxStyle }: HeaderProps) => (
  <>
    <header className={cn(headerContainer, wrapperStyle)}>
      <div className={cn(headerContentBox, boxStyle)}>{children}</div>
    </header>
    <div className="mt-14" />
  </>
);

export default Header;
