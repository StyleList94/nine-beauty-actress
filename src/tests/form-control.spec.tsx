import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { FormControl } from 'lib/components/form-control';
import { TextInput } from 'lib/components/text-input';
import { Checkbox } from 'lib/components/checkbox';

describe('Rendering and Props', () => {
  it('should render children', async () => {
    await render(
      <FormControl>
        <FormControl.Label>이메일</FormControl.Label>
        <TextInput placeholder="you@example.com" />
      </FormControl>,
    );

    await expect.element(page.getByText('이메일')).toBeInTheDocument();
    await expect
      .element(page.getByPlaceholder('you@example.com'))
      .toBeInTheDocument();
  });

  it('should auto-link label to input via id', async () => {
    await render(
      <FormControl>
        <FormControl.Label>이름</FormControl.Label>
        <TextInput />
      </FormControl>,
    );

    const label = page.getByText('이름');
    const input = page.getByRole('textbox');

    await expect.element(label).toHaveAttribute('for');

    const forValue = label.element().getAttribute('for');
    await expect.element(input).toHaveAttribute('id', forValue ?? '');
  });

  it('should work standalone without FormControl', async () => {
    await render(<TextInput id="standalone" placeholder="standalone" />);

    const input = page.getByRole('textbox');
    await expect.element(input).toHaveAttribute('id', 'standalone');
    await expect.element(input).not.toHaveAttribute('aria-describedby');
  });

  it('should work with Checkbox', async () => {
    await render(
      <FormControl layout="horizontal">
        <Checkbox />
        <FormControl.Label>동의합니다</FormControl.Label>
      </FormControl>,
    );

    const checkbox = page.getByRole('checkbox');
    const label = page.getByText('동의합니다');

    const forValue = label.element().getAttribute('for');
    await expect.element(checkbox).toHaveAttribute('id', forValue ?? '');
  });
});

describe('Accessibility', () => {
  it('should link caption via aria-describedby', async () => {
    await render(
      <FormControl>
        <FormControl.Label>이메일</FormControl.Label>
        <TextInput />
        <FormControl.Caption>
          이메일은 공개되지 않습니다.
        </FormControl.Caption>
      </FormControl>,
    );

    const input = page.getByRole('textbox');
    const caption = page.getByText('이메일은 공개되지 않습니다.');

    await expect.element(input).toHaveAttribute('aria-describedby');

    const captionId = caption.element().getAttribute('id');
    const describedBy = input.element().getAttribute('aria-describedby');
    expect(describedBy).toContain(captionId);
  });

  it('should link validation via aria-describedby', async () => {
    await render(
      <FormControl validation="error">
        <FormControl.Label>이메일</FormControl.Label>
        <TextInput />
        <FormControl.Validation>
          올바른 이메일을 입력하세요.
        </FormControl.Validation>
      </FormControl>,
    );

    const input = page.getByRole('textbox');
    const validation = page.getByText('올바른 이메일을 입력하세요.');

    await expect.element(input).toHaveAttribute('aria-describedby');

    const validationId = validation.element().getAttribute('id');
    const describedBy = input.element().getAttribute('aria-describedby');
    expect(describedBy).toContain(validationId);
  });

  it('should set aria-invalid on error validation', async () => {
    await render(
      <FormControl validation="error">
        <TextInput />
      </FormControl>,
    );

    const input = page.getByRole('textbox');
    await expect.element(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should not set aria-invalid on success validation', async () => {
    await render(
      <FormControl validation="success">
        <TextInput />
      </FormControl>,
    );

    const input = page.getByRole('textbox');
    await expect.element(input).not.toHaveAttribute('aria-invalid');
  });

  it('should set role="alert" and aria-live="assertive" on validation', async () => {
    await render(
      <FormControl validation="error">
        <FormControl.Validation>에러 메시지</FormControl.Validation>
      </FormControl>,
    );

    const validation = page.getByRole('alert');
    await expect.element(validation).toHaveAttribute(
      'aria-live',
      'assertive',
    );
    await expect.element(validation).toHaveTextContent('에러 메시지');
  });

  it('should allow Validation variant override', async () => {
    await render(
      <FormControl validation="error">
        <FormControl.Label>Field</FormControl.Label>
        <TextInput />
        <FormControl.Validation variant="success">
          성공 메시지
        </FormControl.Validation>
      </FormControl>,
    );

    const validation = page.getByRole('alert');
    await expect
      .element(validation)
      .toHaveAttribute('data-variant', 'success');
  });
});

describe('State Propagation', () => {
  it('should propagate disabled state', async () => {
    await render(
      <FormControl disabled>
        <FormControl.Label>이메일</FormControl.Label>
        <TextInput />
      </FormControl>,
    );

    const input = page.getByRole('textbox');
    await expect.element(input).toBeDisabled();
  });

  it('should propagate required state', async () => {
    await render(
      <FormControl required>
        <FormControl.Label>이메일</FormControl.Label>
        <TextInput />
      </FormControl>,
    );

    const input = page.getByRole('textbox');
    await expect.element(input).toBeRequired();
  });

  it('should show required indicator', async () => {
    await render(
      <FormControl required>
        <FormControl.Label>이메일</FormControl.Label>
        <TextInput />
      </FormControl>,
    );

    const indicator = page.getByText('*');
    await expect.element(indicator).toBeInTheDocument();
    await expect
      .element(indicator)
      .toHaveAttribute('data-slot', 'form-control-required');
  });

  it('should allow external props to override context', async () => {
    await render(
      <FormControl required>
        <FormControl.Label htmlFor="custom-id">이메일</FormControl.Label>
        <TextInput id="custom-id" disabled={false} required={false} />
      </FormControl>,
    );

    const label = page.getByText('이메일');
    const input = page.getByRole('textbox');

    await expect.element(label).toHaveAttribute('for', 'custom-id');
    await expect.element(input).toHaveAttribute('id', 'custom-id');
    await expect.element(input).not.toBeDisabled();
    await expect.element(input).not.toBeRequired();
  });
});

describe('Data Attributes', () => {
  it('should set data attributes correctly', async () => {
    await render(
      <FormControl
        data-testid="fc"
        disabled
        required
        validation="error"
        layout="horizontal"
      >
        <TextInput />
      </FormControl>,
    );

    const fc = page.getByTestId('fc');
    await expect
      .element(fc)
      .toHaveAttribute('data-disabled', 'true');
    await expect
      .element(fc)
      .toHaveAttribute('data-required', 'true');
    await expect
      .element(fc)
      .toHaveAttribute('data-validation', 'error');
    await expect
      .element(fc)
      .toHaveAttribute('data-layout', 'horizontal');
  });
});
