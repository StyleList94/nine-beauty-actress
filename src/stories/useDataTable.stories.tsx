import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColumnDef } from '@tanstack/react-table';

import useDataTable from 'lib/hooks/use-data-table';
import {
  DataTable,
  DataTableContent,
  DataTablePagination,
} from 'lib/components/data-table';

type User = {
  id: number;
  name: string;
  email: string;
  role: '관리자' | '편집자' | '뷰어';
  createdAt: string;
};

const users: User[] = [
  { id: 1, name: '김민수', email: 'minsu@example.com', role: '관리자', createdAt: '2024-01-15' },
  { id: 2, name: '이서연', email: 'seoyeon@example.com', role: '편집자', createdAt: '2024-02-20' },
  { id: 3, name: '박지호', email: 'jiho@example.com', role: '뷰어', createdAt: '2024-03-10' },
  { id: 4, name: '최유나', email: 'yuna@example.com', role: '편집자', createdAt: '2024-04-05' },
  { id: 5, name: '정하준', email: 'hajun@example.com', role: '뷰어', createdAt: '2024-05-12' },
  { id: 6, name: '강수빈', email: 'subin@example.com', role: '관리자', createdAt: '2024-06-18' },
  { id: 7, name: '윤도현', email: 'dohyun@example.com', role: '뷰어', createdAt: '2024-07-22' },
  { id: 8, name: '임채원', email: 'chaewon@example.com', role: '편집자', createdAt: '2024-08-30' },
];

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: '이름' },
  { accessorKey: 'email', header: '이메일' },
  { accessorKey: 'role', header: '역할' },
  { accessorKey: 'createdAt', header: '가입일' },
];

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

function Demo() {
  const table = useDataTable({
    data: users,
    columns,
    sorting: true,
    pagination: { pageSize: 5 },
  });

  return (
    <div className="w-[600px]">
      <DataTable table={table}>
        <DataTableContent />
        <DataTablePagination />
      </DataTable>
    </div>
  );
}

const meta: Meta<typeof Demo> = {
  component: Demo,
  title: 'Hooks/useDataTable',
  parameters: {
    docs: {
      description: {
        component:
          '@tanstack/react-table을 래핑하여 정렬과 페이지네이션을 간편하게 설정하는 hook입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Demo>;

export const Default: Story = {
  ...noControls(
    '정렬과 페이지네이션이 활성화된 인터랙티브 데모입니다.',
  ),
};
