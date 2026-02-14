import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { Switch } from 'lib/components/switch';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'UI/Switch',
  tags: ['autodocs'],
  argTypes: {
    isChecked: {
      control: 'boolean',
      description: '스위치 활성화 여부를 결정합니다',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onCheckedChange: {
      control: false,
      description: '스위치 클릭 시 호출되는 핸들러입니다',
      table: {
        type: { summary: '(checked: boolean) => void' },
      },
    },
    children: {
      control: false,
      description: '비활성/활성 순서로 아이콘을 지정합니다',
      table: {
        type: { summary: '[ReactNode, ReactNode]' },
      },
    },
    trackClassName: {
      control: false,
      description: '트랙 커스텀 클래스를 지정합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    thumbClassName: {
      control: false,
      description: '버튼 커스텀 클래스를 지정합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    iconClassName: {
      control: false,
      description: '아이콘 커스텀 클래스를 지정합니다',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    isChecked: false,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '스위치 모양을 내맘대로!',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

export const Default: Story = {
  render: function Render(args) {
    const [checked, setChecked] = useState(args.isChecked ?? false);

    return <Switch isChecked={checked} onCheckedChange={setChecked} />;
  },
};

export const LightDarkTheme: Story = {
  ...noControls(
    '아이콘을 활용한 라이트/다크 테마 전환 스위치입니다.',
  ),
  render: function Render() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const handleClick = (checked: boolean) => {
      setIsDarkTheme(checked);
      document.getElementsByTagName('html')[0].className = checked
        ? 'dark'
        : 'light';
    };
    return (
      <Switch onCheckedChange={handleClick} isChecked={isDarkTheme}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-sun-icon lucide-sun"
          aria-label="icon-light-mode"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-moon-icon lucide-moon"
          aria-label="icon-dark-mode"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </Switch>
    );
  },
};
