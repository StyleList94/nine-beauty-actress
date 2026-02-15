import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { TextInput } from 'lib/components/text-input';
import { FormControl } from 'lib/components/form-control';

describe('Rendering and Props', () => {
  it('should render textbox', async () => {
    await render(<TextInput />);

    const input = page.getByRole('textbox');
    await expect.element(input).toBeInTheDocument();
  });

  it('should render with placeholder', async () => {
    await render(<TextInput placeholder="Enter email" />);

    const input = page.getByPlaceholder('Enter email');
    await expect.element(input).toBeInTheDocument();
  });

  it('should have data-slot="input"', async () => {
    await render(<TextInput />);

    const input = page.getByRole('textbox');
    await expect.element(input).toHaveAttribute('data-slot', 'input');
  });

  it('should be disabled', async () => {
    await render(<TextInput disabled />);

    const input = page.getByRole('textbox');
    await expect.element(input).toBeDisabled();
  });

  it('should be required', async () => {
    await render(<TextInput required />);

    const input = page.getByRole('textbox');
    await expect.element(input).toBeRequired();
  });
});

describe('User Interaction', () => {
  it('should accept user input via fill', async () => {
    await render(<TextInput />);

    const input = page.getByRole('textbox');
    await userEvent.fill(input, 'hello world');

    await expect.element(input).toHaveValue('hello world');
  });

  it('should call onChange handler', async () => {
    const handleChange = vi.fn();
    await render(<TextInput onChange={handleChange} />);

    const input = page.getByRole('textbox');
    await userEvent.fill(input, 'test');

    expect(handleChange).toHaveBeenCalled();
  });
});

describe('FormControl Integration', () => {
  it('should receive id from FormControl context', async () => {
    await render(
      <FormControl id="email-field">
        <FormControl.Label>Email</FormControl.Label>
        <TextInput />
      </FormControl>,
    );

    const input = page.getByRole('textbox');
    await expect.element(input).toHaveAttribute('id', 'email-field');
  });

  it('should receive disabled from FormControl context', async () => {
    await render(
      <FormControl disabled>
        <FormControl.Label>Email</FormControl.Label>
        <TextInput />
      </FormControl>,
    );

    const input = page.getByRole('textbox');
    await expect.element(input).toBeDisabled();
  });

  it('should receive aria-invalid on error validation', async () => {
    await render(
      <FormControl validation="error">
        <FormControl.Label>Email</FormControl.Label>
        <TextInput />
        <FormControl.Validation>
          Email is required
        </FormControl.Validation>
      </FormControl>,
    );

    const input = page.getByRole('textbox');
    await expect.element(input).toHaveAttribute('aria-invalid', 'true');
  });
});
