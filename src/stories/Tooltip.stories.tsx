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

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

type DefaultArgs = {
  side: 'top' | 'right' | 'bottom' | 'left';
  sideOffset: number;
  _contentChildren: string;
  _contentClassName: string;
  _triggerAsChild: boolean;
};

export const Default: StoryObj<DefaultArgs> = {
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: '표시 방향을 지정합니다',
      table: {
        category: 'TooltipContent',
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: 'top' },
      },
    },
    sideOffset: {
      control: 'number',
      description: '트리거와의 간격(px)을 지정합니다',
      table: {
        category: 'TooltipContent',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    _contentChildren: {
      name: 'children',
      control: false,
      description: '툴팁 콘텐츠를 지정합니다',
      table: {
        category: 'TooltipContent',
        type: { summary: 'ReactNode' },
      },
    },
    _contentClassName: {
      name: 'className',
      control: false,
      description: '추가 CSS 클래스를 지정합니다',
      table: {
        category: 'TooltipContent',
        type: { summary: 'string' },
      },
    },
    _triggerAsChild: {
      name: 'asChild',
      control: false,
      description: '자식 요소를 트리거로 사용합니다',
      table: {
        category: 'TooltipTrigger',
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    side: 'top',
    sideOffset: 0,
  },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">마우스를 올려보세요</Button>
      </TooltipTrigger>
      <TooltipContent side={args.side} sideOffset={args.sideOffset}>
        보조 설명 텍스트
      </TooltipContent>
    </Tooltip>
  ),
};

export const Positions: StoryObj = {
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
