import type { DataTableColumnDef as ColumnDef } from 'lib/hooks/use-data-table';

import { act, renderHook } from '@testing-library/react';

import useDataTable from 'lib/hooks/use-data-table';

type TestData = { id: number; name: string; age: number };

const columns: ColumnDef<TestData>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' },
];

const data: TestData[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
];

describe('useDataTable', () => {
  it('should create table instance with data and columns', () => {
    const { result } = renderHook(() => useDataTable({ data, columns }));

    expect(result.current.getRowModel().rows).toHaveLength(3);
    expect(result.current.getAllColumns()).toHaveLength(3);
  });

  it('should enable sorting when sorting is true', () => {
    const { result } = renderHook(() =>
      useDataTable({ data, columns, sorting: true }),
    );

    const nameColumn = result.current.getColumn('name');
    expect(nameColumn?.getCanSort()).toBe(true);
  });

  it('should set initial sorting state when sorting is SortingState', () => {
    const { result } = renderHook(() =>
      useDataTable({
        data,
        columns,
        sorting: [{ id: 'name', desc: false }],
      }),
    );

    expect(result.current.state.sorting).toEqual([{ id: 'name', desc: false }]);
  });

  it('should enable pagination with default pageSize', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      age: 20 + i,
    }));

    const { result } = renderHook(() =>
      useDataTable({ data: largeData, columns, pagination: true }),
    );

    expect(result.current.state.pagination.pageSize).toBe(10);
    expect(result.current.getRowModel().rows.length).toBeLessThanOrEqual(10);
  });

  it('should set custom pageSize', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      age: 20 + i,
    }));

    const { result } = renderHook(() =>
      useDataTable({
        data: largeData,
        columns,
        pagination: { pageSize: 5 },
      }),
    );

    expect(result.current.state.pagination.pageSize).toBe(5);
    expect(result.current.getRowModel().rows.length).toBeLessThanOrEqual(5);
  });

  it('should pass through tanstack options', () => {
    const { result } = renderHook(() =>
      useDataTable({
        data,
        columns,
        enableMultiSort: true,
      }),
    );

    expect(result.current).toBeDefined();
  });

  it('should enable filtering when filtering is true', () => {
    const { result } = renderHook(() =>
      useDataTable({ data, columns, filtering: true }),
    );

    expect(result.current.state.columnFilters).toEqual([]);
    expect(result.current.state.globalFilter).toBe('');
  });

  it('should enable row selection when rowSelection is true', () => {
    const { result } = renderHook(() =>
      useDataTable({ data, columns, rowSelection: true }),
    );

    expect(result.current.state.rowSelection).toEqual({});
    const row = result.current.getRowModel().rows[0];
    expect(row.getCanSelect()).toBe(true);
  });

  it('should set initial column visibility state', () => {
    const { result } = renderHook(() =>
      useDataTable({
        data,
        columns,
        columnVisibility: { age: false },
      }),
    );

    expect(result.current.state.columnVisibility).toEqual({
      age: false,
    });
    expect(result.current.getColumn('age')?.getIsVisible()).toBe(false);
  });

  it('should enable expanding when expanding is true', () => {
    const { result } = renderHook(() =>
      useDataTable({ data, columns, expanding: true }),
    );

    expect(result.current.state.expanded).toEqual({});
  });

  it('should set initial column pinning state', () => {
    const { result } = renderHook(() =>
      useDataTable({
        data,
        columns,
        columnPinning: { start: ['id'], end: [] },
      }),
    );

    expect(result.current.state.columnPinning).toEqual({
      start: ['id'],
      end: [],
    });
  });

  it('should call onSortingChange and sync internal state', () => {
    const onSortingChange = vi.fn<() => void>();
    const { result } = renderHook(() =>
      useDataTable({
        data,
        columns,
        sorting: true,
        onSortingChange,
      }),
    );

    const nameColumn = result.current.getColumn('name');
    act(() => nameColumn?.toggleSorting(false));

    expect(onSortingChange).toHaveBeenCalled();
    expect(result.current.state.sorting).toEqual([{ id: 'name', desc: false }]);
  });

  it('should call onPaginationChange and sync internal state', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      age: 20 + i,
    }));
    const onPaginationChange = vi.fn<() => void>();
    const { result } = renderHook(() =>
      useDataTable({
        data: largeData,
        columns,
        pagination: { pageSize: 5 },
        onPaginationChange,
      }),
    );

    act(() => result.current.nextPage());

    expect(onPaginationChange).toHaveBeenCalled();
    expect(result.current.state.pagination.pageIndex).toBe(1);
  });

  it('should not client-sort when manualSorting is true', () => {
    const unsorted = [
      { id: 3, name: 'Charlie', age: 35 },
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
    ];

    const { result } = renderHook(() =>
      useDataTable({
        data: unsorted,
        columns,
        sorting: [{ id: 'name', desc: false }],
        manualSorting: true,
      }),
    );

    // 데이터 순서가 원본 그대로 유지 (클라이언트 정렬 안 함)
    const { rows } = result.current.getRowModel();
    expect(rows[0].original.name).toBe('Charlie');
    expect(rows[1].original.name).toBe('Alice');
    expect(rows[2].original.name).toBe('Bob');
  });

  it('should not client-paginate when manualPagination is true', () => {
    const { result } = renderHook(() =>
      useDataTable({
        data,
        columns,
        pagination: { pageSize: 2 },
        manualPagination: true,
        rowCount: 100,
      }),
    );

    // manualPagination이면 전체 데이터 반환 (서버가 이미 슬라이스)
    expect(result.current.getRowModel().rows).toHaveLength(3);
    expect(result.current.getPageCount()).toBe(50); // rowCount / pageSize
  });

  it('should preserve all rows when pagination is disabled', () => {
    const manyRows = Array.from({ length: 15 }, (_, id) => ({
      id,
      name: `User ${id}`,
      age: id,
    }));
    const { result } = renderHook(() =>
      useDataTable({ data: manyRows, columns }),
    );
    expect(result.current.getRowModel().rows).toHaveLength(15);
  });

  it('should compose filtering, sorting and pagination on state changes', () => {
    const { result } = renderHook(() =>
      useDataTable({
        data,
        columns,
        filtering: true,
        sorting: true,
        pagination: { pageSize: 1 },
      }),
    );

    act(() => result.current.setGlobalFilter('a'));
    act(() => result.current.getColumn('age')?.toggleSorting(true));
    expect(result.current.getRowModel().rows[0].original.name).toBe('Charlie');
    act(() => result.current.nextPage());
    expect(result.current.getRowModel().rows[0].original.name).toBe('Alice');
    expect(result.current.state.pagination.pageIndex).toBe(1);
  });

  it('should react to visibility, selection and logical pinning changes', () => {
    const { result } = renderHook(() =>
      useDataTable({
        data,
        columns,
        columnVisibility: true,
        rowSelection: true,
        columnPinning: { start: [], end: [] },
      }),
    );

    act(() => result.current.getColumn('age')?.toggleVisibility(false));
    act(() => result.current.getColumn('name')?.pin('start'));
    act(() => result.current.getRowModel().rows[0].toggleSelected(true));
    expect(
      result.current.getVisibleLeafColumns().map((column) => column.id),
    ).toEqual(['id', 'name']);
    expect(
      result.current.getStartVisibleLeafColumns().map((column) => column.id),
    ).toEqual(['name']);
    expect(result.current.getSelectedRowModel().rows).toHaveLength(1);
    expect(result.current.state.columnPinning).toEqual({
      start: ['name'],
      end: [],
    });
  });

  it('should support detail expansion without subrows and notify the caller', () => {
    const onExpandedChange = vi.fn<() => void>();
    const { result } = renderHook(() =>
      useDataTable({
        data,
        columns,
        expanding: true,
        onExpandedChange,
      }),
    );
    act(() => result.current.getRowModel().rows[0].toggleExpanded());
    expect(result.current.getRowModel().rows[0].getIsExpanded()).toBe(true);
    expect(onExpandedChange).toHaveBeenCalledOnce();
  });

  it('should preserve initial column order and ordering updates', () => {
    const { result } = renderHook(() =>
      useDataTable({
        data,
        columns,
        initialState: { columnOrder: ['age', 'name', 'id'] },
      }),
    );

    expect(
      result.current.getAllLeafColumns().map((column) => column.id),
    ).toEqual(['age', 'name', 'id']);
    act(() => result.current.setColumnOrder(['name', 'id', 'age']));
    expect(
      result.current.getAllLeafColumns().map((column) => column.id),
    ).toEqual(['name', 'id', 'age']);
  });

  it('should preserve column size definitions and sizing updates', () => {
    const sizedColumns: ColumnDef<TestData>[] = [
      { accessorKey: 'name', size: 240 },
      { accessorKey: 'age', size: 80 },
    ];
    const { result } = renderHook(() =>
      useDataTable({ data, columns: sizedColumns }),
    );

    expect(result.current.getColumn('name')?.getSize()).toBe(240);
    act(() => result.current.setColumnSizing({ name: 320 }));
    expect(result.current.getColumn('name')?.getSize()).toBe(320);
    expect(result.current.getTotalSize()).toBe(400);
  });

  it('should preserve initial row pinning and pinning updates', () => {
    const { result } = renderHook(() =>
      useDataTable({
        data,
        columns,
        initialState: { rowPinning: { top: ['0'], bottom: [] } },
      }),
    );

    expect(result.current.getTopRows().map((row) => row.original.name)).toEqual(
      ['Alice'],
    );
    act(() => result.current.getRow('1').pin('bottom'));
    expect(
      result.current.getBottomRows().map((row) => row.original.name),
    ).toEqual(['Bob']);
    expect(
      result.current.getCenterRows().map((row) => row.original.name),
    ).toEqual(['Charlie']);
  });

  it('should retain standard grouping, faceting and resizing APIs', () => {
    const { result } = renderHook(() => useDataTable({ data, columns }));
    const column = result.current.getColumn('name');
    const header = result.current.getHeaderGroups()[0].headers[0];

    expect(result.current.setGrouping).toBeTypeOf('function');
    expect(result.current.getGlobalFacetedUniqueValues).toBeTypeOf('function');
    expect(column?.getFacetedUniqueValues).toBeTypeOf('function');
    expect(column?.getCanResize).toBeTypeOf('function');
    expect(header.getResizeHandler).toBeTypeOf('function');
    expect(
      result.current.getColumn('age')?.getAutoAggregationFn(),
    ).toBeDefined();
  });

  it('should support native client grouping and faceting while keeping grouping opt-in', () => {
    type Sale = { kind: string; amount: number };
    const sales = [
      { kind: 'A', amount: 2 },
      { kind: 'A', amount: 3 },
      { kind: 'B', amount: 4 },
    ];
    const saleColumns: ColumnDef<Sale>[] = [
      { accessorKey: 'kind' },
      { accessorKey: 'amount', aggregationFn: 'sum' },
    ];
    const { result } = renderHook(
      ({ manualGrouping }: { manualGrouping?: boolean }) =>
        useDataTable({
          data: sales,
          columns: saleColumns,
          initialState: { grouping: ['kind'] },
          manualGrouping,
        }),
      { initialProps: { manualGrouping: false } },
    );

    expect(result.current.getRowModel().rows).toHaveLength(2);
    expect(result.current.getRowModel().rows[0].getValue('amount')).toBe(5);
    expect([
      ...result.current.getColumn('kind')!.getFacetedUniqueValues(),
    ]).toEqual([
      ['A', 2],
      ['B', 1],
    ]);
    expect(
      result.current.getColumn('amount')?.getFacetedMinMaxValues(),
    ).toEqual([2, 4]);

    const { result: defaultResult } = renderHook(() =>
      useDataTable({
        data: sales,
        columns: saleColumns,
        initialState: { grouping: ['kind'] },
      }),
    );
    expect(defaultResult.current.getRowModel().rows).toHaveLength(3);
  });
});
