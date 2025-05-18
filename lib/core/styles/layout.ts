import { cn } from '../utils';

export const headerContainerStyle = cn(
  'fixed top-0 left-0 flex w-full h-14 z-10',
  'border-b border-b-neutral-200/80 dark:border-b-neutral-700/80',
  'bg-white dark:bg-neutral-900',
  'transition ease-in-out duration-200',
);

export const headerContentBoxStyle = cn(
  'flex items-center w-full px-6 py-3 mx-auto',
);

export const backdropStyle = cn(
  'fixed inset-0 z-[-1]',
  'transition ease-in-out duration-200',
  'bg-white dark:bg-neutral-900',
);

export const mainContainerStyle = cn(
  'min-h-[calc(100vh-3.5rem-10rem)] mx-auto my-0 p-6 text-black dark:text-white',
  'sm:min-h-[calc(100vh-4rem-8rem)]',
);

export const footerContainerStyle = cn(
  'flex flex-col gap-6 w-full max-w-[96rem] mx-auto px-6 py-8',
);
