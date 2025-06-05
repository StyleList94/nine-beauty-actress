import type { Meta, StoryObj } from '@storybook/react-vite';

import useMounted from 'lib/hooks/use-mounted';

const GuessWhat = () => {
  const isMounted = useMounted();

  return <p>is component mounted?: {isMounted ? 'yes!' : 'no!'}</p>;
};

const meta: Meta<typeof GuessWhat> = {
  component: GuessWhat,
  title: 'Hooks/useMounted',
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof GuessWhat>;

export const Example: Story = {};
