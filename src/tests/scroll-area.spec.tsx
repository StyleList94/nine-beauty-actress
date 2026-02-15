import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { ScrollArea } from 'lib/components/scroll-area';

describe('Rendering and Props', () => {
  it('should render children', async () => {
    await render(
      <ScrollArea style={{ height: 200 }}>
        <p>Scroll content</p>
      </ScrollArea>,
    );
    await expect
      .element(page.getByText('Scroll content'))
      .toBeInTheDocument();
  });

  it('should have data-slot attribute', async () => {
    await render(
      <ScrollArea data-testid="scroll" style={{ height: 200 }}>
        <p>Content</p>
      </ScrollArea>,
    );
    const scrollArea = page.getByTestId('scroll');
    await expect
      .element(scrollArea)
      .toHaveAttribute('data-slot', 'scroll-area');
  });

  it('should contain content inside viewport', async () => {
    await render(
      <ScrollArea style={{ height: 100, width: 200 }}>
        <div style={{ height: 500, width: 200 }}>Tall content</div>
      </ScrollArea>,
    );
    await expect
      .element(page.getByText('Tall content'))
      .toBeInTheDocument();
  });

  it('should apply custom className', async () => {
    await render(
      <ScrollArea data-testid="scroll" className="custom-scroll">
        <p>Content</p>
      </ScrollArea>,
    );
    const scrollArea = page.getByTestId('scroll');
    await expect.element(scrollArea).toHaveClass('custom-scroll');
  });
});
