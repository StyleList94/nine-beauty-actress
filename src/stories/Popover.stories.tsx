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
type Story = StoryObj<typeof Popover>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

export const Default: Story = {
  ...noControls(
    '제목, 설명, 폼을 포함한 기본 팝오버입니다.',
  ),
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">팝오버 열기</Button>
      </PopoverTrigger>
      <PopoverContent>
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

export const CustomPosition: Story = {
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
