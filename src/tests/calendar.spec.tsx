import { useState } from 'react';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { Calendar, type DateRange } from 'lib/components/calendar';

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

function ControlledCalendar({
  onSelect: externalOnSelect,
}: {
  onSelect?: (date: Date | undefined) => void;
}) {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={(selectedDate) => {
        setDate(selectedDate);
        externalOnSelect?.(selectedDate);
      }}
    />
  );
}

describe('Rendering and Props', () => {
  it('should render calendar', async () => {
    await render(
      <CenteredWrapper>
        <ControlledCalendar />
      </CenteredWrapper>,
    );
    const grid = page.getByRole('grid');
    await expect.element(grid).toBeInTheDocument();
  });

  it('should display current month', async () => {
    await render(
      <CenteredWrapper>
        <ControlledCalendar />
      </CenteredWrapper>,
    );
    const now = new Date();
    const monthName = now.toLocaleString('en-US', { month: 'long' });
    await expect.element(page.getByText(new RegExp(monthName))).toBeVisible();
  });
});

describe('Navigation', () => {
  it('should navigate to previous month', async () => {
    await render(
      <CenteredWrapper>
        <ControlledCalendar />
      </CenteredWrapper>,
    );
    const prevButton = page.getByRole('button', {
      name: /previous/i,
    });
    await prevButton.click();

    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    const monthName = prevMonth.toLocaleString('en-US', {
      month: 'long',
    });
    await expect.element(page.getByText(new RegExp(monthName))).toBeVisible();
  });

  it('should navigate to next month', async () => {
    await render(
      <CenteredWrapper>
        <ControlledCalendar />
      </CenteredWrapper>,
    );
    const nextButton = page.getByRole('button', { name: /next/i });
    await nextButton.click();

    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1);
    const monthName = nextMonth.toLocaleString('en-US', {
      month: 'long',
    });
    await expect.element(page.getByText(new RegExp(monthName))).toBeVisible();
  });
});

describe('Selection', () => {
  it('should call onSelect when a date is clicked', async () => {
    const handleSelect = vi.fn();
    await render(
      <CenteredWrapper>
        <ControlledCalendar onSelect={handleSelect} />
      </CenteredWrapper>,
    );
    const dayButton = page.getByRole('gridcell', { name: '15' });
    await dayButton.click();
    expect(handleSelect).toHaveBeenCalled();
  });
});

describe('Dropdown Mode', () => {
  it('should render month/year dropdowns with captionLayout="dropdown"', async () => {
    await render(
      <CenteredWrapper>
        <Calendar
          mode="single"
          captionLayout="dropdown"
          defaultMonth={new Date(2026, 1, 1)}
        />
      </CenteredWrapper>,
    );
    const monthDropdown = page.getByRole('combobox', { name: /month/i });
    await expect.element(monthDropdown).toBeInTheDocument();
  });

  it('should accept custom classNames', async () => {
    await render(
      <CenteredWrapper>
        <Calendar mode="single" classNames={{ root: 'custom-root' }} />
      </CenteredWrapper>,
    );
    const grid = page.getByRole('grid');
    await expect.element(grid).toBeInTheDocument();
  });

  it('should accept custom components', async () => {
    function CustomDayButton(props: React.ComponentProps<'button'>) {
      return <button type="button" {...props} />;
    }

    await render(
      <CenteredWrapper>
        <Calendar mode="single" components={{ DayButton: CustomDayButton }} />
      </CenteredWrapper>,
    );
    const grid = page.getByRole('grid');
    await expect.element(grid).toBeInTheDocument();
  });
});

describe('Range Selection', () => {
  it('should select a date range', async () => {
    const handleSelect = vi.fn();

    function RangeCalendar() {
      const [range, setRange] = useState<DateRange | undefined>();
      return (
        <Calendar
          mode="range"
          defaultMonth={new Date(2026, 1, 1)}
          selected={range}
          onSelect={(selectedRange) => {
            setRange(selectedRange);
            handleSelect(selectedRange);
          }}
        />
      );
    }

    await render(
      <CenteredWrapper>
        <RangeCalendar />
      </CenteredWrapper>,
    );

    const day10 = page.getByRole('gridcell', { name: '10' });
    await day10.click();
    expect(handleSelect).toHaveBeenCalled();

    const day15 = page.getByRole('gridcell', { name: '15' });
    await day15.click();

    const lastCall = handleSelect.mock.lastCall?.[0] as DateRange | undefined;
    expect(lastCall?.from).toBeDefined();
    expect(lastCall?.to).toBeDefined();
  });

  it('should render range with two months', async () => {
    await render(
      <CenteredWrapper>
        <Calendar
          mode="range"
          defaultMonth={new Date(2026, 1, 1)}
          numberOfMonths={2}
        />
      </CenteredWrapper>,
    );

    await expect.element(page.getByText(/february/i)).toBeVisible();
    await expect.element(page.getByText(/march/i)).toBeVisible();
  });
});

describe('Accessibility', () => {
  it('should have grid role', async () => {
    await render(
      <CenteredWrapper>
        <ControlledCalendar />
      </CenteredWrapper>,
    );
    const grid = page.getByRole('grid');
    await expect.element(grid).toBeInTheDocument();
  });

  it('should support keyboard navigation', async () => {
    await render(
      <CenteredWrapper>
        <Calendar mode="single" defaultMonth={new Date(2026, 1, 1)} />
      </CenteredWrapper>,
    );

    const day15 = page.getByRole('gridcell', { name: '15' });
    await day15.click();

    await userEvent.keyboard('{ArrowRight}');
    const day16 = page.getByRole('gridcell', { name: '16' });
    await expect.element(day16.getByRole('button')).toHaveFocus();
  });
});
