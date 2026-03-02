import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColumnDef, SortingState, PaginationState } from '@tanstack/react-table';

import { useState } from 'react';

import useDataTable from 'lib/hooks/use-data-table';
import {
  DataTable,
  DataTableContent,
  DataTablePagination,
  DataTableEmpty,
} from 'lib/components/data-table';

type Invoice = {
  id: string;
  status: '결제완료' | '대기중' | '실패';
  method: string;
  amount: number;
};

const invoices: Invoice[] = [
  { id: 'INV-001', status: '결제완료', method: '카드', amount: 250000 },
  { id: 'INV-002', status: '대기중', method: '계좌이체', amount: 150000 },
  { id: 'INV-003', status: '결제완료', method: '카드', amount: 350000 },
  { id: 'INV-004', status: '실패', method: '카드', amount: 80000 },
  { id: 'INV-005', status: '결제완료', method: '계좌이체', amount: 520000 },
  { id: 'INV-006', status: '대기중', method: '카드', amount: 190000 },
  { id: 'INV-007', status: '결제완료', method: '카드', amount: 420000 },
  { id: 'INV-008', status: '결제완료', method: '계좌이체', amount: 680000 },
  { id: 'INV-009', status: '대기중', method: '카드', amount: 95000 },
  { id: 'INV-010', status: '결제완료', method: '카드', amount: 310000 },
  { id: 'INV-011', status: '실패', method: '계좌이체', amount: 175000 },
  { id: 'INV-012', status: '결제완료', method: '카드', amount: 440000 },
];

const invoiceColumns: ColumnDef<Invoice>[] = [
  { accessorKey: 'id', header: '주문번호' },
  { accessorKey: 'status', header: '상태' },
  { accessorKey: 'method', header: '결제수단' },
  {
    accessorKey: 'amount',
    header: '금액',
    cell: ({ getValue }) =>
      `₩${(getValue() as number).toLocaleString()}`,
  },
];

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  title: 'UI/DataTable',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '데이터 바인딩, 정렬, 페이지네이션을 지원하는 테이블 컴포넌트입니다.',
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

export const Default: StoryObj = {
  ...noControls(
    '정렬과 페이지네이션이 활성화된 기본 데이터 테이블입니다. 헤더를 클릭하여 정렬할 수 있습니다.',
  ),
  render: function Render() {
    const table = useDataTable({
      data: invoices,
      columns: invoiceColumns,
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
  },
};

export const NoPagination: StoryObj = {
  ...noControls(
    '페이지네이션 없이 전체 데이터를 표시하는 테이블입니다.',
  ),
  render: function Render() {
    const table = useDataTable({
      data: invoices.slice(0, 5),
      columns: invoiceColumns,
      sorting: true,
    });

    return (
      <div className="w-[600px]">
        <DataTable table={table}>
          <DataTableContent />
        </DataTable>
      </div>
    );
  },
};

export const Empty: StoryObj = {
  ...noControls(
    '데이터가 없을 때 기본 빈 상태 메시지를 표시합니다.',
  ),
  render: function Render() {
    const table = useDataTable({
      data: [] as Invoice[],
      columns: invoiceColumns,
    });

    return (
      <div className="w-[600px]">
        <DataTable table={table}>
          <DataTableContent />
        </DataTable>
      </div>
    );
  },
};

export const CustomEmpty: StoryObj = {
  ...noControls(
    'DataTableEmpty를 사용하여 빈 상태를 커스터마이징합니다.',
  ),
  render: function Render() {
    const table = useDataTable({
      data: [] as Invoice[],
      columns: invoiceColumns,
    });

    return (
      <div className="w-[600px]">
        <DataTable table={table}>
          <DataTableContent>
            <DataTableEmpty>
              <p className="text-lg font-medium">주문 내역이 없습니다</p>
              <p className="mt-1 text-sm text-zinc-500">
                첫 주문을 시작해 보세요
              </p>
            </DataTableEmpty>
          </DataTableContent>
        </DataTable>
      </div>
    );
  },
};

type Log = {
  timestamp: string;
  app: string;
  method: string;
  path: string;
  status: number;
  duration: string;
};

const allLogs: Log[] = Array.from({ length: 53 }, (_, i) => ({
  timestamp: `2026-03-02 12:${String(i % 60).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  app: ['web', 'api', 'admin'][i % 3],
  method: ['GET', 'POST', 'PUT', 'DELETE'][i % 4],
  path: ['/api/users', '/api/logs', '/api/auth', '/health'][i % 4],
  status: [200, 201, 301, 404, 500][i % 5],
  duration: `${Math.floor(Math.random() * 500)}ms`,
}));

const logColumns: ColumnDef<Log>[] = [
  { accessorKey: 'timestamp', header: '시간' },
  { accessorKey: 'app', header: '앱' },
  { accessorKey: 'method', header: '메서드' },
  { accessorKey: 'path', header: '경로' },
  { accessorKey: 'status', header: '상태' },
  { accessorKey: 'duration', header: '레이턴시' },
];

export const ServerSide: StoryObj = {
  ...noControls(
    'manualPagination과 manualSorting을 사용하는 서버사이드 시뮬레이션입니다. 실제 서버 응답 대신 클라이언트에서 슬라이싱합니다.',
  ),
  render: function Render() {
    const pageSize = 10;
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize,
    });

    // 서버사이드 시뮬레이션: 정렬 → 슬라이스
    const sorted = [...allLogs].sort((a, b) => {
      if (sorting.length === 0) return 0;
      const { id, desc } = sorting[0];
      const aVal = a[id as keyof Log];
      const bVal = b[id as keyof Log];
      const cmp = String(aVal).localeCompare(String(bVal));
      return desc ? -cmp : cmp;
    });

    const start = pagination.pageIndex * pagination.pageSize;
    const pageData = sorted.slice(start, start + pagination.pageSize);

    const table = useDataTable({
      data: pageData,
      columns: logColumns,
      manualSorting: true,
      manualPagination: true,
      sorting,
      onSortingChange: setSorting,
      pagination: { pageSize },
      onPaginationChange: setPagination,
      rowCount: allLogs.length,
    });

    return (
      <div className="w-[700px]">
        <DataTable table={table}>
          <DataTableContent />
          <DataTablePagination />
        </DataTable>
      </div>
    );
  },
};
