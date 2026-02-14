import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from 'lib/components/separator';

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: 'UI/Separator',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '콘텐츠를 시각적으로 구분하는 구분선입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

export const Default: Story = {
  ...noControls('가로 방향의 기본 구분선입니다.'),
  render: () => (
    <div className="flex w-96 flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium">
          Nine Beauty Actress
        </h4>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          React UI 컴포넌트 라이브러리
        </p>
      </div>
      <Separator />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>문서</span>
        <Separator orientation="vertical" />
        <span>컴포넌트</span>
        <Separator orientation="vertical" />
        <span>테마</span>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  ...noControls(
    'orientation="vertical"로 세로 방향 구분선을 표시합니다.',
  ),
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex h-5 items-center gap-3 text-sm">
        <span className="font-medium">Nine Beauty Actress</span>
        <Separator orientation="vertical" />
        <span className="text-zinc-500 dark:text-zinc-400">
          v1.3.0
        </span>
        <Separator orientation="vertical" />
        <span className="text-zinc-500 dark:text-zinc-400">
          MIT License
        </span>
      </div>
      <div className="flex h-5 items-center gap-3 text-sm">
        <span>문서</span>
        <Separator orientation="vertical" />
        <span>컴포넌트</span>
        <Separator orientation="vertical" />
        <span>가이드</span>
        <Separator orientation="vertical" />
        <span>변경 이력</span>
      </div>
    </div>
  ),
};
