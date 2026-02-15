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

/**
 * 검색 기반 커맨드 팔레트입니다.
 *
 * @remarks
 * - cmdk 기반의 검색 + 명령 실행 UI
 * - CommandInput, CommandList, CommandGroup, CommandItem 조합으로 구성
 * - CommandDialog로 모달 형태 지원
 *
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="검색..." />
 *   <CommandList>
 *     <CommandGroup heading="제안">
 *       <CommandItem>항목</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
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

/** Dialog 안에 Command를 렌더링하는 모달 래퍼 */
export function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = false,
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent
        className={cn(styles.commandDialogContent, className)}
        showCloseButton={showCloseButton}
      >
        <DialogHeader className={styles.srOnly}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}
CommandDialog.displayName = 'CommandDialog';

export type CommandInputProps = ComponentProps<typeof CommandPrimitive.Input>;

/** 검색 아이콘이 포함된 텍스트 입력 */
export function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <div
      data-slot="command-input-wrapper"
      className={styles.commandInputWrapper}
    >
      <div className={styles.commandInputGroup}>
        <SearchIcon className={styles.commandInputIcon} />
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(styles.commandInput, className)}
          {...props}
        />
      </div>
    </div>
  );
}
CommandInput.displayName = 'CommandInput';

export type CommandListProps = ComponentProps<typeof CommandPrimitive.List>;

/** 스크롤 가능한 결과 목록 컨테이너 */
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

export type CommandEmptyProps = ComponentProps<typeof CommandPrimitive.Empty>;

/** 검색 결과가 없을 때 표시되는 빈 상태 */
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

export type CommandGroupProps = ComponentProps<typeof CommandPrimitive.Group>;

/** heading으로 관련 항목을 묶는 그룹 */
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

/** 그룹 간 시각적 구분선 */
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

export type CommandItemProps = ComponentProps<typeof CommandPrimitive.Item>;

/** 선택 가능한 개별 명령 항목 */
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

/** 항목 우측에 표시되는 키보드 단축키 텍스트 */
export function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(styles.commandShortcut, className)}
      {...props}
    />
  );
}
CommandShortcut.displayName = 'CommandShortcut';
