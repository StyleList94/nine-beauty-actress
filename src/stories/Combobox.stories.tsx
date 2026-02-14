import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { Combobox } from 'lib/components/combobox';

const meta: Meta<typeof Combobox> = {
  component: Combobox,
  title: 'UI/Combobox',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: false,
      description: '현재 선택된 옵션의 value입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    onValueChange: {
      control: false,
      description: '옵션 선택 시 호출되는 핸들러입니다',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    options: {
      control: false,
      description: '선택 가능한 옵션 목록입니다',
      table: {
        type: { summary: 'ComboboxOption[]' },
      },
    },
    placeholder: {
      control: 'text',
      description: '트리거 버튼의 placeholder를 지정합니다',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select option...' },
      },
    },
    queryPlaceholder: {
      control: 'text',
      description: '검색 입력의 placeholder를 지정합니다',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Search option...' },
      },
    },
    className: {
      control: false,
      description: '트리거 버튼의 커스텀 클래스를 지정합니다',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    placeholder: 'Select styling...',
    queryPlaceholder: 'Search styling...',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '검색 가능한 드롭다운 선택 컴포넌트입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

const stylings = [
  { value: 'tailwindcss', label: 'Tailwind CSS' },
  { value: 'vanilla-extract', label: 'Vanilla Extract' },
  { value: 'css', label: 'CSS' },
];

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');

    return (
      <Combobox
        {...args}
        value={value}
        onValueChange={setValue}
        options={stylings}
      />
    );
  },
};

const languages = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'swift', label: 'Swift' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
];

export const WithManyOptions: Story = {
  ...noControls('옵션이 많을 때 스크롤 동작을 확인합니다.'),
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <Combobox
        value={value}
        onValueChange={setValue}
        options={languages}
        placeholder="Select language..."
        queryPlaceholder="Search language..."
      />
    );
  },
};
