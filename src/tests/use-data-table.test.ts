import type { ColumnDef } from '@tanstack/react-table';

import { renderHook } from '@testing-library/react';

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

    expect(result.current.getState().sorting).toEqual([
      { id: 'name', desc: false },
    ]);
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

    expect(result.current.getState().pagination.pageSize).toBe(10);
    expect(result.current.getRowModel().rows.length).toBeLessThanOrEqual(
      10,
    );
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

    expect(result.current.getState().pagination.pageSize).toBe(5);
    expect(result.current.getRowModel().rows.length).toBeLessThanOrEqual(
      5,
    );
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
});
