import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CardSize } from 'lib/components/card';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from 'lib/components/card';
import { Button } from 'lib/components/button';
import { Input } from 'lib/components/input';
import { FormControl } from 'lib/components/form-control';
import { Switch } from 'lib/components/switch';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'UI/Card',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '뭐든 보여줄 수 있습니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

type DefaultArgs = {
  size: CardSize;
  _titleChildren: string;
  _descChildren: string;
  _actionChildren: string;
  _contentChildren: string;
  _footerChildren: string;
};

export const Default: StoryObj<DefaultArgs> = {
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: '카드 크기를 지정합니다',
      table: {
        category: 'Card',
        type: { summary: "'default' | 'sm'" },
        defaultValue: { summary: 'default' },
      },
    },
    _titleChildren: {
      name: 'children',
      control: false,
      description: '카드 제목',
      table: { category: 'CardTitle', type: { summary: 'ReactNode' } },
    },
    _descChildren: {
      name: 'children',
      control: false,
      description: '카드 설명',
      table: {
        category: 'CardDescription',
        type: { summary: 'ReactNode' },
      },
    },
    _actionChildren: {
      name: 'children',
      control: false,
      description: '액션 영역',
      table: { category: 'CardAction', type: { summary: 'ReactNode' } },
    },
    _contentChildren: {
      name: 'children',
      control: false,
      description: '컨텐츠 내용',
      table: {
        category: 'CardContent',
        type: { summary: 'ReactNode' },
      },
    },
    _footerChildren: {
      name: 'children',
      control: false,
      description: '푸터 영역',
      table: {
        category: 'CardFooter',
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    size: 'default',
  },
  render: (args) => (
    <Card className="w-80" size={args.size}>
      <CardHeader>
        <CardTitle>카드 타이틀</CardTitle>
        <CardDescription>카드 설명이 들어갑니다</CardDescription>
        <CardAction>
          <Button variant="link">Action</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm">컨텐츠 영역입니다.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          확인
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Small: Story = {
  ...noControls('컴팩트한 sm 사이즈 카드'),
  render: () => (
    <Card className="w-80" size="sm">
      <CardHeader>
        <CardTitle>컴팩트 카드</CardTitle>
        <CardDescription>sm 사이즈는 spacing을 줄여 밀도를 높입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">컨텐츠 영역입니다.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          확인
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const UnitConverter: Story = {
  ...noControls('FormControl, Input을 활용한 폼 카드 예시'),
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>사이즈는</CardTitle>
        <CardDescription>4배수가 진리</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <FormControl>
          <FormControl.Label>px</FormControl.Label>
          <Input type="number" placeholder="16" />
        </FormControl>
        <FormControl>
          <FormControl.Label>rem</FormControl.Label>
          <Input type="number" placeholder="1" />
        </FormControl>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          변환
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  ...noControls('CardAction으로 헤더에 액션을 배치하는 패턴'),
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>알림 설정</CardTitle>
        <CardDescription>알림 환경을 설정합니다.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            설정
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {['이메일 알림', '푸시 알림', '마케팅 수신'].map((label) => (
            <FormControl key={label} layout="horizontal">
              <Switch />
              <FormControl.Label>{label}</FormControl.Label>
            </FormControl>
          ))}
        </div>
      </CardContent>
    </Card>
  ),
};

export const StatsCard: Story = {
  ...noControls('데이터를 강조하는 대시보드 카드 패턴'),
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>그깟 공놀이</CardTitle>
        <CardDescription>올해는 제발 가을야구 하자...</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <section className="flex flex-col gap-2">
          <h2 className="text-sm text-zinc-800 dark:text-zinc-200">
            지금 롯데는...?
          </h2>
          <div className="flex items-end gap-0.5">
            <p className="text-5xl font-bold">3</p>
            <p className="mb-0.5">위</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <p>52승</p>
            <p>승률 0.520</p>
            <p>게임차 3.5</p>
          </div>
        </section>
      </CardContent>
    </Card>
  ),
};

export const HeaderOnly: Story = {
  ...noControls('CardHeader만 사용하는 최소 구성'),
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>간단한 카드</CardTitle>
        <CardDescription>헤더만 있는 최소 구성</CardDescription>
      </CardHeader>
    </Card>
  ),
};

