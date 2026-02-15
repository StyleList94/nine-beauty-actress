import { type ComponentProps } from 'react';

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
export function Table({ className, ref, ...props }: TableProps) {
  return (
    <div data-slot="table-container" className={styles.tableContainer}>
      <table
        ref={ref}
        data-slot="table"
        className={cn(styles.tableBase, className)}
        {...props}
      />
    </div>
  );
}

/** 테이블 헤더 영역 */
export function TableHeader({
  className,
  ref,
  ...props
}: ComponentProps<'thead'>) {
  return (
    <thead
      ref={ref}
      data-slot="table-header"
      className={cn(styles.tableHeader, className)}
      {...props}
    />
  );
}

/** 테이블 본문 영역 */
export function TableBody({
  className,
  ref,
  ...props
}: ComponentProps<'tbody'>) {
  return (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn(styles.tableBody, className)}
      {...props}
    />
  );
}

/** 테이블 푸터 영역 (합계 등) */
export function TableFooter({
  className,
  ref,
  ...props
}: ComponentProps<'tfoot'>) {
  return (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn(styles.tableFooter, className)}
      {...props}
    />
  );
}

/** 테이블 행 */
export function TableRow({ className, ref, ...props }: ComponentProps<'tr'>) {
  return (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(styles.tableRow, className)}
      {...props}
    />
  );
}

/** 테이블 헤더 셀 */
export function TableHead({ className, ref, ...props }: ComponentProps<'th'>) {
  return (
    <th
      ref={ref}
      data-slot="table-head"
      className={cn(styles.tableHead, className)}
      {...props}
    />
  );
}

/** 테이블 데이터 셀 */
export function TableCell({ className, ref, ...props }: ComponentProps<'td'>) {
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(styles.tableCell, className)}
      {...props}
    />
  );
}

/** 테이블 캡션 (하단 설명) */
export function TableCaption({
  className,
  ref,
  ...props
}: ComponentProps<'caption'>) {
  return (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn(styles.tableCaption, className)}
      {...props}
    />
  );
}
