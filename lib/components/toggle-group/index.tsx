import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

import { cn } from 'lib/core/utils';

import {
  toggleGroupRoot,
  toggleGroupItemBase,
  toggleGroupItemSize,
  toggleGroupItemVariant,
  toggleGroupItemTightSpacing,
  toggleGroupItemLooseSpacing,
} from './style.css';

const spacingPresets = {
  none: '0px',
  xs: '0.125rem',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
} as const;

type ToggleGroupVariant = keyof typeof toggleGroupItemVariant;
type ToggleGroupSize = keyof typeof toggleGroupItemSize;
type ToggleGroupSpacingPreset = keyof typeof spacingPresets;
type ToggleGroupSpacing = ToggleGroupSpacingPreset | number;

type ToggleGroupContextValue = {
  variant: ToggleGroupVariant;
  size: ToggleGroupSize;
  tight: boolean;
};

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(
  null,
);

type ToggleGroupProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Root
> & {
  /**
   * 토글 그룹의 스타일을 지정합니다.
   * @defaultValue 'default'
   */
  variant?: ToggleGroupVariant;
  /**
   * 토글 그룹의 크기를 지정합니다.
   * @defaultValue 'default'
   */
  size?: ToggleGroupSize;
  /**
   * 토글 아이템 사이의 간격을 지정합니다.
   * @defaultValue 'none'
   */
  spacing?: ToggleGroupSpacing;
};

/**
 * 토글 버튼 그룹을 구성할 때 사용합니다.
 *
 * @remarks
 * - `type="single"`: 단일 선택 모드
 * - `type="multiple"`: 다중 선택 모드
 *
 * @example
 * ```tsx
 * // 단일 선택
 * <ToggleGroup type="single" value={value} onValueChange={setValue}>
 *   <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
 *   <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
 * </ToggleGroup>
 *
 * // 다중 선택
 * <ToggleGroup type="multiple" value={values} onValueChange={setValues}>
 *   <ToggleGroupItem value="left">Left</ToggleGroupItem>
 *   <ToggleGroupItem value="center">Center</ToggleGroupItem>
 *   <ToggleGroupItem value="right">Right</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 *
 * @see {@link ToggleGroupItem} - 개별 토글 버튼 컴포넌트
 */
const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(
  (
    {
      className,
      style,
      children,
      variant = 'default',
      size = 'default',
      spacing = 'none',
      ...props
    },
    ref,
  ) => {
    const isPreset = typeof spacing !== 'number';
    const gapValue = isPreset ? spacingPresets[spacing] : `${spacing}px`;
    const tight = isPreset ? spacing === 'none' : spacing === 0;
    const mergedStyle = React.useMemo<React.CSSProperties>(
      () => ({
        gap: gapValue,
        ...style,
      }),
      [gapValue, style],
    );

    const contextValue = React.useMemo<ToggleGroupContextValue>(
      () => ({
        variant,
        size,
        tight,
      }),
      [variant, size, tight],
    );

    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn(toggleGroupRoot, className)}
        data-slot="toggle-group"
        data-variant={variant}
        data-size={size}
        data-spacing={tight ? 'tight' : 'spaced'}
        style={mergedStyle}
        {...props}
      >
        <ToggleGroupContext.Provider value={contextValue}>
          {children}
        </ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    );
  },
);

ToggleGroup.displayName = 'ToggleGroup';

type ToggleGroupItemProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Item
>;

/**
 * 토글 그룹 내부에서 토글 버튼을 구성할 때 사용합니다.
 *
 * @remarks
 * `ToggleGroup`의 `variant`, `size`, `spacing` 설정을 자동으로 상속받습니다.
 *
 * @example
 * ```tsx
 * <ToggleGroup type="single">
 *   <ToggleGroupItem value="option1" aria-label="First option">
 *     Option 1
 *   </ToggleGroupItem>
 * </ToggleGroup>
 * ```
 *
 * @see {@link ToggleGroup} - 부모 그룹 컴포넌트
 */
const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  const resolvedVariant = context?.variant ?? 'default';
  const resolvedSize = context?.size ?? 'default';
  const tight = context?.tight ?? false;

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleGroupItemBase,
        toggleGroupItemVariant[resolvedVariant],
        toggleGroupItemSize[resolvedSize],
        tight ? toggleGroupItemTightSpacing : toggleGroupItemLooseSpacing,
        className,
      )}
      data-slot="toggle-group-item"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      {...props}
    />
  );
});

ToggleGroupItem.displayName = 'ToggleGroupItem';

export {
  ToggleGroup,
  ToggleGroupItem,
  type ToggleGroupProps,
  type ToggleGroupItemProps,
  type ToggleGroupVariant,
  type ToggleGroupSize,
  type ToggleGroupSpacing,
};

export default ToggleGroup;
