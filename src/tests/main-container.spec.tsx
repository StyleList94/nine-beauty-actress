import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { MainContainer } from 'lib/components/main-container';

describe('Rendering and Props', () => {
  it('should render main element', async () => {
    await render(
      <MainContainer>
        <p>Main Content</p>
      </MainContainer>,
    );

    const main = page.getByRole('main');
    await expect.element(main).toBeInTheDocument();
  });

  it('should render children', async () => {
    await render(
      <MainContainer>
        <p>Crazy Love</p>
      </MainContainer>,
    );

    await expect
      .element(page.getByText('Crazy Love'))
      .toBeInTheDocument();
  });

  it('should apply custom className', async () => {
    await render(
      <MainContainer className="custom-main">
        <p>Content</p>
      </MainContainer>,
    );

    const main = page.getByRole('main');
    await expect.element(main).toHaveClass('custom-main');
  });
});
