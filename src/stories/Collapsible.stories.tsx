import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from 'lib/components/collapsible';
import { Button } from 'lib/components/button';

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
  title: 'UI/Collapsible',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '컨텐츠를 접고 펼칠 수 있는 토글 패널입니다.',
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
  defaultOpen: boolean;
  open: boolean;
  disabled: boolean;
  _onOpenChange: string;
  _triggerAsChild: boolean;
  _contentChildren: string;
};

export const Default: StoryObj<DefaultArgs> = {
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: '초기 열림 상태를 지정합니다',
      table: {
        category: 'Collapsible',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    open: {
      control: false,
      description: '제어 모드에서 열림 상태를 지정합니다',
      table: {
        category: 'Collapsible',
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태를 지정합니다',
      table: {
        category: 'Collapsible',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    _onOpenChange: {
      name: 'onOpenChange',
      control: false,
      description: '열림 상태 변경 시 호출되는 핸들러입니다',
      table: {
        category: 'Collapsible',
        type: { summary: '(open: boolean) => void' },
      },
    },
    _triggerAsChild: {
      name: 'asChild',
      control: false,
      description: '자식 요소를 트리거로 사용합니다',
      table: {
        category: 'CollapsibleTrigger',
        type: { summary: 'boolean' },
      },
    },
    _contentChildren: {
      name: 'children',
      control: false,
      description: '펼쳐지는 콘텐츠를 지정합니다',
      table: {
        category: 'CollapsibleContent',
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    defaultOpen: false,
    disabled: false,
  },
  render: (args) => (
    <Collapsible
      defaultOpen={args.defaultOpen}
      disabled={args.disabled}
      className="w-80 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-sm font-semibold">@radix-ui/react-collapsible</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800">
          @radix-ui/react-compose-refs
        </div>
        <div className="rounded border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800">
          @radix-ui/react-id
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Controlled: StoryObj = {
  ...noControls('open/onOpenChange로 외부에서 상태를 제어합니다.'),
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-start gap-3 w-80">
        <p className="text-sm">
          상태: <strong>{open ? '열림' : '닫힘'}</strong>
        </p>
        <Collapsible
          open={open}
          onOpenChange={setOpen}
          className="w-full flex flex-col gap-2"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium dark:border-zinc-800">
            제어 모드
            <ChevronsUpDown className="size-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="rounded border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800">
              open과 onOpenChange로 외부에서 상태를 관리할 수 있습니다.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const WithList: StoryObj = {
  ...noControls('리스트 아이템을 펼치는 실용적 예시입니다.'),
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      {['디자인 토큰', '컴포넌트', '훅'].map((section) => (
        <Collapsible key={section} className="flex flex-col gap-1">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between!"
            >
              {section}
              <ChevronsUpDown />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-1 pl-4">
            <p className="text-sm py-1">항목 1</p>
            <p className="text-sm py-1">항목 2</p>
            <p className="text-sm py-1">항목 3</p>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  ),
};
