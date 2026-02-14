import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import { FormControl } from 'lib/components/form-control';
import { TextInput } from 'lib/components/text-input';
import { Checkbox } from 'lib/components/checkbox';

describe('FormControl', () => {
  it('should render children', () => {
    render(
      <FormControl>
        <FormControl.Label>이메일</FormControl.Label>
        <TextInput placeholder="you@example.com" />
      </FormControl>,
    );

    expect(screen.getByText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('should auto-link label to input via id', () => {
    render(
      <FormControl>
        <FormControl.Label>이름</FormControl.Label>
        <TextInput />
      </FormControl>,
    );

    const label = screen.getByText('이름');
    const input = screen.getByRole('textbox');

    expect(label).toHaveAttribute('for');
    expect(input).toHaveAttribute('id', label.getAttribute('for'));
  });

  it('should link caption via aria-describedby', () => {
    render(
      <FormControl>
        <FormControl.Label>이메일</FormControl.Label>
        <TextInput />
        <FormControl.Caption>이메일은 공개되지 않습니다.</FormControl.Caption>
      </FormControl>,
    );

    const input = screen.getByRole('textbox');
    const caption = screen.getByText('이메일은 공개되지 않습니다.');

    expect(input).toHaveAttribute('aria-describedby');
    expect(input.getAttribute('aria-describedby')).toContain(
      caption.getAttribute('id'),
    );
  });

  it('should link validation via aria-describedby', () => {
    render(
      <FormControl validation="error">
        <FormControl.Label>이메일</FormControl.Label>
        <TextInput />
        <FormControl.Validation>
          올바른 이메일을 입력하세요.
        </FormControl.Validation>
      </FormControl>,
    );

    const input = screen.getByRole('textbox');
    const validation = screen.getByText('올바른 이메일을 입력하세요.');

    expect(input).toHaveAttribute('aria-describedby');
    expect(input.getAttribute('aria-describedby')).toContain(
      validation.getAttribute('id'),
    );
  });

  it('should set aria-invalid on error validation', () => {
    render(
      <FormControl validation="error">
        <TextInput />
      </FormControl>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should not set aria-invalid on success validation', () => {
    render(
      <FormControl validation="success">
        <TextInput />
      </FormControl>,
    );

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('should propagate disabled state', () => {
    render(
      <FormControl disabled>
        <FormControl.Label>이메일</FormControl.Label>
        <TextInput />
      </FormControl>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('should propagate required state', () => {
    render(
      <FormControl required>
        <FormControl.Label>이메일</FormControl.Label>
        <TextInput />
      </FormControl>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('should show required indicator on label', () => {
    render(
      <FormControl required>
        <FormControl.Label>이메일</FormControl.Label>
        <TextInput />
      </FormControl>,
    );

    const indicator = screen.getByText('*');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveAttribute(
      'data-slot',
      'form-control-required',
    );
  });

  it('should allow external props to override context', () => {
    render(
      <FormControl required>
        <FormControl.Label htmlFor="custom-id">이메일</FormControl.Label>
        <TextInput id="custom-id" disabled={false} required={false} />
      </FormControl>,
    );

    const label = screen.getByText('이메일');
    const input = screen.getByRole('textbox');

    expect(label).toHaveAttribute('for', 'custom-id');
    expect(input).toHaveAttribute('id', 'custom-id');
    expect(input).not.toBeDisabled();
    expect(input).not.toBeRequired();
  });

  it('should work standalone without FormControl', () => {
    render(<TextInput id="standalone" placeholder="standalone" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'standalone');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('should work with Checkbox', () => {
    render(
      <FormControl layout="horizontal">
        <Checkbox />
        <FormControl.Label>동의합니다</FormControl.Label>
      </FormControl>,
    );

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('동의합니다');

    expect(checkbox).toHaveAttribute('id', label.getAttribute('for'));
  });

  it('should set data attributes correctly', () => {
    render(
      <FormControl
        disabled
        required
        validation="error"
        layout="horizontal"
        data-testid="fc"
      >
        <TextInput />
      </FormControl>,
    );

    const fc = screen.getByTestId('fc');
    expect(fc).toHaveAttribute('data-disabled', 'true');
    expect(fc).toHaveAttribute('data-required', 'true');
    expect(fc).toHaveAttribute('data-validation', 'error');
    expect(fc).toHaveAttribute('data-layout', 'horizontal');
  });

  it('should set role and aria-live on validation', () => {
    render(
      <FormControl validation="error">
        <FormControl.Validation>에러 메시지</FormControl.Validation>
      </FormControl>,
    );

    const validation = screen.getByRole('alert');
    expect(validation).toHaveAttribute('aria-live', 'assertive');
    expect(validation).toHaveTextContent('에러 메시지');
  });
});
