import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { Footer } from 'lib/components/footer';

describe('Rendering and Props', () => {
  it('should render footer element', async () => {
    await render(<Footer>Footer Content</Footer>);

    const footer = page.getByRole('contentinfo');
    await expect.element(footer).toBeInTheDocument();
  });

  it('should render children content', async () => {
    await render(
      <Footer>
        <p>Copyright 2025</p>
      </Footer>,
    );

    await expect
      .element(page.getByText('Copyright 2025'))
      .toBeInTheDocument();
  });

  it('should apply custom className', async () => {
    await render(<Footer className="custom-footer">Content</Footer>);

    const footer = page.getByRole('contentinfo');
    await expect.element(footer).toHaveClass('custom-footer');
  });

  it('should render multiple children', async () => {
    await render(
      <Footer>
        <a href="https://example.com">Blog</a>
        <span>StyleList94</span>
      </Footer>,
    );

    await expect
      .element(page.getByText('Blog'))
      .toBeInTheDocument();
    await expect
      .element(page.getByText('StyleList94'))
      .toBeInTheDocument();
  });
});
