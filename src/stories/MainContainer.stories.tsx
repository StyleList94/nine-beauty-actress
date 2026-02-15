import type { Meta, StoryObj } from '@storybook/react-vite';

import { MainContainer } from 'lib/components/main-container';

const meta: Meta<typeof MainContainer> = {
  title: 'UI/Layout/MainContainer',
  component: MainContainer,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: '본문 컨텐츠를 렌더링합니다',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'main 요소 추가 클래스를 지정합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    backdropClassName: {
      control: 'text',
      description: '배경 요소 추가 클래스를 지정합니다',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '페이지 레이아웃의 본문 컨텐츠 영역 컨테이너입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MainContainer>;

export const Default: Story = {
  args: {
    children: (
      <section>
        <h1>그냥 예시일 뿐인데</h1>
        <h2>제목을 뭐로 해야할 지 생각이 안남...</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac
          elementum odio. Phasellus laoreet feugiat feugiat. Ut eget feugiat
          urna. Donec mi erat, euismod nec egestas sed, volutpat at ex.
          Vestibulum suscipit laoreet augue eget semper. Nullam aliquet metus
          est, ut varius dolor pharetra sit amet. Sed at vestibulum mi. Aliquam
          erat volutpat. Nunc vulputate, purus et pretium tempor, ligula ex
          laoreet lectus, vel mollis tortor dolor a felis. Praesent blandit
          scelerisque lorem ac lobortis. Donec a ligula enim. Mauris mollis enim
          nec laoreet eleifend. Mauris eleifend, ante eu gravida accumsan, neque
          turpis varius dolor, quis suscipit dui eros quis ante. Aenean
          fermentum bibendum augue, tempus vestibulum ante fringilla ac. Cras et
          magna quis massa ultrices ornare. Nunc fringilla congue eros sit amet
          venenatis.
        </p>
      </section>
    ),
  },
};
