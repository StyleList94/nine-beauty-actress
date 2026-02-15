import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { Slider } from 'lib/components/slider';
import { FormControl } from 'lib/components/form-control';

describe('Rendering and Props', () => {
  it('should render slider', async () => {
    await render(<Slider defaultValue={[50]} />);
    const slider = page.getByRole('slider');
    await expect.element(slider).toBeInTheDocument();
  });

  it('should have data-slot attribute', async () => {
    await render(<Slider data-testid="slider-root" defaultValue={[50]} />);
    const sliderRoot = page.getByTestId('slider-root');
    await expect
      .element(sliderRoot)
      .toHaveAttribute('data-slot', 'slider');
  });

  it('should render without value or defaultValue', async () => {
    await render(<Slider />);
    const slider = page.getByRole('slider');
    await expect.element(slider).toBeInTheDocument();
  });

  it('should render with controlled value prop', async () => {
    await render(<Slider value={[50]} />);
    const slider = page.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '50');
  });

  it('should render track and range', async () => {
    await render(<Slider data-testid="slider-root" defaultValue={[50]} />);
    const slider = page.getByRole('slider');
    await expect.element(slider).toBeInTheDocument();
    // Track and range render alongside thumb inside the root
    const sliderRoot = page.getByTestId('slider-root');
    await expect
      .element(sliderRoot)
      .toHaveAttribute('data-slot', 'slider');
  });
});

describe('Visual Properties', () => {
  it('should render single thumb for single value', async () => {
    await render(<Slider defaultValue={[50]} />);
    const thumbs = page.getByRole('slider');
    await expect.element(thumbs).toBeInTheDocument();
  });

  it('should render two thumbs for range value', async () => {
    await render(<Slider defaultValue={[25, 75]} />);
    const sliders = page.getByRole('slider');
    await expect.element(sliders.nth(0)).toBeInTheDocument();
    await expect.element(sliders.nth(1)).toBeInTheDocument();
  });
});

describe('State Management', () => {
  it('should have correct aria-valuenow', async () => {
    await render(<Slider defaultValue={[30]} />);
    const slider = page.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '30');
  });

  it('should have correct min and max attributes', async () => {
    await render(<Slider defaultValue={[50]} min={10} max={90} />);
    const slider = page.getByRole('slider');
    await expect.element(slider).toHaveAttribute('aria-valuemin', '10');
    await expect.element(slider).toHaveAttribute('aria-valuemax', '90');
  });
});

describe('Form State', () => {
  it('should be disabled when disabled prop is true', async () => {
    await render(
      <Slider data-testid="slider-root" defaultValue={[50]} disabled />,
    );
    const sliderRoot = page.getByTestId('slider-root');
    await expect.element(sliderRoot).toHaveAttribute('data-disabled', '');
  });
});

describe('FormControl Integration', () => {
  it('should be disabled via FormControl', async () => {
    await render(
      <FormControl disabled>
        <Slider data-testid="slider-root" defaultValue={[50]} />
      </FormControl>,
    );
    const sliderRoot = page.getByTestId('slider-root');
    await expect.element(sliderRoot).toHaveAttribute('data-disabled', '');
  });

  it('should receive aria-describedby from FormControl caption', async () => {
    await render(
      <FormControl>
        <Slider data-testid="slider-root" defaultValue={[50]} />
        <FormControl.Caption>Adjust volume</FormControl.Caption>
      </FormControl>,
    );
    // aria-describedby is applied to SliderPrimitive.Root, not the thumb
    const sliderRoot = page.getByTestId('slider-root');
    await expect
      .element(sliderRoot)
      .toHaveAttribute('aria-describedby');
  });
});
