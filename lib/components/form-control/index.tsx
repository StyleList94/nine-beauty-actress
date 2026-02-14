import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useState,
  type ComponentProps,
} from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from 'lib/core/utils';

import {
  FormControlContext,
  useFormControlContext,
  type FormControlLayout,
  type FormControlValidationState,
} from './context';
import {
  formControlBase,
  formControlLabelBase,
  formControlCaptionBase,
  formControlValidationBase,
  requiredIndicator,
} from './style.css';

export type FormControlProps = ComponentProps<'div'> & {
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 필수 입력 여부 */
  required?: boolean;
  /** 유효성 검사 상태 */
  validation?: FormControlValidationState;
  /** 레이아웃 방향 (vertical: 텍스트 필드, horizontal: 체크박스/스위치) */
  layout?: FormControlLayout;
};

const FormControlRoot = forwardRef<HTMLDivElement, FormControlProps>(
  (
    {
      id: externalId,
      disabled = false,
      required = false,
      validation,
      layout = 'vertical',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const id = externalId ?? autoId;

    const [hasCaption, setCaptionMounted] = useState(false);
    const [hasValidation, setValidationMounted] = useState(false);

    const contextValue = useMemo(
      () => ({
        id,
        disabled,
        required,
        validation,
        layout,
        hasCaption,
        hasValidation,
        setCaptionMounted,
        setValidationMounted,
      }),
      [id, disabled, required, validation, layout, hasCaption, hasValidation],
    );

    return (
      <FormControlContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-slot="form-control"
          data-disabled={disabled || undefined}
          data-required={required || undefined}
          data-validation={validation}
          data-layout={layout}
          className={cn(formControlBase({ layout }), className)}
          {...props}
        >
          {children}
        </div>
      </FormControlContext.Provider>
    );
  },
);

FormControlRoot.displayName = 'FormControl';

/** 네 이름을 불러줄게 */
export type FormControlLabelProps = ComponentProps<typeof LabelPrimitive.Root>;

const Label = forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  FormControlLabelProps
>(({ htmlFor: externalHtmlFor, className, children, ...props }, ref) => {
  const ctx = useFormControlContext();

  return (
    <LabelPrimitive.Root
      ref={ref}
      data-slot="form-control-label"
      htmlFor={externalHtmlFor ?? ctx?.id}
      className={cn(formControlLabelBase, className)}
      {...props}
    >
      {children}
      {ctx?.required && (
        <span data-slot="form-control-required" className={requiredIndicator}>
          *
        </span>
      )}
    </LabelPrimitive.Root>
  );
});

Label.displayName = 'FormControl.Label';

/** 살짝 귀띔해줄게 */
export type FormControlCaptionProps = ComponentProps<'p'>;

const Caption = forwardRef<HTMLParagraphElement, FormControlCaptionProps>(
  ({ className, ...props }, ref) => {
    const ctx = useFormControlContext();

    useEffect(() => {
      ctx?.setCaptionMounted(true);
      return () => ctx?.setCaptionMounted(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <p
        ref={ref}
        id={ctx ? `${ctx.id}-caption` : undefined}
        data-slot="form-control-caption"
        className={cn(formControlCaptionBase, className)}
        {...props}
      />
    );
  },
);

Caption.displayName = 'FormControl.Caption';

/** 네가 맞는지 확인해볼게 */
export type FormControlValidationVariant = 'error' | 'success';

export type FormControlValidationProps = ComponentProps<'p'> & {
  /** 유효성 검사 시각적 변형 (기본: context의 validation 값) */
  variant?: FormControlValidationVariant;
};

const Validation = forwardRef<
  HTMLParagraphElement,
  FormControlValidationProps
>(({ variant: externalVariant, className, ...props }, ref) => {
  const ctx = useFormControlContext();
  const variant = externalVariant ?? ctx?.validation ?? 'error';

  useEffect(() => {
    ctx?.setValidationMounted(true);
    return () => ctx?.setValidationMounted(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <p
      ref={ref}
      id={ctx ? `${ctx.id}-validation` : undefined}
      data-slot="form-control-validation"
      data-variant={variant}
      className={cn(formControlValidationBase({ variant }), className)}
      role="alert"
      aria-live="assertive"
      {...props}
    />
  );
});

Validation.displayName = 'FormControl.Validation';

/**
 * 너를 제어하고 싶어
 *
 * @remarks
 * - Label, TextInput, Caption, Validation 간 ARIA 속성 자동 연결
 * - layout prop으로 vertical/horizontal 레이아웃 전환
 * - required/disabled 상태 하위 컴포넌트에 자동 전파
 *
 * @example
 * ```tsx
 * <FormControl required>
 *   <FormControl.Label>이메일</FormControl.Label>
 *   <TextInput type="email" />
 *   <FormControl.Caption>이메일은 공개되지 않습니다.</FormControl.Caption>
 * </FormControl>
 * ```
 */
export const FormControl = Object.assign(FormControlRoot, {
  Label,
  Caption,
  Validation,
});
