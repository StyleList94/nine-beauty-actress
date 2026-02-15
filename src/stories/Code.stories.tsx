import type { Meta, StoryObj } from '@storybook/react-vite';

import { Code } from 'lib/components/code';

const meta: Meta<typeof Code> = {
  component: Code,
  title: 'UI/Code',
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '코드 텍스트를 지정합니다',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    children: 'console.log("hello")',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '인라인 코드 스니펫을 표시합니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Code>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

export const Default: Story = {};

export const InParagraph: Story = {
  ...noControls('문단 안에서 인라인으로 사용하는 패턴입니다.'),
  render: () => (
    <p className="max-w-md text-sm leading-relaxed">
      패키지를 설치하려면 <Code>pnpm add @stylelist94/nine-beauty-actress</Code>
      를 실행하세요. 설치 후 <Code>import</Code> 구문으로 컴포넌트를
      불러올 수 있습니다.
    </p>
  ),
};

export const Examples: Story = {
  ...noControls('패키지명, 함수명, 단축키 등 다양한 용도입니다.'),
  render: () => (
    <div className="flex flex-col items-start gap-3 text-sm">
      <p>
        패키지: <Code>@radix-ui/react-slot</Code>
      </p>
      <p>
        함수: <Code>Array.from()</Code>
      </p>
      <p>
        변수: <Code>const count = 0</Code>
      </p>
      <p>
        단축키: <Code>Cmd + Shift + P</Code>
      </p>
    </div>
  ),
};
