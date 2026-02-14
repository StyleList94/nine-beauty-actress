import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { Button } from 'lib/components/button';

describe('Button', () => {
  it('should render', async () => {
    await render(<Button>Click me</Button>);

    const button = page.getByRole('button', { name: /Click me/i });
    await expect.element(button).toBeInTheDocument();
  });

  it('should be clickable', async () => {
    const handleClick = vi.fn();
    await render(<Button onClick={handleClick}>Click me</Button>);

    const button = page.getByRole('button', { name: /Click me/i });
    await button.click();

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('should be disabled', async () => {
    await render(<Button disabled>Disabled</Button>);

    const button = page.getByRole('button', { name: /Disabled/i });
    await expect.element(button).toBeDisabled();
  });
});
