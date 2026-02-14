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
import { TextInput } from 'lib/components/text-input';
import { FormControl } from 'lib/components/form-control';

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

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

type DefaultArgs = {
  _contentShowCloseButton: boolean;
  _contentClassName: string;
  _footerShowCloseButton: boolean;
  _titleChildren: string;
  _descChildren: string;
  _triggerAsChild: boolean;
};

export const Default: StoryObj<DefaultArgs> = {
  argTypes: {
    _contentShowCloseButton: {
      name: 'showCloseButton',
      control: 'boolean',
      description: '우측 상단 닫기 버튼 표시 여부를 지정합니다',
      table: {
        category: 'DialogContent',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    _contentClassName: {
      name: 'className',
      control: false,
      description: '추가 CSS 클래스를 지정합니다',
      table: {
        category: 'DialogContent',
        type: { summary: 'string' },
      },
    },
    _footerShowCloseButton: {
      name: 'showCloseButton',
      control: 'boolean',
      description: '푸터에 닫기 버튼을 자동 추가합니다',
      table: {
        category: 'DialogFooter',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    _titleChildren: {
      name: 'children',
      control: false,
      description: '다이얼로그 제목을 지정합니다',
      table: {
        category: 'DialogTitle',
        type: { summary: 'ReactNode' },
      },
    },
    _descChildren: {
      name: 'children',
      control: false,
      description: '다이얼로그 설명을 지정합니다',
      table: {
        category: 'DialogDescription',
        type: { summary: 'ReactNode' },
      },
    },
    _triggerAsChild: {
      name: 'asChild',
      control: false,
      description: '자식 요소를 트리거로 사용합니다',
      table: {
        category: 'DialogTrigger',
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    _contentShowCloseButton: true,
    _footerShowCloseButton: false,
  },
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">프로필 수정</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={args._contentShowCloseButton}>
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
          <DialogDescription>
            프로필 정보를 변경합니다. 완료 후 저장을 눌러주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          <FormControl>
            <FormControl.Label>이름</FormControl.Label>
            <TextInput defaultValue="StyleList94" />
          </FormControl>
          <FormControl>
            <FormControl.Label>사용자명</FormControl.Label>
            <TextInput defaultValue="@stylelist94" />
          </FormControl>
        </div>
        <DialogFooter showCloseButton={args._footerShowCloseButton}>
          <Button>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithFooterClose: StoryObj = {
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
          <DialogDescription>업데이트가 완료되었습니다.</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const NoCloseButton: StoryObj = {
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
