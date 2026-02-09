import { type ComponentProps } from 'react';

import { cn } from 'lib/core/utils';

import { codeBase } from './style.css';

export type CodeProps = ComponentProps<'code'>;

export function Code({ className, children, ...props }: CodeProps) {
  return (
    <code data-slot="code" className={cn(codeBase, className)} {...props}>
      {children}
    </code>
  );
}

Code.displayName = 'Code';
