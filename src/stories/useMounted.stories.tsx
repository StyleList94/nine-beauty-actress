import type { Meta, StoryObj } from '@storybook/react-vite';

import useMounted from 'lib/hooks/use-mounted';

const MountedDemo = () => {
  const isMounted = useMounted();

  return <p className="text-sm">is component mounted?: {isMounted ? 'yes!' : 'no!'}</p>;
};

const meta: Meta<typeof MountedDemo> = {
  component: MountedDemo,
  title: 'Hooks/useMounted',

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '컴포넌트 마운트 여부를 반환하는 훅입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MountedDemo>;

export const Default: Story = {};
