import type { Meta, StoryObj } from '@storybook/react-vite';

import { ScrollArea, ScrollBar } from 'lib/components/scroll-area';
import { Separator } from 'lib/components/separator';

const meta: Meta<typeof ScrollArea> = {
  component: ScrollArea,
  title: 'UI/ScrollArea',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '콘텐츠가 영역을 초과할 때 스크롤바를 제공하는 스크롤 영역입니다.',
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

const tags = [
  'TypeScript',
  'React',
  'Vanilla Extract',
  'Radix UI',
  'Storybook',
  'Vitest',
  'TailwindCSS',
  'Motion',
  'Vite',
  'ESLint',
  'Prettier',
  'pnpm',
];

type DefaultArgs = {
  type: 'auto' | 'always' | 'scroll' | 'hover';
  _areaClassName: string;
  _areaChildren: string;
  _barOrientation: string;
};

export const Default: StoryObj<DefaultArgs> = {
  argTypes: {
    type: {
      control: 'select',
      options: ['auto', 'always', 'scroll', 'hover'],
      description: '스크롤바 표시 모드를 지정합니다',
      table: {
        category: 'ScrollArea',
        type: { summary: "'auto' | 'always' | 'scroll' | 'hover'" },
        defaultValue: { summary: 'hover' },
      },
    },
    _areaClassName: {
      name: 'className',
      control: false,
      description: '추가 CSS 클래스를 지정합니다',
      table: {
        category: 'ScrollArea',
        type: { summary: 'string' },
      },
    },
    _areaChildren: {
      name: 'children',
      control: false,
      description: '스크롤 영역에 렌더링할 콘텐츠를 지정합니다',
      table: {
        category: 'ScrollArea',
        type: { summary: 'ReactNode' },
      },
    },
    _barOrientation: {
      name: 'orientation',
      control: false,
      description: '스크롤바 방향을 지정합니다',
      table: {
        category: 'ScrollBar',
        type: { summary: "'vertical' | 'horizontal'" },
        defaultValue: { summary: 'vertical' },
      },
    },
  },
  args: {
    type: 'hover',
  },
  render: (args) => (
    <ScrollArea
      type={args.type}
      className="h-48 w-48 rounded-md border border-zinc-200 dark:border-zinc-800"
    >
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">기술 스택</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: StoryObj = {
  ...noControls(
    '가로 스크롤이 가능한 카드 목록입니다. ScrollBar orientation="horizontal"을 추가합니다.',
  ),
  render: () => (
    <ScrollArea className="w-80 whitespace-nowrap rounded-md border border-zinc-200 dark:border-zinc-800">
      <div className="flex gap-4 p-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="flex h-24 w-36 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-sm text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
          >
            카드 {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
