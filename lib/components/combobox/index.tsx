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

export type ComboboxOption = {
  value: string;
  label: string;
};

export type ComboboxProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  queryPlaceholder?: string;
  className?: string;
};

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
