import type { DateRange } from 'react-day-picker';

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AriaAttributes,
  type ReactNode,
} from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Clock2Icon, XIcon } from 'lucide-react';

import { cn } from 'lib/core/utils';

import { Button } from 'lib/components/button';
import { Calendar, type CalendarProps } from 'lib/components/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'lib/components/popover';
import { TextInput } from 'lib/components/text-input';
import { useFormControlInputProps } from 'lib/components/form-control/context';

import * as styles from './style.css';

// ── Context ──

type DatePickerContextValue = {
  mode: 'single' | 'range';
  value: Date | DateRange | undefined;
  onValueChange: (value: Date | DateRange | undefined) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  formatStr: string;
  disabled: boolean;
  clearable: boolean;
};

const DatePickerContext = createContext<DatePickerContextValue | null>(null);

function useDatePickerContext() {
  const ctx = use(DatePickerContext);
  if (!ctx) {
    throw new Error(
      'DatePicker compound components must be used within <DatePicker>',
    );
  }
  return ctx;
}

// ── Types ──

type DatePickerSingleProps = {
  mode?: 'single';
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  /** date-fns format string. Default: `'PPP'` */
  formatStr?: string;
  /** Clear 버튼 표시 여부. Default: `true` */
  clearable?: boolean;
  disabled?: boolean;
  /** Popover 열림 상태 제어 (controlled) */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
};

type DatePickerRangeProps = {
  mode: 'range';
  value?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  /** date-fns format string. Default: `'LLL dd, y'` */
  formatStr?: string;
  clearable?: boolean;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
};

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

export type DatePickerInputProps = {
  placeholder?: string;
  className?: string;
  id?: string;
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-describedby'?: string;
};

export type DatePickerCalendarProps = {
  /** 시간 선택 UI 표시 */
  showTimePicker?: boolean;
  /** Popover 정렬. Default: `'start'` */
  align?: 'start' | 'center' | 'end';
  /** Calendar에 전달할 추가 props */
  calendarProps?: Partial<CalendarProps>;
  children?: ReactNode;
  className?: string;
};

// ── DatePicker (Root) ──

/**
 * 날짜를 선택할 수 있는 팝업 캘린더 컴포넌트입니다.
 *
 * @remarks
 * - 컴파운드 컴포넌트: `DatePicker.Input`, `DatePicker.Calendar` 조합
 * - single / range 선택 모드 지원
 * - FormControl 통합으로 label, error 상태 자동 연결
 *
 * @example
 * ```tsx
 * <DatePicker value={date} onValueChange={setDate}>
 *   <DatePicker.Input />
 *   <DatePicker.Calendar />
 * </DatePicker>
 * ```
 */
function DatePickerRoot({
  mode = 'single',
  value,
  onValueChange,
  formatStr,
  clearable = true,
  disabled = false,
  open: controlledOpen,
  onOpenChange,
  children,
}: DatePickerProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const defaultFormatStr =
    formatStr ?? (mode === 'range' ? 'LLL dd, y' : 'PPP');

  const handleChange = useCallback(
    (val: Date | DateRange | undefined) => {
      if (mode === 'range') {
        (onValueChange as DatePickerRangeProps['onValueChange'])?.(
          val as DateRange | undefined,
        );
      } else {
        (onValueChange as DatePickerSingleProps['onValueChange'])?.(
          val as Date | undefined,
        );
      }
    },
    [mode, onValueChange],
  );

  const contextValue = useMemo(
    () => ({
      mode,
      value,
      onValueChange: handleChange,
      open,
      setOpen,
      formatStr: defaultFormatStr,
      disabled,
      clearable,
    }),
    [
      mode,
      value,
      handleChange,
      open,
      setOpen,
      defaultFormatStr,
      disabled,
      clearable,
    ],
  );

  return (
    <DatePickerContext value={contextValue}>
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </DatePickerContext>
  );
}

// ── DatePicker.Input ──

/** Input 스타일의 DatePicker 트리거입니다. */
function Input({
  placeholder = 'Pick a date',
  className,
  id,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
}: DatePickerInputProps) {
  const ctx = useDatePickerContext();

  const fcProps = useFormControlInputProps({
    id,
    disabled: ctx.disabled,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedby,
  });

  const displayText = useMemo(() => {
    if (!ctx.value) return null;

    if (ctx.mode === 'range') {
      const range = ctx.value as DateRange;
      if (!range.from) return null;
      if (!range.to) return format(range.from, ctx.formatStr);
      return `${format(range.from, ctx.formatStr)} – ${format(range.to, ctx.formatStr)}`;
    }

    return format(ctx.value as Date, ctx.formatStr);
  }, [ctx.value, ctx.mode, ctx.formatStr]);

  const handleClear = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    ctx.onValueChange(undefined);
  };

  const showClear = ctx.clearable && ctx.value;

  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        disableRipple
        data-slot="date-picker-input"
        className={cn(styles.datePickerTrigger, className)}
        {...fcProps}
      >
        <CalendarIcon size={16} className={styles.datePickerIcon} />
        {displayText ? (
          <span>{displayText}</span>
        ) : (
          <span className={styles.datePickerPlaceholder}>{placeholder}</span>
        )}
        {showClear && (
          <Button asChild variant="ghost" size="icon-xs">
            <span
              className={styles.datePickerClearBtn}
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleClear(e);
              }}
              role="button"
              tabIndex={-1}
              aria-label="Clear date"
            >
              <XIcon size={14} />
            </span>
          </Button>
        )}
      </Button>
    </PopoverTrigger>
  );
}

// ── DatePicker.Calendar ──

/** DatePicker의 팝업 캘린더 패널입니다. */
function DatePickerCalendar({
  showTimePicker,
  align = 'start',
  calendarProps,
  children,
  className,
}: DatePickerCalendarProps) {
  const ctx = useDatePickerContext();
  const [time, setTime] = useState(() => {
    if (!showTimePicker) return '00:00';
    if (ctx.mode === 'single' && ctx.value instanceof Date) {
      return format(ctx.value, 'HH:mm');
    }
    return '00:00';
  });

  const applyTime = (date: Date, timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);
    return result;
  };

  const handleSingleSelect = (date: Date | undefined) => {
    if (showTimePicker && date) {
      ctx.onValueChange(applyTime(date, time));
    } else {
      ctx.onValueChange(date);
      if (date) {
        ctx.setOpen(false);
      }
    }
  };

  // ── Range: 내부 pending 상태 (완성 전까지 onValueChange 미호출) ──
  const [pendingRange, setPendingRange] = useState<DateRange | undefined>(
    ctx.mode === 'range' ? (ctx.value as DateRange | undefined) : undefined,
  );
  const rangeClickCount = useRef(0);

  // 팝오버 열릴 때 ctx.value로 초기화, 닫힐 때 리셋
  useEffect(() => {
    if (ctx.open) {
      setPendingRange(ctx.value as DateRange | undefined);
      rangeClickCount.current = 0;
    }
  }, [ctx.open]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRangeSelect = (range: DateRange | undefined) => {
    rangeClickCount.current += 1;
    setPendingRange(range);

    if (rangeClickCount.current >= 2) {
      ctx.onValueChange(range);
      rangeClickCount.current = 0;
      ctx.setOpen(false);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    if (ctx.mode === 'single' && ctx.value instanceof Date) {
      ctx.onValueChange(applyTime(ctx.value, newTime));
    }
  };

  const baseCalendarProps: CalendarProps =
    ctx.mode === 'range'
      ? ({
          mode: 'range' as const,
          selected: pendingRange,
          onSelect: handleRangeSelect,
          numberOfMonths: calendarProps?.numberOfMonths ?? 2,
          ...calendarProps,
        } as CalendarProps)
      : ({
          mode: 'single' as const,
          selected: ctx.value as Date | undefined,
          onSelect: handleSingleSelect,
          ...calendarProps,
        } as CalendarProps);

  const hasPresets = !!children;
  const needsCardWrap = hasPresets || showTimePicker;

  const calendarNode = (
    <Calendar
      {...baseCalendarProps}
      className={cn(
        needsCardWrap && styles.datePickerCalendarNoBorder,
        baseCalendarProps.className,
      )}
    />
  );

  const timePickerNode = showTimePicker && (
    <div className={styles.datePickerTimePicker}>
      <div className={styles.datePickerTimeInputWrap}>
        <Clock2Icon size={14} className={styles.datePickerTimeIcon} />
        <TextInput
          type="time"
          value={time}
          onChange={handleTimeChange}
          className={styles.datePickerTimeInput}
          data-slot="date-picker-time-input"
        />
      </div>
    </div>
  );

  const calendarWithTime = (
    <div
      className={cn(!hasPresets && needsCardWrap && styles.datePickerCardWrap)}
    >
      {calendarNode}
      {timePickerNode}
    </div>
  );

  return (
    <PopoverContent
      align={align}
      sideOffset={4}
      className={cn(styles.datePickerContent, className)}
    >
      {hasPresets ? (
        <div className={styles.datePickerPanel}>
          {children}
          {calendarWithTime}
        </div>
      ) : (
        calendarWithTime
      )}
    </PopoverContent>
  );
}

// ── DatePicker.Presets ──

export type DatePickerPresetsProps = {
  children: ReactNode;
  className?: string;
};

/** 날짜 프리셋 버튼 컨테이너입니다. */
function Presets({ children, className }: DatePickerPresetsProps) {
  return (
    <div
      data-slot="date-picker-presets"
      className={cn(styles.datePickerPresets, className)}
    >
      {children}
    </div>
  );
}

// ── DatePicker.Preset ──

export type DatePickerPresetProps = {
  label: string;
  value: Date | DateRange;
  className?: string;
};

/** 개별 날짜 프리셋 버튼입니다. */
function Preset({ label, value, className }: DatePickerPresetProps) {
  const ctx = useDatePickerContext();

  const handleClick = () => {
    ctx.onValueChange(value);
    ctx.setOpen(false);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      disableRipple
      data-slot="date-picker-preset"
      className={cn(styles.datePickerPresetBtn, className)}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
}

// ── Export ──

export type { DateRange };

/**
 * 날짜를 선택할 수 있는 팝업 캘린더 컴포넌트입니다.
 *
 * @remarks
 * - 컴파운드 컴포넌트: `DatePicker.Input`, `DatePicker.Calendar` 조합
 * - single / range 선택 모드 지원
 * - FormControl 통합으로 label, error 상태 자동 연결
 *
 * @example
 * ```tsx
 * <DatePicker value={date} onValueChange={setDate}>
 *   <DatePicker.Input />
 *   <DatePicker.Calendar />
 * </DatePicker>
 * ```
 */
export const DatePicker = Object.assign(DatePickerRoot, {
  Input,
  Calendar: DatePickerCalendar,
  Presets,
  Preset,
});
