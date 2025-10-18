import { type ReactNode } from 'react';

import button from './style.css';

type Props = {
  children: ReactNode;
};

export const Button = ({ children }: Props) => (
  <button type="button" className={button}>
    {children}
  </button>
);

export default Button;
