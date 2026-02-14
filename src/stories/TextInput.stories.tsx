import type { Meta, StoryObj } from '@storybook/react-vite';

import { useEffect, useState } from 'react';

import { TextInput } from 'lib/components/text-input';
import { FormControl } from 'lib/components/form-control';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'UI/TextInput',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'url', 'tel', 'search'],
      description: '입력 타입을 지정합니다',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트를 지정합니다',
      table: {
        type: { summary: 'string' },
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
    defaultValue: {
      control: false,
      description: '초기값을 지정합니다 (비제어)',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: '현재 값을 지정합니다 (제어)',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      control: false,
      description: '값이 변경될 때 호출되는 핸들러입니다',
      table: {
        type: { summary: '(e: ChangeEvent<HTMLInputElement>) => void' },
      },
    },
    name: {
      control: false,
      description: '폼 제출 시 사용할 이름을 지정합니다',
      table: {
        type: { summary: 'string' },
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
    type: 'text',
    placeholder: 'you@example.com',
    disabled: false,
    required: false,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '텍스트를 입력해줘',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value ?? '');

    useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    return (
      <div className="w-80">
        <TextInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const WithFormControl: Story = {
  ...noControls(
    'FormControl과 조합하여 레이블, 캡션을 연결합니다.',
  ),
  render: () => (
    <div className="w-80">
      <FormControl required>
        <FormControl.Label>이메일</FormControl.Label>
        <TextInput type="email" placeholder="you@example.com" />
        <FormControl.Caption>
          이메일은 공개되지 않습니다.
        </FormControl.Caption>
      </FormControl>
    </div>
  ),
};

export const Disabled: Story = {
  ...noControls('비활성화 상태의 입력 필드입니다.'),
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <TextInput placeholder="빈 입력" disabled />
      <TextInput defaultValue="입력된 값" disabled />
    </div>
  ),
};
