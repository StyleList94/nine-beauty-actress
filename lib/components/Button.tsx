import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export const Button = ({ children }: Props) => (
  <button
    type="button"
    className="flex justify-center items-center px-3 py-2 outline-0 border border-gray-400 rounded bg-transparent cursor-pointer"
  >
    {children}
  </button>
);

export default Button;
