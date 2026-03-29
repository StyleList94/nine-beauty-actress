import { useState } from 'react';

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  type TableOptions,
  type Table,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type ColumnFiltersState,
  type RowSelectionState,
  type VisibilityState,
  type ExpandedState,
  type ColumnPinningState,
  type OnChangeFn,
} from '@tanstack/react-table';

// 모듈 레벨에서 한 번만 생성 (렌더 안에서 호출하면 무한 재계산)
const coreRowModel = getCoreRowModel();
const sortedRowModel = getSortedRowModel();
const paginationRowModel = getPaginationRowModel();
const filteredRowModel = getFilteredRowModel();
const expandedRowModel = getExpandedRowModel();

type UseDataTableOptions<TData> = {
  /** 테이블 데이터 배열 */
  data: TData[];
  /** 컬럼 정의 배열 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];

  // ─── 정렬 ───────────────────────────────────────────
  /** 정렬 활성화. true면 클라이언트 정렬, SortingState면 초기 상태 지정 */
  sorting?: boolean | SortingState;
  /** 정렬 상태 변경 핸들러 (controlled mode) */
  onSortingChange?: OnChangeFn<SortingState>;
  /** 서버사이드 정렬 여부 */
  manualSorting?: boolean;

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
  /** 필터링 활성화 (getFilteredRowModel 주입) */
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
  /** 컬럼 가시성 활성화. true면 모든 컬럼 표시, VisibilityState면 초기 상태 */
  columnVisibility?: boolean | VisibilityState;
  /** 컬럼 가시성 변경 핸들러 (controlled mode) */
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;

  // ─── 행 확장 ────────────────────────────────────────
  /** 행 확장 활성화 (getExpandedRowModel 주입) */
  expanding?: boolean;
  /** 행 확장 상태 변경 핸들러 (controlled mode) */
  onExpandedChange?: OnChangeFn<ExpandedState>;

  // ─── 컬럼 피닝 ─────────────────────────────────────
  /** 컬럼 피닝 초기 상태 */
  columnPinning?: ColumnPinningState;
  /** 컬럼 피닝 변경 핸들러 (controlled mode) */
  onColumnPinningChange?: OnChangeFn<ColumnPinningState>;
} & Omit<
  TableOptions<TData>,
  | 'data'
  | 'columns'
  | 'getCoreRowModel'
  | 'getSortedRowModel'
  | 'getPaginationRowModel'
  | 'getFilteredRowModel'
  | 'getExpandedRowModel'
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
>;

export type { UseDataTableOptions };

/**
 * @tanstack/react-table을 래핑하여 데이터 테이블 기능을 간편하게 설정하는 hook입니다.
 * @param options - 데이터 테이블 설정 옵션
 * @returns 테이블 인스턴스 (DataTable 컴포넌트에 전달)
 */
export default function useDataTable<TData>({
  data,
  columns,
  // sorting
  sorting,
  onSortingChange,
  manualSorting,
  // pagination
  pagination,
  onPaginationChange,
  manualPagination,
  rowCount,
  // filtering
  filtering,
  columnFilters,
  onColumnFiltersChange,
  globalFilter,
  onGlobalFilterChange,
  // row selection
  rowSelection,
  onRowSelectionChange,
  // column visibility
  columnVisibility,
  onColumnVisibilityChange,
  // expanding
  expanding,
  onExpandedChange,
  // column pinning
  columnPinning,
  onColumnPinningChange,
  ...rest
}: UseDataTableOptions<TData>): Table<TData> {
  const sortingEnabled = sorting !== undefined && sorting !== false;
  const paginationEnabled = pagination !== undefined && pagination !== false;
  const filteringEnabled = filtering === true;
  const rowSelectionEnabled = rowSelection === true;
  const columnVisibilityEnabled =
    columnVisibility !== undefined && columnVisibility !== false;
  const expandingEnabled = expanding === true;
  const columnPinningEnabled = columnPinning !== undefined;

  // ─── 내부 상태 ─────────────────────────────────────
  const initialSorting: SortingState = Array.isArray(sorting) ? sorting : [];
  const initialPageSize =
    typeof pagination === 'object' ? pagination.pageSize : 10;
  const initialVisibility: VisibilityState =
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
  const [visibilityState, setVisibilityState] =
    useState<VisibilityState>(initialVisibility);
  const [expandedState, setExpandedState] = useState<ExpandedState>({});
  const [columnPinningState, setColumnPinningState] =
    useState<ColumnPinningState>(columnPinning ?? {});

  return useReactTable({
    data,
    columns,
    getCoreRowModel: coreRowModel,
    autoResetPageIndex: false,

    // sorting
    ...(sortingEnabled && !manualSorting
      ? { getSortedRowModel: sortedRowModel }
      : {}),
    ...(sortingEnabled
      ? {
          onSortingChange: onSortingChange ?? setSortingState,
          manualSorting,
        }
      : {}),

    // pagination
    ...(paginationEnabled && !manualPagination
      ? { getPaginationRowModel: paginationRowModel }
      : {}),
    ...(paginationEnabled
      ? {
          onPaginationChange: onPaginationChange ?? setPaginationState,
          manualPagination,
          rowCount,
        }
      : {}),

    // filtering
    ...(filteringEnabled
      ? {
          getFilteredRowModel: filteredRowModel,
          onColumnFiltersChange: onColumnFiltersChange ?? setColumnFiltersState,
          onGlobalFilterChange: onGlobalFilterChange ?? setGlobalFilterState,
        }
      : {}),

    // row selection
    ...(rowSelectionEnabled
      ? {
          enableRowSelection: true,
          onRowSelectionChange: onRowSelectionChange ?? setRowSelectionState,
        }
      : {}),

    // column visibility
    ...(columnVisibilityEnabled
      ? {
          onColumnVisibilityChange:
            onColumnVisibilityChange ?? setVisibilityState,
        }
      : {}),

    // expanding
    ...(expandingEnabled
      ? {
          getExpandedRowModel: expandedRowModel,
          onExpandedChange: onExpandedChange ?? setExpandedState,
        }
      : {}),

    // column pinning
    ...(columnPinningEnabled
      ? {
          onColumnPinningChange: onColumnPinningChange ?? setColumnPinningState,
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
