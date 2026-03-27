import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { CalendarIcon, Clock2Icon } from 'lucide-react';

import {
  Calendar,
  type DateRange,
  type DayButtonProps,
} from 'lib/components/calendar';
import { cn } from 'lib/core/utils';
import { Button } from 'lib/components/button';
import { Card, CardContent, CardFooter } from 'lib/components/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'lib/components/popover';
import { FormControl } from 'lib/components/form-control';
import { TextInput } from 'lib/components/text-input';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'UI/Calendar',
  tags: ['autodocs'],
  argTypes: {
    // -- Common --
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
      description: '선택 모드를 지정합니다',
      table: {
        category: 'Common',
        type: { summary: "'single' | 'multiple' | 'range'" },
        defaultValue: { summary: 'single' },
      },
    },
    showOutsideDays: {
      control: 'boolean',
      description: '이전/다음 달의 날짜를 표시합니다',
      table: {
        category: 'Common',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown'],
      description: '캡션 레이아웃을 지정합니다',
      table: {
        category: 'Common',
        type: { summary: "'label' | 'dropdown'" },
        defaultValue: { summary: 'label' },
      },
    },
    numberOfMonths: {
      control: 'number',
      description: '표시할 월 수를 지정합니다',
      table: {
        category: 'Common',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    fixedWeeks: {
      control: 'boolean',
      description: '항상 6주를 표시합니다',
      table: {
        category: 'Common',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showWeekNumber: {
      control: 'boolean',
      description: '주 번호를 표시합니다',
      table: {
        category: 'Common',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: false,
      description: '비활성화할 날짜를 지정합니다',
      table: {
        category: 'Common',
        type: { summary: 'Matcher | Matcher[]' },
      },
    },
    defaultMonth: {
      control: false,
      description: '초기 표시 월을 지정합니다',
      table: {
        category: 'Common',
        type: { summary: 'Date' },
      },
    },
    classNames: {
      control: false,
      description: '내부 요소에 커스텀 클래스를 적용합니다',
      table: {
        category: 'Common',
        type: { summary: 'Partial<ClassNames>' },
      },
    },
    components: {
      control: false,
      description: '내부 컴포넌트를 커스텀 컴포넌트로 교체합니다',
      table: {
        category: 'Common',
        type: { summary: 'Partial<Components>' },
      },
    },
    className: {
      control: false,
      description: '루트 요소에 추가 클래스를 적용합니다',
      table: {
        category: 'Common',
        type: { summary: 'string' },
      },
    },
    // -- Single Mode --
    selected: {
      control: false,
      description: 'single: `Date`, multiple: `Date[]`, range: `DateRange`',
      table: {
        category: 'Single Mode',
        type: { summary: 'Date | undefined' },
      },
    },
    onSelect: {
      control: false,
      description: '날짜가 선택될 때 호출되는 콜백입니다',
      table: {
        category: 'Single Mode',
        type: { summary: 'OnSelectHandler<Date | undefined>' },
      },
    },
    required: {
      control: 'boolean',
      description:
        '`true`이면 선택 해제가 불가합니다 (single, multiple, range 공통)',
      table: {
        category: 'Single Mode',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    // -- Multiple Mode --
    // selected, onSelect — 타입만 다름 (docs에서 Single Mode 참조)
    min: {
      control: 'number',
      description: '최소 선택 일수입니다 (multiple, range)',
      table: {
        category: 'Multiple Mode',
        type: { summary: 'number' },
      },
    },
    max: {
      control: 'number',
      description: '최대 선택 일수입니다 (multiple, range)',
      table: {
        category: 'Multiple Mode',
        type: { summary: 'number' },
      },
    },
    // -- Range Mode --
    excludeDisabled: {
      control: 'boolean',
      description: '`true`이면 disabled 날짜가 포함될 때 범위를 리셋합니다',
      table: {
        category: 'Range Mode',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '날짜를 선택할 수 있는 캘린더 컴포넌트입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

const timeInputStyle =
  'pl-8! appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none';

function PriceDayButton({
  children,
  modifiers,
  day,
  ...props
}: DayButtonProps) {
  const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;

  return (
    <button
      type="button"
      {...props}
      className={cn(props.className, 'flex-col gap-0')}
    >
      {children}
      {!modifiers.outside && (
        <span className="block text-[0.625rem] leading-none opacity-70">
          {isWeekend ? '$120' : '$100'}
        </span>
      )}
    </button>
  );
}

export const Default: Story = {
  args: {
    mode: 'single',
    showOutsideDays: true,
    captionLayout: 'label' as const,
    numberOfMonths: 1,
    fixedWeeks: false,
    showWeekNumber: false,
  },
  render: function Render(args) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [dates, setDates] = useState<Date[] | undefined>([new Date()]);
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });

    if (args.mode === 'range')
      return (
        <Calendar {...args} mode="range" selected={range} onSelect={setRange} />
      );

    if (args.mode === 'multiple')
      return (
        <Calendar
          {...args}
          mode="multiple"
          selected={dates}
          onSelect={setDates}
        />
      );

    return (
      <Calendar {...args} mode="single" selected={date} onSelect={setDate} />
    );
  },
};

export const Range: Story = {
  ...noControls('범위 선택 모드로 시작일과 종료일을 선택할 수 있습니다.'),
  render: function Render() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });

    return (
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={2}
      />
    );
  },
};

export const Multiple: Story = {
  ...noControls('여러 날짜를 동시에 선택할 수 있습니다.'),
  render: function Render() {
    const [dates, setDates] = useState<Date[] | undefined>([new Date()]);

    return <Calendar mode="multiple" selected={dates} onSelect={setDates} />;
  },
};

export const MonthAndYearSelector: Story = {
  ...noControls('드롭다운으로 월과 연도를 빠르게 선택할 수 있습니다.'),
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
      />
    );
  },
};

export const Presets: Story = {
  ...noControls('미리 정의된 날짜 버튼으로 빠르게 선택할 수 있습니다.'),
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(
      new Date(new Date().getFullYear(), 1, 12),
    );
    const [currentMonth, setCurrentMonth] = useState<Date>(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    );

    return (
      <Card size="sm" className="w-fit max-w-[300px]">
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            fixedWeeks
            className="w-full! border-none! rounded-none! p-0!"
          />
        </CardContent>
        <CardFooter className="flex-wrap gap-2 border-t border-gray-200 dark:border-neutral-800 py-3">
          {[
            { label: 'Today', value: 0 },
            { label: 'Tomorrow', value: 1 },
            { label: 'In 3 days', value: 3 },
            { label: 'In a week', value: 7 },
            { label: 'In 2 weeks', value: 14 },
          ].map((preset) => (
            <Button
              key={preset.value}
              variant="outline"
              size="sm"
              className="flex-auto"
              onClick={() => {
                const newDate = addDays(new Date(), preset.value);
                setDate(newDate);
                setCurrentMonth(
                  new Date(newDate.getFullYear(), newDate.getMonth(), 1),
                );
              }}
            >
              {preset.label}
            </Button>
          ))}
        </CardFooter>
      </Card>
    );
  },
};

export const DateAndTime: Story = {
  ...noControls(
    '캘린더와 시간 입력을 조합하여 날짜와 시간을 함께 선택할 수 있습니다.',
  ),
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(
      new Date(new Date().getFullYear(), new Date().getMonth(), 12),
    );

    return (
      <Card size="sm" className="w-fit">
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border-none! rounded-none! p-0!"
          />
        </CardContent>
        <CardFooter className="flex-col gap-3 border-t border-gray-200 dark:border-neutral-800 py-3 items-stretch!">
          <FormControl>
            <FormControl.Label>Start Time</FormControl.Label>
            <div className="relative flex items-center">
              <Clock2Icon
                size={14}
                className="absolute left-2.5 text-muted-foreground pointer-events-none"
              />
              <TextInput
                type="time"
                step="1"
                defaultValue="10:30:00"
                className={timeInputStyle}
              />
            </div>
          </FormControl>
          <FormControl>
            <FormControl.Label>End Time</FormControl.Label>
            <div className="relative flex items-center">
              <Clock2Icon
                size={14}
                className="absolute left-2.5 text-muted-foreground pointer-events-none"
              />
              <TextInput
                type="time"
                step="1"
                defaultValue="12:30:00"
                className={timeInputStyle}
              />
            </div>
          </FormControl>
        </CardFooter>
      </Card>
    );
  },
};

export const BookedDates: Story = {
  ...noControls('예약된 날짜를 비활성화하고 취소선으로 표시합니다.'),
  render: function Render() {
    const defaultDate = new Date(new Date().getFullYear(), 1, 3);
    const [date, setDate] = useState<Date | undefined>(defaultDate);
    const bookedDates = Array.from(
      { length: 15 },
      (_, i) => new Date(new Date().getFullYear(), 1, 12 + i),
    );

    return (
      <Calendar
        mode="single"
        defaultMonth={defaultDate}
        selected={date}
        onSelect={setDate}
        disabled={bookedDates}
        modifiers={{
          booked: bookedDates,
        }}
        modifiersClassNames={{
          booked: '[&>button]:line-through opacity-100',
        }}
      />
    );
  },
};

export const CustomCellSize: Story = {
  ...noControls(
    '`--nine-calendar-cell-size` CSS 변수로 셀 크기를 키워 날짜별 가격 등 추가 정보를 표시할 수 있습니다.',
  ),
  render: function Render() {
    const defaultMonth = new Date(new Date().getFullYear(), 11, 8);
    const [range, setRange] = useState<DateRange | undefined>({
      from: defaultMonth,
      to: addDays(defaultMonth, 10),
    });

    return (
      <Card size="sm" className="w-fit p-0!">
        <CardContent className="p-0!">
          <Calendar
            mode="range"
            defaultMonth={defaultMonth}
            selected={range}
            onSelect={setRange}
            captionLayout="dropdown"
            className="[--nine-calendar-cell-size:3rem] border-none! rounded-none!"
            components={{
              DayButton: PriceDayButton,
            }}
          />
        </CardContent>
      </Card>
    );
  },
};

export const WeekNumbers: Story = {
  ...noControls('주 번호를 표시합니다.'),
  render: function Render() {
    const defaultDate = new Date(new Date().getFullYear(), 1, 3);
    const [date, setDate] = useState<Date | undefined>(defaultDate);

    return (
      <Calendar
        mode="single"
        defaultMonth={defaultDate}
        selected={date}
        onSelect={setDate}
        showWeekNumber
        showOutsideDays={false}
      />
    );
  },
};

export const DatePicker: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Popover + Calendar 조합으로 날짜 선택 팝업을 구현합니다.',
      },
    },
    layout: 'padded',
  },
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date>();

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[280px] justify-start font-normal"
          >
            <CalendarIcon size={16} />
            {date ? (
              format(date, 'PPP')
            ) : (
              <span className="text-muted-foreground">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto! p-0! border-none! shadow-none!"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    );
  },
};

export const RangePicker: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Popover + Calendar 조합으로 범위 선택 팝업을 구현합니다.',
      },
    },
    layout: 'padded',
  },
  render: function Render() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(new Date().getFullYear(), 0, 20),
      to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
    });

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[280px] justify-start font-normal gap-2"
          >
            <CalendarIcon size={16} />
            {(() => {
              if (!dateRange?.from)
                return (
                  <span className="text-muted-foreground">Pick a date</span>
                );

              if (dateRange.to)
                return `${format(dateRange.from, 'LLL dd, y')} - ${format(dateRange.to, 'LLL dd, y')}`;

              return format(dateRange.from, 'LLL dd, y');
            })()}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto! p-0! border-none! shadow-none!"
          align="start"
        >
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    );
  },
};

export const DatePickerWithTime: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '하나의 Popover 안에 Calendar + 시간 입력을 함께 배치하여 날짜와 시간을 한번에 선택합니다.',
      },
    },
    layout: 'padded',
  },
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState('10:30:00');

    const displayText = date ? `${format(date, 'PPP')} ${time}` : undefined;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[280px] justify-start font-normal"
          >
            <CalendarIcon size={16} />
            {displayText ?? (
              <span className="text-muted-foreground">
                Pick date &amp; time
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto! p-0!" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border-none! rounded-none! shadow-none!"
          />
          <div className="border-t border-gray-200 dark:border-neutral-800 px-3 py-3">
            <div className="relative flex items-center w-full">
              <Clock2Icon
                size={14}
                className="absolute left-2.5 text-muted-foreground pointer-events-none"
              />
              <TextInput
                type="time"
                step="1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={timeInputStyle}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};
