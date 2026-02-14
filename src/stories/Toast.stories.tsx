import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toaster, toast, ToastAction } from 'lib/components/toast';
import { Button } from 'lib/components/button';

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  title: 'UI/Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '토스트 알림을 화면에 렌더링하는 프로바이더 컴포넌트입니다.',
      },
      story: {
        inline: false,
        iframeHeight: 200,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

export const Default: Story = {
  ...noControls('toast() 함수로 기본 토스트를 표시합니다.'),
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: '저장 완료',
          description: '변경사항이 저장되었습니다.',
        })
      }
    >
      토스트 표시
    </Button>
  ),
};

export const Destructive: Story = {
  ...noControls(
    'variant="destructive"로 오류 알림을 표시합니다.',
  ),
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: '삭제 실패',
          description: '권한이 없어 삭제할 수 없습니다.',
          variant: 'destructive',
        })
      }
    >
      오류 토스트
    </Button>
  ),
};

export const WithAction: Story = {
  ...noControls(
    'ToastAction으로 액션 버튼을 포함한 토스트입니다.',
  ),
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: '일정 알림',
          description: '10분 후 미팅이 시작됩니다.',
          action: (
            <ToastAction altText="확인">확인</ToastAction>
          ),
        })
      }
    >
      액션 토스트
    </Button>
  ),
};
