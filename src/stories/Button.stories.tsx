import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from 'lib/components/button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'UI/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
        'glow',
      ],
      description: '버튼 스타일을 지정합니다',
      table: {
        type: {
          summary:
            "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'glow'",
        },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: '버튼 크기를 지정합니다',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    disableRipple: {
      control: 'boolean',
      description: 'Ripple 효과를 비활성화 할 때 지정합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼을 비활성화 할 때 지정합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'md',
  },
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
    size: 'md',
  },
};

export const Glow: Story = {
  args: {
    children: 'Button',
    variant: 'glow',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button variant="default" size="sm">
          Default
        </Button>
        <Button variant="default" size="md">
          Default
        </Button>
        <Button variant="default" size="lg">
          Default
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button variant="outline" size="sm">
          Outline
        </Button>
        <Button variant="outline" size="md">
          Outline
        </Button>
        <Button variant="outline" size="lg">
          Outline
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button variant="glow" size="sm">
          Glow
        </Button>
        <Button variant="glow" size="md">
          Glow
        </Button>
        <Button variant="glow" size="lg">
          Glow
        </Button>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Button variant="default" disabled>
        Default
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="glow" disabled>
        Glow
      </Button>
    </div>
  ),
};

export const WithoutRipple: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    disableRipple: true,
  },
};
