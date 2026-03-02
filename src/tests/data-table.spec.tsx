import type { ColumnDef } from '@tanstack/react-table';

import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import useDataTable from 'lib/hooks/use-data-table';
import {
  DataTable,
  DataTableContent,
  DataTablePagination,
  DataTableEmpty,
} from 'lib/components/data-table';

type TestData = { id: number; name: string; age: number };

const testData: TestData[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'Diana', age: 28 },
  { id: 5, name: 'Eve', age: 22 },
];

const columns: ColumnDef<TestData>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' },
];

function BasicTable({ data = testData }: { data?: TestData[] }) {
  const table = useDataTable({
    data,
    columns,
    sorting: true,
    pagination: { pageSize: 3 },
  });

  return (
    <DataTable table={table}>
      <DataTableContent />
      <DataTablePagination />
    </DataTable>
  );
}

function EmptyTable() {
  const table = useDataTable({ data: [], columns });

  return (
    <DataTable table={table}>
      <DataTableContent />
    </DataTable>
  );
}

function CustomEmptyTable() {
  const table = useDataTable({ data: [], columns });

  return (
    <DataTable table={table}>
      <DataTableContent>
        <DataTableEmpty>
          <p>커스텀 빈 상태</p>
        </DataTableEmpty>
      </DataTableContent>
    </DataTable>
  );
}

function NoPaginationTable() {
  const table = useDataTable({
    data: testData,
    columns,
    sorting: true,
  });

  return (
    <DataTable table={table}>
      <DataTableContent />
    </DataTable>
  );
}

describe('Rendering and Props', () => {
  it('should render table with data', async () => {
    await render(<BasicTable />);

    await expect.element(page.getByRole('table')).toBeInTheDocument();
    await expect.element(page.getByText('Alice')).toBeInTheDocument();
    await expect.element(page.getByText('Bob')).toBeInTheDocument();
    await expect.element(page.getByText('Charlie')).toBeInTheDocument();
  });

  it('should render column headers', async () => {
    await render(<BasicTable />);

    await expect.element(page.getByText('ID')).toBeInTheDocument();
    await expect.element(page.getByText('Name')).toBeInTheDocument();
    await expect.element(page.getByText('Age')).toBeInTheDocument();
  });

  it('should show default empty state when no data', async () => {
    await render(<EmptyTable />);

    await expect
      .element(page.getByText('결과가 없습니다.'))
      .toBeInTheDocument();
  });

  it('should show custom empty state', async () => {
    await render(<CustomEmptyTable />);

    await expect
      .element(page.getByText('커스텀 빈 상태'))
      .toBeInTheDocument();
  });
});

describe('Sorting', () => {
  it('should sort ascending on first header click', async () => {
    await render(<NoPaginationTable />);

    const nameSort = page.getByRole('button', { name: /Name 정렬/i });
    await nameSort.click();

    // Name 컬럼 th에 aria-sort 속성 확인
    const nameTh = page.getByTestId('data-table-head-name');
    await expect
      .element(nameTh)
      .toHaveAttribute('aria-sort', 'ascending');
  });

  it('should toggle sort direction on repeated clicks', async () => {
    await render(<NoPaginationTable />);

    // 숫자 컬럼은 sortDescFirst가 기본이므로 desc → asc 순서
    const ageSort = page.getByRole('button', { name: /Age 정렬/i });
    const ageTh = page.getByTestId('data-table-head-age');

    await ageSort.click();
    await expect
      .element(ageTh)
      .toHaveAttribute('aria-sort', 'descending');

    await ageSort.click();
    await expect
      .element(ageTh)
      .toHaveAttribute('aria-sort', 'ascending');
  });

  it('should not sort columns with enableSorting: false', async () => {
    const noSortColumns: ColumnDef<TestData>[] = [
      { accessorKey: 'id', header: 'ID', enableSorting: false },
      { accessorKey: 'name', header: 'Name' },
    ];

    function NoSortTable() {
      const table = useDataTable({
        data: testData,
        columns: noSortColumns,
        sorting: true,
      });
      return (
        <DataTable table={table}>
          <DataTableContent />
        </DataTable>
      );
    }

    await render(<NoSortTable />);

    const nameSort = page.getByRole('button', { name: /Name 정렬/i });
    await expect.element(nameSort).toBeInTheDocument();

    // ID 헤더에는 정렬 버튼이 없어야 함
    const idSortButtons = page.getByRole('button', { name: /ID 정렬/i });
    await expect.element(idSortButtons).not.toBeInTheDocument();
  });
});

describe('Pagination', () => {
  it('should limit rows to pageSize', async () => {
    await render(<BasicTable />);

    // pageSize=3이므로 첫 3건만 보여야 함
    await expect.element(page.getByText('Alice')).toBeInTheDocument();
    await expect.element(page.getByText('Charlie')).toBeInTheDocument();

    // tbody 내 행 수로 검증 (locator timeout 방지)
    const rows = page.getByRole('row');
    // 헤더 1행 + 데이터 3행 = 4행
    await expect.element(rows.nth(3)).toBeInTheDocument();
    await expect.element(rows.nth(4)).not.toBeInTheDocument();
  });

  it('should show pagination info', async () => {
    await render(<BasicTable />);

    await expect
      .element(page.getByText('1-3 / 5'))
      .toBeInTheDocument();
  });

  it('should navigate to next page', async () => {
    await render(<BasicTable />);

    const nextBtn = page.getByRole('button', { name: '다음 페이지' });
    await nextBtn.click();

    await expect
      .element(page.getByText('4-5 / 5'))
      .toBeInTheDocument();
    await expect.element(page.getByText('Diana')).toBeInTheDocument();
  });

  it('should disable previous button on first page', async () => {
    await render(<BasicTable />);

    const prevBtn = page.getByRole('button', { name: '이전 페이지' });
    await expect.element(prevBtn).toBeDisabled();
  });

  it('should disable next button on last page', async () => {
    await render(<BasicTable />);

    const nextBtn = page.getByRole('button', { name: '다음 페이지' });
    await nextBtn.click();

    await expect.element(nextBtn).toBeDisabled();
  });
});

describe('Accessibility', () => {
  it('should have table role', async () => {
    await render(<BasicTable />);

    await expect.element(page.getByRole('table')).toBeInTheDocument();
  });

  it('should have aria-sort on sorted headers', async () => {
    await render(<NoPaginationTable />);

    const nameSort = page.getByRole('button', { name: /Name 정렬/i });
    await nameSort.click();

    const nameTh = page.getByTestId('data-table-head-name');
    await expect
      .element(nameTh)
      .toHaveAttribute('aria-sort', 'ascending');
  });

  it('should have aria-label on pagination buttons', async () => {
    await render(<BasicTable />);

    await expect
      .element(page.getByRole('button', { name: '이전 페이지' }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole('button', { name: '다음 페이지' }))
      .toBeInTheDocument();
  });

  it('should support keyboard navigation for sort headers', async () => {
    await render(<NoPaginationTable />);

    const nameSort = page.getByRole('button', { name: /Name 정렬/i });
    await nameSort.click();

    // 포커스 상태에서 Enter 키로 정렬 토글
    await userEvent.keyboard('{Enter}');

    const nameTh = page.getByTestId('data-table-head-name');
    await expect
      .element(nameTh)
      .toHaveAttribute('aria-sort', 'descending');
  });
});
