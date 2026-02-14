import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from 'lib/components/dialog';
import { Button } from 'lib/components/button';
import { Input } from 'lib/components/input';
import { Label } from 'lib/components/label';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'UI/Dialog',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '오버레이 위에 컨텐츠를 표시하는 모달 다이얼로그입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

export const Default: Story = {
  ...noControls(
    '기본 다이얼로그 구성입니다. Trigger, Header, Content, Footer를 조합합니다.',
  ),
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">프로필 수정</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
          <DialogDescription>
            프로필 정보를 변경합니다. 완료 후 저장을 눌러주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">이름</Label>
            <Input id="name" defaultValue="StyleList94" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username">사용자명</Label>
            <Input id="username" defaultValue="@stylelist94" />
          </div>
        </div>
        <DialogFooter>
          <Button>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithFooterClose: Story = {
  ...noControls(
    'DialogFooter의 showCloseButton으로 닫기 버튼을 자동 추가합니다.',
  ),
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">알림</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>알림</DialogTitle>
          <DialogDescription>
            업데이트가 완료되었습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const NoCloseButton: Story = {
  ...noControls(
    'showCloseButton={false}로 우측 상단 닫기 버튼을 숨깁니다.',
  ),
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">열기</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>닫기 버튼 없음</DialogTitle>
          <DialogDescription>
            ESC 키 또는 오버레이를 클릭하여 닫을 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">취소</Button>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
