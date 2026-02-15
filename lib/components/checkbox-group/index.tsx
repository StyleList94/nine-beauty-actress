import type { FormControlValidationState } from 'lib/components/form-control/context';

import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useState,
  type ComponentProps,
} from 'react';

import { cn } from 'lib/core/utils';

import { CheckboxGroupContext, useCheckboxGroupContext } from './context';
import {
  checkboxGroupBase,
  checkboxGroupContent,
  checkboxGroupLabel,
  checkboxGroupCaptionBase,
  checkboxGroupValidationBase,
  requiredIndicator,
} from './style.css';

/** 그룹의 이름표를 달아줄게 */
export type CheckboxGroupLabelProps = ComponentProps<'legend'>;

function Label({ className, children, ref, ...props }: CheckboxGroupLabelProps) {
  const ctx = useCheckboxGroupContext();

  return (
    <legend
      ref={ref}
      data-slot="checkbox-group-label"
      className={cn(checkboxGroupLabel, className)}
      {...props}
    >
      {children}
      {ctx?.required && (
        <span data-slot="checkbox-group-required" className={requiredIndicator}>
          *
        </span>
      )}
    </legend>
  );
}

/** 그룹에 대해 살짝 귀띔해줄게 */
export type CheckboxGroupCaptionProps = ComponentProps<'p'>;

function Caption({ className, ref, ...props }: CheckboxGroupCaptionProps) {
  const ctx = useCheckboxGroupContext();

  useEffect(() => {
    ctx?.setCaptionMounted(true);
    return () => ctx?.setCaptionMounted(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <p
      ref={ref}
      id={ctx ? `${ctx.id}-caption` : undefined}
      data-slot="checkbox-group-caption"
      className={cn(checkboxGroupCaptionBase, className)}
      {...props}
    />
  );
}

/** 그룹이 맞는지 확인해볼게 */
export type CheckboxGroupValidationVariant = 'error' | 'success';

export type CheckboxGroupValidationProps = ComponentProps<'p'> & {
  /** 유효성 검사 시각적 변형 (기본: context의 validation 값) */
  variant?: CheckboxGroupValidationVariant;
};

function Validation({
  variant: externalVariant,
  className,
  ref,
  ...props
}: CheckboxGroupValidationProps) {
  const ctx = useCheckboxGroupContext();
  const variant = externalVariant ?? ctx?.validation ?? 'error';

  useEffect(() => {
    ctx?.setValidationMounted(true);
    return () => ctx?.setValidationMounted(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <p
      ref={ref}
      id={ctx ? `${ctx.id}-validation` : undefined}
      data-slot="checkbox-group-validation"
      data-variant={variant}
      className={cn(checkboxGroupValidationBase({ variant }), className)}
      role="alert"
      aria-live="assertive"
      {...props}
    />
  );
}

export type CheckboxGroupProps = ComponentProps<'fieldset'> & {
  /** 비활성화 상태 (하위 체크박스에 자동 전파) */
  disabled?: boolean;
  /** 필수 선택 여부 */
  required?: boolean;
  /** 그룹 유효성 검사 상태 */
  validation?: FormControlValidationState;
};

function CheckboxGroupRoot({
  disabled = false,
  required = false,
  validation,
  className,
  children,
  ref,
  ...props
}: CheckboxGroupProps) {
  const autoId = useId();

  const [hasCaption, setCaptionMounted] = useState(false);
  const [hasValidation, setValidationMounted] = useState(false);

  const describedByParts: string[] = [];
  if (hasCaption) describedByParts.push(`${autoId}-caption`);
  if (hasValidation) describedByParts.push(`${autoId}-validation`);

  const contextValue = useMemo(
    () => ({
      id: autoId,
      disabled,
      required,
      validation,
      hasCaption,
      hasValidation,
      setCaptionMounted,
      setValidationMounted,
    }),
    [autoId, disabled, required, validation, hasCaption, hasValidation],
  );

  const childArray = Children.toArray(children);
  const labelChild = childArray.find(
    (child) => isValidElement(child) && child.type === Label,
  );
  const captionChild = childArray.find(
    (child) => isValidElement(child) && child.type === Caption,
  );
  const bodyChildren = childArray.filter(
    (child) =>
      !(
        isValidElement(child) &&
        (child.type === Label || child.type === Caption)
      ),
  );

  return (
    <CheckboxGroupContext value={contextValue}>
      <fieldset
        ref={ref}
        data-slot="checkbox-group"
        data-disabled={disabled || undefined}
        data-required={required || undefined}
        data-validation={validation}
        disabled={disabled || undefined}
        aria-required={required || undefined}
        aria-describedby={
          describedByParts.length > 0 ? describedByParts.join(' ') : undefined
        }
        className={cn(checkboxGroupBase, className)}
        {...props}
      >
        {labelChild}
        {captionChild}
        <div className={checkboxGroupContent}>{bodyChildren}</div>
      </fieldset>
    </CheckboxGroupContext>
  );
}

/**
 * 체크박스들을 하나로 묶어줄게
 *
 * @remarks
 * - fieldset/legend 기반 네이티브 그룹 시멘틱
 * - disabled 상태 하위 체크박스에 자동 전파
 * - FormControl과 조합하여 개별 체크박스 레이블 연결
 *
 * @example
 * ```tsx
 * <CheckboxGroup required>
 *   <CheckboxGroup.Label>알림 설정</CheckboxGroup.Label>
 *   <FormControl layout="horizontal">
 *     <Checkbox />
 *     <FormControl.Label>이메일</FormControl.Label>
 *   </FormControl>
 * </CheckboxGroup>
 * ```
 */
export const CheckboxGroup = Object.assign(CheckboxGroupRoot, {
  Label,
  Caption,
  Validation,
});
