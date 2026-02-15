import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { CheckboxGroup } from 'lib/components/checkbox-group';
import { FormControl } from 'lib/components/form-control';
import { Checkbox } from 'lib/components/checkbox';

describe('Rendering and Props', () => {
  it('should render as fieldset', async () => {
    await render(
      <CheckboxGroup>
        <CheckboxGroup.Label>알림 설정</CheckboxGroup.Label>
      </CheckboxGroup>,
    );

    const group = page.getByRole('group');
    await expect.element(group).toBeInTheDocument();
  });

  it('should render label as legend', async () => {
    await render(
      <CheckboxGroup>
        <CheckboxGroup.Label>알림 설정</CheckboxGroup.Label>
      </CheckboxGroup>,
    );

    await expect
      .element(page.getByText('알림 설정'))
      .toBeInTheDocument();
  });

  it('should show required indicator with data-slot', async () => {
    await render(
      <CheckboxGroup required>
        <CheckboxGroup.Label>알림 설정</CheckboxGroup.Label>
      </CheckboxGroup>,
    );

    const indicator = page.getByText('*');
    await expect.element(indicator).toBeInTheDocument();
    await expect
      .element(indicator)
      .toHaveAttribute('data-slot', 'checkbox-group-required');
  });

  it('should compose with FormControl for individual labels', async () => {
    await render(
      <CheckboxGroup>
        <CheckboxGroup.Label>알림 설정</CheckboxGroup.Label>
        <FormControl layout="horizontal">
          <Checkbox />
          <FormControl.Label>이메일 알림</FormControl.Label>
        </FormControl>
        <FormControl layout="horizontal">
          <Checkbox />
          <FormControl.Label>SMS 알림</FormControl.Label>
        </FormControl>
      </CheckboxGroup>,
    );

    const checkboxes = page.getByRole('checkbox');
    await expect.element(checkboxes.nth(0)).toBeInTheDocument();
    await expect.element(checkboxes.nth(1)).toBeInTheDocument();

    const emailLabel = page.getByText('이메일 알림');
    const smsLabel = page.getByText('SMS 알림');

    const firstCheckboxId = checkboxes
      .nth(0)
      .element()
      .getAttribute('id');
    const secondCheckboxId = checkboxes
      .nth(1)
      .element()
      .getAttribute('id');

    await expect
      .element(emailLabel)
      .toHaveAttribute('for', firstCheckboxId ?? '');
    await expect
      .element(smsLabel)
      .toHaveAttribute('for', secondCheckboxId ?? '');
  });
});

describe('Accessibility', () => {
  it('should set aria-required on fieldset', async () => {
    await render(
      <CheckboxGroup required>
        <CheckboxGroup.Label>알림 설정</CheckboxGroup.Label>
      </CheckboxGroup>,
    );

    const group = page.getByRole('group');
    await expect
      .element(group)
      .toHaveAttribute('aria-required', 'true');
  });

  it('should link caption via aria-describedby on fieldset', async () => {
    await render(
      <CheckboxGroup>
        <CheckboxGroup.Label>알림 설정</CheckboxGroup.Label>
        <CheckboxGroup.Caption>
          받고 싶은 알림을 선택하세요.
        </CheckboxGroup.Caption>
      </CheckboxGroup>,
    );

    const group = page.getByRole('group');
    const caption = page.getByText('받고 싶은 알림을 선택하세요.');

    await expect.element(group).toHaveAttribute('aria-describedby');

    const captionId = caption.element().getAttribute('id');
    const describedBy = group.element().getAttribute('aria-describedby');
    expect(describedBy).toContain(captionId);
  });

  it('should link validation via aria-describedby on fieldset', async () => {
    await render(
      <CheckboxGroup validation="error">
        <CheckboxGroup.Label>알림 설정</CheckboxGroup.Label>
        <CheckboxGroup.Validation>
          하나 이상 선택해주세요.
        </CheckboxGroup.Validation>
      </CheckboxGroup>,
    );

    const group = page.getByRole('group');
    const validation = page.getByText('하나 이상 선택해주세요.');

    await expect.element(group).toHaveAttribute('aria-describedby');

    const validationId = validation.element().getAttribute('id');
    const describedBy = group.element().getAttribute('aria-describedby');
    expect(describedBy).toContain(validationId);
  });

  it('should disable child checkboxes via fieldset disabled', async () => {
    await render(
      <CheckboxGroup disabled>
        <CheckboxGroup.Label>알림 설정</CheckboxGroup.Label>
        <FormControl layout="horizontal">
          <Checkbox />
          <FormControl.Label>이메일</FormControl.Label>
        </FormControl>
      </CheckboxGroup>,
    );

    const checkbox = page.getByRole('checkbox');
    await expect.element(checkbox).toBeDisabled();
  });

  it('should set role="alert" and aria-live="assertive" on validation', async () => {
    await render(
      <CheckboxGroup validation="error">
        <CheckboxGroup.Validation>에러 메시지</CheckboxGroup.Validation>
      </CheckboxGroup>,
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
      <CheckboxGroup validation="error">
        <CheckboxGroup.Label>Options</CheckboxGroup.Label>
        <CheckboxGroup.Validation variant="success">
          성공 메시지
        </CheckboxGroup.Validation>
      </CheckboxGroup>,
    );

    const validation = page.getByRole('alert');
    await expect
      .element(validation)
      .toHaveAttribute('data-variant', 'success');
  });
});

describe('Data Attributes', () => {
  it('should set data attributes correctly', async () => {
    await render(
      <CheckboxGroup disabled required validation="error">
        <CheckboxGroup.Label>알림 설정</CheckboxGroup.Label>
      </CheckboxGroup>,
    );

    const group = page.getByRole('group');
    await expect
      .element(group)
      .toHaveAttribute('data-disabled', 'true');
    await expect
      .element(group)
      .toHaveAttribute('data-required', 'true');
    await expect
      .element(group)
      .toHaveAttribute('data-validation', 'error');
  });
});
