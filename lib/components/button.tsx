'use client';

import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export const Button = ({ children }: Props) => (
  <button
    type="button"
    className="flex justify-center items-center px-3 py-2 outline-0 border border-zinc-400 rounded-sm bg-transparent cursor-pointer dark:text-zinc-100"
  >
    {children}
  </button>
);

export default Button;
