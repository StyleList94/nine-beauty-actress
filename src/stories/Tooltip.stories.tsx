import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from 'lib/components/tooltip';
import { Button } from 'lib/components/button';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'UI/Tooltip',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '보조 정보를 표시하는 툴팁 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

export const Default: Story = {
  ...noControls(
    '버튼에 마우스를 올리면 기본 툴팁이 표시됩니다.',
  ),
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">마우스를 올려보세요</Button>
      </TooltipTrigger>
      <TooltipContent>보조 설명 텍스트</TooltipContent>
    </Tooltip>
  ),
};

export const Positions: Story = {
  ...noControls(
    'side 속성으로 top, right, bottom, left 4방향을 지원합니다.',
  ),
  render: () => (
    <div className="flex gap-4">
      {(['top', 'right', 'bottom', 'left'] as const).map(
        (side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="outline">{side}</Button>
            </TooltipTrigger>
            <TooltipContent side={side}>
              {side} 방향 툴팁
            </TooltipContent>
          </Tooltip>
        ),
      )}
    </div>
  ),
};
