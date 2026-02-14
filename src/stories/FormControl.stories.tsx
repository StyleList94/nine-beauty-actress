import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { FormControl } from 'lib/components/form-control';
import { Input } from 'lib/components/input';
import { Checkbox } from 'lib/components/checkbox';
import { Switch } from 'lib/components/switch';
import { Slider } from 'lib/components/slider';

type DefaultArgs = {
  _disabled: boolean;
  _required: boolean;
  _validation: 'none' | 'error' | 'success';
  _layout: 'vertical' | 'horizontal';
  _showCaption: boolean;
  _showValidation: boolean;
};

const meta: Meta<typeof FormControl> = {
  component: FormControl,
  title: 'UI/FormControl',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '너를 제어하고 싶어',
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
      description: '비활성화 상태',
      table: {
        category: 'FormControl',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    _required: {
      name: 'required',
      control: 'boolean',
      description: '필수 입력 여부',
      table: {
        category: 'FormControl',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    _validation: {
      name: 'validation',
      control: 'select',
      options: ['none', 'error', 'success'],
      description: '유효성 검사 상태',
      table: {
        category: 'FormControl',
        type: { summary: "'error' | 'success'" },
      },
    },
    _layout: {
      name: 'layout',
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '레이아웃 방향',
      table: {
        category: 'FormControl',
        type: { summary: "'vertical' | 'horizontal'" },
        defaultValue: { summary: 'vertical' },
      },
    },
    _showCaption: {
      name: 'showCaption',
      control: 'boolean',
      description: '힌트 텍스트 표시',
      table: { category: 'Options' },
    },
    _showValidation: {
      name: 'showValidation',
      control: 'boolean',
      description: '유효성 메시지 표시',
      table: { category: 'Options' },
    },
  },
  args: {
    _disabled: false,
    _required: false,
    _validation: 'none',
    _layout: 'vertical',
    _showCaption: true,
    _showValidation: false,
  },
  render: (args) => (
    <div className="w-80">
      <FormControl
        disabled={args._disabled}
        required={args._required}
        validation={args._validation === 'none' ? undefined : args._validation}
        layout={args._layout}
      >
        <FormControl.Label>이메일</FormControl.Label>
        <Input type="email" placeholder="you@example.com" />
        {args._showCaption && (
          <FormControl.Caption>이메일은 공개되지 않습니다.</FormControl.Caption>
        )}
        {args._showValidation && (
          <FormControl.Validation>
            올바른 이메일을 입력하세요.
          </FormControl.Validation>
        )}
      </FormControl>
    </div>
  ),
};

export const WithValidation: StoryObj = {
  ...noControls('error와 success 유효성 검사 상태를 보여줍니다.'),
  render: function Render() {
    const [email, setEmail] = useState('');
    const [validation, setValidation] = useState<
      'error' | 'success' | undefined
    >();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setEmail(value);

      if (!value) {
        setValidation(undefined);
      } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setValidation('success');
      } else {
        setValidation('error');
      }
    };

    return (
      <div className="w-80">
        <FormControl required validation={validation}>
          <FormControl.Label>이메일</FormControl.Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleChange}
          />
          <FormControl.Caption>이메일은 공개되지 않습니다.</FormControl.Caption>
          {validation === 'error' && (
            <FormControl.Validation>
              올바른 이메일을 입력하세요.
            </FormControl.Validation>
          )}
          {validation === 'success' && (
            <FormControl.Validation variant="success">
              올바른 이메일입니다.
            </FormControl.Validation>
          )}
        </FormControl>
      </div>
    );
  },
};

export const WithCheckbox: StoryObj = {
  ...noControls('horizontal 레이아웃으로 체크박스를 배치합니다.'),
  render: function Render() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="w-80">
        <FormControl layout="horizontal" required>
          <Checkbox
            checked={checked}
            onCheckedChange={(v) => setChecked(v === true)}
          />
          <FormControl.Label>이용약관에 동의합니다</FormControl.Label>
          <FormControl.Caption>
            서비스 이용을 위해 필수 동의가 필요합니다.
          </FormControl.Caption>
        </FormControl>
      </div>
    );
  },
};

export const WithSwitch: StoryObj = {
  ...noControls('horizontal 레이아웃으로 스위치를 배치합니다.'),
  render: function Render() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="w-80">
        <FormControl layout="horizontal">
          <Switch checked={checked} onCheckedChange={setChecked} />
          <FormControl.Label>알림 수신</FormControl.Label>
          <FormControl.Caption>마케팅 알림을 수신합니다.</FormControl.Caption>
        </FormControl>
      </div>
    );
  },
};

export const WithSlider: StoryObj = {
  ...noControls('vertical 레이아웃으로 슬라이더를 배치합니다.'),
  render: function Render() {
    const [value, setValue] = useState([50]);

    return (
      <div className="w-80">
        <FormControl>
          <FormControl.Label>볼륨</FormControl.Label>
          <Slider value={value} onValueChange={setValue} max={100} step={1} />
          <FormControl.Caption>현재 볼륨: {value[0]}%</FormControl.Caption>
        </FormControl>
      </div>
    );
  },
};

export const Disabled: StoryObj = {
  ...noControls('비활성화 상태에선 너를 제어할 수 없어.'),
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <FormControl disabled>
        <FormControl.Label>이메일</FormControl.Label>
        <Input type="email" placeholder="you@example.com" />
        <FormControl.Caption>이메일은 공개되지 않습니다.</FormControl.Caption>
      </FormControl>
      <FormControl layout="horizontal" disabled>
        <Checkbox />
        <FormControl.Label>이용약관에 동의합니다</FormControl.Label>
      </FormControl>
    </div>
  ),
};

export const Composition: StoryObj = {
  ...noControls('여러 FormControl을 조합한 예시입니다.'),
  render: function Render() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [agreed, setAgreed] = useState(false);

    return (
      <div className="flex flex-col gap-6 w-80">
        <FormControl required>
          <FormControl.Label>이름</FormControl.Label>
          <Input
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl required>
          <FormControl.Label>이메일</FormControl.Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl.Caption>이메일은 공개되지 않습니다.</FormControl.Caption>
        </FormControl>
        <FormControl layout="horizontal" required>
          <Checkbox
            checked={agreed}
            onCheckedChange={(v) => setAgreed(v === true)}
          />
          <FormControl.Label>이용약관에 동의합니다</FormControl.Label>
        </FormControl>
      </div>
    );
  },
};
