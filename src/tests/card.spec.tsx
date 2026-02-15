import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from 'lib/components/card';

describe('Rendering and Props', () => {
  it('should render card with data-slot="card"', async () => {
    await render(<Card>Card content</Card>);

    const card = page.getByText('Card content');
    await expect.element(card).toHaveAttribute('data-slot', 'card');
  });

  it('should apply custom className', async () => {
    await render(<Card className="custom-card">Content</Card>);

    const card = page.getByText('Content');
    await expect.element(card).toHaveClass('custom-card');
  });

  it('should render with default size', async () => {
    await render(<Card>Content</Card>);

    const card = page.getByText('Content');
    await expect.element(card).toHaveAttribute('data-size', 'default');
  });

  it('should render with sm size', async () => {
    await render(<Card size="sm">Compact</Card>);

    const card = page.getByText('Compact');
    await expect.element(card).toHaveAttribute('data-size', 'sm');
  });
});

describe('Sub-components', () => {
  it('should render CardHeader with data-slot="card-header"', async () => {
    await render(
      <Card>
        <CardHeader>Header</CardHeader>
      </Card>,
    );

    const header = page.getByText('Header');
    await expect
      .element(header)
      .toHaveAttribute('data-slot', 'card-header');
  });

  it('should render CardTitle with data-slot="card-title"', async () => {
    await render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>,
    );

    const title = page.getByText('Title');
    await expect
      .element(title)
      .toHaveAttribute('data-slot', 'card-title');
  });

  it('should render CardDescription with data-slot="card-description"', async () => {
    await render(
      <Card>
        <CardHeader>
          <CardDescription>Description text</CardDescription>
        </CardHeader>
      </Card>,
    );

    const description = page.getByText('Description text');
    await expect
      .element(description)
      .toHaveAttribute('data-slot', 'card-description');
  });

  it('should render CardAction with data-slot="card-action"', async () => {
    await render(
      <Card>
        <CardHeader>
          <CardAction>Action</CardAction>
        </CardHeader>
      </Card>,
    );

    const action = page.getByText('Action');
    await expect
      .element(action)
      .toHaveAttribute('data-slot', 'card-action');
  });

  it('should render CardContent with data-slot="card-content"', async () => {
    await render(
      <Card>
        <CardContent>Body content</CardContent>
      </Card>,
    );

    const content = page.getByText('Body content');
    await expect
      .element(content)
      .toHaveAttribute('data-slot', 'card-content');
  });

  it('should render CardFooter with data-slot="card-footer"', async () => {
    await render(
      <Card>
        <CardFooter>Footer area</CardFooter>
      </Card>,
    );

    const footer = page.getByText('Footer area');
    await expect
      .element(footer)
      .toHaveAttribute('data-slot', 'card-footer');
  });
});
