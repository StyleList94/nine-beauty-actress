import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { Separator } from 'lib/components/separator';

describe('Rendering and Props', () => {
  it('should render separator with role when decorative is false', async () => {
    await render(<Separator decorative={false} />);

    const separator = page.getByRole('separator');
    await expect.element(separator).toBeInTheDocument();
  });

  it('should have data-slot="separator"', async () => {
    await render(<Separator decorative={false} />);

    const separator = page.getByRole('separator');
    await expect
      .element(separator)
      .toHaveAttribute('data-slot', 'separator');
  });

  it('should apply custom className', async () => {
    await render(
      <Separator decorative={false} className="custom-separator" />,
    );

    const separator = page.getByRole('separator');
    await expect.element(separator).toHaveClass('custom-separator');
  });
});

describe('Accessibility', () => {
  it('should have horizontal orientation by default', async () => {
    await render(<Separator decorative={false} />);

    const separator = page.getByRole('separator');
    // Radix omits aria-orientation for default horizontal, check data-orientation
    await expect
      .element(separator)
      .toHaveAttribute('data-orientation', 'horizontal');
  });

  it('should support vertical orientation', async () => {
    await render(
      <div style={{ display: 'flex', height: '100px' }}>
        <Separator orientation="vertical" decorative={false} />
      </div>,
    );

    const separator = page.getByRole('separator');
    await expect
      .element(separator)
      .toHaveAttribute('aria-orientation', 'vertical');
  });

  it('should be decorative by default with role="none"', async () => {
    await render(<Separator data-testid="sep" />);

    const separator = page.getByTestId('sep');
    await expect.element(separator).toHaveRole('none');
  });
});
