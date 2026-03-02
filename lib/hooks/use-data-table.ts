import { useState } from 'react';

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  type TableOptions,
  type Table,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type OnChangeFn,
} from '@tanstack/react-table';

type UseDataTableOptions<TData> = {
  /** 테이블 데이터 배열 */
  data: TData[];
  /** 컬럼 정의 배열 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  /** 정렬 활성화. true면 클라이언트 정렬, SortingState면 초기 상태 지정 */
  sorting?: boolean | SortingState;
  /** 정렬 상태 변경 핸들러 (controlled mode) */
  onSortingChange?: OnChangeFn<SortingState>;
  /** 서버사이드 정렬 여부 */
  manualSorting?: boolean;
  /** 페이지네이션 활성화. true면 기본 pageSize(10), 객체면 커스텀 pageSize */
  pagination?: boolean | { pageSize: number };
  /** 페이지네이션 상태 변경 핸들러 (controlled mode) */
  onPaginationChange?: OnChangeFn<PaginationState>;
  /** 서버사이드 페이지네이션 여부 */
  manualPagination?: boolean;
  /** 서버사이드 페이지네이션 시 전체 행 수 */
  rowCount?: number;
} & Omit<
  TableOptions<TData>,
  | 'data'
  | 'columns'
  | 'getCoreRowModel'
  | 'getSortedRowModel'
  | 'getPaginationRowModel'
  | 'state'
  | 'onSortingChange'
  | 'onPaginationChange'
>;

export type { UseDataTableOptions };

/**
 * @tanstack/react-table을 래핑하여 정렬과 페이지네이션을 간편하게 설정하는 hook입니다.
 * @param options - 데이터 테이블 설정 옵션
 * @returns 테이블 인스턴스 (DataTable 컴포넌트에 전달)
 */
export default function useDataTable<TData>({
  data,
  columns,
  sorting,
  onSortingChange,
  manualSorting,
  pagination,
  onPaginationChange,
  manualPagination,
  rowCount,
  ...rest
}: UseDataTableOptions<TData>): Table<TData> {
  const sortingEnabled = sorting !== undefined && sorting !== false;
  const paginationEnabled = pagination !== undefined && pagination !== false;

  const initialSorting: SortingState = Array.isArray(sorting) ? sorting : [];
  const initialPageSize =
    typeof pagination === 'object' ? pagination.pageSize : 10;

  const [sortingState, setSortingState] =
    useState<SortingState>(initialSorting);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    ...(sortingEnabled && !manualSorting
      ? { getSortedRowModel: getSortedRowModel() }
      : {}),
    ...(sortingEnabled
      ? {
          onSortingChange: onSortingChange ?? setSortingState,
          manualSorting,
        }
      : {}),

    ...(paginationEnabled && !manualPagination
      ? { getPaginationRowModel: getPaginationRowModel() }
      : {}),
    ...(paginationEnabled
      ? {
          onPaginationChange: onPaginationChange ?? setPaginationState,
          manualPagination,
          rowCount,
        }
      : {}),

    state: {
      ...(sortingEnabled ? { sorting: sortingState } : {}),
      ...(paginationEnabled ? { pagination: paginationState } : {}),
    },

    ...rest,
  });
}
