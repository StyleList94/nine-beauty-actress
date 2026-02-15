import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { Checkbox } from 'lib/components/checkbox';
import { FormControl } from 'lib/components/form-control';

describe('Rendering and Props', () => {
  it('should render checkbox', async () => {
    await render(<Checkbox />);
    const checkbox = page.getByRole('checkbox');
    await expect.element(checkbox).toBeInTheDocument();
  });

  it('should have data-slot attribute', async () => {
    await render(<Checkbox />);
    const checkbox = page.getByRole('checkbox');
    await expect.element(checkbox).toHaveAttribute('data-slot', 'checkbox');
  });
});

describe('State', () => {
  it('should be unchecked by default', async () => {
    await render(<Checkbox />);
    const checkbox = page.getByRole('checkbox');
    await expect.element(checkbox).not.toBeChecked();
  });

  it('should be checked when checked prop is true', async () => {
    await render(<Checkbox checked />);
    const checkbox = page.getByRole('checkbox');
    await expect.element(checkbox).toBeChecked();
  });

  it('should toggle on click', async () => {
    const handleChange = vi.fn();
    await render(<Checkbox onCheckedChange={handleChange} />);
    const checkbox = page.getByRole('checkbox');

    await checkbox.click();
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('should call onCheckedChange callback', async () => {
    const handleChange = vi.fn();
    await render(<Checkbox checked onCheckedChange={handleChange} />);
    const checkbox = page.getByRole('checkbox');

    await checkbox.click();
    expect(handleChange).toHaveBeenCalledOnce();
  });
});

describe('Form State', () => {
  it('should be disabled when disabled prop is true', async () => {
    await render(<Checkbox disabled />);
    const checkbox = page.getByRole('checkbox');
    await expect.element(checkbox).toBeDisabled();
  });
});

describe('FormControl Integration', () => {
  it('should receive id from FormControl', async () => {
    await render(
      <FormControl id="my-checkbox">
        <Checkbox />
      </FormControl>,
    );
    const checkbox = page.getByRole('checkbox');
    await expect.element(checkbox).toHaveAttribute('id', 'my-checkbox');
  });

  it('should be disabled via FormControl', async () => {
    await render(
      <FormControl disabled>
        <Checkbox />
      </FormControl>,
    );
    const checkbox = page.getByRole('checkbox');
    await expect.element(checkbox).toBeDisabled();
  });

  it('should have aria-invalid when FormControl has error validation', async () => {
    await render(
      <FormControl validation="error">
        <Checkbox />
      </FormControl>,
    );
    const checkbox = page.getByRole('checkbox');
    await expect.element(checkbox).toHaveAttribute('aria-invalid', 'true');
  });
});
