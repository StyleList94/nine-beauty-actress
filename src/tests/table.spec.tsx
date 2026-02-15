import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from 'lib/components/table';

describe('Rendering and Props', () => {
  it('should render table', async () => {
    await render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const table = page.getByRole('table');
    await expect.element(table).toBeInTheDocument();
  });

  it('should have data-slot="table"', async () => {
    await render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const table = page.getByRole('table');
    await expect.element(table).toHaveAttribute('data-slot', 'table');
  });
});

describe('Sub-components', () => {
  it('should render TableHeader with data-slot="table-header"', async () => {
    await render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const header = page.getByRole('rowgroup').first();
    await expect
      .element(header)
      .toHaveAttribute('data-slot', 'table-header');
  });

  it('should render TableBody with data-slot="table-body"', async () => {
    await render(
      <Table>
        <TableBody data-testid="tbody">
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const body = page.getByTestId('tbody');
    await expect
      .element(body)
      .toHaveAttribute('data-slot', 'table-body');
  });

  it('should render column headers', async () => {
    await render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const nameHeader = page.getByText('Name');
    const statusHeader = page.getByText('Status');
    await expect.element(nameHeader).toBeInTheDocument();
    await expect.element(statusHeader).toBeInTheDocument();
    await expect
      .element(nameHeader)
      .toHaveAttribute('data-slot', 'table-head');
    await expect
      .element(statusHeader)
      .toHaveAttribute('data-slot', 'table-head');
  });

  it('should render cells', async () => {
    await render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const aliceCell = page.getByRole('cell', { name: 'Alice' });
    const activeCell = page.getByRole('cell', { name: 'Active' });
    await expect.element(aliceCell).toBeInTheDocument();
    await expect.element(activeCell).toBeInTheDocument();
  });

  it('should render rows', async () => {
    await render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Row 1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const rows = page.getByRole('row');
    await expect.element(rows.first()).toBeInTheDocument();
    await expect.element(rows.nth(1)).toBeInTheDocument();
  });

  it('should render caption text', async () => {
    await render(
      <Table>
        <TableCaption>A list of users</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const caption = page.getByText('A list of users');
    await expect.element(caption).toBeInTheDocument();
    await expect
      .element(caption)
      .toHaveAttribute('data-slot', 'table-caption');
  });
});

describe('Full Composition', () => {
  it('should compose full table structure with data', async () => {
    await render(
      <Table>
        <TableCaption>Team Members</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>Engineer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob</TableCell>
            <TableCell>Designer</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );

    await expect.element(page.getByRole('table')).toBeInTheDocument();
    await expect
      .element(page.getByText('Team Members'))
      .toBeInTheDocument();
    await expect.element(page.getByText('Name')).toBeInTheDocument();
    await expect.element(page.getByText('Alice')).toBeInTheDocument();
    await expect
      .element(page.getByText('Designer'))
      .toBeInTheDocument();
    await expect.element(page.getByText('Total')).toBeInTheDocument();
  });
});
