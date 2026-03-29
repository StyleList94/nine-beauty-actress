import type { Meta, StoryObj } from '@storybook/react-vite';
import type {
  ColumnDef,
  SortingState,
  PaginationState,
  ColumnFiltersState,
} from '@tanstack/react-table';

import { useState } from 'react';

import {
  DataTable,
  DataTableContent,
  DataTablePagination,
  DataTableEmpty,
} from 'lib/components/data-table';
import { TextInput } from 'lib/components/text-input';
import { Checkbox } from 'lib/components/checkbox';
import { Switch } from 'lib/components/switch';
import { Button } from 'lib/components/button';

// ─── 공통 데이터 ─────────────────────────────────────────

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
    cell: ({ getValue }) => `₩${(getValue() as number).toLocaleString()}`,
  },
];

const statusStyle: Record<string, string> = {
  결제완료: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  대기중: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  실패: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const customCellColumns: ColumnDef<Invoice>[] = [
  { accessorKey: 'id', header: '주문번호' },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  { accessorKey: 'method', header: '결제수단' },
  {
    accessorKey: 'amount',
    header: '금액',
    cell: ({ getValue }) => (
      <span className="font-mono tabular-nums">
        ₩{(getValue() as number).toLocaleString()}
      </span>
    ),
  },
];

// ─── Meta ────────────────────────────────────────────────

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  title: 'UI/DataTable',
  tags: ['autodocs'],
  argTypes: {
    data: { table: { disable: true } },
    columns: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    sorting: { table: { disable: true } },
    onSortingChange: { table: { disable: true } },
    manualSorting: { table: { disable: true } },
    pagination: { table: { disable: true } },
    onPaginationChange: { table: { disable: true } },
    manualPagination: { table: { disable: true } },
    rowCount: { table: { disable: true } },
    filtering: { table: { disable: true } },
    columnFilters: { table: { disable: true } },
    onColumnFiltersChange: { table: { disable: true } },
    globalFilter: { table: { disable: true } },
    onGlobalFilterChange: { table: { disable: true } },
    rowSelection: { table: { disable: true } },
    onRowSelectionChange: { table: { disable: true } },
    columnVisibility: { table: { disable: true } },
    onColumnVisibilityChange: { table: { disable: true } },
    expanding: { table: { disable: true } },
    onExpandedChange: { table: { disable: true } },
    columnPinning: { table: { disable: true } },
    onColumnPinningChange: { table: { disable: true } },
  },
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

// ─── Default ────────────────────────────────────────────

type DefaultArgs = {
  // DataTable
  _data: string;
  _columns: string;
  _children: string;
  _sorting: string;
  _onSortingChange: string;
  _manualSorting: string;
  _pagination: string;
  _onPaginationChange: string;
  _manualPagination: string;
  _rowCount: string;
  _filtering: string;
  _columnFilters: string;
  _onColumnFiltersChange: string;
  _globalFilter: string;
  _onGlobalFilterChange: string;
  _rowSelection: string;
  _onRowSelectionChange: string;
  _columnVisibility: string;
  _onColumnVisibilityChange: string;
  _expanding: string;
  _onExpandedChange: string;
  _columnPinning: string;
  _onColumnPinningChange: string;
  _className: string;
  // DataTableContent
  _emptyMessage: string;
  _contentChildren: string;
  // DataTablePagination
  _paginationClassName: string;
};

export const Default: StoryObj<DefaultArgs> = {
  argTypes: {
    // ─── DataTable ────────────────────────────
    _data: {
      name: 'data',
      control: false,
      description: '테이블 데이터 배열',
      table: {
        category: 'DataTable',
        type: { summary: 'TData[]' },
      },
    },
    _columns: {
      name: 'columns',
      control: false,
      description: '컬럼 정의 배열',
      table: {
        category: 'DataTable',
        type: { summary: 'ColumnDef<TData>[]' },
      },
    },
    _children: {
      name: 'children',
      control: false,
      description: '서브컴포넌트 또는 render props ((table) => ReactNode)',
      table: {
        category: 'DataTable',
        type: { summary: 'ReactNode | ((table) => ReactNode)' },
      },
    },
    _sorting: {
      name: 'sorting',
      control: false,
      description:
        '정렬 활성화. true면 클라이언트 정렬, SortingState면 초기 상태 지정',
      table: {
        category: 'DataTable',
        type: { summary: 'boolean | SortingState' },
        defaultValue: { summary: 'undefined' },
      },
    },
    _onSortingChange: {
      name: 'onSortingChange',
      control: false,
      description: '정렬 상태 변경 핸들러 (controlled)',
      table: {
        category: 'DataTable',
        type: { summary: 'OnChangeFn<SortingState>' },
      },
    },
    _manualSorting: {
      name: 'manualSorting',
      control: false,
      description: '서버사이드 정렬 여부',
      table: {
        category: 'DataTable',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    _pagination: {
      name: 'pagination',
      control: false,
      description:
        '페이지네이션 활성화. true면 기본 pageSize(10), 객체면 커스텀',
      table: {
        category: 'DataTable',
        type: { summary: 'boolean | { pageSize: number }' },
        defaultValue: { summary: 'undefined' },
      },
    },
    _onPaginationChange: {
      name: 'onPaginationChange',
      control: false,
      description: '페이지네이션 상태 변경 핸들러 (controlled)',
      table: {
        category: 'DataTable',
        type: { summary: 'OnChangeFn<PaginationState>' },
      },
    },
    _manualPagination: {
      name: 'manualPagination',
      control: false,
      description: '서버사이드 페이지네이션 여부',
      table: {
        category: 'DataTable',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    _rowCount: {
      name: 'rowCount',
      control: false,
      description: '서버사이드 페이지네이션 시 전체 행 수',
      table: {
        category: 'DataTable',
        type: { summary: 'number' },
      },
    },
    _filtering: {
      name: 'filtering',
      control: false,
      description: '필터링 활성화 (컬럼 필터 + 글로벌 필터)',
      table: {
        category: 'DataTable',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    _columnFilters: {
      name: 'columnFilters',
      control: false,
      description: '컬럼 필터 상태 (controlled)',
      table: {
        category: 'DataTable',
        type: { summary: 'ColumnFiltersState' },
      },
    },
    _onColumnFiltersChange: {
      name: 'onColumnFiltersChange',
      control: false,
      description: '컬럼 필터 상태 변경 핸들러',
      table: {
        category: 'DataTable',
        type: { summary: 'OnChangeFn<ColumnFiltersState>' },
      },
    },
    _globalFilter: {
      name: 'globalFilter',
      control: false,
      description: '글로벌 필터 값 (controlled)',
      table: {
        category: 'DataTable',
        type: { summary: 'string' },
      },
    },
    _onGlobalFilterChange: {
      name: 'onGlobalFilterChange',
      control: false,
      description: '글로벌 필터 변경 핸들러',
      table: {
        category: 'DataTable',
        type: { summary: 'OnChangeFn<string>' },
      },
    },
    _rowSelection: {
      name: 'rowSelection',
      control: false,
      description: '행 선택 활성화',
      table: {
        category: 'DataTable',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    _onRowSelectionChange: {
      name: 'onRowSelectionChange',
      control: false,
      description: '행 선택 상태 변경 핸들러 (controlled)',
      table: {
        category: 'DataTable',
        type: { summary: 'OnChangeFn<RowSelectionState>' },
      },
    },
    _columnVisibility: {
      name: 'columnVisibility',
      control: false,
      description:
        '컬럼 가시성 활성화. true면 전체 표시, VisibilityState면 초기 상태',
      table: {
        category: 'DataTable',
        type: { summary: 'boolean | VisibilityState' },
        defaultValue: { summary: 'undefined' },
      },
    },
    _onColumnVisibilityChange: {
      name: 'onColumnVisibilityChange',
      control: false,
      description: '컬럼 가시성 변경 핸들러 (controlled)',
      table: {
        category: 'DataTable',
        type: { summary: 'OnChangeFn<VisibilityState>' },
      },
    },
    _expanding: {
      name: 'expanding',
      control: false,
      description: '행 확장 활성화',
      table: {
        category: 'DataTable',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    _onExpandedChange: {
      name: 'onExpandedChange',
      control: false,
      description: '행 확장 상태 변경 핸들러 (controlled)',
      table: {
        category: 'DataTable',
        type: { summary: 'OnChangeFn<ExpandedState>' },
      },
    },
    _columnPinning: {
      name: 'columnPinning',
      control: false,
      description: '컬럼 피닝 초기 상태',
      table: {
        category: 'DataTable',
        type: { summary: 'ColumnPinningState' },
        defaultValue: { summary: 'undefined' },
      },
    },
    _onColumnPinningChange: {
      name: 'onColumnPinningChange',
      control: false,
      description: '컬럼 피닝 변경 핸들러 (controlled)',
      table: {
        category: 'DataTable',
        type: { summary: 'OnChangeFn<ColumnPinningState>' },
      },
    },
    _className: {
      name: 'className',
      control: false,
      description: '추가 CSS 클래스',
      table: {
        category: 'DataTable',
        type: { summary: 'string' },
      },
    },
    // ─── DataTableContent ─────────────────────
    _emptyMessage: {
      name: 'emptyMessage',
      control: false,
      description: '데이터가 없을 때 표시할 메시지',
      table: {
        category: 'DataTableContent',
        type: { summary: 'string' },
        defaultValue: { summary: '결과가 없습니다.' },
      },
    },
    _contentChildren: {
      name: 'children',
      control: false,
      description:
        'DataTableEmpty를 children으로 전달하여 빈 상태 커스터마이징',
      table: {
        category: 'DataTableContent',
        type: { summary: 'ReactNode' },
      },
    },
    // ─── DataTablePagination ──────────────────
    _paginationClassName: {
      name: 'className',
      control: false,
      description: '추가 CSS 클래스',
      table: {
        category: 'DataTablePagination',
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<DataTable data={data} columns={columns} sorting pagination={{ pageSize: 5 }}>
  <DataTableContent />
  <DataTablePagination />
</DataTable>`,
      },
    },
  },
  render: () => (
    <div className="w-[600px]">
      <DataTable
        data={invoices}
        columns={invoiceColumns}
        sorting
        pagination={{ pageSize: 5 }}
      >
        <DataTableContent />
        <DataTablePagination />
      </DataTable>
    </div>
  ),
};

// ─── 커스텀 셀 렌더링 ───────────────────────────────────

export const CustomCell: StoryObj = {
  ...noControls(
    'ColumnDef의 cell 옵션으로 Badge 스타일 상태 표시 및 금액 포맷을 커스터마이징합니다.',
  ),
  render: () => (
    <div className="w-[600px]">
      <DataTable
        data={invoices.slice(0, 6)}
        columns={customCellColumns}
        sorting
      >
        <DataTableContent />
      </DataTable>
    </div>
  ),
};

// ─── 초기 정렬 상태 ─────────────────────────────────────

export const InitialSort: StoryObj = {
  ...noControls(
    'sorting에 SortingState를 전달하여 금액 내림차순으로 초기 정렬된 테이블입니다.',
  ),
  render: () => (
    <div className="w-[600px]">
      <DataTable
        data={invoices}
        columns={customCellColumns}
        sorting={[{ id: 'amount', desc: true }]}
        pagination={{ pageSize: 5 }}
      >
        <DataTableContent />
        <DataTablePagination />
      </DataTable>
    </div>
  ),
};

// ─── 컬럼 필터링 ────────────────────────────────────────

export const ColumnFiltering: StoryObj = {
  ...noControls('filtering + TextInput으로 특정 컬럼을 필터링합니다.'),
  render: function Render() {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    return (
      <div className="flex w-[600px] flex-col gap-3">
        <TextInput
          placeholder="상태 필터 (결제완료, 대기중, 실패)"
          value={
            (columnFilters.find((f) => f.id === 'status')?.value as string) ??
            ''
          }
          onChange={(e) =>
            setColumnFilters(
              e.target.value ? [{ id: 'status', value: e.target.value }] : [],
            )
          }
        />
        <DataTable
          data={invoices}
          columns={customCellColumns}
          sorting
          pagination={{ pageSize: 5 }}
          filtering
          columnFilters={columnFilters}
          onColumnFiltersChange={setColumnFilters}
        >
          <DataTableContent />
          <DataTablePagination />
        </DataTable>
      </div>
    );
  },
};

// ─── 글로벌 필터 ────────────────────────────────────────

export const GlobalFilter: StoryObj = {
  ...noControls('filtering + globalFilter로 전체 컬럼을 한 번에 검색합니다.'),
  render: function Render() {
    const [globalFilter, setGlobalFilter] = useState('');

    return (
      <div className="flex w-[600px] flex-col gap-3">
        <TextInput
          placeholder="검색..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <DataTable
          data={invoices}
          columns={customCellColumns}
          sorting
          pagination={{ pageSize: 5 }}
          filtering
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
        >
          <DataTableContent />
          <DataTablePagination />
        </DataTable>
      </div>
    );
  },
};

// ─── 행 선택 ────────────────────────────────────────────

const selectionColumns: ColumnDef<Invoice>[] = [
  {
    id: 'select',
    header: ({ table: t }) => (
      <Checkbox
        checked={t.getIsAllPageRowsSelected()}
        onCheckedChange={(v) => t.toggleAllPageRowsSelected(!!v)}
        aria-label="전체 선택"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="행 선택"
      />
    ),
    enableSorting: false,
  },
  ...customCellColumns,
];

export const RowSelection: StoryObj = {
  ...noControls(
    'rowSelection으로 체크박스 행 선택을 구현합니다. children function으로 선택 수를 표시합니다.',
  ),
  render: () => (
    <div className="flex w-[600px] flex-col gap-3">
      <DataTable
        data={invoices.slice(0, 6)}
        columns={selectionColumns}
        sorting
        rowSelection
      >
        {(table) => (
          <>
            <DataTableContent />
            <p className="px-3 pb-3 text-sm text-zinc-500">
              {table.getFilteredSelectedRowModel().rows.length} /{' '}
              {table.getFilteredRowModel().rows.length}건 선택됨
            </p>
          </>
        )}
      </DataTable>
    </div>
  ),
};

// ─── 컬럼 가시성 ────────────────────────────────────────

export const ColumnVisibility: StoryObj = {
  ...noControls('columnVisibility로 컬럼 표시/숨기기를 토글합니다.'),
  render: () => (
    <div className="flex w-[600px] flex-col gap-3">
      <DataTable
        data={invoices.slice(0, 6)}
        columns={customCellColumns}
        sorting
        columnVisibility
      >
        {(table) => (
          <>
            <div className="flex flex-wrap gap-4 p-3">
              {table.getAllLeafColumns().map((column) => (
                <label
                  key={column.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <Switch
                    checked={column.getIsVisible()}
                    onCheckedChange={(v) => column.toggleVisibility(!!v)}
                  />
                  {typeof column.columnDef.header === 'string'
                    ? column.columnDef.header
                    : column.id}
                </label>
              ))}
            </div>
            <DataTableContent />
          </>
        )}
      </DataTable>
    </div>
  ),
};

// ─── 행 확장 ────────────────────────────────────────────

const expandColumns: ColumnDef<Invoice>[] = [
  {
    id: 'expand',
    header: '',
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => row.toggleExpanded()}
        aria-label={row.getIsExpanded() ? '접기' : '펼치기'}
      >
        {row.getIsExpanded() ? '▼' : '▶'}
      </Button>
    ),
    enableSorting: false,
  },
  ...customCellColumns,
];

export const RowExpanding: StoryObj = {
  ...noControls('expanding으로 행을 펼쳐 상세 정보를 표시합니다.'),
  render: () => (
    <div className="w-[600px]">
      <DataTable
        data={invoices.slice(0, 6)}
        columns={expandColumns}
        sorting
        expanding
      >
        <DataTableContent />
      </DataTable>
    </div>
  ),
};

// ─── 컬럼 피닝 ──────────────────────────────────────────

type Employee = {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  location: string;
  status: string;
};

const employees: Employee[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: [
    '김민수',
    '이서연',
    '박지호',
    '최유나',
    '정하준',
    '강수빈',
    '윤도현',
    '임채원',
  ][i],
  email: `user${i + 1}@example.com`,
  department: ['개발', '디자인', '기획', '마케팅'][i % 4],
  role: ['팀장', '시니어', '주니어', '인턴'][i % 4],
  location: ['서울', '판교', '부산', '제주'][i % 4],
  status: ['활성', '비활성'][i % 2],
}));

const employeeColumns: ColumnDef<Employee>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: '이름' },
  { accessorKey: 'email', header: '이메일' },
  { accessorKey: 'department', header: '부서' },
  { accessorKey: 'role', header: '직책' },
  { accessorKey: 'location', header: '근무지' },
  { accessorKey: 'status', header: '상태' },
];

export const ColumnPinning: StoryObj = {
  ...noControls('columnPinning으로 ID와 이름 컬럼을 좌측에 고정합니다.'),
  render: () => (
    <div className="w-[400px]">
      <DataTable
        data={employees}
        columns={employeeColumns}
        sorting
        columnPinning={{ left: ['id', 'name'] }}
      >
        <DataTableContent />
      </DataTable>
    </div>
  ),
};

// ─── 기존 스토리 유지 ───────────────────────────────────

export const NoPagination: StoryObj = {
  ...noControls('페이지네이션 없이 전체 데이터를 표시하는 테이블입니다.'),
  render: () => (
    <div className="w-[600px]">
      <DataTable data={invoices.slice(0, 5)} columns={invoiceColumns} sorting>
        <DataTableContent />
      </DataTable>
    </div>
  ),
};

export const Empty: StoryObj = {
  ...noControls('데이터가 없을 때 기본 빈 상태 메시지를 표시합니다.'),
  render: () => (
    <div className="w-[600px]">
      <DataTable data={[] as Invoice[]} columns={invoiceColumns}>
        <DataTableContent />
      </DataTable>
    </div>
  ),
};

export const CustomEmpty: StoryObj = {
  ...noControls('DataTableEmpty를 사용하여 빈 상태를 커스터마이징합니다.'),
  render: () => (
    <div className="w-[600px]">
      <DataTable data={[] as Invoice[]} columns={invoiceColumns}>
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
  ),
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
  timestamp: `2026-03-02 12:${String(i % 60).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
  app: ['web', 'api', 'admin'][i % 3],
  method: ['GET', 'POST', 'PUT', 'DELETE'][i % 4],
  path: ['/api/users', '/api/logs', '/api/auth', '/health'][i % 4],
  status: [200, 201, 301, 404, 500][i % 5],
  duration: `${(i * 13) % 500}ms`,
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
    'manualPagination과 manualSorting을 사용하는 서버사이드 시뮬레이션입니다.',
  ),
  render: function Render() {
    const pageSize = 10;
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize,
    });

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

    return (
      <div className="w-[700px]">
        <DataTable
          data={pageData}
          columns={logColumns}
          manualSorting
          manualPagination
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={{ pageSize }}
          onPaginationChange={setPagination}
          rowCount={allLogs.length}
        >
          <DataTableContent />
          <DataTablePagination />
        </DataTable>
      </div>
    );
  },
};
