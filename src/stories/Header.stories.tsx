import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { cn } from 'lib/core/utils';

import { Header } from 'lib/components/header';
import { Switch } from 'lib/components/switch';

const meta: Meta<typeof Header> = {
  title: 'UI/Layout/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    wrapperStyle: {
      control: { type: 'text' },
    },
    boxStyle: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

const ThemeControlSwitch = ({
  isInitialDarkTheme,
}: {
  isInitialDarkTheme?: boolean;
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(isInitialDarkTheme);

  const toggleTheme = (checked: boolean) => {
    setIsDarkTheme(checked);
    document.getElementsByTagName('html')[0].className = checked
      ? 'dark'
      : 'light';
  };

  return (
    <Switch
      isChecked={isDarkTheme}
      onCheckedChange={toggleTheme}
      iconClassName="text-zinc-500/80 dark:text-zinc-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="icon-light-mode"
      >
        <circle cx={12} cy={12} r={4} />
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
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="icon-dark-mode"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </Switch>
  );
};

export const StyleList94: Story = {
  name: 'StyleList94',
  args: {
    boxStyle: '2xl:max-w-[96rem]',
  },
  render: function Render(args, context) {
    const isDarkTheme = context.globals.theme === 'dark';

    return (
      <Header {...args}>
        <div
          className={cn(
            'flex justify-between w-full select-none',
            'text-black dark:text-white',
          )}
        >
          <a
            href="https://stylelist94.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-end gap-0.5 font-display text-xl tracking-wide"
          >
            StyleList94
            <span className="text-sm leading-relaxed tracking-wider">.DEV</span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/StyleList94"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'size-6',
                'flex items-center justify-center text-xl text-neutral-700',
                'rounded-lg bg-white hover:bg-neutral-100',
                'dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300',
                'transition duration-200 ease-in-out',
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                aria-label="icon-github"
              >
                <path
                  fill="currentColor"
                  d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"
                />
              </svg>
            </a>
            <div className="w-px h-5 bg-zinc-200 rounded-md" />
            <ThemeControlSwitch isInitialDarkTheme={isDarkTheme} />
          </div>
        </div>
      </Header>
    );
  },
};

export const StylishLog: Story = {
  name: 'Stylish.LOG',
  args: {
    boxStyle: 'lg:max-w-[64rem]',
  },
  render: function Render(args, context) {
    const isDarkTheme = context.globals.theme === 'dark';

    return (
      <Header {...args}>
        <div
          className={cn(
            'flex justify-between w-full select-none',
            'text-black dark:text-white',
          )}
        >
          <a
            href="https://blog.stylelist94.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-end gap-0.5 font-display text-xl tracking-wide"
          >
            Stylish
            <span className="text-sm leading-relaxed tracking-wider">.LOG</span>
          </a>

          <div className="flex items-center gap-2">
            <ThemeControlSwitch isInitialDarkTheme={isDarkTheme} />
          </div>
        </div>
      </Header>
    );
  },
};
