import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { Code } from 'lib/components/code';

describe('Rendering and Props', () => {
  it('should render code element with children text', async () => {
    await render(<Code>console.log</Code>);

    const code = page.getByText('console.log');
    await expect.element(code).toBeInTheDocument();
  });

  it('should apply custom className', async () => {
    await render(<Code className="custom-class">snippet</Code>);

    const code = page.getByText('snippet');
    await expect.element(code).toHaveClass('custom-class');
  });

  it('should have data-slot="code"', async () => {
    await render(<Code>snippet</Code>);

    const code = page.getByText('snippet');
    await expect.element(code).toHaveAttribute('data-slot', 'code');
  });

  it('should render inline code content within a paragraph', async () => {
    await render(
      <p>
        Install with <Code>pnpm add nine-beauty-actress</Code> command
      </p>,
    );

    const code = page.getByText('pnpm add nine-beauty-actress');
    await expect.element(code).toBeInTheDocument();
  });
});
