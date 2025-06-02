import type { Meta, StoryObj } from '@storybook/react';

import { cn } from 'lib/core/utils';

import { Footer } from 'lib/components/footer';

const meta: Meta<typeof Footer> = {
  title: 'UI/Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const StyleList94: Story = {
  name: 'StyleList94',
  render: function Render() {
    return (
      <Footer>
        <div
          className={cn(
            'flex flex-col gap-3',
            'sm:flex-row sm:justify-between sm:gap-4',
          )}
        >
          <div className="flex items-center gap-4 ">
            <a
              href="https://blog.stylelist94.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
            >
              Blog
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            © 2025.{' '}
            <a
              href="https://github.com/StyleList94"
              target="_blank"
              rel="noopener noreferrer"
            >
              StyleList94
            </a>
          </p>
        </div>
      </Footer>
    );
  },
};

export const StylishLog: Story = {
  name: 'STYLISH.LOG',
  args: {
    className: 'max-w-[64rem]',
  },
  render: function Render(args) {
    return (
      <Footer {...args}>
        <div
          className={cn(
            'flex flex-col gap-3',
            'sm:flex-row sm:justify-between sm:gap-4',
          )}
        >
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/StyleList94/blog"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'text-2xl text-neutral-700',
                'dark:text-neutral-300',
                'transition duration-200 ease-in-out',
              )}
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"
                />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            © 2025.{' '}
            <a
              href="https://github.com/StyleList94"
              target="_blank"
              rel="noopener noreferrer"
            >
              StyleList94
            </a>{' '}
            All rights reserved
          </p>
        </div>
      </Footer>
    );
  },
};
