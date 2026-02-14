import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from 'lib/components/popover';
import { Button } from 'lib/components/button';
import { Input } from 'lib/components/input';
import { Label } from 'lib/components/label';

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: 'UI/Popover',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '트리거 요소 주변에 떠오르는 팝오버 컨테이너입니다.',
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
  align: 'start' | 'center' | 'end';
  sideOffset: number;
  _contentChildren: string;
  _contentClassName: string;
  _triggerAsChild: boolean;
  _headerChildren: string;
  _titleChildren: string;
  _descChildren: string;
};

export const Default: StoryObj<DefaultArgs> = {
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: '표시 방향을 지정합니다',
      table: {
        category: 'PopoverContent',
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: 'bottom' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '정렬을 지정합니다',
      table: {
        category: 'PopoverContent',
        type: { summary: "'start' | 'center' | 'end'" },
        defaultValue: { summary: 'center' },
      },
    },
    sideOffset: {
      control: 'number',
      description: '트리거와의 간격(px)을 지정합니다',
      table: {
        category: 'PopoverContent',
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    _contentChildren: {
      name: 'children',
      control: false,
      description: '팝오버 콘텐츠를 지정합니다',
      table: {
        category: 'PopoverContent',
        type: { summary: 'ReactNode' },
      },
    },
    _contentClassName: {
      name: 'className',
      control: false,
      description: '추가 CSS 클래스를 지정합니다',
      table: {
        category: 'PopoverContent',
        type: { summary: 'string' },
      },
    },
    _triggerAsChild: {
      name: 'asChild',
      control: false,
      description: '자식 요소를 트리거로 사용합니다',
      table: {
        category: 'PopoverTrigger',
        type: { summary: 'boolean' },
      },
    },
    _headerChildren: {
      name: 'children',
      control: false,
      description: '헤더 콘텐츠를 지정합니다',
      table: {
        category: 'PopoverHeader',
        type: { summary: 'ReactNode' },
      },
    },
    _titleChildren: {
      name: 'children',
      control: false,
      description: '팝오버 제목을 지정합니다',
      table: {
        category: 'PopoverTitle',
        type: { summary: 'ReactNode' },
      },
    },
    _descChildren: {
      name: 'children',
      control: false,
      description: '팝오버 설명을 지정합니다',
      table: {
        category: 'PopoverDescription',
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    side: 'bottom',
    align: 'center',
    sideOffset: 4,
  },
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">팝오버 열기</Button>
      </PopoverTrigger>
      <PopoverContent
        side={args.side}
        align={args.align}
        sideOffset={args.sideOffset}
      >
        <PopoverHeader>
          <PopoverTitle>여백 설정</PopoverTitle>
          <PopoverDescription>
            레이아웃의 여백 값을 조정합니다.
          </PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="width">너비</Label>
            <Input id="width" defaultValue="100%" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="height">높이</Label>
            <Input id="height" defaultValue="auto" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const CustomPosition: StoryObj = {
  ...noControls(
    'side와 align 속성으로 팝오버 위치를 조정합니다.',
  ),
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">위</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <PopoverHeader>
            <PopoverTitle>위쪽 팝오버</PopoverTitle>
            <PopoverDescription>
              side=&quot;top&quot; 으로 위에 표시됩니다.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">오른쪽</Button>
        </PopoverTrigger>
        <PopoverContent side="right">
          <PopoverHeader>
            <PopoverTitle>오른쪽 팝오버</PopoverTitle>
            <PopoverDescription>
              side=&quot;right&quot; 로 오른쪽에 표시됩니다.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
