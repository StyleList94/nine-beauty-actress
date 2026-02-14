import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import {
  FormControl,
  FormControlLabel,
  FormControlCaption,
  FormControlValidation,
} from 'lib/components/form-control';
import { Input } from 'lib/components/input';
import { Checkbox } from 'lib/components/checkbox';

describe('FormControl', () => {
  it('should render children', () => {
    render(
      <FormControl>
        <FormControlLabel>이메일</FormControlLabel>
        <Input placeholder="you@example.com" />
      </FormControl>,
    );

    expect(screen.getByText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('should auto-link label to input via id', () => {
    render(
      <FormControl>
        <FormControlLabel>이름</FormControlLabel>
        <Input />
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
        <FormControlLabel>이메일</FormControlLabel>
        <Input />
        <FormControlCaption>이메일은 공개되지 않습니다.</FormControlCaption>
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
        <FormControlLabel>이메일</FormControlLabel>
        <Input />
        <FormControlValidation>
          올바른 이메일을 입력하세요.
        </FormControlValidation>
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
        <Input />
      </FormControl>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should not set aria-invalid on success validation', () => {
    render(
      <FormControl validation="success">
        <Input />
      </FormControl>,
    );

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('should propagate disabled state', () => {
    render(
      <FormControl disabled>
        <FormControlLabel>이메일</FormControlLabel>
        <Input />
      </FormControl>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('should propagate required state', () => {
    render(
      <FormControl required>
        <FormControlLabel>이메일</FormControlLabel>
        <Input />
      </FormControl>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('should show required indicator on label', () => {
    render(
      <FormControl required>
        <FormControlLabel>이메일</FormControlLabel>
        <Input />
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
        <FormControlLabel htmlFor="custom-id">이메일</FormControlLabel>
        <Input id="custom-id" disabled={false} required={false} />
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
    render(<Input id="standalone" placeholder="standalone" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'standalone');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('should work with Checkbox', () => {
    render(
      <FormControl layout="horizontal">
        <Checkbox />
        <FormControlLabel>동의합니다</FormControlLabel>
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
        <Input />
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
        <FormControlValidation>에러 메시지</FormControlValidation>
      </FormControl>,
    );

    const validation = screen.getByRole('alert');
    expect(validation).toHaveAttribute('aria-live', 'assertive');
    expect(validation).toHaveTextContent('에러 메시지');
  });
});
