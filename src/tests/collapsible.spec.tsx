import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { Button } from 'lib/components/button';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from 'lib/components/collapsible';

describe('Rendering and Props', () => {
  it('should render trigger', async () => {
    await render(
      <Collapsible>
        <CollapsibleTrigger asChild><Button variant="outline">Toggle</Button></CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = page.getByRole('button', { name: /Toggle/i });
    await expect.element(trigger).toBeInTheDocument();
  });

  it('should have data-slot attributes', async () => {
    await render(
      <Collapsible>
        <CollapsibleTrigger asChild><Button variant="outline">Toggle</Button></CollapsibleTrigger>
        <CollapsibleContent>Content here</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = page.getByRole('button', { name: /Toggle/i });
    await expect.element(trigger).toHaveAttribute(
      'data-slot',
      'collapsible-trigger',
    );
  });
});

describe('Popup Open/Close', () => {
  it('should hide content by default', async () => {
    await render(
      <Collapsible>
        <CollapsibleTrigger asChild><Button variant="outline">Toggle</Button></CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>,
    );
    await expect
      .element(page.getByText('Hidden content'))
      .not.toBeInTheDocument();
  });

  it('should show content when trigger is clicked', async () => {
    await render(
      <Collapsible>
        <CollapsibleTrigger asChild><Button variant="outline">Toggle</Button></CollapsibleTrigger>
        <CollapsibleContent>Revealed content</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = page.getByRole('button', { name: /Toggle/i });
    await trigger.click();
    await expect.element(page.getByText('Revealed content')).toBeVisible();
  });

  it('should hide content when trigger is clicked again', async () => {
    await render(
      <Collapsible>
        <CollapsibleTrigger asChild><Button variant="outline">Toggle</Button></CollapsibleTrigger>
        <CollapsibleContent>Toggle content</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = page.getByRole('button', { name: /Toggle/i });
    await trigger.click();
    await expect.element(page.getByText('Toggle content')).toBeVisible();

    await trigger.click();
    await expect
      .element(page.getByText('Toggle content'))
      .not.toBeInTheDocument();
  });

  it('should call onOpenChange callback', async () => {
    const handleOpenChange = vi.fn();
    await render(
      <Collapsible onOpenChange={handleOpenChange}>
        <CollapsibleTrigger asChild><Button variant="outline">Toggle</Button></CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = page.getByRole('button', { name: /Toggle/i });
    await trigger.click();
    expect(handleOpenChange).toHaveBeenCalledWith(true);
  });
});

describe('State Management', () => {
  it('should support controlled open prop', async () => {
    await render(
      <Collapsible open>
        <CollapsibleTrigger asChild><Button variant="outline">Toggle</Button></CollapsibleTrigger>
        <CollapsibleContent>Controlled content</CollapsibleContent>
      </Collapsible>,
    );
    await expect
      .element(page.getByText('Controlled content'))
      .toBeVisible();
  });
});

describe('Edge Cases', () => {
  it('should be open initially with defaultOpen', async () => {
    await render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild><Button variant="outline">Toggle</Button></CollapsibleTrigger>
        <CollapsibleContent>Default open content</CollapsibleContent>
      </Collapsible>,
    );
    await expect
      .element(page.getByText('Default open content'))
      .toBeVisible();
  });
});
