import { forwardRef, type ComponentProps } from 'react';

import { cn } from 'lib/core/utils';

import * as styles from './style.css';

export type TableProps = ComponentProps<'table'>;

/**
 * 데이터를 행과 열로 표시하는 테이블 컴포넌트입니다.
 *
 * @remarks
 * - 가로 스크롤을 위한 컨테이너 래퍼 자동 포함
 * - TableHeader, TableBody, TableFooter, TableCaption 조합으로 구성
 * - data-state="selected"로 행 선택 상태 표시
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>이름</TableHead>
 *       <TableHead>상태</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>항목 1</TableCell>
 *       <TableCell>활성</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div data-slot="table-container" className={styles.tableContainer}>
      <table
        ref={ref}
        data-slot="table"
        className={cn(styles.tableBase, className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = 'Table';

/** 테이블 헤더 영역 */
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  ComponentProps<'thead'>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    data-slot="table-header"
    className={cn(styles.tableHeader, className)}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

/** 테이블 본문 영역 */
export const TableBody = forwardRef<
  HTMLTableSectionElement,
  ComponentProps<'tbody'>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    data-slot="table-body"
    className={cn(styles.tableBody, className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

/** 테이블 푸터 영역 (합계 등) */
export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  ComponentProps<'tfoot'>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    data-slot="table-footer"
    className={cn(styles.tableFooter, className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

/** 테이블 행 */
export const TableRow = forwardRef<HTMLTableRowElement, ComponentProps<'tr'>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(styles.tableRow, className)}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

/** 테이블 헤더 셀 */
export const TableHead = forwardRef<
  HTMLTableCellElement,
  ComponentProps<'th'>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    data-slot="table-head"
    className={cn(styles.tableHead, className)}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

/** 테이블 데이터 셀 */
export const TableCell = forwardRef<
  HTMLTableCellElement,
  ComponentProps<'td'>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    data-slot="table-cell"
    className={cn(styles.tableCell, className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

/** 테이블 캡션 (하단 설명) */
export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  ComponentProps<'caption'>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    data-slot="table-caption"
    className={cn(styles.tableCaption, className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';
