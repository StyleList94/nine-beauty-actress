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
  /** 날짜 선택 모드 */
  mode: 'single' | 'range';
  /** 현재 선택된 날짜 값 */
  value: Date | DateRange | undefined;
  /** 날짜 값 변경 핸들러 */
  onValueChange: (value: Date | DateRange | undefined) => void;
  /** Popover 열림 상태 */
  open: boolean;
  /** Popover 열림 상태 변경 핸들러 */
  setOpen: (open: boolean) => void;
  /** date-fns 포맷 문자열 */
  formatStr: string;
  /** 비활성화 상태 */
  disabled: boolean;
  /** Clear 버튼 표시 여부 */
  clearable: boolean;
};

const DatePickerContext = createContext<DatePickerContextValue | null>(null);

/** DatePicker 컴파운드 컴포넌트 내부에서 컨텍스트를 가져오는 hook */
function useDatePickerContext() {
  const context = use(DatePickerContext);
  if (!context) {
    throw new Error(
      'DatePicker compound components must be used within <DatePicker>',
    );
  }
  return context;
}

// ── Types ──

type DatePickerSingleProps = {
  /**
   * 날짜 선택 모드
   * @defaultValue 'single'
   */
  mode?: 'single';
  /** 선택된 날짜 */
  value?: Date;
  /** 날짜 변경 시 호출되는 콜백 */
  onValueChange?: (date: Date | undefined) => void;
  /**
   * date-fns 포맷 문자열
   * @defaultValue 'PPP'
   */
  formatStr?: string;
  /**
   * Clear 버튼 표시 여부
   * @defaultValue true
   */
  clearable?: boolean;
  /**
   * 비활성화 상태
   * @defaultValue false
   */
  disabled?: boolean;
  /** Popover 열림 상태 제어 (controlled) */
  open?: boolean;
  /** Popover 열림 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** 서브 컴포넌트 (DatePicker.Input, DatePicker.Calendar 등) */
  children: ReactNode;
};

type DatePickerRangeProps = {
  /** 날짜 범위 선택 모드 */
  mode: 'range';
  /** 선택된 날짜 범위 */
  value?: DateRange;
  /** 날짜 범위 변경 시 호출되는 콜백 */
  onValueChange?: (range: DateRange | undefined) => void;
  /**
   * date-fns 포맷 문자열
   * @defaultValue 'LLL dd, y'
   */
  formatStr?: string;
  /**
   * Clear 버튼 표시 여부
   * @defaultValue true
   */
  clearable?: boolean;
  /**
   * 비활성화 상태
   * @defaultValue false
   */
  disabled?: boolean;
  /** Popover 열림 상태 제어 (controlled) */
  open?: boolean;
  /** Popover 열림 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** 서브 컴포넌트 (DatePicker.Input, DatePicker.Calendar 등) */
  children: ReactNode;
};

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

export type DatePickerInputProps = {
  /**
   * 날짜 미선택 시 표시할 텍스트
   * @defaultValue 'Pick a date'
   */
  placeholder?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** HTML id 속성 (FormControl 연동) */
  id?: string;
  /** 유효성 검사 실패 상태 */
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  /** 접근성 설명 요소 ID */
  'aria-describedby'?: string;
};

export type DatePickerCalendarProps = {
  /** 시간 선택 UI 표시 (single 모드에서만 동작) */
  showTimePicker?: boolean;
  /**
   * Popover 정렬 방향
   * @defaultValue 'start'
   */
  align?: 'start' | 'center' | 'end';
  /** Calendar에 전달할 추가 props (mode, selected, onSelect 제외) */
  calendarProps?: Omit<Partial<CalendarProps>, 'mode' | 'selected' | 'onSelect'>;
  /** 프리셋 패널 등 추가 콘텐츠 (DatePicker.Presets) */
  children?: ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
};

// ── Helpers ──

function formatDisplayText(
  value: Date | DateRange | undefined,
  mode: 'single' | 'range',
  formatStr: string,
): string | null {
  if (!value) return null;

  if (mode === 'range') {
    const { from, to } = value as DateRange;
    if (!from) return null;
    if (!to) return format(from, formatStr);
    return `${format(from, formatStr)} – ${format(to, formatStr)}`;
  }

  return format(value as Date, formatStr);
}

function getInitialTime(
  showTimePicker: boolean | undefined,
  mode: 'single' | 'range',
  value: Date | DateRange | undefined,
): string {
  if (showTimePicker && mode === 'single' && value instanceof Date) {
    return format(value, 'HH:mm');
  }
  return '00:00';
}

function buildCalendarProps(
  mode: 'single' | 'range',
  options: {
    pendingRange: DateRange | undefined;
    onRangeSelect: (range: DateRange | undefined) => void;
    singleValue: Date | undefined;
    onSingleSelect: (date: Date | undefined) => void;
    calendarProps?: Omit<
      Partial<CalendarProps>,
      'mode' | 'selected' | 'onSelect'
    >;
  },
): CalendarProps {
  if (mode === 'range') {
    return {
      ...options.calendarProps,
      mode: 'range' as const,
      selected: options.pendingRange,
      onSelect: options.onRangeSelect,
      numberOfMonths: options.calendarProps?.numberOfMonths ?? 2,
    } as CalendarProps;
  }

  return {
    ...options.calendarProps,
    mode: 'single' as const,
    selected: options.singleValue,
    onSelect: options.onSingleSelect,
  } as CalendarProps;
}

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
 *
 * @see {@link Input} - 트리거 버튼
 * @see {@link DatePickerCalendar} - 캘린더 패널
 * @see {@link Presets} - 프리셋 컨테이너
 * @see {@link Preset} - 개별 프리셋 버튼
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
    (nextValue: Date | DateRange | undefined) => {
      if (mode === 'range') {
        (onValueChange as DatePickerRangeProps['onValueChange'])?.(
          nextValue as DateRange | undefined,
        );
      } else {
        (onValueChange as DatePickerSingleProps['onValueChange'])?.(
          nextValue as Date | undefined,
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

/**
 * Input 스타일의 DatePicker 트리거입니다.
 *
 * @example
 * ```tsx
 * <DatePicker.Input placeholder="날짜를 선택하세요" />
 * ```
 */
function Input({
  placeholder = 'Pick a date',
  className,
  id,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
}: DatePickerInputProps) {
  const context = useDatePickerContext();

  const formControlProps = useFormControlInputProps({
    id,
    disabled: context.disabled,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedby,
  });

  const displayText = useMemo(
    () => formatDisplayText(context.value, context.mode, context.formatStr),
    [context.value, context.mode, context.formatStr],
  );

  const handleClear = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    context.onValueChange(undefined);
  };

  const showClear = context.clearable && context.value;

  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        disableRipple
        data-slot="date-picker-input"
        className={cn(styles.datePickerTrigger, className)}
        {...formControlProps}
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
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ')
                  handleClear(event);
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

/**
 * DatePicker의 팝업 캘린더 패널입니다.
 *
 * @remarks
 * - single 모드: 날짜 선택 시 자동으로 닫힘 (`showTimePicker` 활성화 시 제외)
 * - range 모드: 두 번째 날짜 선택 시 자동으로 닫힘
 * - `showTimePicker`로 시간 선택 UI 추가 가능 (single 모드 전용)
 *
 * @example
 * ```tsx
 * <DatePicker.Calendar showTimePicker align="center" />
 * ```
 *
 * @see {@link Presets} - 날짜 프리셋 패널
 */
function DatePickerCalendar({
  showTimePicker,
  align = 'start',
  calendarProps,
  children,
  className,
}: DatePickerCalendarProps) {
  const context = useDatePickerContext();
  const [time, setTime] = useState(() =>
    getInitialTime(showTimePicker, context.mode, context.value),
  );

  useEffect(() => {
    if (showTimePicker && context.mode === 'single') {
      setTime(getInitialTime(showTimePicker, context.mode, context.value));
    }
  }, [showTimePicker, context.mode, context.value]);

  const applyTime = (date: Date, timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const dateWithTime = new Date(date);
    dateWithTime.setHours(hours, minutes, 0, 0);
    return dateWithTime;
  };

  const handleSingleSelect = (date: Date | undefined) => {
    if (showTimePicker && date) {
      context.onValueChange(applyTime(date, time));
    } else {
      context.onValueChange(date);
      if (date) {
        context.setOpen(false);
      }
    }
  };

  // ── Range: 내부 pending 상태 (완성 전까지 onValueChange 미호출) ──
  const [pendingRange, setPendingRange] = useState<DateRange | undefined>(
    context.mode === 'range'
      ? (context.value as DateRange | undefined)
      : undefined,
  );
  const rangeClickCount = useRef(0);
  const valueRef = useRef(context.value);
  valueRef.current = context.value;

  // 팝오버 열릴 때 최신 value로 pending 상태 초기화
  useEffect(() => {
    if (context.open) {
      setPendingRange(valueRef.current as DateRange | undefined);
      rangeClickCount.current = 0;
    }
  }, [context.open]);

  const handleRangeSelect = (range: DateRange | undefined) => {
    rangeClickCount.current += 1;
    setPendingRange(range);

    if (rangeClickCount.current >= 2) {
      context.onValueChange(range);
      rangeClickCount.current = 0;
      context.setOpen(false);
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setTime(newTime);
    if (context.mode === 'single' && context.value instanceof Date) {
      context.onValueChange(applyTime(context.value, newTime));
    }
  };

  const baseCalendarProps = buildCalendarProps(context.mode, {
    pendingRange,
    onRangeSelect: handleRangeSelect,
    singleValue: context.value as Date | undefined,
    onSingleSelect: handleSingleSelect,
    calendarProps,
  });

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
  /** 프리셋 버튼 목록 (DatePicker.Preset) */
  children: ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
};

/**
 * 날짜 프리셋 버튼 컨테이너입니다.
 *
 * @example
 * ```tsx
 * <DatePicker.Presets>
 *   <DatePicker.Preset label="오늘" value={new Date()} />
 *   <DatePicker.Preset label="어제" value={subDays(new Date(), 1)} />
 * </DatePicker.Presets>
 * ```
 *
 * @see {@link Preset} - 개별 프리셋 버튼
 */
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
  /** 프리셋 버튼에 표시할 텍스트 */
  label: string;
  /** 프리셋 클릭 시 설정할 날짜 값 */
  value: Date | DateRange;
  /** 추가 CSS 클래스 */
  className?: string;
};

/**
 * 개별 날짜 프리셋 버튼입니다.
 *
 * @example
 * ```tsx
 * <DatePicker.Preset label="오늘" value={new Date()} />
 * ```
 */
function Preset({ label, value, className }: DatePickerPresetProps) {
  const context = useDatePickerContext();

  const handleClick = () => {
    context.onValueChange(value);
    context.setOpen(false);
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
