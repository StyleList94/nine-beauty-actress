import type { Meta, StoryObj } from '@storybook/react-vite';

import { Mail, Loader2, ChevronRight, Heart, Trash2, Plus } from 'lucide-react';

import { Button } from 'lib/components/button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'UI/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
        'glow',
      ],
      description: '버튼 스타일을 지정합니다',
      table: {
        type: {
          summary:
            "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'glow'",
        },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'icon-xs', 'icon-sm', 'icon', 'icon-lg'],
      description: '버튼 크기를 지정합니다',
      table: {
        type: {
          summary:
            "'xs' | 'sm' | 'md' | 'lg' | 'icon-xs' | 'icon-sm' | 'icon' | 'icon-lg'",
        },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼을 비활성화 할 때 지정합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disableRipple: {
      control: 'boolean',
      description: 'Ripple 효과를 비활성화 할 때 지정합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    asChild: {
      control: false,
      description: '자식 요소를 버튼 대신 렌더링합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: false,
      description: '버튼 내부에 렌더링할 요소를 지정합니다',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    children: 'Button',
    variant: 'default',
    size: 'md',
    disabled: false,
    disableRipple: false,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '모든 UI가 결국 여기서 시작된다',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

const variants = [
  'default',
  'destructive',
  'outline',
  'secondary',
  'ghost',
  'link',
  'glow',
] as const;

export const Default: Story = {
  render: ({ children, ...args }) => (
    <Button {...args}>
      {String(args.size).startsWith('icon') ? <Heart /> : children}
    </Button>
  ),
};

export const Variants: Story = {
  ...noControls('7가지 variant 스타일을 비교합니다.'),
  render: () => (
    <div className="flex flex-col items-start gap-3">
      {variants.map((v) => (
        <Button key={v} variant={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  ...noControls('텍스트 버튼과 아이콘 버튼의 크기별 비교입니다.'),
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="xs">Extra Small</Button>
        <Button size="icon-xs"><Plus /></Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Small</Button>
        <Button size="icon-sm"><Plus /></Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="md">Medium</Button>
        <Button size="icon"><Plus /></Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="lg">Large</Button>
        <Button size="icon-lg"><Plus /></Button>
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  ...noControls('아이콘과 텍스트를 함께 사용하는 패턴입니다.'),
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <Button>
        <Mail /> Login with Email
      </Button>
      <Button variant="destructive">
        <Trash2 /> Delete
      </Button>
      <Button variant="outline">
        Next <ChevronRight />
      </Button>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="icon">
          <Heart />
        </Button>
        <Button variant="glow" size="icon">
          <Loader2 />
        </Button>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  ...noControls('비활성화 상태의 variant별 스타일입니다.'),
  render: () => (
    <div className="flex flex-col items-start gap-3">
      {variants.map((v) => (
        <Button key={v} variant={v} disabled>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

export const AllCombinations: Story = {
  ...noControls('모든 variant × size 조합을 한눈에 확인합니다.'),
  render: () => (
    <div className="flex flex-col items-start gap-3">
      {variants.map((v) => (
        <div key={v} className="flex flex-wrap items-center gap-2">
          <Button variant={v} size="xs">
            {v} xs
          </Button>
          <Button variant={v} size="sm">
            {v} sm
          </Button>
          <Button variant={v} size="md">
            {v} md
          </Button>
          <Button variant={v} size="lg">
            {v} lg
          </Button>
          <Button variant={v} size="icon-xs">
            <Plus />
          </Button>
          <Button variant={v} size="icon-sm">
            <Plus />
          </Button>
          <Button variant={v} size="icon">
            <Plus />
          </Button>
          <Button variant={v} size="icon-lg">
            <Plus />
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const AsChild: Story = {
  parameters: {
    docs: {
      description: {
        story: 'asChild로 `<a>` 태그를 버튼 스타일로 렌더링합니다.',
      },
    },
  },
  argTypes: {
    disabled: { table: { disable: true } },
    disableRipple: { table: { disable: true } },
    asChild: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: (args) => (
    <Button asChild variant={args.variant} size={args.size}>
      <a href="https://github.com" target="_blank" rel="noreferrer">
        Open GitHub
      </a>
    </Button>
  ),
};
