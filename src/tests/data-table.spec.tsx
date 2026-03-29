import type { ColumnDef } from '@tanstack/react-table';

import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

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
  return (
    <DataTable
      data={data}
      columns={columns}
      sorting
      pagination={{ pageSize: 3 }}
    >
      <DataTableContent />
      <DataTablePagination />
    </DataTable>
  );
}

function EmptyTable() {
  return (
    <DataTable data={[]} columns={columns}>
      <DataTableContent />
    </DataTable>
  );
}

function CustomEmptyTable() {
  return (
    <DataTable data={[]} columns={columns}>
      <DataTableContent>
        <DataTableEmpty>
          <p>커스텀 빈 상태</p>
        </DataTableEmpty>
      </DataTableContent>
    </DataTable>
  );
}

function NoPaginationTable() {
  return (
    <DataTable data={testData} columns={columns} sorting>
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

    await expect.element(page.getByText('커스텀 빈 상태')).toBeInTheDocument();
  });
});

describe('Sorting', () => {
  it('should sort ascending on first header click', async () => {
    await render(<NoPaginationTable />);

    const nameSort = page.getByRole('button', { name: /Name 정렬/i });
    await nameSort.click();

    const nameTh = page.getByTestId('data-table-head-name');
    await expect.element(nameTh).toHaveAttribute('aria-sort', 'ascending');
  });

  it('should toggle sort direction on repeated clicks', async () => {
    await render(<NoPaginationTable />);

    // 숫자 컬럼은 sortDescFirst가 기본이므로 desc → asc 순서
    const ageSort = page.getByRole('button', { name: /Age 정렬/i });
    const ageTh = page.getByTestId('data-table-head-age');

    await ageSort.click();
    await expect.element(ageTh).toHaveAttribute('aria-sort', 'descending');

    await ageSort.click();
    await expect.element(ageTh).toHaveAttribute('aria-sort', 'ascending');
  });

  it('should not sort columns with enableSorting: false', async () => {
    const noSortColumns: ColumnDef<TestData>[] = [
      { accessorKey: 'id', header: 'ID', enableSorting: false },
      { accessorKey: 'name', header: 'Name' },
    ];

    await render(
      <DataTable data={testData} columns={noSortColumns} sorting>
        <DataTableContent />
      </DataTable>,
    );

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

    // 헤더 1행 + 데이터 3행 = 4행
    const rows = page.getByRole('row');
    await expect.element(rows.nth(3)).toBeInTheDocument();
    await expect.element(rows.nth(4)).not.toBeInTheDocument();
  });

  it('should show pagination info', async () => {
    await render(<BasicTable />);

    await expect.element(page.getByText('1-3 / 5')).toBeInTheDocument();
  });

  it('should navigate to next page', async () => {
    await render(<BasicTable />);

    const nextBtn = page.getByRole('button', { name: '다음 페이지' });
    await nextBtn.click();

    await expect.element(page.getByText('4-5 / 5')).toBeInTheDocument();
    await expect.element(page.getByText('Diana')).toBeInTheDocument();
  });

  it('should disable previous button on first page', async () => {
    await render(<BasicTable />);

    const prevBtn = page.getByRole('button', { name: '이전 페이지' });
    await expect.element(prevBtn).toBeDisabled();
  });

  it('should navigate to previous page', async () => {
    await render(<BasicTable />);

    const nextBtn = page.getByRole('button', { name: '다음 페이지' });
    const prevBtn = page.getByRole('button', { name: '이전 페이지' });

    await nextBtn.click();
    await expect.element(page.getByText('4-5 / 5')).toBeInTheDocument();

    await prevBtn.click();
    await expect.element(page.getByText('1-3 / 5')).toBeInTheDocument();
  });

  it('should disable next button on last page', async () => {
    await render(<BasicTable />);

    const nextBtn = page.getByRole('button', { name: '다음 페이지' });
    await nextBtn.click();

    await expect.element(nextBtn).toBeDisabled();
  });
});

describe('Children Function (Render Props)', () => {
  it('should pass table instance to children function', async () => {
    await render(
      <DataTable data={testData} columns={columns} sorting rowSelection>
        {(table) => (
          <>
            <DataTableContent />
            <p data-testid="selected-count">
              {table.getFilteredSelectedRowModel().rows.length}건
            </p>
          </>
        )}
      </DataTable>,
    );

    await expect.element(page.getByRole('table')).toBeInTheDocument();
    await expect
      .element(page.getByTestId('selected-count'))
      .toHaveTextContent('0건');
  });
});

describe('Filtering', () => {
  it('should filter rows when filtering is enabled', async () => {
    await render(
      <DataTable
        data={testData}
        columns={columns}
        filtering
        columnFilters={[{ id: 'name', value: 'Alice' }]}
      >
        <DataTableContent />
      </DataTable>,
    );

    await expect.element(page.getByText('Alice')).toBeInTheDocument();
    await expect.element(page.getByText('Bob')).not.toBeInTheDocument();
  });
});

describe('Row Selection', () => {
  it('should enable row selection', async () => {
    const selectionColumns: ColumnDef<TestData>[] = [
      {
        id: 'select',
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            data-testid={`select-${row.original.id}`}
          />
        ),
      },
      ...columns,
    ];

    await render(
      <DataTable
        data={testData.slice(0, 3)}
        columns={selectionColumns}
        rowSelection
      >
        {(table) => (
          <>
            <DataTableContent />
            <p data-testid="selection-info">
              {table.getFilteredSelectedRowModel().rows.length}건 선택
            </p>
          </>
        )}
      </DataTable>,
    );

    await expect
      .element(page.getByTestId('selection-info'))
      .toHaveTextContent('0건 선택');

    await page.getByTestId('select-1').click();

    await expect
      .element(page.getByTestId('selection-info'))
      .toHaveTextContent('1건 선택');
  });
});

describe('Column Visibility', () => {
  it('should hide columns when columnVisibility is set', async () => {
    await render(
      <DataTable
        data={testData.slice(0, 3)}
        columns={columns}
        columnVisibility={{ age: false }}
      >
        <DataTableContent />
      </DataTable>,
    );

    await expect.element(page.getByText('Name')).toBeInTheDocument();
    await expect.element(page.getByText('Age')).not.toBeInTheDocument();
  });
});

describe('Expanding', () => {
  it('should enable expanding', async () => {
    const expandColumns: ColumnDef<TestData>[] = [
      {
        id: 'expand',
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => row.toggleExpanded()}
            data-testid={`expand-${row.original.id}`}
          >
            {row.getIsExpanded() ? '접기' : '펼치기'}
          </button>
        ),
      },
      ...columns,
    ];

    await render(
      <DataTable data={testData.slice(0, 3)} columns={expandColumns} expanding>
        <DataTableContent />
      </DataTable>,
    );

    const expandBtn = page.getByTestId('expand-1');
    await expect.element(expandBtn).toHaveTextContent('펼치기');

    await expandBtn.click();
    await expect.element(expandBtn).toHaveTextContent('접기');
  });
});

describe('Column Pinning', () => {
  it('should accept columnPinning state', async () => {
    await render(
      <DataTable
        data={testData.slice(0, 3)}
        columns={columns}
        columnPinning={{ left: ['id'] }}
      >
        <DataTableContent />
      </DataTable>,
    );

    await expect.element(page.getByRole('table')).toBeInTheDocument();
    await expect.element(page.getByText('ID')).toBeInTheDocument();
  });
});

describe('Edge Cases', () => {
  it('should show "0 결과" when pagination is enabled with empty data', async () => {
    await render(
      <DataTable
        data={[] as TestData[]}
        columns={columns}
        pagination={{ pageSize: 3 }}
      >
        <DataTableContent />
        <DataTablePagination />
      </DataTable>,
    );

    await expect.element(page.getByText('0 결과')).toBeInTheDocument();
  });

  it('should handle function header in column def', async () => {
    const fnHeaderColumns: ColumnDef<TestData>[] = [
      { accessorKey: 'id', header: () => 'Custom ID' },
      { accessorKey: 'name', header: 'Name' },
    ];

    await render(
      <DataTable data={testData.slice(0, 2)} columns={fnHeaderColumns} sorting>
        <DataTableContent />
      </DataTable>,
    );

    await expect.element(page.getByText('Custom ID')).toBeInTheDocument();
  });
});

describe('Error Handling', () => {
  it('should throw when sub-component is used outside DataTable', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(async () => {
      await render(<DataTableContent />);
    }).rejects.toThrow(
      'DataTable 서브컴포넌트는 <DataTable> 안에서 사용해야 합니다.',
    );

    spy.mockRestore();
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
    await expect.element(nameTh).toHaveAttribute('aria-sort', 'ascending');
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
    await expect.element(nameTh).toHaveAttribute('aria-sort', 'descending');
  });
});
