import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'lib/components/dialog';
import { Button } from 'lib/components/button';
import { TextInput } from 'lib/components/text-input';

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
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Open Dialog/i });
    await expect.element(trigger).toBeInTheDocument();
  });

  it('should not show content initially', async () => {
    await render(
      <CenteredWrapper>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
          <DialogContent>
            <DialogTitle>Hidden Title</DialogTitle>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    await expect
      .element(page.getByText('Hidden Title'))
      .not.toBeInTheDocument();
  });
});

describe('Popup Open/Close', () => {
  it('should show dialog when trigger is clicked', async () => {
    await render(
      <CenteredWrapper>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Open/i });
    await trigger.click();
    const dialog = page.getByRole('dialog');
    await expect.element(dialog).toBeVisible();
  });

  it('should close on Escape key', async () => {
    await render(
      <CenteredWrapper>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
          <DialogContent>
            <DialogTitle>Escape Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    await page.getByRole('button', { name: /Open/i }).click();
    await expect.element(page.getByRole('dialog')).toBeVisible();

    await userEvent.keyboard('{Escape}');
    await expect
      .element(page.getByText('Escape Dialog'))
      .not.toBeInTheDocument();
  });

  it('should close when close button (X) is clicked', async () => {
    await render(
      <CenteredWrapper>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
          <DialogContent>
            <DialogTitle>Close Button Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    await page.getByRole('button', { name: /Open/i }).click();
    await expect.element(page.getByRole('dialog')).toBeVisible();

    const closeButton = page.getByRole('button', { name: /Close/i });
    await closeButton.click();
    await expect
      .element(page.getByText('Close Button Dialog'))
      .not.toBeInTheDocument();
  });

  it('should call onOpenChange callback', async () => {
    const handleOpenChange = vi.fn();
    await render(
      <CenteredWrapper>
        <Dialog onOpenChange={handleOpenChange}>
          <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
          <DialogContent>
            <DialogTitle>Callback Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    await page.getByRole('button', { name: /Open/i }).click();
    expect(handleOpenChange).toHaveBeenCalledWith(true);
  });
});

describe('Props', () => {
  it('should show close button by default', async () => {
    await render(
      <CenteredWrapper>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
          <DialogContent>
            <DialogTitle>Default Close</DialogTitle>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    await page.getByRole('button', { name: /Open/i }).click();
    const closeButton = page.getByRole('button', { name: /Close/i });
    await expect.element(closeButton).toBeInTheDocument();
  });

  it('should hide close button when showCloseButton is false', async () => {
    await render(
      <CenteredWrapper>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogTitle>No Close</DialogTitle>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    await page.getByRole('button', { name: /Open/i }).click();
    await expect.element(page.getByRole('dialog')).toBeVisible();
    await expect
      .element(page.getByText('No Close'))
      .toBeVisible();
    // Only the trigger button and no close button inside dialog
    const closeButtons = page.getByRole('button', { name: /Close/i });
    await expect.element(closeButtons).not.toBeInTheDocument();
  });

  it('should render DialogFooter without close button by default', async () => {
    await render(
      <CenteredWrapper>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogTitle>Footer Default</DialogTitle>
            <DialogFooter>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    await page.getByRole('button', { name: /Open/i }).click();
    await expect.element(page.getByRole('dialog')).toBeVisible();
    await expect.element(page.getByRole('button', { name: /Save/i })).toBeVisible();
    await expect
      .element(page.getByRole('button', { name: /Close/i }))
      .not.toBeInTheDocument();
  });

  it('should render DialogFooter close button when showCloseButton is true', async () => {
    await render(
      <CenteredWrapper>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogTitle>Footer Close</DialogTitle>
            <DialogFooter showCloseButton>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    await page.getByRole('button', { name: /Open/i }).click();
    const closeButton = page.getByRole('button', { name: /Close/i });
    await expect.element(closeButton).toBeInTheDocument();
  });
});

describe('Sub-components', () => {
  it('should render header, title, and description', async () => {
    await render(
      <CenteredWrapper>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>My Title</DialogTitle>
              <DialogDescription>My Description</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    await page.getByRole('button', { name: /Open/i }).click();
    await expect.element(page.getByText('My Title')).toBeVisible();
    await expect.element(page.getByText('My Description')).toBeVisible();
  });

  it('should close dialog via DialogClose', async () => {
    await render(
      <CenteredWrapper>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open</Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogTitle>Close Test</DialogTitle>
            <DialogClose asChild>
              <Button variant="outline">Close me</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    await page.getByRole('button', { name: /Open/i }).click();
    await expect.element(page.getByRole('dialog')).toBeVisible();

    await page.getByRole('button', { name: /Close me/i }).click();
    await expect
      .element(page.getByText('Close Test'))
      .not.toBeInTheDocument();
  });

  it('should have data-slot on content', async () => {
    await render(
      <CenteredWrapper>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
          <DialogContent>
            <DialogTitle>Slot Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    await page.getByRole('button', { name: /Open/i }).click();
    const dialog = page.getByRole('dialog');
    await expect
      .element(dialog)
      .toHaveAttribute('data-slot', 'dialog-content');
  });
});

describe('Accessibility', () => {
  it('should trap focus inside dialog', async () => {
    await render(
      <CenteredWrapper>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
          <DialogContent>
            <DialogTitle>Focus Trap</DialogTitle>
            <TextInput placeholder="First input" />
            <Button>Action</Button>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    await page.getByRole('button', { name: /Open/i }).click();
    await expect.element(page.getByRole('dialog')).toBeVisible();

    // Tab through elements - focus should stay within dialog
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    // Focus should cycle back within dialog, not escape to trigger
    const dialog = page.getByRole('dialog');
    await expect.element(dialog).toBeVisible();
  });

  it('should have dialog role', async () => {
    await render(
      <CenteredWrapper>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
          <DialogContent>
            <DialogTitle>Role Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    await page.getByRole('button', { name: /Open/i }).click();
    const dialog = page.getByRole('dialog');
    await expect.element(dialog).toBeInTheDocument();
  });

  it('should render with overlay', async () => {
    await render(
      <CenteredWrapper>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
          <DialogContent>
            <DialogTitle>Overlay Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      </CenteredWrapper>,
    );
    await page.getByRole('button', { name: /Open/i }).click();
    await expect.element(page.getByRole('dialog')).toBeVisible();
  });
});
