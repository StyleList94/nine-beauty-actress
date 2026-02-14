import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { ToggleGroup, ToggleGroupItem } from 'lib/components/toggle-group';

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
  title: 'UI/ToggleGroup',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '여러 옵션 중 하나 또는 여러 개를 선택하는 토글 그룹입니다.',
      },
    },
  },
  args: {
    type: 'single',
    variant: 'default',
    size: 'default',
    spacing: 'none',
    disabled: false,
    rovingFocus: true,
    loop: true,
    orientation: 'horizontal',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: '선택 모드를 지정합니다.',
      table: {
        type: { summary: '"single" | "multiple"' },
      },
      type: { name: 'string', required: true },
    },
    value: {
      control: false,
      description:
        '현재 선택된 값입니다. `type="single"`일 때는 `string`, `type="multiple"`일 때는 `string[]`입니다.',
      table: {
        type: { summary: 'string | string[]' },
      },
    },
    defaultValue: {
      control: false,
      description: '초기 선택값입니다. 비제어 컴포넌트 사용 시 활용합니다.',
      table: {
        type: { summary: 'string | string[]' },
      },
    },
    onValueChange: {
      control: false,
      description: '값이 변경될 때 호출되는 콜백입니다.',
      table: {
        type: { summary: '(value: string | string[]) => void' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: '토글 그룹의 스타일을 지정합니다.',
      table: {
        type: { summary: '"default" | "outline"' },
        defaultValue: { summary: '"default"' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: '토글 그룹의 크기를 지정합니다.',
      table: {
        type: { summary: '"default" | "sm" | "lg"' },
        defaultValue: { summary: '"default"' },
      },
    },
    spacing: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg'],
      description: '토글 아이템 사이의 간격을 지정합니다.',
      table: {
        type: { summary: '"none" | "xs" | "sm" | "md" | "lg"' },
        defaultValue: { summary: '"none"' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '모든 토글 아이템을 비활성화합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    rovingFocus: {
      control: 'boolean',
      description:
        '키보드 포커스가 토글 아이템 간에 자동으로 이동하도록 합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    loop: {
      control: 'boolean',
      description:
        '마지막 아이템에서 첫 번째 아이템으로 포커스가 순환하도록 합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '토글 그룹의 방향을 지정합니다.',
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: '"horizontal"' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: function Render(args) {
    const [singleValue, setSingleValue] = useState('center');
    const [multiValue, setMultiValue] = useState<string[]>(['center']);

    if (args.type === 'single') {
      return (
        <ToggleGroup
          {...args}
          type="single"
          value={singleValue}
          onValueChange={(v) => {
            if (v) setSingleValue(v);
          }}
          aria-label="Text alignment"
        >
          <ToggleGroupItem value="left" aria-label="Align left">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            Center
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      );
    }

    return (
      <ToggleGroup
        {...args}
        type="multiple"
        value={multiValue}
        onValueChange={setMultiValue}
        aria-label="Text alignment"
      >
        <ToggleGroupItem value="left" aria-label="Align left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const SingleSelection: Story = {
  ...noControls('단일 선택 모드 예시입니다.'),
  render: function Render() {
    const [value, setValue] = useState('bold');

    return (
      <ToggleGroup
        type="single"
        variant="default"
        size="default"
        spacing="none"
        value={value}
        onValueChange={(v) => v && setValue(v)}
        aria-label="Text style"
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          Bold
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          Italic
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          Underline
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const MultipleSelection: Story = {
  ...noControls('다중 선택 모드 예시입니다.'),
  render: function Render() {
    const [value, setValue] = useState<string[]>(['center']);

    return (
      <ToggleGroup
        type="multiple"
        variant="default"
        size="default"
        spacing="none"
        value={value}
        onValueChange={setValue}
        aria-label="Text alignment"
      >
        <ToggleGroupItem value="left" aria-label="Align left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Variants: Story = {
  ...noControls('토글 그룹의 스타일 변형을 보여줍니다.'),
  render: function Render() {
    const [value1, setValue1] = useState('bold');
    const [value2, setValue2] = useState('italic');

    return (
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-sm">Default variant</p>
          <ToggleGroup
            type="single"
            variant="default"
            value={value1}
            onValueChange={(v) => v && setValue1(v)}
            aria-label="Default variant"
          >
            <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
            <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
            <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div>
          <p className="mb-2 text-sm">Outline variant</p>
          <ToggleGroup
            type="single"
            variant="outline"
            value={value2}
            onValueChange={(v) => v && setValue2(v)}
            aria-label="Outline variant"
          >
            <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
            <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
            <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  ...noControls('토글 그룹의 크기 변형을 보여줍니다.'),
  render: function Render() {
    const [value1, setValue1] = useState('medium');
    const [value2, setValue2] = useState('medium');
    const [value3, setValue3] = useState('medium');

    return (
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-sm">Small size</p>
          <ToggleGroup
            type="single"
            size="sm"
            value={value1}
            onValueChange={(v) => v && setValue1(v)}
            aria-label="Small size"
          >
            <ToggleGroupItem value="small">S</ToggleGroupItem>
            <ToggleGroupItem value="medium">M</ToggleGroupItem>
            <ToggleGroupItem value="large">L</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div>
          <p className="mb-2 text-sm">Default size</p>
          <ToggleGroup
            type="single"
            size="default"
            value={value2}
            onValueChange={(v) => v && setValue2(v)}
            aria-label="Default size"
          >
            <ToggleGroupItem value="small">Small</ToggleGroupItem>
            <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
            <ToggleGroupItem value="large">Large</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div>
          <p className="mb-2 text-sm">Large size</p>
          <ToggleGroup
            type="single"
            size="lg"
            value={value3}
            onValueChange={(v) => v && setValue3(v)}
            aria-label="Large size"
          >
            <ToggleGroupItem value="small">Small</ToggleGroupItem>
            <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
            <ToggleGroupItem value="large">Large</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    );
  },
};

export const Spacing: Story = {
  ...noControls('토글 아이템 간격 옵션을 보여줍니다.'),
  render: function Render() {
    const [value1, setValue1] = useState('left');
    const [value2, setValue2] = useState('left');
    const [value3, setValue3] = useState('left');

    return (
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-sm">No spacing (none)</p>
          <ToggleGroup
            type="single"
            spacing="none"
            value={value1}
            onValueChange={(v) => v && setValue1(v)}
            aria-label="No spacing"
          >
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div>
          <p className="mb-2 text-sm">Small spacing (sm)</p>
          <ToggleGroup
            type="single"
            variant="outline"
            spacing="sm"
            value={value2}
            onValueChange={(v) => v && setValue2(v)}
            aria-label="Small spacing"
          >
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div>
          <p className="mb-2 text-sm">Large spacing (lg)</p>
          <ToggleGroup
            type="single"
            variant="outline"
            spacing="lg"
            value={value3}
            onValueChange={(v) => v && setValue3(v)}
            aria-label="Large spacing"
          >
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    );
  },
};
