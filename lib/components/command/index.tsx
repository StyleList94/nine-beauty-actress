import { type ComponentProps } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { SearchIcon } from 'lucide-react';

import { cn } from 'lib/core/utils';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  type DialogProps,
} from 'lib/components/dialog';

import * as styles from './style.css';

export type CommandProps = ComponentProps<typeof CommandPrimitive>;

export function Command({ className, ...props }: CommandProps) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(styles.commandBase, className)}
      {...props}
    />
  );
}
Command.displayName = 'Command';

export type CommandDialogProps = DialogProps & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
};

export function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogHeader className={styles.commandDialogContent}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(styles.commandDialogContent, className)}
        showCloseButton={showCloseButton}
      >
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}
CommandDialog.displayName = 'CommandDialog';

export type CommandInputProps = ComponentProps<
  typeof CommandPrimitive.Input
>;

export function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <div data-slot="command-input-wrapper" className={styles.commandInputWrapper}>
      <SearchIcon className={styles.commandInputIcon} />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(styles.commandInput, className)}
        {...props}
      />
    </div>
  );
}
CommandInput.displayName = 'CommandInput';

export type CommandListProps = ComponentProps<
  typeof CommandPrimitive.List
>;

export function CommandList({ className, ...props }: CommandListProps) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(styles.commandList, className)}
      {...props}
    />
  );
}
CommandList.displayName = 'CommandList';

export type CommandEmptyProps = ComponentProps<
  typeof CommandPrimitive.Empty
>;

export function CommandEmpty(props: CommandEmptyProps) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={styles.commandEmpty}
      {...props}
    />
  );
}
CommandEmpty.displayName = 'CommandEmpty';

export type CommandGroupProps = ComponentProps<
  typeof CommandPrimitive.Group
>;

export function CommandGroup({ className, ...props }: CommandGroupProps) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(styles.commandGroup, className)}
      {...props}
    />
  );
}
CommandGroup.displayName = 'CommandGroup';

export type CommandSeparatorProps = ComponentProps<
  typeof CommandPrimitive.Separator
>;

export function CommandSeparator({
  className,
  ...props
}: CommandSeparatorProps) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn(styles.commandSeparator, className)}
      {...props}
    />
  );
}
CommandSeparator.displayName = 'CommandSeparator';

export type CommandItemProps = ComponentProps<
  typeof CommandPrimitive.Item
>;

export function CommandItem({ className, ...props }: CommandItemProps) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(styles.commandItem, className)}
      {...props}
    />
  );
}
CommandItem.displayName = 'CommandItem';

export type CommandShortcutProps = ComponentProps<'span'>;

export function CommandShortcut({
  className,
  ...props
}: CommandShortcutProps) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(styles.commandShortcut, className)}
      {...props}
    />
  );
}
CommandShortcut.displayName = 'CommandShortcut';
