import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../lib/components';

const meta: Meta<typeof Button> = {
  component: Button,
  // 👇 Enables auto-generated documentation for the component story
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Click',
  },
};
