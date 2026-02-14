import { useState } from 'react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';

import { cn } from 'lib/core/utils';

import { Button } from 'lib/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'lib/components/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'lib/components/popover';

import * as styles from './style.css';

/** 선택 옵션의 값과 라벨을 정의합니다. */
export type ComboboxOption = {
  value: string;
  label: string;
};

export type ComboboxProps = {
  /** 현재 선택된 옵션의 value입니다. */
  value: string;
  /** 옵션 선택 시 호출되는 핸들러입니다. */
  onValueChange: (value: string) => void;
  /** 선택 가능한 옵션 목록입니다. */
  options: ComboboxOption[];
  /** 트리거 버튼의 placeholder를 지정합니다. */
  placeholder?: string;
  /** 검색 입력의 placeholder를 지정합니다. */
  queryPlaceholder?: string;
  /** 트리거 버튼의 커스텀 클래스를 지정합니다. */
  className?: string;
};

/**
 * 검색 가능한 드롭다운 선택 컴포넌트입니다.
 *
 * @remarks
 * - Command + Popover 조합으로 구성
 * - 검색 필터링으로 옵션을 빠르게 탐색
 * - 동일 항목 재선택 시 선택 해제
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState('');
 * <Combobox
 *   value={value}
 *   onValueChange={setValue}
 *   options={[
 *     { value: 'next', label: 'Next.js' },
 *     { value: 'vite', label: 'Vite' },
 *   ]}
 * />
 * ```
 */
export function Combobox({
  value,
  onValueChange,
  options,
  placeholder = 'Select option...',
  queryPlaceholder = 'Search option...',
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(styles.comboboxTrigger, className)}
          disableRipple
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDownIcon size={16} className={styles.comboboxChevronIcon} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={styles.comboboxContent}>
        <Command>
          <CommandInput placeholder={queryPlaceholder} />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange(
                      currentValue === value ? '' : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    size={16}
                    className={
                      value === option.value
                        ? styles.comboboxCheckIcon
                        : styles.comboboxCheckIconHidden
                    }
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

Combobox.displayName = 'Combobox';
