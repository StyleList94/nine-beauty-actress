import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { Header } from 'lib/components/header';

describe('Rendering and Props', () => {
  it('should render header element', async () => {
    await render(<Header>Header Content</Header>);

    const header = page.getByRole('banner');
    await expect.element(header).toBeInTheDocument();
  });

  it('should render children content', async () => {
    await render(
      <Header>
        <span>StyleList94</span>
      </Header>,
    );

    await expect
      .element(page.getByText('StyleList94'))
      .toBeInTheDocument();
  });

  it('should apply custom wrapperStyle className', async () => {
    await render(
      <Header wrapperStyle="custom-wrapper">Content</Header>,
    );

    const header = page.getByRole('banner');
    await expect.element(header).toHaveClass('custom-wrapper');
  });

  it('should render navigation links', async () => {
    await render(
      <Header>
        <a href="https://github.com/StyleList94">GitHub</a>
        <span>My App</span>
      </Header>,
    );

    const link = page.getByRole('link', { name: 'GitHub' });
    await expect.element(link).toHaveAttribute(
      'href',
      'https://github.com/StyleList94',
    );
    await expect
      .element(page.getByText('My App'))
      .toBeInTheDocument();
  });
});
