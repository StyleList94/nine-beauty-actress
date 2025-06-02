import type { Meta, StoryObj } from '@storybook/react';

import { cn } from 'lib/core/utils';

import { Header } from 'lib/components/header';

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

const LightDarkTemplateBox = ({ isDarkTheme }: { isDarkTheme?: boolean }) => (
  <div
    className={cn(
      'w-8 h-8',
      'flex items-center justify-center text-xl rounded-lg text-neutral-600',
      'transition ease-in-out duration-200',
      'bg-white hover:bg-neutral-100',
      'dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300',
    )}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className=""
      aria-label={isDarkTheme ? 'icon-dark-mode' : 'icon-light-mode'}
    >
      {isDarkTheme ? (
        <g fill="currentColor">
          <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
          <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
        </g>
      ) : (
        <path
          fill="currentColor"
          d="M12 21q-3.775 0-6.387-2.613T3 12q0-3.45 2.25-5.988T11 3.05q.325-.05.575.088t.4.362t.163.525t-.188.575q-.425.65-.638 1.375T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q.775 0 1.538-.225t1.362-.625q.275-.175.563-.162t.512.137q.25.125.388.375t.087.6q-.35 3.45-2.937 5.725T12 21"
        />
      )}
    </svg>
  </div>
);

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

          <div className="flex items-center gap-0.5">
            <LightDarkTemplateBox isDarkTheme={isDarkTheme} />
            <a
              href="https://github.com/StyleList94"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'w-8 h-8',
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
            <LightDarkTemplateBox isDarkTheme={isDarkTheme} />
          </div>
        </div>
      </Header>
    );
  },
};
