import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import useDebounce from 'lib/hooks/use-debounce';

const InputSomething = ({ delay }: { delay: number }) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, delay);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border-2 border-zinc-200 dark:border-zinc-800 outline-0 rounded-sm w-48"
      />
      <p>Result: {debouncedValue}</p>
    </div>
  );
};

const meta: Meta<typeof InputSomething> = {
  component: InputSomething,
  title: 'Hooks/useDebounce',
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof InputSomething>;

export const Example: Story = {
  args: {
    delay: 500,
  },
  render: function Render({ ...args }) {
    return <InputSomething {...args} />;
  },
};
