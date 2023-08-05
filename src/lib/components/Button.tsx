import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export const Button = ({ children }: Props) => (
  <button type="button">{children}</button>
);

export default Button;
