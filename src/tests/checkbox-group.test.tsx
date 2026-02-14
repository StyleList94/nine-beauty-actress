import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import {
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupCaption,
  CheckboxGroupValidation,
} from 'lib/components/checkbox-group';
import {
  FormControl,
  FormControlLabel,
} from 'lib/components/form-control';
import { Checkbox } from 'lib/components/checkbox';

describe('CheckboxGroup', () => {
  it('should render as fieldset', () => {
    render(
      <CheckboxGroup data-testid="group">
        <CheckboxGroupLabel>알림 설정</CheckboxGroupLabel>
      </CheckboxGroup>,
    );

    const group = screen.getByTestId('group');
    expect(group.tagName).toBe('FIELDSET');
  });

  it('should render label as legend', () => {
    render(
      <CheckboxGroup>
        <CheckboxGroupLabel>알림 설정</CheckboxGroupLabel>
      </CheckboxGroup>,
    );

    const legend = screen.getByText('알림 설정');
    expect(legend.tagName).toBe('LEGEND');
  });

  it('should show required indicator on label', () => {
    render(
      <CheckboxGroup required>
        <CheckboxGroupLabel>알림 설정</CheckboxGroupLabel>
      </CheckboxGroup>,
    );

    const indicator = screen.getByText('*');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveAttribute(
      'data-slot',
      'checkbox-group-required',
    );
  });

  it('should set aria-required', () => {
    render(
      <CheckboxGroup required data-testid="group">
        <CheckboxGroupLabel>알림 설정</CheckboxGroupLabel>
      </CheckboxGroup>,
    );

    const group = screen.getByTestId('group');
    expect(group).toHaveAttribute('aria-required', 'true');
  });

  it('should link caption via aria-describedby', () => {
    render(
      <CheckboxGroup data-testid="group">
        <CheckboxGroupLabel>알림 설정</CheckboxGroupLabel>
        <CheckboxGroupCaption>
          받고 싶은 알림을 선택하세요.
        </CheckboxGroupCaption>
      </CheckboxGroup>,
    );

    const group = screen.getByTestId('group');
    const caption = screen.getByText('받고 싶은 알림을 선택하세요.');

    expect(group).toHaveAttribute('aria-describedby');
    expect(group.getAttribute('aria-describedby')).toContain(
      caption.getAttribute('id'),
    );
  });

  it('should link validation via aria-describedby', () => {
    render(
      <CheckboxGroup validation="error" data-testid="group">
        <CheckboxGroupLabel>알림 설정</CheckboxGroupLabel>
        <CheckboxGroupValidation>
          하나 이상 선택해주세요.
        </CheckboxGroupValidation>
      </CheckboxGroup>,
    );

    const group = screen.getByTestId('group');
    const validation = screen.getByText('하나 이상 선택해주세요.');

    expect(group).toHaveAttribute('aria-describedby');
    expect(group.getAttribute('aria-describedby')).toContain(
      validation.getAttribute('id'),
    );
  });

  it('should disable child checkboxes via fieldset disabled', () => {
    render(
      <CheckboxGroup disabled>
        <CheckboxGroupLabel>알림 설정</CheckboxGroupLabel>
        <FormControl layout="horizontal">
          <Checkbox />
          <FormControlLabel>이메일</FormControlLabel>
        </FormControl>
      </CheckboxGroup>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('should compose with FormControl for individual labels', () => {
    render(
      <CheckboxGroup>
        <CheckboxGroupLabel>알림 설정</CheckboxGroupLabel>
        <FormControl layout="horizontal">
          <Checkbox />
          <FormControlLabel>이메일 알림</FormControlLabel>
        </FormControl>
        <FormControl layout="horizontal">
          <Checkbox />
          <FormControlLabel>SMS 알림</FormControlLabel>
        </FormControl>
      </CheckboxGroup>,
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);

    const emailLabel = screen.getByText('이메일 알림');
    const smsLabel = screen.getByText('SMS 알림');

    expect(emailLabel).toHaveAttribute('for', checkboxes[0].getAttribute('id'));
    expect(smsLabel).toHaveAttribute('for', checkboxes[1].getAttribute('id'));
  });

  it('should set data attributes correctly', () => {
    render(
      <CheckboxGroup
        disabled
        required
        validation="error"
        data-testid="group"
      >
        <CheckboxGroupLabel>알림 설정</CheckboxGroupLabel>
      </CheckboxGroup>,
    );

    const group = screen.getByTestId('group');
    expect(group).toHaveAttribute('data-disabled', 'true');
    expect(group).toHaveAttribute('data-required', 'true');
    expect(group).toHaveAttribute('data-validation', 'error');
  });

  it('should set role and aria-live on validation', () => {
    render(
      <CheckboxGroup validation="error">
        <CheckboxGroupValidation>에러 메시지</CheckboxGroupValidation>
      </CheckboxGroup>,
    );

    const validation = screen.getByRole('alert');
    expect(validation).toHaveAttribute('aria-live', 'assertive');
    expect(validation).toHaveTextContent('에러 메시지');
  });
});
