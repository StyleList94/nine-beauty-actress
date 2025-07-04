import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { cn } from 'lib/core/utils';

import { AppearanceSwitch } from 'lib/components/appearance-switch';

const meta: Meta<typeof AppearanceSwitch> = {
  component: AppearanceSwitch,
  title: 'UI/AppearanceSwitch',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AppearanceSwitch>;

export const LightDarkTheme: Story = {
  render: function Render() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const handleClick = () => {
      setIsDarkTheme(!isDarkTheme);
      document.getElementsByTagName('html')[0].className = isDarkTheme
        ? 'dark'
        : 'light';
    };
    return (
      <AppearanceSwitch
        onClick={handleClick}
        isActive={isDarkTheme}
        className={cn(
          'bg-white hover:bg-neutral-100',
          'dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300',
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          aria-label="icon-light-mode"
        >
          <g fill="currentColor">
            <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
            <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          aria-label="icon-dark-mode"
        >
          <path
            fill="currentColor"
            d="M12 21q-3.775 0-6.387-2.613T3 12q0-3.45 2.25-5.988T11 3.05q.325-.05.575.088t.4.362t.163.525t-.188.575q-.425.65-.638 1.375T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q.775 0 1.538-.225t1.362-.625q.275-.175.563-.162t.512.137q.25.125.388.375t.087.6q-.35 3.45-2.937 5.725T12 21"
          />
        </svg>
      </AppearanceSwitch>
    );
  },
};
