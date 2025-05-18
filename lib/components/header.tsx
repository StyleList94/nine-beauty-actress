import { type ReactNode } from 'react';

import {
  headerContainerStyle,
  headerContentBoxStyle,
} from 'lib/core/styles/layout';
import { cn } from 'lib/core/utils';

export type HeaderProps = {
  /* 컨텐츠 요스를 지정합니다 */
  children: ReactNode;
  /* Header 전체를 감싸고 있는 박스에 대한 스타일을 추가할 때 지정합니다.(외부 스타일링0 */
  wrapperStyle?: string;
  /* Header 내부 컨텐츠를 감싸는 박스에 대한 스타일을 추가할 떄 지정합니다.(내부 스타일링) */
  boxStyle?: string;
};

/* 페이지 레이아웃의 Header 영역 컨테이너 */
export const Header = ({ children, wrapperStyle, boxStyle }: HeaderProps) => (
  <>
    <header className={cn(headerContainerStyle, wrapperStyle)}>
      <div className={cn(headerContentBoxStyle, boxStyle)}>{children}</div>
    </header>
    <div className="mt-14" />
  </>
);

export default Header;
