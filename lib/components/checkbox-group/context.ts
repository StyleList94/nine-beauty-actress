import type { FormControlValidationState } from 'lib/components/form-control/context';

import { createContext, use } from 'react';

export type CheckboxGroupContextValue = {
  id: string;
  disabled: boolean;
  required: boolean;
  validation?: FormControlValidationState;
  hasCaption: boolean;
  hasValidation: boolean;
  setCaptionMounted: (mounted: boolean) => void;
  setValidationMounted: (mounted: boolean) => void;
};

export const CheckboxGroupContext =
  createContext<CheckboxGroupContextValue | null>(null);

export function useCheckboxGroupContext() {
  return use(CheckboxGroupContext);
}
