import { type ReactNode } from 'react';

import { cn } from 'lib/core/utils';

import footer from './style.css';

export type FooterProps = {
  /** 컨텐츠 요소를 렌더링 합니다. */
  children: ReactNode;
  /** footer 요소의 스타일을 추가지정할 때 지정합니다. */
  className?: string;
};

/** 페이지 레이아웃의 Footer 영역 컨테이너 */
export const Footer = ({ children, className }: FooterProps) => (
  <footer className={cn(footer, className)}>{children}</footer>
);

export default Footer;
