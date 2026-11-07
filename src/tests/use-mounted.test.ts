import { createElement, Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import { render, renderHook, screen } from '@testing-library/react';

import useMounted from 'lib/hooks/use-mounted';

describe('useMounted', () => {
  const BrowserContent = () => {
    const ready = useMounted();
    return createElement('p', null, ready ? 'Browser ready' : 'Not ready');
  };

  it('renders the nearest Suspense fallback on the server', () => {
    const html = renderToString(
      createElement(
        Suspense,
        { fallback: createElement('span', null, 'Server fallback') },
        createElement(BrowserContent),
      ),
    );

    expect(html).toContain('Server fallback');
    expect(html).not.toContain('<p>Not ready</p>');
  });

  it('renders browser content without waiting for a mounted-state update', () => {
    render(
      createElement(
        Suspense,
        { fallback: createElement('span', null, 'Server fallback') },
        createElement(BrowserContent),
      ),
    );

    expect(screen.getByText('Browser ready')).toBeDefined();
    expect(screen.queryByText('Server fallback')).toBeNull();
  });

  it('should return true', () => {
    const { result } = renderHook(() => useMounted());

    expect(result.current).toBe(true);
  });
});
