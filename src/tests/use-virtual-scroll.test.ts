import type { Mock } from 'vitest';

import { renderHook, act } from '@testing-library/react';

import useVirtualScroll from 'lib/hooks/use-virtual-scroll';

vi.mock('lib/core/utils', () => ({
  debounce: vi.fn,
}));

describe('useVirtualScroll', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 500,
    });
  });

  test('body scrolling', () => {
    const { result } = renderHook(() =>
      useVirtualScroll({
        itemCount: 100,
        estimateHeight: 50,
        scrollTarget: 'body',
        buffer: 4,
      }),
    );

    expect(result.current.itemRange[0]).toBe(0);

    const items = result.current.getVirtualItems();

    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBe(
      result.current.itemRange[1] - result.current.itemRange[0],
    );
    expect(items[0]).toHaveProperty('index');
    expect(items[0]).toHaveProperty('startPosition');
    expect(items[0].startPosition).toBe(items[0].index * 50);

    act(() => {
      window.scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.itemRange[0]).toBeGreaterThan(0);
  });

  test('container scrolling', () => {
    const container = {
      current: {
        scrollTop: 0,
        clientHeight: 500,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as unknown as HTMLDivElement,
    };

    const { result } = renderHook(() =>
      useVirtualScroll({
        itemCount: 100,
        estimateHeight: 50,
        scrollTarget: 'container',
        containerRef: container,
        buffer: 4,
      }),
    );

    expect(result.current.itemRange[0]).toBe(0);

    act(() => {
      container.current.scrollTop = 150;
      (container.current.addEventListener as Mock).mock.calls.forEach(
        ([event, handler]) => {
          if (event === 'scroll') {
            (handler as Mock)();
          }
        },
      );
    });

    expect(result.current.itemRange[0]).toBeGreaterThan(0);
  });

  test('missing containerRef graceful fallback', () => {
    const { result } = renderHook(() =>
      useVirtualScroll({
        itemCount: 10,
        estimateHeight: 40,
        scrollTarget: 'container',
        buffer: 4,
      }),
    );

    expect(result.current.itemRange[0]).toBe(0);
    expect(Array.isArray(result.current.getVirtualItems())).toBe(true);
  });

  test('default parameters', () => {
    const container = {
      current: {
        scrollTop: 0,
        clientHeight: 500,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as unknown as HTMLDivElement,
    };

    const { result } = renderHook(() =>
      useVirtualScroll({
        itemCount: 50,
        estimateHeight: 30,
        containerRef: container,
        heightOffset: 10,
      }),
    );

    expect(result.current.itemRange[0]).toBe(0);
  });

  test('container ref becomes null during scroll', () => {
    const container: { current: HTMLDivElement | null } = {
      current: {
        scrollTop: 0,
        clientHeight: 500,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as unknown as HTMLDivElement,
    };

    const { result } = renderHook(() =>
      useVirtualScroll({
        itemCount: 100,
        estimateHeight: 50,
        scrollTarget: 'container',
        containerRef: container as { current: HTMLDivElement },
        buffer: 4,
      }),
    );

    const node = container.current;
    const scrollHandler = (
      (node as unknown as { addEventListener: Mock }).addEventListener
    ).mock.calls.find(
      ([event]: [string]) => event === 'scroll',
    )?.[1] as () => void;

    container.current = null;

    act(() => {
      scrollHandler();
    });

    expect(result.current.itemRange[0]).toBe(0);
  });
});
