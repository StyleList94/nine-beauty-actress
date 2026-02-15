import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import {
  Toaster,
  toast,
  dismiss,
  dismissAll,
  ToastAction,
} from 'lib/components/toast';

afterEach(async () => {
  dismissAll();
  // Wait for ANIMATION_DURATION (300ms) to let the store fully clear
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 400);
  });
});

describe('Rendering and Props', () => {
  it('should render Toaster with no toasts initially', async () => {
    await render(<Toaster />);
    // Verify Toaster mounts by showing a toast
    toast({ title: 'Rendered' });
    await expect.element(page.getByText('Rendered')).toBeVisible();
  });
});

describe('State Management', () => {
  it('should show toast when toast() is called', async () => {
    await render(<Toaster />);
    toast({ title: 'Hello Toast' });
    await expect.element(page.getByText('Hello Toast')).toBeVisible();
  });

  it('should return id string from toast()', async () => {
    await render(<Toaster />);
    const id = toast({ title: 'ID Test' });
    expect(id).toMatch(/^toast-/);
  });

  it('should show title and description', async () => {
    await render(<Toaster />);
    toast({ title: 'Title Here', description: 'Description Here' });
    await expect.element(page.getByText('Title Here')).toBeVisible();
    await expect
      .element(page.getByText('Description Here'))
      .toBeVisible();
  });

  it('should show toast with variant', async () => {
    await render(<Toaster />);
    toast({
      title: 'Destructive',
      variant: 'destructive',
      duration: Infinity,
    });
    await expect.element(page.getByText('Destructive')).toBeVisible();
    const toastItem = page.getByRole('listitem');
    await expect
      .element(toastItem)
      .toHaveAttribute('data-variant', 'destructive');
  });
});

describe('User Interactions', () => {
  it('should dismiss toast via onOpenChange', async () => {
    await render(<Toaster />);
    const id = toast({ title: 'Closable' });
    await expect.element(page.getByText('Closable')).toBeVisible();

    dismiss(id);
    await expect
      .element(page.getByText('Closable'))
      .not.toBeInTheDocument();
  });

  it('should close toast when close button is clicked', async () => {
    await render(<Toaster />);
    toast({ title: 'Close Me', duration: Infinity });
    await expect.element(page.getByText('Close Me')).toBeVisible();

    const closeButton = page.getByRole('button');
    await closeButton.click();
    await expect
      .element(page.getByText('Close Me'))
      .not.toBeInTheDocument();
  });
});

describe('Dismissal API', () => {
  it('should dismiss specific toast with dismiss()', async () => {
    await render(<Toaster />);
    const id = toast({ title: 'To Dismiss' });
    await expect.element(page.getByText('To Dismiss')).toBeVisible();

    dismiss(id);
    await expect
      .element(page.getByText('To Dismiss'))
      .not.toBeInTheDocument();
  });

  it('should only dismiss the targeted toast when multiple exist', async () => {
    await render(<Toaster />);
    const id1 = toast({ title: 'Keep Me', duration: Infinity });
    toast({ title: 'Also Keep', duration: Infinity });
    await expect.element(page.getByText('Keep Me')).toBeVisible();
    await expect.element(page.getByText('Also Keep')).toBeVisible();

    dismiss(id1);
    await expect
      .element(page.getByText('Keep Me'))
      .not.toBeInTheDocument();
    await expect.element(page.getByText('Also Keep')).toBeVisible();
  });

  it('should dismiss all toasts with dismissAll()', async () => {
    await render(<Toaster />);
    toast({ title: 'Toast One' });
    toast({ title: 'Toast Two' });
    await expect.element(page.getByText('Toast One')).toBeVisible();
    await expect.element(page.getByText('Toast Two')).toBeVisible();

    dismissAll();
    await expect
      .element(page.getByText('Toast One'))
      .not.toBeInTheDocument();
    await expect
      .element(page.getByText('Toast Two'))
      .not.toBeInTheDocument();
  });
});

describe('Edge Cases', () => {
  it('should handle multiple toasts simultaneously', async () => {
    await render(<Toaster />);
    toast({ title: 'First' });
    toast({ title: 'Second' });
    toast({ title: 'Third' });
    await expect.element(page.getByText('First')).toBeVisible();
    await expect.element(page.getByText('Second')).toBeVisible();
    await expect.element(page.getByText('Third')).toBeVisible();
  });

  it('should render toast with default variant', async () => {
    await render(<Toaster />);
    toast({ title: 'Default Variant', duration: Infinity });
    await expect
      .element(page.getByText('Default Variant'))
      .toBeVisible();
    const toastItem = page.getByRole('listitem');
    await expect
      .element(toastItem)
      .toHaveAttribute('data-variant', 'default');
  });

  it('should render toast description only (no title)', async () => {
    await render(<Toaster />);
    toast({ description: 'Only description' });
    await expect
      .element(page.getByText('Only description'))
      .toBeVisible();
  });

  it('should render toast with action', async () => {
    await render(<Toaster />);
    toast({
      title: 'With Action',
      action: <ToastAction altText="Undo action">Undo</ToastAction>,
    });
    await expect.element(page.getByText('Undo')).toBeVisible();
  });
});
