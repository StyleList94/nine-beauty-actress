import type { Meta, StoryObj } from '@storybook/react-vite';

import { useRef } from 'react';

import { cn } from 'lib/core/utils';
import useVirtualScroll from 'lib/hooks/use-virtual-scroll';

const items = new Array(1000).fill(0).map((_, i) => i);

const ITEMS_COUNT = items.length;
const ITEM_HEIGHT = 32;

const ScrollListView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getVirtualItems } = useVirtualScroll({
    itemCount: ITEMS_COUNT,
    estimateHeight: ITEM_HEIGHT,
    buffer: 10,
    containerRef,
  });

  const virtualItems = getVirtualItems();

  return (
    <div className="flex flex-col gap-4 text-zinc-900 dark:text-zinc-200">
      <div
        ref={containerRef}
        className={cn(
          'overflow-y-auto w-48 h-50',
          'border border-zinc-200 dark:border-zinc-700',
        )}
      >
        <div className="relative" style={{ height: ITEMS_COUNT * ITEM_HEIGHT }}>
          {virtualItems.map(({ startPosition, index }) => (
            <div
              key={`items-${index}`}
              className={cn(
                'flex justify-center items-center w-full h-8',
                'bg-zinc-50 dark:bg-zinc-900',
                ' [&+&]:border-t border-zinc-300 dark:border-zinc-700',
                index % 2 && 'bg-zinc-200/50 dark:bg-zinc-800/50',
              )}
              style={{
                position: 'absolute',
                transform: `translateY(${startPosition}px)`,
                willChange: 'transform',
              }}
            >
              <p>Row {items[index]}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p>
          Rendered items range: {virtualItems[0].index} -{' '}
          {virtualItems[virtualItems.length - 1].index} ({virtualItems.length})
        </p>
      </div>
    </div>
  );
};

const meta: Meta<typeof ScrollListView> = {
  component: ScrollListView,
  title: 'Hooks/useVirtualScroll',
};

export default meta;

type Story = StoryObj<typeof ScrollListView>;

export const Container: Story = {};

export const Body: Story = {
  render: function Render() {
    const { getVirtualItems } = useVirtualScroll({
      itemCount: ITEMS_COUNT,
      estimateHeight: ITEM_HEIGHT,
      buffer: 10,
      scrollTarget: 'body',
    });

    const virtualItems = getVirtualItems();

    return (
      <div className="relative flex items-start gap-4 text-zinc-900 dark:text-zinc-200">
        <div className={cn('w-48 border border-zinc-200 dark:border-zinc-700')}>
          <div
            className="relative"
            style={{ height: ITEMS_COUNT * ITEM_HEIGHT }}
          >
            {virtualItems.map(({ startPosition, index }) => (
              <div
                key={`items-${index}`}
                className={cn(
                  'flex justify-center items-center w-full h-8',
                  'bg-zinc-50 dark:bg-zinc-900',
                  ' [&+&]:border-t border-zinc-300 dark:border-zinc-700',
                  index % 2 && 'bg-zinc-200/50 dark:bg-zinc-800/50',
                )}
                style={{
                  position: 'absolute',
                  transform: `translateY(${startPosition}px)`,
                  willChange: 'transform',
                }}
              >
                <p>Row {items[index]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="sticky top-4">
          <p>
            Rendered items range: {virtualItems[0].index} -{' '}
            {virtualItems[virtualItems.length - 1].index} ({virtualItems.length}
            )
          </p>
        </div>
      </div>
    );
  },
};
