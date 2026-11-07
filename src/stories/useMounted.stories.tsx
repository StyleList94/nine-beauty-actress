import type { Meta, StoryObj } from '@storybook/react-vite';

import { Suspense } from 'react';

import useMounted from 'lib/hooks/use-mounted';

const MountedDemo = () => {
  const isMounted = useMounted();

  return (
    <p className="text-sm">
      browser rendering ready?: {isMounted ? 'yes!' : 'no!'}
    </p>
  );
};

const meta: Meta<typeof MountedDemo> = {
  component: MountedDemo,
  title: 'Hooks/useMounted',

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'React 19.3 브라우저 전용 렌더링을 위한 deprecated 호환 훅입니다. 새 코드는 use(browser())를 사용합니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MountedDemo>;

export const Default: Story = {
  decorators: [
    (StoryContent) => (
      <Suspense fallback={<p>브라우저에서 준비 중...</p>}>
        <StoryContent />
      </Suspense>
    ),
  ],
};
