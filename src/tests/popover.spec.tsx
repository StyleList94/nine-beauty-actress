import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { Button } from 'lib/components/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverAnchor,
} from 'lib/components/popover';

const CenteredWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
    }}
  >
    {children}
  </div>
);

describe('Rendering and Props', () => {
  it('should render trigger', async () => {
    await render(
      <CenteredWrapper>
        <Popover>
          <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Open/i });
    await expect.element(trigger).toBeInTheDocument();
  });

  it('should render PopoverAnchor with data-slot', async () => {
    await render(
      <CenteredWrapper>
        <Popover>
          <PopoverAnchor data-testid="anchor">
            <span>Anchor element</span>
          </PopoverAnchor>
          <PopoverTrigger asChild>
            <Button variant="outline">Open</Button>
          </PopoverTrigger>
          <PopoverContent>Anchored content</PopoverContent>
        </Popover>
      </CenteredWrapper>,
    );
    const anchor = page.getByTestId('anchor');
    await expect
      .element(anchor)
      .toHaveAttribute('data-slot', 'popover-anchor');
  });

  it('should not show content initially', async () => {
    await render(
      <CenteredWrapper>
        <Popover>
          <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
          <PopoverContent>Hidden content</PopoverContent>
        </Popover>
      </CenteredWrapper>,
    );
    await expect
      .element(page.getByText('Hidden content'))
      .not.toBeInTheDocument();
  });
});

describe('Popup Open/Close', () => {
  it('should show content when trigger is clicked', async () => {
    await render(
      <CenteredWrapper>
        <Popover>
          <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
          <PopoverContent>Popover content</PopoverContent>
        </Popover>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Open/i });
    await trigger.click();
    await expect.element(page.getByText('Popover content')).toBeVisible();
  });

  it('should close on Escape key', async () => {
    await render(
      <CenteredWrapper>
        <Popover>
          <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
          <PopoverContent>Escape content</PopoverContent>
        </Popover>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Open/i });
    await trigger.click();
    await expect.element(page.getByText('Escape content')).toBeVisible();

    await userEvent.keyboard('{Escape}');
    await expect
      .element(page.getByText('Escape content'))
      .not.toBeInTheDocument();
  });

  it('should close on outside click', async () => {
    await render(
      <CenteredWrapper>
        <Popover>
          <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
          <PopoverContent>Outside content</PopoverContent>
        </Popover>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Open/i });
    await trigger.click();
    await expect.element(page.getByText('Outside content')).toBeVisible();

    await userEvent.click(document.body);
    await expect
      .element(page.getByText('Outside content'))
      .not.toBeInTheDocument();
  });

  it('should call onOpenChange callback', async () => {
    const handleOpenChange = vi.fn();
    await render(
      <CenteredWrapper>
        <Popover onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
          <PopoverContent>Callback content</PopoverContent>
        </Popover>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Open/i });
    await trigger.click();
    expect(handleOpenChange).toHaveBeenCalledWith(true);
  });
});

describe('Data Attributes', () => {
  it('should have data-slot on content', async () => {
    await render(
      <CenteredWrapper>
        <Popover>
          <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
          <PopoverContent>Slot content</PopoverContent>
        </Popover>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Open/i });
    await trigger.click();
    const content = page.getByText('Slot content');
    await expect
      .element(content)
      .toHaveAttribute('data-slot', 'popover-content');
  });
});

describe('Sub-components', () => {
  it('should render PopoverHeader, Title, and Description', async () => {
    await render(
      <CenteredWrapper>
        <Popover>
          <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Popover Title</PopoverTitle>
              <PopoverDescription>Popover Description</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Open/i });
    await trigger.click();
    await expect
      .element(page.getByText('Popover Title'))
      .toBeVisible();
    await expect
      .element(page.getByText('Popover Description'))
      .toBeVisible();
  });

  it('should have data-slot on sub-components', async () => {
    await render(
      <CenteredWrapper>
        <Popover>
          <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Title</PopoverTitle>
              <PopoverDescription>Description</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Open/i });
    await trigger.click();
    const title = page.getByText('Title');
    await expect
      .element(title)
      .toHaveAttribute('data-slot', 'popover-title');
    const desc = page.getByText('Description');
    await expect
      .element(desc)
      .toHaveAttribute('data-slot', 'popover-description');
  });
});

describe('Accessibility', () => {
  it('should have trigger with data-slot', async () => {
    await render(
      <CenteredWrapper>
        <Popover>
          <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Open/i });
    await expect
      .element(trigger)
      .toHaveAttribute('data-slot', 'popover-trigger');
  });
});
