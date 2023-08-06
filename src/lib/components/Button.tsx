import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export const Button = ({ children }: Props) => (
  <button
    type="button"
    className="flex justify-center items-center outline-0 border-0 bg-transparent cursor-pointer"
  >
    {children}
  </button>
);

export default Button;
