import { forwardRef, useMemo, type ComponentProps } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { useFormControlInputProps } from 'lib/components/form-control/context';

import * as styles from './style.css';

export type SliderProps = ComponentProps<typeof SliderPrimitive.Root>;

/**
 * 값을 슬라이드로 선택할게
 *
 * @remarks
 * - Radix UI Slider 기반 단일/다중 값 슬라이더
 * - 수평·수직 방향 지원
 * - FormControl 연동 (id, disabled, aria-describedby 자동 전파)
 *
 * @example
 * ```tsx
 * <Slider defaultValue={[50]} max={100} step={1} />
 * ```
 */
export const Slider = forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      defaultValue,
      value,
      min = 0,
      max = 100,
      id,
      disabled,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref,
  ) => {
    const _values = useMemo(() => {
      if (Array.isArray(value)) return value;
      if (Array.isArray(defaultValue)) return defaultValue;
      return [min, max];
    }, [value, defaultValue, min, max]);

    const fcProps = useFormControlInputProps({
      id,
      disabled,
      'aria-describedby': ariaDescribedby,
    });

    return (
      <SliderPrimitive.Root
        ref={ref}
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        className={styles.sliderBase}
        {...fcProps}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={styles.sliderTrack}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={styles.sliderRange}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={styles.sliderThumb}
          />
        ))}
      </SliderPrimitive.Root>
    );
  },
);

Slider.displayName = 'Slider';
