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
type Story = StoryObj<typeof ScrollArea>;

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

export const Default: Story = {
  ...noControls('세로 스크롤이 가능한 태그 목록입니다.'),
  render: () => (
    <ScrollArea className="h-48 w-48 rounded-md border border-zinc-200 dark:border-zinc-800">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">
          기술 스택
        </h4>
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

export const Horizontal: Story = {
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
