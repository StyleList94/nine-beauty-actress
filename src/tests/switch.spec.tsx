import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { Switch } from 'lib/components/switch';

describe('Rendering and Props', () => {
  it('should render switch', async () => {
    await render(<Switch />);

    const switchEl = page.getByRole('switch');
    await expect.element(switchEl).toBeInTheDocument();
  });

  it('should be unchecked by default', async () => {
    await render(<Switch />);

    const switchEl = page.getByRole('switch');
    await expect.element(switchEl).not.toBeChecked();
  });

  it('should be disabled', async () => {
    await render(<Switch disabled />);

    const switchEl = page.getByRole('switch');
    await expect.element(switchEl).toBeDisabled();
  });

  it('should show unchecked icon when not checked', async () => {
    await render(
      <Switch>
        {[<span key="off">OFF</span>, <span key="on">ON</span>]}
      </Switch>,
    );

    await expect.element(page.getByText('OFF')).toBeInTheDocument();
    await expect
      .element(page.getByText('ON'))
      .not.toBeInTheDocument();
  });

  it('should show checked icon when checked', async () => {
    await render(
      <Switch checked>
        {[<span key="off">OFF</span>, <span key="on">ON</span>]}
      </Switch>,
    );

    await expect.element(page.getByText('ON')).toBeInTheDocument();
    await expect
      .element(page.getByText('OFF'))
      .not.toBeInTheDocument();
  });
});

describe('Interactions', () => {
  it('should toggle on click', async () => {
    await render(<Switch />);

    const switchEl = page.getByRole('switch');
    await expect.element(switchEl).not.toBeChecked();

    await userEvent.click(switchEl);
    await expect.element(switchEl).toBeChecked();

    await userEvent.click(switchEl);
    await expect.element(switchEl).not.toBeChecked();
  });

  it('should call onCheckedChange', async () => {
    const handleChange = vi.fn();
    await render(<Switch onCheckedChange={handleChange} />);

    const switchEl = page.getByRole('switch');
    await userEvent.click(switchEl);

    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
