import type { Meta, StoryObj } from '@storybook/react-vite';

import { useEffect, useState } from 'react';

import { Slider } from 'lib/components/slider';
import { FormControl } from 'lib/components/form-control';

const meta: Meta<typeof Slider> = {
  component: Slider,
  title: 'UI/Slider',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '값을 슬라이드로 선택할게',
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

type DefaultArgs = {
  _defaultValue: number[];
  value: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  orientation: 'horizontal' | 'vertical';
  inverted: boolean;
  minStepsBetweenThumbs: number;
  _name: string;
  _onValueChange: (value: number[]) => void;
  _onValueCommit: (value: number[]) => void;
};

export const Default: StoryObj<DefaultArgs> = {
  argTypes: {
    _defaultValue: {
      name: 'defaultValue',
      control: false,
      description: '초기값을 지정합니다',
      table: {
        type: { summary: 'number[]' },
      },
    },
    value: {
      control: 'number',
      description: '현재 값을 지정합니다',
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: '[50]' },
      },
    },
    min: {
      control: 'number',
      description: '최솟값을 지정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: 'number',
      description: '최댓값을 지정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    step: {
      control: { type: 'number', min: 1 },
      description: '스텝 단위를 지정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태를 지정합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '슬라이더 방향을 지정합니다',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
    },
    inverted: {
      control: 'boolean',
      description: '슬라이더 방향을 반전합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    minStepsBetweenThumbs: {
      control: false,
      description: '다중 thumb 간 최소 간격(step 단위)을 지정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    _name: {
      name: 'name',
      control: false,
      description: '폼 제출 시 사용할 이름을 지정합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    _onValueChange: {
      name: 'onValueChange',
      control: false,
      description: '값이 변경될 때 호출되는 핸들러입니다',
      table: {
        type: { summary: '(value: number[]) => void' },
      },
    },
    _onValueCommit: {
      name: 'onValueCommit',
      control: false,
      description: '드래그가 끝났을 때 호출되는 핸들러입니다',
      table: {
        type: { summary: '(value: number[]) => void' },
      },
    },
  },
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: 'horizontal',
    inverted: false,
  },
  render: function Render(args) {
    const [value, setValue] = useState([args.value]);

    useEffect(() => {
      setValue((prev) =>
        prev.map((v) => Math.min(Math.max(v, args.min), args.max)),
      );
    }, [args.min, args.max]);

    useEffect(() => {
      setValue([Math.min(Math.max(args.value, args.min), args.max)]);
    }, [args.value, args.min, args.max]);

    return (
      <div className={args.orientation === 'vertical' ? 'h-48' : 'w-60'}>
        <Slider
          value={value}
          onValueChange={setValue}
          min={args.min}
          max={args.max}
          step={args.step}
          disabled={args.disabled}
          orientation={args.orientation}
          inverted={args.inverted}
        />
      </div>
    );
  },
};

type RangeArgs = {
  min: number;
  max: number;
  step: number;
  minStepsBetweenThumbs: number;
};

export const Range: StoryObj<RangeArgs> = {
  argTypes: {
    min: {
      control: 'number',
      description: '최솟값을 지정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: 'number',
      description: '최댓값을 지정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    step: {
      control: { type: 'number', min: 1 },
      description: '스텝 단위를 지정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    minStepsBetweenThumbs: {
      control: { type: 'number', min: 0 },
      description: '다중 thumb 간 최소 간격(step 단위)을 지정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    minStepsBetweenThumbs: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '두 개의 thumb으로 범위를 선택합니다.',
      },
    },
  },
  render: (args) => (
    <div className="w-60">
      <Slider
        defaultValue={[25, 75]}
        min={args.min}
        max={args.max}
        step={args.step}
        minStepsBetweenThumbs={args.minStepsBetweenThumbs}
      />
    </div>
  ),
};

export const WithSteps: StoryObj = {
  ...noControls(
    'step 속성으로 이동 단위를 지정합니다.',
  ),
  render: () => (
    <div className="flex w-60 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-zinc-500">step=10</p>
        <Slider defaultValue={[50]} max={100} step={10} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-zinc-500">step=25</p>
        <Slider defaultValue={[50]} max={100} step={25} />
      </div>
    </div>
  ),
};

export const Vertical: StoryObj = {
  ...noControls(
    'orientation="vertical"로 세로 방향 슬라이더를 표시합니다.',
  ),
  render: () => (
    <div className="flex h-48 gap-8">
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        orientation="vertical"
      />
      <Slider
        defaultValue={[20, 80]}
        max={100}
        step={1}
        orientation="vertical"
      />
    </div>
  ),
};

export const WithFormControl: StoryObj = {
  ...noControls(
    'FormControl과 조합하여 레이블을 연결합니다.',
  ),
  render: () => (
    <div className="flex w-60 flex-col gap-4">
      <FormControl>
        <FormControl.Label>볼륨</FormControl.Label>
        <Slider defaultValue={[70]} max={100} step={1} />
        <FormControl.Caption>
          현재 볼륨을 조절합니다.
        </FormControl.Caption>
      </FormControl>
    </div>
  ),
};

export const Disabled: StoryObj = {
  ...noControls('비활성화 상태의 슬라이더입니다.'),
  render: () => (
    <div className="flex w-60 flex-col gap-4">
      <Slider defaultValue={[50]} max={100} step={1} disabled />
      <Slider
        defaultValue={[20, 80]}
        max={100}
        step={1}
        disabled
      />
    </div>
  ),
};
