import type { Meta, StoryObj } from '@storybook/react-vite';

import { useEffect, useState } from 'react';

import { Checkbox } from 'lib/components/checkbox';
import { FormControl } from 'lib/components/form-control';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'UI/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '체크 상태를 지정합니다',
      table: {
        type: { summary: "boolean | 'indeterminate'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태를 지정합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부를 지정합니다',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultChecked: {
      control: false,
      description: '초기 체크 상태를 지정합니다 (비제어)',
      table: {
        type: { summary: "boolean | 'indeterminate'" },
      },
    },
    onCheckedChange: {
      control: false,
      description: '체크 상태가 변경될 때 호출되는 핸들러입니다',
      table: {
        type: { summary: "(checked: boolean | 'indeterminate') => void" },
      },
    },
    name: {
      control: false,
      description: '폼 제출 시 사용할 이름을 지정합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: false,
      description: '폼 제출 시 사용할 값을 지정합니다',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'on'" },
      },
    },
    className: {
      control: false,
      description: '커스텀 클래스를 지정합니다',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    checked: false,
    disabled: false,
    required: false,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '체크할게 말 안 해도',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

export const Default: Story = {
  render: function Render(args) {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>(
      args.checked ?? false,
    );

    useEffect(() => {
      setChecked(args.checked ?? false);
    }, [args.checked]);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};

export const Indeterminate: Story = {
  ...noControls(
    '전체 선택/해제 패턴으로 indeterminate 상태를 보여줍니다.',
  ),
  render: function Render() {
    const [items, setItems] = useState([false, false, false]);

    const allChecked = items.every(Boolean);
    const someChecked = items.some(Boolean);
    let parentChecked: boolean | 'indeterminate' = false;
    if (allChecked) parentChecked = true;
    else if (someChecked) parentChecked = 'indeterminate';

    const handleParentChange = () => {
      setItems(allChecked ? [false, false, false] : [true, true, true]);
    };

    const handleItemChange = (index: number) => (checked: boolean | 'indeterminate') => {
      setItems((prev) => prev.map((v, i) => (i === index ? checked === true : v)));
    };

    return (
      <div className="flex flex-col gap-3">
        <FormControl layout="horizontal">
          <Checkbox
            checked={parentChecked}
            onCheckedChange={handleParentChange}
          />
          <FormControl.Label>전체 선택</FormControl.Label>
        </FormControl>
        <div className="ml-6 flex flex-col gap-2">
          {['이메일 알림', 'SMS 알림', '푸시 알림'].map((label, i) => (
            <FormControl key={label} layout="horizontal">
              <Checkbox
                checked={items[i]}
                onCheckedChange={handleItemChange(i)}
              />
              <FormControl.Label>{label}</FormControl.Label>
            </FormControl>
          ))}
        </div>
      </div>
    );
  },
};

export const WithFormControl: Story = {
  ...noControls(
    'FormControl horizontal 레이아웃으로 레이블을 연결합니다.',
  ),
  render: function Render() {
    const [checked, setChecked] = useState(false);

    return (
      <FormControl layout="horizontal" required>
        <Checkbox
          checked={checked}
          onCheckedChange={(v) => setChecked(v === true)}
        />
        <FormControl.Label>이용약관에 동의합니다</FormControl.Label>
        <FormControl.Caption>
          서비스 이용을 위해 필수 동의가 필요합니다.
        </FormControl.Caption>
      </FormControl>
    );
  },
};

export const Disabled: Story = {
  ...noControls('비활성화 상태의 체크박스입니다.'),
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Checkbox disabled />
      <Checkbox disabled checked />
      <Checkbox disabled checked="indeterminate" />
    </div>
  ),
};
