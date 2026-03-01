import type { DateRange } from 'react-day-picker';

import { useState } from 'react';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { DatePicker } from 'lib/components/date-picker';
import { FormControl } from 'lib/components/form-control';

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

function ControlledDatePicker({
  initialValue,
  onValueChange: externalOnChange,
  clearable,
  disabled,
  formatStr,
}: {
  initialValue?: Date;
  onValueChange?: (d: Date | undefined) => void;
  clearable?: boolean;
  disabled?: boolean;
  formatStr?: string;
}) {
  const [date, setDate] = useState<Date | undefined>(initialValue);

  return (
    <DatePicker
      value={date}
      onValueChange={(nextDate: Date | undefined) => {
        setDate(nextDate);
        externalOnChange?.(nextDate);
      }}
      clearable={clearable}
      disabled={disabled}
      formatStr={formatStr}
    >
      <DatePicker.Input />
      <DatePicker.Calendar />
    </DatePicker>
  );
}

function ControlledRangePicker({
  initialValue,
  onValueChange: externalOnChange,
  clearable,
}: {
  initialValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  clearable?: boolean;
}) {
  const [range, setRange] = useState<DateRange | undefined>(initialValue);

  return (
    <DatePicker
      mode="range"
      value={range}
      clearable={clearable}
      onValueChange={(nextRange: DateRange | undefined) => {
        setRange(nextRange);
        externalOnChange?.(nextRange);
      }}
    >
      <DatePicker.Input placeholder="Select range" />
      <DatePicker.Calendar />
    </DatePicker>
  );
}

describe('Rendering and Props', () => {
  it('should render trigger with default placeholder', async () => {
    await render(
      <CenteredWrapper>
        <ControlledDatePicker />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /pick a date/i });
    await expect.element(trigger).toBeInTheDocument();
  });

  it('should render trigger with custom placeholder', async () => {
    await render(
      <CenteredWrapper>
        <DatePicker>
          <DatePicker.Input placeholder="날짜를 선택하세요" />
          <DatePicker.Calendar />
        </DatePicker>
      </CenteredWrapper>,
    );
    await expect
      .element(page.getByText('날짜를 선택하세요'))
      .toBeInTheDocument();
  });

  it('should display formatted date when value is provided', async () => {
    const testDate = new Date(2026, 0, 15);
    await render(
      <CenteredWrapper>
        <ControlledDatePicker initialValue={testDate} />
      </CenteredWrapper>,
    );
    await expect
      .element(page.getByText('January 15th, 2026'))
      .toBeInTheDocument();
  });

  it('should display custom format when formatStr is provided', async () => {
    const testDate = new Date(2026, 0, 15);
    await render(
      <CenteredWrapper>
        <DatePicker
          value={testDate}
          formatStr="yyyy/MM/dd"
        >
          <DatePicker.Input />
          <DatePicker.Calendar />
        </DatePicker>
      </CenteredWrapper>,
    );
    await expect
      .element(page.getByText('2026/01/15'))
      .toBeInTheDocument();
  });

  it('should render disabled state', async () => {
    await render(
      <CenteredWrapper>
        <ControlledDatePicker disabled />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /pick a date/i });
    await expect.element(trigger).toHaveAttribute('disabled');
  });
});

describe('Popup Open/Close', () => {
  it('should open calendar when trigger is clicked', async () => {
    await render(
      <CenteredWrapper>
        <ControlledDatePicker />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /pick a date/i });
    await trigger.click();
    await expect
      .element(page.getByRole('grid'))
      .toBeVisible();
  });

  it('should close calendar when ESC is pressed', async () => {
    await render(
      <CenteredWrapper>
        <ControlledDatePicker />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /pick a date/i });
    await trigger.click();
    await expect
      .element(page.getByRole('grid'))
      .toBeVisible();

    await userEvent.keyboard('{Escape}');
    await expect
      .element(page.getByRole('grid'))
      .not.toBeInTheDocument();
  });

  it('should close calendar when a date is selected (single mode)', async () => {
    await render(
      <CenteredWrapper>
        <ControlledDatePicker />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /pick a date/i });
    await trigger.click();

    const dayButton = page.getByRole('button', { name: /15/ }).first();
    await dayButton.click();

    await expect
      .element(page.getByRole('grid'))
      .not.toBeInTheDocument();
  });
});

describe('State Management', () => {
  it('should update display text when date is selected', async () => {
    await render(
      <CenteredWrapper>
        <ControlledDatePicker />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /pick a date/i });
    await trigger.click();

    const dayButton = page.getByRole('button', { name: /15/ }).first();
    await dayButton.click();

    await expect
      .element(page.getByText(/15/))
      .toBeInTheDocument();
  });

  it('should call onValueChange when date is selected', async () => {
    const handleChange = vi.fn();
    await render(
      <CenteredWrapper>
        <ControlledDatePicker onValueChange={handleChange} />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /pick a date/i });
    await trigger.click();

    const dayButton = page.getByRole('button', { name: /15/ }).first();
    await dayButton.click();

    expect(handleChange).toHaveBeenCalled();
    const calledDate = handleChange.mock.calls[0][0] as Date;
    expect(calledDate).toBeInstanceOf(Date);
    expect(calledDate.getDate()).toBe(15);
  });

  it('should clear value when clear button is clicked', async () => {
    const testDate = new Date(2026, 0, 15);
    await render(
      <CenteredWrapper>
        <ControlledDatePicker initialValue={testDate} />
      </CenteredWrapper>,
    );
    await expect
      .element(page.getByText('January 15th, 2026'))
      .toBeInTheDocument();

    const clearBtn = page.getByLabelText('Clear date');
    await clearBtn.click();

    await expect
      .element(page.getByText('Pick a date'))
      .toBeInTheDocument();
  });

  it('should not show clear button when clearable is false', async () => {
    const testDate = new Date(2026, 0, 15);
    await render(
      <CenteredWrapper>
        <DatePicker value={testDate} clearable={false}>
          <DatePicker.Input />
          <DatePicker.Calendar />
        </DatePicker>
      </CenteredWrapper>,
    );
    await expect
      .element(page.getByLabelText('Clear date'))
      .not.toBeInTheDocument();
  });
});

describe('Range Mode', () => {
  it('should render with range placeholder', async () => {
    await render(
      <CenteredWrapper>
        <ControlledRangePicker />
      </CenteredWrapper>,
    );
    await expect
      .element(page.getByText('Select range'))
      .toBeInTheDocument();
  });

  it('should display range value when provided', async () => {
    const range: DateRange = {
      from: new Date(2026, 0, 10),
      to: new Date(2026, 0, 20),
    };
    await render(
      <CenteredWrapper>
        <ControlledRangePicker initialValue={range} />
      </CenteredWrapper>,
    );
    await expect
      .element(page.getByText(/Jan 10, 2026/))
      .toBeInTheDocument();
    await expect
      .element(page.getByText(/Jan 20, 2026/))
      .toBeInTheDocument();
  });

  it('should open calendar with two months in range mode', async () => {
    await render(
      <CenteredWrapper>
        <ControlledRangePicker />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /select range/i });
    await trigger.click();

    const grids = page.getByRole('grid');
    await expect.element(grids.first()).toBeVisible();
  });

  it('should fresh-start from on re-open with complete range and update display', async () => {
    const handleChange = vi.fn();
    const initialRange: DateRange = {
      from: new Date(2026, 2, 5),
      to: new Date(2026, 2, 10),
    };
    await render(
      <CenteredWrapper>
        <ControlledRangePicker
          initialValue={initialRange}
          onValueChange={handleChange}
        />
      </CenteredWrapper>,
    );
    await expect
      .element(page.getByText(/Mar 05, 2026/))
      .toBeInTheDocument();

    const trigger = page.getByRole('button', { name: /Mar 05/ });
    await trigger.click();
    await expect
      .element(trigger)
      .toHaveAttribute('aria-expanded', 'true');
    await expect.element(page.getByRole('grid').first()).toBeVisible();

    await page.getByRole('button', { name: /March 20/ }).click();
    await expect.element(page.getByRole('grid').first()).toBeVisible();
    expect(handleChange).not.toHaveBeenCalled();

    await page.getByRole('button', { name: /March 25/ }).click();
    await expect
      .element(page.getByRole('grid'))
      .not.toBeInTheDocument();

    expect(handleChange).toHaveBeenCalledOnce();
    const newRange = handleChange.mock.calls[0][0] as DateRange;
    expect(newRange.from?.getDate()).toBe(20);
    expect(newRange.to?.getDate()).toBe(25);

    await expect
      .element(page.getByText(/Mar 20, 2026/))
      .toBeInTheDocument();
    await expect
      .element(page.getByText(/Mar 25, 2026/))
      .toBeInTheDocument();
  });
});

describe('Presets', () => {
  it('should render preset buttons', async () => {
    const today = new Date();
    await render(
      <CenteredWrapper>
        <DatePicker>
          <DatePicker.Input />
          <DatePicker.Calendar>
            <DatePicker.Presets>
              <DatePicker.Preset label="오늘" value={today} />
              <DatePicker.Preset label="어제" value={today} />
            </DatePicker.Presets>
          </DatePicker.Calendar>
        </DatePicker>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /pick a date/i });
    await trigger.click();

    await expect
      .element(page.getByText('오늘'))
      .toBeVisible();
    await expect
      .element(page.getByText('어제'))
      .toBeVisible();
  });

  it('should select date and close when preset is clicked', async () => {
    const handleChange = vi.fn();
    const today = new Date();

    function PresetPicker() {
      const [date, setDate] = useState<Date | undefined>();
      return (
        <DatePicker
          value={date}
          onValueChange={(nextDate: Date | undefined) => {
            setDate(nextDate);
            handleChange(nextDate);
          }}
        >
          <DatePicker.Input />
          <DatePicker.Calendar>
            <DatePicker.Presets>
              <DatePicker.Preset label="오늘" value={today} />
            </DatePicker.Presets>
          </DatePicker.Calendar>
        </DatePicker>
      );
    }

    await render(
      <CenteredWrapper>
        <PresetPicker />
      </CenteredWrapper>,
    );

    const trigger = page.getByRole('button', { name: /pick a date/i });
    await trigger.click();

    await page.getByText('오늘').click();

    expect(handleChange).toHaveBeenCalled();
    await expect
      .element(page.getByRole('grid'))
      .not.toBeInTheDocument();
  });
});

describe('FormControl Integration', () => {
  it('should connect with FormControl label', async () => {
    await render(
      <CenteredWrapper>
        <FormControl>
          <FormControl.Label>예약일</FormControl.Label>
          <DatePicker>
            <DatePicker.Input />
            <DatePicker.Calendar />
          </DatePicker>
        </FormControl>
      </CenteredWrapper>,
    );
    await expect
      .element(page.getByText('예약일'))
      .toBeInTheDocument();
  });

  it('should apply aria-invalid from FormControl', async () => {
    await render(
      <CenteredWrapper>
        <FormControl>
          <FormControl.Label>예약일</FormControl.Label>
          <DatePicker>
            <DatePicker.Input aria-invalid="true" />
            <DatePicker.Calendar />
          </DatePicker>
          <FormControl.Validation variant="error">
            날짜를 선택하세요
          </FormControl.Validation>
        </FormControl>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: '예약일' });
    await expect
      .element(trigger)
      .toHaveAttribute('aria-invalid', 'true');
  });
});

describe('Accessibility', () => {
  it('should have data-slot attribute on trigger', async () => {
    await render(
      <CenteredWrapper>
        <ControlledDatePicker />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /pick a date/i });
    await expect
      .element(trigger)
      .toHaveAttribute('data-slot', 'date-picker-input');
  });

  it('should have button type on trigger', async () => {
    await render(
      <CenteredWrapper>
        <ControlledDatePicker />
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /pick a date/i });
    await expect
      .element(trigger)
      .toHaveAttribute('type', 'button');
  });
});
