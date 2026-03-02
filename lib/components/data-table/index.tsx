import { type ReactNode, createContext, use, useMemo } from 'react';

import {
  flexRender,
  type Table as TanstackTable,
  type Header,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from 'lucide-react';

import { cn } from 'lib/core/utils';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from 'lib/components/table';
import { Button } from 'lib/components/button';

import * as styles from './style.css';

// ─── Context ─────────────────────────────────────────────

type DataTableContextValue<TData = unknown> = {
  table: TanstackTable<TData>;
};

const DataTableContext = createContext<DataTableContextValue | null>(null);

function useDataTableContext() {
  const context = use(DataTableContext);
  if (!context) {
    throw new Error(
      'DataTable 서브컴포넌트는 <DataTable> 안에서 사용해야 합니다.',
    );
  }
  return context;
}

// ─── Types ───────────────────────────────────────────────

export type DataTableProps<TData> = {
  /** useDataTable hook이 반환한 table instance */
  table: TanstackTable<TData>;
  children: ReactNode;
  className?: string;
};

export type DataTableContentProps = {
  className?: string;
  /** DataTableEmpty 미사용 시 기본 빈 상태 메시지 */
  emptyMessage?: string;
  children?: ReactNode;
};

export type DataTablePaginationProps = {
  className?: string;
};

export type DataTableEmptyProps = {
  children: ReactNode;
};

// ─── Helpers ─────────────────────────────────────────────

function getAriaSort(sorted: false | 'asc' | 'desc') {
  if (sorted === 'asc') return 'ascending' as const;
  if (sorted === 'desc') return 'descending' as const;
  return undefined;
}

function SortIndicator<TData>({
  header,
}: {
  header: Header<TData, unknown>;
}) {
  const sorted = header.column.getIsSorted();

  if (sorted === 'asc') {
    return <ArrowUp className={styles.sortIcon} />;
  }
  if (sorted === 'desc') {
    return <ArrowDown className={styles.sortIcon} />;
  }
  return null;
}

function renderHeaderContent<TData>(header: Header<TData, unknown>) {
  if (header.isPlaceholder) return null;

  const rendered = flexRender(
    header.column.columnDef.header,
    header.getContext(),
  );

  if (!header.column.getCanSort()) return rendered;

  return (
    <div
      data-slot="data-table-sort-header"
      className={styles.sortableHeader}
      onClick={header.column.getToggleSortingHandler()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.column.toggleSorting();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${typeof header.column.columnDef.header === 'string' ? header.column.columnDef.header : header.column.id} 정렬`}
    >
      {rendered}
      <SortIndicator header={header} />
    </div>
  );
}

// ─── DataTable ───────────────────────────────────────────

/**
 * 데이터 바인딩, 정렬, 페이지네이션을 지원하는 테이블 컴포넌트입니다.
 *
 * @remarks
 * - useDataTable hook과 함께 사용
 * - DataTableContent, DataTablePagination 서브컴포넌트 조합으로 구성
 * - 내부에서 기존 Table 컴포넌트를 렌더링에 활용
 *
 * @example
 * ```tsx
 * const table = useDataTable({ data, columns, sorting: true });
 *
 * <DataTable table={table}>
 *   <DataTableContent />
 *   <DataTablePagination />
 * </DataTable>
 * ```
 */
export function DataTable<TData>({
  table,
  children,
  className,
}: DataTableProps<TData>) {
  const contextValue = useMemo(
    () => ({ table }) as DataTableContextValue,
    [table],
  );

  return (
    <DataTableContext value={contextValue}>
      <div
        data-slot="data-table"
        className={cn(styles.container, className)}
      >
        {children}
      </div>
    </DataTableContext>
  );
}

// ─── DataTableContent ────────────────────────────────────

/** 테이블 헤더와 본문을 렌더링합니다. */
export function DataTableContent({
  className,
  emptyMessage = '결과가 없습니다.',
  children,
}: DataTableContentProps) {
  const { table } = useDataTableContext();
  const {rows} = table.getRowModel();
  const columnCount = table.getAllColumns().length;

  const emptyContent = children ?? (
    <span className={styles.emptyState}>{emptyMessage}</span>
  );

  return (
    <Table className={className}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                data-testid={`data-table-head-${header.column.id}`}
                aria-sort={getAriaSort(header.column.getIsSorted())}
              >
                {renderHeaderContent(header)}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {rows.length > 0 ? (
          rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() ? 'selected' : undefined}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columnCount}>{emptyContent}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

// ─── DataTablePagination ─────────────────────────────────

/** 페이지네이션 컨트롤을 렌더링합니다. */
export function DataTablePagination({
  className,
}: DataTablePaginationProps) {
  const { table } = useDataTableContext();
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getRowCount();

  const from = pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div
      data-slot="data-table-pagination"
      className={cn(styles.paginationBar, className)}
    >
      <span className={styles.paginationInfo}>
        {totalRows > 0
          ? `${from}-${to} / ${totalRows.toLocaleString()}`
          : '0 결과'}
      </span>
      <div className={styles.paginationControls}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="이전 페이지"
        >
          이전
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="다음 페이지"
        >
          다음
        </Button>
      </div>
    </div>
  );
}

// ─── DataTableEmpty ──────────────────────────────────────

/** 빈 상태를 커스터마이징합니다. DataTableContent의 children으로 사용합니다. */
export function DataTableEmpty({ children }: DataTableEmptyProps) {
  return <div className={styles.emptyState}>{children}</div>;
}
