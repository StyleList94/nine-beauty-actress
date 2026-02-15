import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { Button } from 'lib/components/button';

describe('Rendering and Props', () => {
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

  it('should render as child element with asChild', async () => {
    await render(
      <Button asChild variant="outline">
        <a href="/test">Link Button</a>
      </Button>,
    );

    const link = page.getByRole('link', { name: /Link Button/i });
    await expect.element(link).toBeInTheDocument();
    await expect.element(link).toHaveAttribute('href', '/test');
    await expect.element(link).toHaveAttribute('data-slot', 'button');
  });
});

describe('Interactions', () => {
  it('should handle keyboard Enter interaction', async () => {
    const handleKeyDown = vi.fn();
    const handleKeyUp = vi.fn();
    await render(
      <Button onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
        Press me
      </Button>,
    );

    const button = page.getByRole('button', { name: /Press me/i });
    await userEvent.click(button);
    await userEvent.keyboard('{Enter}');

    expect(handleKeyDown).toHaveBeenCalled();
    expect(handleKeyUp).toHaveBeenCalled();
  });

  it('should handle blur event', async () => {
    const handleBlur = vi.fn();
    await render(
      <div>
        <Button onBlur={handleBlur}>First</Button>
        <Button>Second</Button>
      </div>,
    );

    const first = page.getByRole('button', { name: /First/i });
    await userEvent.click(first);
    await userEvent.tab();

    expect(handleBlur).toHaveBeenCalled();
  });

  it('should handle pointercancel event', async () => {
    const handlePointerCancel = vi.fn();
    await render(
      <Button onPointerCancel={handlePointerCancel}>Cancel me</Button>,
    );

    const button = page.getByRole('button', { name: /Cancel me/i });
    button.element().dispatchEvent(
      new PointerEvent('pointercancel', { bubbles: true }),
    );

    expect(handlePointerCancel).toHaveBeenCalled();
  });

  it('should work with object ref', async () => {
    const ref = { current: null as HTMLButtonElement | null };
    await render(<Button ref={ref}>Ref Button</Button>);

    await expect
      .element(page.getByRole('button', { name: /Ref Button/i }))
      .toBeInTheDocument();
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
