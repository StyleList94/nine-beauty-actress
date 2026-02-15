import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
} from 'lib/components/command';

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
  it('should render command', async () => {
    await render(
      <Command data-testid="cmd">
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup heading="Fruits">
            <CommandItem>Apple</CommandItem>
            <CommandItem>Banana</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );
    const command = page.getByTestId('cmd');
    await expect
      .element(command)
      .toHaveAttribute('data-slot', 'command');
  });

  it('should render CommandInput with data-slot', async () => {
    await render(
      <Command>
        <CommandInput placeholder="Type here..." />
        <CommandList>
          <CommandItem>Item</CommandItem>
        </CommandList>
      </Command>,
    );
    const input = page.getByPlaceholder('Type here...');
    await expect
      .element(input)
      .toHaveAttribute('data-slot', 'command-input');
  });

  it('should render CommandInput with placeholder', async () => {
    await render(
      <Command>
        <CommandInput placeholder="Search commands..." />
        <CommandList>
          <CommandItem>Item</CommandItem>
        </CommandList>
      </Command>,
    );
    const input = page.getByPlaceholder('Search commands...');
    await expect.element(input).toBeInTheDocument();
  });

  it('should render CommandGroup with heading', async () => {
    await render(
      <Command>
        <CommandList>
          <CommandGroup heading="Actions">
            <CommandItem>Run</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );
    await expect.element(page.getByText('Actions')).toBeInTheDocument();
  });

  it('should render CommandItem with data-slot', async () => {
    await render(
      <Command>
        <CommandList>
          <CommandItem>My Item</CommandItem>
        </CommandList>
      </Command>,
    );
    const item = page.getByRole('option', { name: 'My Item' });
    await expect
      .element(item)
      .toHaveAttribute('data-slot', 'command-item');
  });
});

describe('User Interactions', () => {
  it('should filter items based on input', async () => {
    await render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup>
            <CommandItem>Apple</CommandItem>
            <CommandItem>Banana</CommandItem>
            <CommandItem>Cherry</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );
    const input = page.getByPlaceholder('Search...');
    await input.fill('Apple');

    await expect.element(page.getByText('Apple')).toBeVisible();
    await expect
      .element(page.getByText('Banana'))
      .not.toBeInTheDocument();
    await expect
      .element(page.getByText('Cherry'))
      .not.toBeInTheDocument();
  });

  it('should call onSelect when item is clicked', async () => {
    const handleSelect = vi.fn();
    await render(
      <Command>
        <CommandList>
          <CommandItem onSelect={handleSelect}>Clickable Item</CommandItem>
        </CommandList>
      </Command>,
    );
    await page.getByText('Clickable Item').click();
    expect(handleSelect).toHaveBeenCalledOnce();
  });

  it('should show empty state when no items match', async () => {
    await render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem>Apple</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );
    const input = page.getByPlaceholder('Search...');
    await input.fill('xyz');
    await expect.element(page.getByText('No results found.')).toBeVisible();
  });
});

describe('Sub-components', () => {
  it('should render CommandSeparator', async () => {
    await render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>
          <CommandSeparator data-testid="cmd-sep" />
          <CommandGroup>
            <CommandItem>Item 2</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );
    const separator = page.getByTestId('cmd-sep');
    await expect
      .element(separator)
      .toHaveAttribute('data-slot', 'command-separator');
  });

  it('should render CommandShortcut', async () => {
    await render(
      <Command>
        <CommandList>
          <CommandItem>
            Copy
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
        </CommandList>
      </Command>,
    );
    await expect.element(page.getByText('⌘C')).toBeInTheDocument();
  });

  it('should render CommandShortcut with data-slot', async () => {
    await render(
      <Command>
        <CommandList>
          <CommandItem>
            Paste
            <CommandShortcut>⌘V</CommandShortcut>
          </CommandItem>
        </CommandList>
      </Command>,
    );
    const shortcut = page.getByText('⌘V');
    await expect
      .element(shortcut)
      .toHaveAttribute('data-slot', 'command-shortcut');
  });
});

describe('CommandDialog', () => {
  it('should render dialog with command inside', async () => {
    await render(
      <CenteredWrapper>
        <CommandDialog open>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandItem>Action</CommandItem>
          </CommandList>
        </CommandDialog>
      </CenteredWrapper>,
    );
    const dialog = page.getByRole('dialog');
    await expect.element(dialog).toBeVisible();
    await expect
      .element(page.getByPlaceholder('Type a command...'))
      .toBeVisible();
  });

  it('should have sr-only header with title and description', async () => {
    await render(
      <CenteredWrapper>
        <CommandDialog open title="My Palette" description="Search here">
          <CommandList>
            <CommandItem>Item</CommandItem>
          </CommandList>
        </CommandDialog>
      </CenteredWrapper>,
    );
    await expect.element(page.getByText('My Palette')).toBeInTheDocument();
    await expect.element(page.getByText('Search here')).toBeInTheDocument();
  });

  it('should close on Escape', async () => {
    const handleOpenChange = vi.fn();
    await render(
      <CenteredWrapper>
        <CommandDialog open onOpenChange={handleOpenChange}>
          <CommandList>
            <CommandItem>Item</CommandItem>
          </CommandList>
        </CommandDialog>
      </CenteredWrapper>,
    );
    await expect.element(page.getByRole('dialog')).toBeVisible();
    await userEvent.keyboard('{Escape}');
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
