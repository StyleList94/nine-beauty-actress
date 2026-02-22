import { type ComponentProps, useMemo } from 'react';
import {
  DayPicker,
  getDefaultClassNames,
  UI,
  DayFlag,
  SelectionState,
  type ChevronProps,
} from 'react-day-picker';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';

import { cn } from 'lib/core/utils';

import * as styles from './style.css';

export type CalendarProps = ComponentProps<typeof DayPicker>;

export type {
  DateRange,
  DayButtonProps,
} from 'react-day-picker';

const defaultClassNames = getDefaultClassNames();

function Chevron({ className, orientation, ...rest }: ChevronProps) {
  if (orientation === 'left') {
    return <ChevronLeftIcon className={className} {...rest} />;
  }
  if (orientation === 'right') {
    return <ChevronRightIcon className={className} {...rest} />;
  }
  return <ChevronDownIcon className={className} {...rest} />;
}

const baseClassNames: Record<string, string> = {
  [UI.Root]: cn(defaultClassNames.root),
  [UI.Months]: cn(styles.months, defaultClassNames.months),
  [UI.Month]: cn(styles.month, defaultClassNames.month),
  [UI.MonthCaption]: cn(
    styles.monthCaption,
    defaultClassNames.month_caption,
  ),
  [UI.CaptionLabel]: cn(
    styles.captionLabel,
    defaultClassNames.caption_label,
  ),
  [UI.Dropdowns]: cn(styles.dropdowns, defaultClassNames.dropdowns),
  [UI.DropdownRoot]: cn(
    styles.dropdownRoot,
    defaultClassNames.dropdown_root,
  ),
  [UI.Dropdown]: cn(styles.dropdown, defaultClassNames.dropdown),
  [UI.Nav]: cn(styles.nav, defaultClassNames.nav),
  [UI.PreviousMonthButton]: cn(
    styles.navButton,
    defaultClassNames.button_previous,
  ),
  [UI.NextMonthButton]: cn(
    styles.navButton,
    defaultClassNames.button_next,
  ),
  [UI.MonthGrid]: cn(styles.monthGrid),
  [UI.Weekdays]: cn(styles.weekdays, defaultClassNames.weekdays),
  [UI.Weekday]: cn(styles.weekday, defaultClassNames.weekday),
  [UI.Weeks]: cn(styles.weeks),
  [UI.Week]: cn(styles.week, defaultClassNames.week),
  [UI.Day]: cn(styles.day, defaultClassNames.day),
  [UI.DayButton]: cn(styles.dayButton, defaultClassNames.day_button),
  [SelectionState.range_start]: cn(
    styles.rangeStart,
    defaultClassNames.range_start,
  ),
  [SelectionState.range_middle]: cn(
    styles.rangeMiddle,
    defaultClassNames.range_middle,
  ),
  [SelectionState.range_end]: cn(
    styles.rangeEnd,
    defaultClassNames.range_end,
  ),
  [DayFlag.today]: cn(styles.today, defaultClassNames.today),
  [DayFlag.outside]: cn(styles.outside, defaultClassNames.outside),
  [DayFlag.disabled]: cn(styles.disabled, defaultClassNames.disabled),
  [DayFlag.hidden]: cn(styles.hidden, defaultClassNames.hidden),
  [UI.WeekNumber]: cn(
    styles.weekNumber,
    defaultClassNames.week_number,
  ),
  [UI.WeekNumberHeader]: cn(
    styles.weekNumberHeader,
    defaultClassNames.week_number_header,
  ),
};

/**
 * 날짜를 선택할 수 있는 캘린더 컴포넌트입니다.
 *
 * @remarks
 * - react-day-picker v9 기반의 캘린더
 * - single, multiple, range 선택 모드 지원
 * - 키보드 네비게이션 및 접근성 지원
 *
 * @example
 * ```tsx
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 * />
 * ```
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  formatters,
  components,
  ...props
}: CalendarProps) {
  const mergedClassNames = useMemo(() => {
    if (!classNames) return baseClassNames;
    const consumer = classNames as Record<string, string>;
    const merged: Record<string, string> = {};
    const allKeys = new Set([
      ...Object.keys(baseClassNames),
      ...Object.keys(consumer),
    ]);
    for (const key of allKeys) {
      merged[key] = cn(baseClassNames[key], consumer[key]);
    }
    return merged;
  }, [classNames]);

  const mergedFormatters = useMemo(
    () => ({
      formatMonthDropdown: (date: Date) =>
        date.toLocaleString('default', { month: 'short' }),
      ...formatters,
    }),
    [formatters],
  );

  const mergedComponents = useMemo(
    () => (components ? { Chevron, ...components } : { Chevron }),
    [components],
  );

  return (
    <DayPicker
      data-slot="calendar"
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn(styles.calendar, className)}
      formatters={mergedFormatters}
      classNames={mergedClassNames}
      components={mergedComponents}
      {...props}
    />
  );
}
