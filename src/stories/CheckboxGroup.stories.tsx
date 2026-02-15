import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { CheckboxGroup } from 'lib/components/checkbox-group';
import { FormControl } from 'lib/components/form-control';
import { Checkbox } from 'lib/components/checkbox';

type DefaultArgs = {
  _disabled: boolean;
  _required: boolean;
  _validation: 'none' | 'error' | 'success';
  _labelChildren: string;
  _captionChildren: string;
  _validationChildren: string;
  _validationVariant: string;
};

const meta: Meta<typeof CheckboxGroup> = {
  component: CheckboxGroup,
  title: 'UI/CheckboxGroup',
  tags: ['autodocs'],
  argTypes: {
    disabled: { table: { disable: true } },
    required: { table: { disable: true } },
    validation: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '체크박스들을 하나로 묶어줄게',
      },
    },
  },
};

export default meta;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

export const Default: StoryObj<DefaultArgs> = {
  argTypes: {
    _disabled: {
      name: 'disabled',
      control: 'boolean',
      description: '비활성화 상태 (하위 체크박스에 자동 전파)',
      table: {
        category: 'CheckboxGroup',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    _required: {
      name: 'required',
      control: 'boolean',
      description: '필수 선택 여부',
      table: {
        category: 'CheckboxGroup',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    _validation: {
      name: 'validation',
      control: 'select',
      options: ['none', 'error', 'success'],
      description: '그룹 유효성 검사 상태',
      table: {
        category: 'CheckboxGroup',
        type: { summary: "'error' | 'success'" },
      },
    },
    _labelChildren: {
      name: 'children',
      control: false,
      description: '그룹 레이블을 지정합니다',
      table: {
        category: 'CheckboxGroup.Label',
        type: { summary: 'ReactNode' },
      },
    },
    _captionChildren: {
      name: 'children',
      control: false,
      description: '그룹 힌트 텍스트를 지정합니다',
      table: {
        category: 'CheckboxGroup.Caption',
        type: { summary: 'ReactNode' },
      },
    },
    _validationChildren: {
      name: 'children',
      control: false,
      description: '유효성 메시지를 지정합니다',
      table: {
        category: 'CheckboxGroup.Validation',
        type: { summary: 'ReactNode' },
      },
    },
    _validationVariant: {
      name: 'variant',
      control: false,
      description: '유효성 검사 시각적 변형 (기본: context의 validation 값)',
      table: {
        category: 'CheckboxGroup.Validation',
        type: { summary: "'error' | 'success'" },
      },
    },
  },
  args: {
    _disabled: false,
    _required: false,
    _validation: 'none',
  },
  render: function Render(args) {
    const [values, setValues] = useState<Record<string, boolean>>({
      email: false,
      sms: false,
      push: false,
    });

    const toggle = (key: string) => (checked: boolean | 'indeterminate') =>
      setValues((prev) => ({ ...prev, [key]: checked === true }));

    return (
      <div className="w-80">
        <CheckboxGroup
          disabled={args._disabled}
          required={args._required}
          validation={
            args._validation === 'none' ? undefined : args._validation
          }
        >
          <CheckboxGroup.Label>알림 설정</CheckboxGroup.Label>
          <CheckboxGroup.Caption>
            받고 싶은 알림을 선택하세요.
          </CheckboxGroup.Caption>
          <FormControl layout="horizontal">
            <Checkbox
              checked={values.email}
              onCheckedChange={toggle('email')}
            />
            <FormControl.Label>이메일 알림</FormControl.Label>
          </FormControl>
          <FormControl layout="horizontal">
            <Checkbox
              checked={values.sms}
              onCheckedChange={toggle('sms')}
            />
            <FormControl.Label>SMS 알림</FormControl.Label>
          </FormControl>
          <FormControl layout="horizontal">
            <Checkbox
              checked={values.push}
              onCheckedChange={toggle('push')}
            />
            <FormControl.Label>푸시 알림</FormControl.Label>
          </FormControl>
          {args._validation === 'error' && (
            <CheckboxGroup.Validation>
              하나 이상 선택해주세요.
            </CheckboxGroup.Validation>
          )}
          {args._validation === 'success' && (
            <CheckboxGroup.Validation variant="success">
              알림 설정이 완료되었습니다.
            </CheckboxGroup.Validation>
          )}
        </CheckboxGroup>
      </div>
    );
  },
};

export const WithValidation: StoryObj = {
  ...noControls(
    '그룹 수준의 유효성 검사를 보여줍니다. 하나도 선택하지 않으면 에러가 표시됩니다.',
  ),
  render: function Render() {
    const [values, setValues] = useState<Record<string, boolean>>({
      terms: false,
      privacy: false,
    });

    const toggle = (key: string) => (checked: boolean | 'indeterminate') =>
      setValues((prev) => ({ ...prev, [key]: checked === true }));

    const hasSelection = Object.values(values).some(Boolean);

    return (
      <div className="w-80">
        <CheckboxGroup
          required
          validation={hasSelection ? undefined : 'error'}
        >
          <CheckboxGroup.Label>필수 동의 항목</CheckboxGroup.Label>
          <FormControl layout="horizontal">
            <Checkbox
              checked={values.terms}
              onCheckedChange={toggle('terms')}
            />
            <FormControl.Label>이용약관 동의</FormControl.Label>
          </FormControl>
          <FormControl layout="horizontal">
            <Checkbox
              checked={values.privacy}
              onCheckedChange={toggle('privacy')}
            />
            <FormControl.Label>개인정보 처리방침 동의</FormControl.Label>
          </FormControl>
          {!hasSelection && (
            <CheckboxGroup.Validation>
              하나 이상 동의해주세요.
            </CheckboxGroup.Validation>
          )}
        </CheckboxGroup>
      </div>
    );
  },
};

export const Disabled: StoryObj = {
  ...noControls(
    'fieldset disabled로 하위 체크박스가 자동 비활성화됩니다.',
  ),
  render: () => (
    <div className="w-80">
      <CheckboxGroup disabled>
        <CheckboxGroup.Label>알림 설정</CheckboxGroup.Label>
        <FormControl layout="horizontal">
          <Checkbox checked />
          <FormControl.Label>이메일 알림</FormControl.Label>
        </FormControl>
        <FormControl layout="horizontal">
          <Checkbox />
          <FormControl.Label>SMS 알림</FormControl.Label>
        </FormControl>
      </CheckboxGroup>
    </div>
  ),
};
