import { createContext, use, type AriaAttributes } from 'react';

export type FormControlValidationState = 'error' | 'success';
export type FormControlLayout = 'vertical' | 'horizontal';

export type FormControlContextValue = {
  id: string;
  disabled: boolean;
  required: boolean;
  validation?: FormControlValidationState;
  layout: FormControlLayout;
  hasCaption: boolean;
  hasValidation: boolean;
  setCaptionMounted: (mounted: boolean) => void;
  setValidationMounted: (mounted: boolean) => void;
};

export const FormControlContext =
  createContext<FormControlContextValue | null>(null);

export function useFormControlContext() {
  return use(FormControlContext);
}

type FormControlInputExternalProps = {
  id?: string;
  disabled?: boolean;
  required?: boolean;
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-describedby'?: string;
};

export function useFormControlInputProps(
  externalProps?: FormControlInputExternalProps,
) {
  const ctx = useFormControlContext();

  if (!ctx) return externalProps ?? {};

  const describedByParts: string[] = [];
  if (ctx.hasCaption) describedByParts.push(`${ctx.id}-caption`);
  if (ctx.hasValidation) describedByParts.push(`${ctx.id}-validation`);

  return {
    id: externalProps?.id ?? ctx.id,
    disabled: externalProps?.disabled ?? ctx.disabled,
    required: externalProps?.required ?? ctx.required,
    'aria-invalid':
      externalProps?.['aria-invalid'] ??
      (ctx.validation === 'error' ? true : undefined),
    'aria-describedby':
      externalProps?.['aria-describedby'] ??
      (describedByParts.length > 0
        ? describedByParts.join(' ')
        : undefined),
  };
}
