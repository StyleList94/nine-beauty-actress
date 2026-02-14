import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';
import {
  Calculator,
  Calendar,
  CreditCard,
  Moon,
  Settings,
  Smile,
  Sun,
  User,
} from 'lucide-react';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from 'lib/components/command';
import { Button } from 'lib/components/button';

const meta: Meta<typeof Command> = {
  component: Command,
  title: 'UI/Command',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '검색 기반 커맨드 팔레트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Command>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

export const Default: Story = {
  ...noControls('아이콘, 그룹, 단축키를 포함한 기본 커맨드 팔레트입니다.'),
  render: () => (
    <Command className="w-80 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <CommandInput placeholder="무엇을 찾고 계세요?" />
      <CommandList>
        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
        <CommandGroup heading="바로가기">
          <CommandItem>
            <Calendar />
            <span>캘린더</span>
          </CommandItem>
          <CommandItem>
            <Smile />
            <span>이모지 검색</span>
          </CommandItem>
          <CommandItem disabled>
            <Calculator />
            <span>계산기</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="설정">
          <CommandItem>
            <User />
            <span>프로필</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span>결제</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span>설정</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithDialog: Story = {
  ...noControls('CommandDialog로 모달 형태의 커맨드 팔레트를 표시합니다.'),
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          커맨드 팔레트 열기
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="무엇을 찾고 계세요?" />
          <CommandList>
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            <CommandGroup heading="바로가기">
              <CommandItem>
                <Calendar />
                <span>캘린더</span>
              </CommandItem>
              <CommandItem>
                <Smile />
                <span>이모지 검색</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="테마">
              <CommandItem>
                <Sun />
                <span>라이트 모드</span>
              </CommandItem>
              <CommandItem>
                <Moon />
                <span>다크 모드</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="설정">
              <CommandItem>
                <User />
                <span>프로필</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings />
                <span>설정</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};

export const Empty: Story = {
  ...noControls('검색 결과가 없을 때의 빈 상태입니다.'),
  render: () => (
    <Command className="w-80 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <CommandInput placeholder="무엇을 찾고 계세요?" value="gf" />
      <CommandList>
        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
      </CommandList>
    </Command>
  ),
};
