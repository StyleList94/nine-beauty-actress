import type { Meta, StoryObj } from '@storybook/react-vite';
import type { DateRange } from 'react-day-picker';

import { useState } from 'react';
import { addDays, subDays } from 'date-fns';

import { DatePicker } from 'lib/components/date-picker';
import { FormControl } from 'lib/components/form-control';

type DefaultArgs = {
  _mode: 'single' | 'range';
  _value: string;
  _onValueChange: string;
  _clearable: boolean;
  _disabled: boolean;
  _formatStr: string;
  _open: boolean;
  _onOpenChange: (open: boolean) => void;
  _inputPlaceholder: string;
  _inputAriaInvalid: string;
  _inputAriaDescribedby: string;
  _calendarShowTimePicker: boolean;
  _calendarAlign: 'start' | 'center' | 'end';
  _calendarProps: string;
  _presetsChildren: string;
  _presetLabel: string;
  _presetValue: string;
};

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'UI/DatePicker',
  tags: ['autodocs'],
  argTypes: {
    mode: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    clearable: { table: { disable: true } },
    disabled: { table: { disable: true } },
    formatStr: { table: { disable: true } },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '날짜를 선택할 수 있는 팝업 캘린더 컴포넌트입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

export const Default: StoryObj<DefaultArgs> = {
  argTypes: {
    _mode: {
      name: 'mode',
      control: 'select',
      options: ['single', 'range'],
      description: '날짜 선택 모드를 지정합니다',
      table: {
        category: 'DatePicker',
        type: { summary: "'single' | 'range'" },
        defaultValue: { summary: 'single' },
      },
    },
    _clearable: {
      name: 'clearable',
      control: 'boolean',
      description: 'Clear 버튼 표시 여부를 지정합니다',
      table: {
        category: 'DatePicker',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    _disabled: {
      name: 'disabled',
      control: 'boolean',
      description: '비활성화 상태를 지정합니다',
      table: {
        category: 'DatePicker',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    _formatStr: {
      name: 'formatStr',
      control: 'text',
      description: 'date-fns 포맷 문자열을 지정합니다',
      table: {
        category: 'DatePicker',
        type: { summary: 'string' },
        defaultValue: { summary: "PPP (single) / 'LLL dd, y' (range)" },
      },
    },
    _value: {
      name: 'value',
      control: false,
      description: '선택된 날짜 값 (single: Date, range: DateRange)',
      table: {
        category: 'DatePicker',
        type: { summary: 'Date | DateRange' },
      },
    },
    _onValueChange: {
      name: 'onValueChange',
      control: false,
      description: '날짜 값 변경 콜백',
      table: {
        category: 'DatePicker',
        type: { summary: '(value: Date | DateRange | undefined) => void' },
      },
    },
    _open: {
      name: 'open',
      control: false,
      description: 'Popover 열림 상태 제어 (controlled)',
      table: {
        category: 'DatePicker',
        type: { summary: 'boolean' },
      },
    },
    _onOpenChange: {
      name: 'onOpenChange',
      control: false,
      description: 'Popover 열림 상태 변경 콜백',
      table: {
        category: 'DatePicker',
        type: { summary: '(open: boolean) => void' },
      },
    },
    _inputPlaceholder: {
      name: 'placeholder',
      control: 'text',
      description: '날짜 미선택 시 표시할 플레이스홀더 텍스트',
      table: {
        category: 'DatePicker.Input',
        type: { summary: 'string' },
        defaultValue: { summary: 'Pick a date' },
      },
    },
    _inputAriaInvalid: {
      name: 'aria-invalid',
      control: false,
      description: '유효성 검사 실패 상태 (FormControl 연동)',
      table: {
        category: 'DatePicker.Input',
        type: { summary: "AriaAttributes['aria-invalid']" },
      },
    },
    _inputAriaDescribedby: {
      name: 'aria-describedby',
      control: false,
      description: '접근성 설명 요소 ID (FormControl 자동 연결)',
      table: {
        category: 'DatePicker.Input',
        type: { summary: 'string' },
      },
    },
    _calendarShowTimePicker: {
      name: 'showTimePicker',
      control: false,
      description: '시간 선택 UI를 표시합니다',
      table: {
        category: 'DatePicker.Calendar',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    _calendarAlign: {
      name: 'align',
      control: false,
      description: 'Popover 정렬 방향',
      table: {
        category: 'DatePicker.Calendar',
        type: { summary: "'start' | 'center' | 'end'" },
        defaultValue: { summary: 'start' },
      },
    },
    _calendarProps: {
      name: 'calendarProps',
      control: false,
      description: 'Calendar에 전달할 추가 props (react-day-picker)',
      table: {
        category: 'DatePicker.Calendar',
        type: { summary: 'Partial<CalendarProps>' },
      },
    },
    _presetsChildren: {
      name: 'children',
      control: false,
      description: '프리셋 버튼 목록 (DatePicker.Preset)',
      table: {
        category: 'DatePicker.Presets',
        type: { summary: 'ReactNode' },
      },
    },
    _presetLabel: {
      name: 'label',
      control: false,
      description: '프리셋 버튼에 표시할 텍스트',
      table: {
        category: 'DatePicker.Preset',
        type: { summary: 'string' },
      },
    },
    _presetValue: {
      name: 'value',
      control: false,
      description: '프리셋 클릭 시 설정할 날짜 값',
      table: {
        category: 'DatePicker.Preset',
        type: { summary: 'Date | DateRange' },
      },
    },
  },
  args: {
    _mode: 'single',
    _clearable: true,
    _disabled: false,
    _formatStr: '',
    _inputPlaceholder: 'Pick a date',
  },
  render: function Render(args) {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className="w-[280px]">
        <DatePicker
          value={date}
          onValueChange={setDate}
          clearable={args._clearable}
          disabled={args._disabled}
          formatStr={args._formatStr || undefined}
        >
          <DatePicker.Input placeholder={args._inputPlaceholder} />
          <DatePicker.Calendar />
        </DatePicker>
      </div>
    );
  },
};

export const Range: Story = {
  ...noControls(
    'Range 모드로 날짜 범위를 선택합니다. 두 번째 날짜 선택 시 자동으로 닫힙니다.',
  ),
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(new Date().getFullYear(), 0, 20),
      to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
    });

    return (
      <div className="w-[280px]">
        <DatePicker mode="range" value={range} onValueChange={setRange}>
          <DatePicker.Input placeholder="날짜 범위 선택" />
          <DatePicker.Calendar />
        </DatePicker>
      </div>
    );
  },
};

export const WithTimePicker: Story = {
  ...noControls(
    '날짜와 시간을 함께 선택합니다. 시간 선택 모드에서는 날짜 선택만으로 팝업이 닫히지 않습니다.',
  ),
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className="w-[280px]">
        <DatePicker value={date} onValueChange={setDate} formatStr="PPP HH:mm">
          <DatePicker.Input placeholder="날짜 & 시간 선택" />
          <DatePicker.Calendar showTimePicker />
        </DatePicker>
      </div>
    );
  },
};

export const WithPresets: Story = {
  ...noControls(
    '좌측에 빠른 선택 프리셋 패널을 함께 표시합니다.',
  ),
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className="w-[280px]">
        <DatePicker value={date} onValueChange={setDate}>
          <DatePicker.Input />
          <DatePicker.Calendar>
            <DatePicker.Presets>
              <DatePicker.Preset label="오늘" value={new Date()} />
              <DatePicker.Preset
                label="어제"
                value={subDays(new Date(), 1)}
              />
              <DatePicker.Preset
                label="일주일 전"
                value={subDays(new Date(), 7)}
              />
              <DatePicker.Preset
                label="한 달 전"
                value={subDays(new Date(), 30)}
              />
            </DatePicker.Presets>
          </DatePicker.Calendar>
        </DatePicker>
      </div>
    );
  },
};

export const RangeWithPresets: Story = {
  ...noControls(
    'Range 모드에서 프리셋을 함께 사용합니다.',
  ),
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    const today = new Date();

    return (
      <div className="w-[280px]">
        <DatePicker mode="range" value={range} onValueChange={setRange}>
          <DatePicker.Input placeholder="기간 선택" />
          <DatePicker.Calendar>
            <DatePicker.Presets>
              <DatePicker.Preset
                label="지난 7일"
                value={{ from: subDays(today, 7), to: today }}
              />
              <DatePicker.Preset
                label="지난 30일"
                value={{ from: subDays(today, 30), to: today }}
              />
              <DatePicker.Preset
                label="다음 7일"
                value={{ from: today, to: addDays(today, 7) }}
              />
            </DatePicker.Presets>
          </DatePicker.Calendar>
        </DatePicker>
      </div>
    );
  },
};

export const WithFormControl: Story = {
  ...noControls(
    'FormControl과 통합하여 label, validation 상태를 자동으로 연결합니다.',
  ),
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className="w-[280px]">
        <FormControl>
          <FormControl.Label>예약일</FormControl.Label>
          <DatePicker value={date} onValueChange={setDate}>
            <DatePicker.Input />
            <DatePicker.Calendar />
          </DatePicker>
          <FormControl.Caption>
            예약 가능한 날짜를 선택하세요
          </FormControl.Caption>
        </FormControl>
      </div>
    );
  },
};

export const WithFormControlError: Story = {
  ...noControls(
    'FormControl의 에러 상태와 연동됩니다.',
  ),
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className="w-[280px]">
        <FormControl>
          <FormControl.Label>예약일</FormControl.Label>
          <DatePicker value={date} onValueChange={setDate}>
            <DatePicker.Input aria-invalid="true" />
            <DatePicker.Calendar />
          </DatePicker>
          <FormControl.Validation variant="error">
            날짜를 선택하세요
          </FormControl.Validation>
        </FormControl>
      </div>
    );
  },
};

export const Disabled: Story = {
  ...noControls('비활성화 상태입니다.'),
  render: function Render() {
    return (
      <div className="w-[280px]">
        <DatePicker disabled>
          <DatePicker.Input />
          <DatePicker.Calendar />
        </DatePicker>
      </div>
    );
  },
};

export const CustomFormat: Story = {
  ...noControls(
    'date-fns 포맷 문자열로 날짜 표시 형식을 커스터마이징합니다.',
  ),
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <div className="w-[280px]">
        <DatePicker
          value={date}
          onValueChange={setDate}
          formatStr="yyyy/MM/dd"
        >
          <DatePicker.Input />
          <DatePicker.Calendar />
        </DatePicker>
      </div>
    );
  },
};
