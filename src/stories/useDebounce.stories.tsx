import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import useDebounce from 'lib/hooks/use-debounce';
import { TextInput } from 'lib/components/text-input';

const InputSomething = ({ delay }: { delay: number }) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, delay);

  return (
    <div className="flex flex-col gap-2">
      <TextInput
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-48"
      />
      <p className="text-sm">Result: {debouncedValue}</p>
    </div>
  );
};

const meta: Meta<typeof InputSomething> = {
  component: InputSomething,
  title: 'Hooks/useDebounce',

  argTypes: {
    delay: {
      control: 'number',
      description: '디바운스 지연 시간(ms)을 지정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '500' },
      },
    },
  },
  args: {
    delay: 500,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '값 변경 후 지정된 시간이 지나야 반영되는 디바운스 훅입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputSomething>;

export const Default: Story = {
  render: (args) => <InputSomething {...args} />,
};
