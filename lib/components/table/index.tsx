import { forwardRef, type ComponentProps } from 'react';

import { cn } from 'lib/core/utils';

import * as styles from './style.css';

export type TableProps = ComponentProps<'table'>;

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
