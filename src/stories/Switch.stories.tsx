import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { Switch } from 'lib/components/switch';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'UI/Switch',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const LightDarkTheme: Story = {
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
