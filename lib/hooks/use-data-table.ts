import { useState } from 'react';

import {
  useTable,
  tableFeatures,
  stockFeatures,
  createSortedRowModel,
  createPaginatedRowModel,
  createFilteredRowModel,
  createExpandedRowModel,
  createGroupedRowModel,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFacetedMinMaxValues,
  aggregationFns,
  filterFns,
  sortFns,
  type TableOptions,
  type ReactTable,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type ColumnFiltersState,
  type RowSelectionState,
  type ColumnVisibilityState,
  type ExpandedState,
  type ColumnPinningState,
  type RowData,
  type Row,
  type OnChangeFn,
} from '@tanstack/react-table';

// Keep the full standard API available to passthrough options and consumers.
const dataTableFeatures = tableFeatures({
  ...stockFeatures,
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  expandedRowModel: createExpandedRowModel(),
  groupedRowModel: createGroupedRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  facetedMinMaxValues: createFacetedMinMaxValues(),
  aggregationFns,
  filterFns,
  sortFns,
});

/** Features registered by useDataTable, for native TanStack V9 types. */
export type DataTableFeatures = typeof dataTableFeatures;
export type DataTableInstance<TData extends RowData> = ReactTable<
  DataTableFeatures,
  TData
>;
export type DataTableRow<TData extends RowData> = Row<DataTableFeatures, TData>;
export type DataTableColumnDef<
  TData extends RowData,
  TValue = unknown,
> = ColumnDef<DataTableFeatures, TData, TValue>;

type UseDataTableOptions<TData extends RowData> = {
  /** 테이블 데이터 배열 */
  data: TData[];
  /** 컬럼 정의 배열 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: DataTableColumnDef<TData, any>[];

  // ─── 정렬 ───────────────────────────────────────────
  /** 정렬 활성화. true면 클라이언트 정렬, SortingState면 초기 상태 지정 */
  sorting?: boolean | SortingState;
  /** 정렬 상태 변경 핸들러 (controlled mode) */
  onSortingChange?: OnChangeFn<SortingState>;
  /** 서버사이드 정렬 여부 */
  manualSorting?: boolean;
  /** 기본값 true. false면 grouping 상태에 따라 클라이언트에서 행을 그룹화 */
  manualGrouping?: boolean;

  // ─── 페이지네이션 ──────────────────────────────────
  /** 페이지네이션 활성화. true면 기본 pageSize(10), 객체면 커스텀 pageSize */
  pagination?: boolean | { pageSize: number };
  /** 페이지네이션 상태 변경 핸들러 (controlled mode) */
  onPaginationChange?: OnChangeFn<PaginationState>;
  /** 서버사이드 페이지네이션 여부 */
  manualPagination?: boolean;
  /** 서버사이드 페이지네이션 시 전체 행 수 */
  rowCount?: number;

  // ─── 필터링 ─────────────────────────────────────────
  /** 필터링 활성화 (클라이언트 필터링 사용) */
  filtering?: boolean;
  /** 컬럼 필터 상태 (controlled mode) */
  columnFilters?: ColumnFiltersState;
  /** 컬럼 필터 상태 변경 핸들러 */
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  /** 글로벌 필터 값 (controlled mode) */
  globalFilter?: string;
  /** 글로벌 필터 변경 핸들러 */
  onGlobalFilterChange?: OnChangeFn<string>;

  // ─── 행 선택 ────────────────────────────────────────
  /** 행 선택 활성화 */
  rowSelection?: boolean;
  /** 행 선택 상태 변경 핸들러 (controlled mode) */
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;

  // ─── 컬럼 가시성 ───────────────────────────────────
  /** 컬럼 가시성 활성화. true면 모든 컬럼 표시, ColumnVisibilityState면 초기 상태 */
  columnVisibility?: boolean | ColumnVisibilityState;
  /** 컬럼 가시성 변경 핸들러 (controlled mode) */
  onColumnVisibilityChange?: OnChangeFn<ColumnVisibilityState>;

  // ─── 행 확장 ────────────────────────────────────────
  /** 행 확장 활성화 (상세 행 토글 사용) */
  expanding?: boolean;
  /** 행 확장 상태 변경 핸들러 (controlled mode) */
  onExpandedChange?: OnChangeFn<ExpandedState>;

  // ─── 컬럼 피닝 ─────────────────────────────────────
  /** 컬럼 피닝 초기 상태 */
  columnPinning?: ColumnPinningState;
  /** 컬럼 피닝 변경 핸들러 (controlled mode) */
  onColumnPinningChange?: OnChangeFn<ColumnPinningState>;
} & Omit<
  TableOptions<DataTableFeatures, TData>,
  | 'data'
  | 'columns'
  | 'features'
  | 'state'
  | 'onSortingChange'
  | 'onPaginationChange'
  | 'onColumnFiltersChange'
  | 'onGlobalFilterChange'
  | 'onRowSelectionChange'
  | 'onColumnVisibilityChange'
  | 'onExpandedChange'
  | 'onColumnPinningChange'
  | 'enableRowSelection'
  | 'enableSorting'
  | 'enableColumnFilters'
  | 'enableGlobalFilter'
  | 'enableExpanding'
  | 'enableColumnPinning'
>;

export type { UseDataTableOptions };

/**
 * @tanstack/react-table을 래핑하여 데이터 테이블 기능을 간편하게 설정하는 hook입니다.
 * @remarks
 * - TanStack Table V9의 네이티브 useTable과 React 상태 구독을 사용합니다.
 * - 표준 grouping/faceting row model을 내장합니다. 클라이언트 그룹화는
 *   manualGrouping: false로 활성화하고 grouping 상태로 그룹 컬럼을 지정합니다.
 * - 상태는 table.state로 읽으며 컬럼 피닝은 { start: [], end: [] }를 사용합니다.
 * - memo/React Compiler로 최적화된 커스텀 셀에서 row/column 상태를 읽는 경우,
 *   해당 셀 내부에서 TanStack Subscribe로 상태를 구독해야 합니다.
 * - ColumnDef는 DataTableColumnDef<TData> 또는
 *   ColumnDef<DataTableFeatures, TData>로 정의합니다.
 * @param options - 데이터 테이블 설정 옵션
 * @returns 테이블 인스턴스 (DataTable 컴포넌트에 전달)
 */
export default function useDataTable<TData extends RowData>({
  data,
  columns,
  sorting,
  onSortingChange,
  manualSorting,
  manualGrouping = true,
  pagination,
  onPaginationChange,
  manualPagination,
  rowCount,
  filtering,
  columnFilters,
  onColumnFiltersChange,
  globalFilter,
  onGlobalFilterChange,
  rowSelection,
  onRowSelectionChange,
  columnVisibility,
  onColumnVisibilityChange,
  expanding,
  onExpandedChange,
  columnPinning,
  onColumnPinningChange,
  ...rest
}: UseDataTableOptions<TData>): DataTableInstance<TData> {
  const sortingEnabled = sorting !== undefined && sorting !== false;
  const paginationEnabled = pagination !== undefined && pagination !== false;
  const filteringEnabled = filtering === true;
  const rowSelectionEnabled = rowSelection === true;
  const columnVisibilityEnabled =
    columnVisibility !== undefined && columnVisibility !== false;
  const expandingEnabled = expanding === true;
  const columnPinningEnabled = columnPinning !== undefined;

  const initialSorting: SortingState = Array.isArray(sorting) ? sorting : [];
  const initialPageSize =
    typeof pagination === 'object' ? pagination.pageSize : 10;
  const initialVisibility: ColumnVisibilityState =
    typeof columnVisibility === 'object' ? columnVisibility : {};

  const [sortingState, setSortingState] =
    useState<SortingState>(initialSorting);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });
  const [columnFiltersState, setColumnFiltersState] =
    useState<ColumnFiltersState>(columnFilters ?? []);
  const [globalFilterState, setGlobalFilterState] = useState(
    globalFilter ?? '',
  );
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>(
    {},
  );
  const [visibilityState, setColumnVisibilityState] =
    useState<ColumnVisibilityState>(initialVisibility);
  const [expandedState, setExpandedState] = useState<ExpandedState>({});
  const [columnPinningState, setColumnPinningState] =
    useState<ColumnPinningState>(columnPinning ?? { start: [], end: [] });

  return useTable({
    features: dataTableFeatures,
    data,
    columns,
    autoResetPageIndex: false,
    enableSorting: sortingEnabled,
    manualSorting: !sortingEnabled || manualSorting,
    manualGrouping,
    manualPagination: !paginationEnabled || manualPagination,
    manualFiltering: !filteringEnabled,
    manualExpanding: !expandingEnabled,
    ...(sortingEnabled
      ? {
          onSortingChange: onSortingChange
            ? (((updater) => {
                setSortingState(updater);
                onSortingChange(updater);
              }) as OnChangeFn<SortingState>)
            : setSortingState,
        }
      : {}),
    ...(paginationEnabled
      ? {
          onPaginationChange: onPaginationChange
            ? (((updater) => {
                setPaginationState(updater);
                onPaginationChange(updater);
              }) as OnChangeFn<PaginationState>)
            : setPaginationState,
          rowCount,
        }
      : {}),
    ...(filteringEnabled
      ? {
          onColumnFiltersChange: onColumnFiltersChange
            ? (((updater) => {
                setColumnFiltersState(updater);
                onColumnFiltersChange(updater);
              }) as OnChangeFn<ColumnFiltersState>)
            : setColumnFiltersState,
          onGlobalFilterChange: onGlobalFilterChange
            ? (((updater) => {
                setGlobalFilterState(updater);
                onGlobalFilterChange(updater);
              }) as OnChangeFn<string>)
            : setGlobalFilterState,
        }
      : {}),
    ...(rowSelectionEnabled
      ? {
          enableRowSelection: true,
          onRowSelectionChange: onRowSelectionChange
            ? (((updater) => {
                setRowSelectionState(updater);
                onRowSelectionChange(updater);
              }) as OnChangeFn<RowSelectionState>)
            : setRowSelectionState,
        }
      : {}),
    ...(columnVisibilityEnabled
      ? {
          onColumnVisibilityChange: onColumnVisibilityChange
            ? (((updater) => {
                setColumnVisibilityState(updater);
                onColumnVisibilityChange(updater);
              }) as OnChangeFn<ColumnVisibilityState>)
            : setColumnVisibilityState,
        }
      : {}),
    ...(expandingEnabled
      ? {
          getRowCanExpand: () => true,
          onExpandedChange: onExpandedChange
            ? (((updater) => {
                setExpandedState(updater);
                onExpandedChange(updater);
              }) as OnChangeFn<ExpandedState>)
            : setExpandedState,
        }
      : {}),
    ...(columnPinningEnabled
      ? {
          onColumnPinningChange: onColumnPinningChange
            ? (((updater) => {
                setColumnPinningState(updater);
                onColumnPinningChange(updater);
              }) as OnChangeFn<ColumnPinningState>)
            : setColumnPinningState,
        }
      : {}),

    state: {
      ...(sortingEnabled ? { sorting: sortingState } : {}),
      ...(paginationEnabled ? { pagination: paginationState } : {}),
      ...(filteringEnabled
        ? {
            columnFilters: columnFiltersState,
            globalFilter: globalFilterState,
          }
        : {}),
      ...(rowSelectionEnabled ? { rowSelection: rowSelectionState } : {}),
      ...(columnVisibilityEnabled ? { columnVisibility: visibilityState } : {}),
      ...(expandingEnabled ? { expanded: expandedState } : {}),
      ...(columnPinningEnabled ? { columnPinning: columnPinningState } : {}),
    },

    ...rest,
  });
}
