import { useState } from 'react';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { Combobox, type ComboboxOption } from 'lib/components/combobox';

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

const options: ComboboxOption[] = [
  { value: 'next', label: 'Next.js' },
  { value: 'vite', label: 'Vite' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

function ControlledCombobox({
  initialValue = '',
  onValueChange: externalOnValueChange,
  ...props
}: Partial<React.ComponentProps<typeof Combobox>> & {
  initialValue?: string;
}) {
  const [value, setValue] = useState(initialValue);
  return (
    <Combobox
      value={value}
      onValueChange={(v) => {
        setValue(v);
        externalOnValueChange?.(v);
      }}
      options={options}
      {...props}
    />
  );
}

describe('Rendering and Props', () => {
  it('should render trigger with placeholder', async () => {
    await render(
      <CenteredWrapper>
        <ControlledCombobox placeholder="Pick a framework" />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('combobox');
    await expect.element(trigger).toBeInTheDocument();
    await expect
      .element(trigger)
      .toHaveTextContent('Pick a framework');
  });

  it('should have combobox role', async () => {
    await render(
      <CenteredWrapper>
        <ControlledCombobox />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('combobox');
    await expect.element(trigger).toBeInTheDocument();
  });

  it('should have aria-expanded false when closed', async () => {
    await render(
      <CenteredWrapper>
        <ControlledCombobox />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('combobox');
    await expect
      .element(trigger)
      .toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Popup Open/Close', () => {
  it('should open popover when trigger is clicked', async () => {
    await render(
      <CenteredWrapper>
        <ControlledCombobox />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('combobox');
    await trigger.click();
    await expect
      .element(page.getByRole('option', { name: 'Next.js' }))
      .toBeVisible();
  });

  it('should close popover when option is selected', async () => {
    await render(
      <CenteredWrapper>
        <ControlledCombobox />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('combobox');
    await trigger.click();
    await page.getByText('Vite').click();
    await expect
      .element(trigger)
      .toHaveAttribute('aria-expanded', 'false');
  });
});

describe('State Management', () => {
  it('should show selected label on trigger', async () => {
    await render(
      <CenteredWrapper>
        <ControlledCombobox />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('combobox');
    await trigger.click();
    await page.getByText('Vite').click();
    await expect.element(trigger).toHaveTextContent('Vite');
  });

  it('should call onValueChange when option is selected', async () => {
    const handleChange = vi.fn();
    await render(
      <CenteredWrapper>
        <ControlledCombobox onValueChange={handleChange} />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('combobox');
    await trigger.click();
    await page.getByText('Remix').click();
    expect(handleChange).toHaveBeenCalledWith('remix');
  });

  it('should toggle deselect when same option is selected again', async () => {
    const handleChange = vi.fn();
    await render(
      <CenteredWrapper>
        <ControlledCombobox
          initialValue="next"
          onValueChange={handleChange}
        />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('combobox');
    await expect.element(trigger).toHaveTextContent('Next.js');

    await trigger.click();
    await expect
      .element(page.getByRole('option', { name: 'Next.js' }))
      .toBeVisible();
    await page.getByRole('option', { name: 'Next.js' }).click();
    expect(handleChange).toHaveBeenCalledWith('');
  });
});

describe('User Interactions', () => {
  it('should filter options with search input', async () => {
    await render(
      <CenteredWrapper>
        <ControlledCombobox queryPlaceholder="Search..." />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('combobox');
    await trigger.click();

    const searchInput = page.getByPlaceholder('Search...');
    await searchInput.fill('Ast');
    await expect
      .element(page.getByRole('option', { name: 'Astro' }))
      .toBeVisible();
    await expect
      .element(page.getByRole('option', { name: 'Next.js' }))
      .not.toBeInTheDocument();
  });

  it('should show "No option found." when no options match', async () => {
    await render(
      <CenteredWrapper>
        <ControlledCombobox queryPlaceholder="Search..." />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('combobox');
    await trigger.click();

    const searchInput = page.getByPlaceholder('Search...');
    await searchInput.fill('xyz');
    await expect
      .element(page.getByText('No option found.'))
      .toBeVisible();
  });
});

describe('Accessibility', () => {
  it('should have custom placeholder and queryPlaceholder', async () => {
    await render(
      <CenteredWrapper>
        <ControlledCombobox
          placeholder="Choose..."
          queryPlaceholder="Filter..."
        />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('combobox');
    await expect.element(trigger).toHaveTextContent('Choose...');

    await trigger.click();
    const searchInput = page.getByPlaceholder('Filter...');
    await expect.element(searchInput).toBeInTheDocument();
  });
});
