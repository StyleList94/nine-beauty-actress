import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { ToggleGroup, ToggleGroupItem } from 'lib/components/toggle-group';

describe('Rendering and Props', () => {
  it('should render group', async () => {
    await render(
      <ToggleGroup type="single" aria-label="Text style">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          Bold
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          Italic
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const group = page.getByRole('group');
    await expect.element(group).toBeInTheDocument();
  });

  it('should render items with aria-label', async () => {
    await render(
      <ToggleGroup type="single" aria-label="Text style">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          Bold
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          Italic
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline"
          aria-label="Toggle underline"
        >
          Underline
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    await expect
      .element(page.getByLabelText('Toggle bold'))
      .toBeInTheDocument();
    await expect
      .element(page.getByLabelText('Toggle italic'))
      .toBeInTheDocument();
    await expect
      .element(page.getByLabelText('Toggle underline'))
      .toBeInTheDocument();
  });

  it('should have initial on/off state', async () => {
    await render(
      <ToggleGroup
        type="single"
        defaultValue="bold"
        aria-label="Text style"
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          Bold
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          Italic
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const boldItem = page.getByLabelText('Toggle bold');
    const italicItem = page.getByLabelText('Toggle italic');

    await expect.element(boldItem).toHaveAttribute('data-state', 'on');
    await expect
      .element(italicItem)
      .toHaveAttribute('data-state', 'off');
  });

  it('should support multiple selection initial state', async () => {
    await render(
      <ToggleGroup
        type="multiple"
        defaultValue={['center', 'right']}
        aria-label="Alignment"
      >
        <ToggleGroupItem value="left" aria-label="Align left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    await expect
      .element(page.getByLabelText('Align left'))
      .toHaveAttribute('data-state', 'off');
    await expect
      .element(page.getByLabelText('Align center'))
      .toHaveAttribute('data-state', 'on');
    await expect
      .element(page.getByLabelText('Align right'))
      .toHaveAttribute('data-state', 'on');
  });
});

describe('Visual Properties', () => {
  it('should apply variant data attribute', async () => {
    await render(
      <ToggleGroup
        type="single"
        variant="outline"
        aria-label="Test group"
      >
        <ToggleGroupItem value="a" aria-label="Option A">
          A
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const group = page.getByRole('group');
    await expect
      .element(group)
      .toHaveAttribute('data-variant', 'outline');
  });

  it('should apply size data attribute', async () => {
    await render(
      <ToggleGroup
        type="single"
        size="lg"
        aria-label="Test group"
      >
        <ToggleGroupItem value="a" aria-label="Option A">
          A
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const group = page.getByRole('group');
    await expect.element(group).toHaveAttribute('data-size', 'lg');
  });

  it('should apply spacing data attribute', async () => {
    await render(
      <div>
        <ToggleGroup
          type="single"
          spacing="none"
          aria-label="Tight group"
        >
          <ToggleGroupItem value="a" aria-label="Tight A">
            A
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup
          type="single"
          spacing="md"
          aria-label="Spaced group"
        >
          <ToggleGroupItem value="a" aria-label="Spaced A">
            A
          </ToggleGroupItem>
        </ToggleGroup>
      </div>,
    );

    const groups = page.getByRole('group');
    await expect
      .element(groups.nth(0))
      .toHaveAttribute('data-spacing', 'tight');
    await expect
      .element(groups.nth(1))
      .toHaveAttribute('data-spacing', 'spaced');
  });

  it('should apply numeric spacing', async () => {
    await render(
      <div>
        <ToggleGroup
          type="single"
          spacing={12}
          aria-label="Numeric spaced"
        >
          <ToggleGroupItem value="a" aria-label="Option A">
            A
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup
          type="single"
          spacing={0}
          aria-label="Zero spaced"
        >
          <ToggleGroupItem value="a" aria-label="Option B">
            B
          </ToggleGroupItem>
        </ToggleGroup>
      </div>,
    );

    const groups = page.getByRole('group');
    await expect
      .element(groups.nth(0))
      .toHaveAttribute('data-spacing', 'spaced');
    await expect
      .element(groups.nth(1))
      .toHaveAttribute('data-spacing', 'tight');
  });
});

describe('Accessibility', () => {
  it('should have proper ARIA attributes', async () => {
    await render(
      <ToggleGroup type="single" aria-label="Text style">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          Bold
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const group = page.getByRole('group');
    await expect
      .element(group)
      .toHaveAttribute('aria-label', 'Text style');
  });

  it('should render disabled state', async () => {
    await render(
      <ToggleGroup type="single" disabled aria-label="Test group">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          Bold
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          Italic
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const boldItem = page.getByLabelText('Toggle bold');
    await expect.element(boldItem).toHaveAttribute('data-disabled');
  });
});
