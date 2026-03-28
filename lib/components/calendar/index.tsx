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

type DayPickerProps = ComponentProps<typeof DayPicker>;

type CalendarDocumentedProps = {
  /**
   * 현재 월 외 날짜 표시 여부
   * @defaultValue true
   */
  showOutsideDays?: boolean;
  /**
   * 캡션 헤더 레이아웃
   * @defaultValue 'label'
   */
  captionLayout?: DayPickerProps['captionLayout'];
  /** 추가 CSS 클래스 */
  className?: string;
  /** 개별 요소별 CSS 클래스 오버라이드 */
  classNames?: DayPickerProps['classNames'];
  /** 날짜 표시 포맷터 */
  formatters?: DayPickerProps['formatters'];
  /** 커스텀 렌더링 컴포넌트 */
  components?: DayPickerProps['components'];
};

/**
 * Calendar 컴포넌트의 props
 *
 * @remarks
 * react-day-picker의 DayPicker props를 기반으로 하며,
 * Calendar가 직접 처리하는 props(`showOutsideDays`, `captionLayout` 등)에
 * 대한 한국어 설명이 포함되어 있습니다.
 */
export type CalendarProps = DayPickerProps & CalendarDocumentedProps;

export type {
  /** 날짜 범위 선택 결과 (`{ from, to }`) */
  DateRange,
  /** 커스텀 날짜 버튼 컴포넌트의 props */
  DayButtonProps,
} from 'react-day-picker';

const defaultClassNames = getDefaultClassNames();

/** 월 네비게이션 및 드롭다운에 사용되는 화살표 아이콘 컴포넌트 */
function Chevron({ className, orientation, ...rest }: ChevronProps) {
  if (orientation === 'left')
    return <ChevronLeftIcon className={className} {...rest} />;

  if (orientation === 'right')
    return <ChevronRightIcon className={className} {...rest} />;

  return <ChevronDownIcon className={className} {...rest} />;
}

const baseClassNames: Record<string, string> = {
  [UI.Root]: cn(defaultClassNames.root),
  [UI.Months]: cn(styles.months, defaultClassNames.months),
  [UI.Month]: cn(styles.month, defaultClassNames.month),
  [UI.MonthCaption]: cn(styles.monthCaption, defaultClassNames.month_caption),
  [UI.CaptionLabel]: cn(styles.captionLabel, defaultClassNames.caption_label),
  [UI.Dropdowns]: cn(styles.dropdowns, defaultClassNames.dropdowns),
  [UI.DropdownRoot]: cn(styles.dropdownRoot, defaultClassNames.dropdown_root),
  [UI.Dropdown]: cn(styles.dropdown, defaultClassNames.dropdown),
  [UI.Nav]: cn(styles.nav, defaultClassNames.nav),
  [UI.PreviousMonthButton]: cn(
    styles.navButton,
    defaultClassNames.button_previous,
  ),
  [UI.NextMonthButton]: cn(styles.navButton, defaultClassNames.button_next),
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
  [SelectionState.range_end]: cn(styles.rangeEnd, defaultClassNames.range_end),
  [DayFlag.today]: cn(styles.today, defaultClassNames.today),
  [DayFlag.outside]: cn(styles.outside, defaultClassNames.outside),
  [DayFlag.disabled]: cn(styles.disabled, defaultClassNames.disabled),
  [DayFlag.hidden]: cn(styles.hidden, defaultClassNames.hidden),
  [UI.WeekNumber]: cn(styles.weekNumber, defaultClassNames.week_number),
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
 * - `--nine-calendar-cell-size` CSS 변수로 셀 크기 커스텀 가능 (기본값: `2rem`)
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
    const consumerClassNames = classNames as Record<string, string>;
    return Object.fromEntries(
      Object.keys({ ...baseClassNames, ...consumerClassNames }).map((key) => [
        key,
        cn(baseClassNames[key], consumerClassNames[key]),
      ]),
    );
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
