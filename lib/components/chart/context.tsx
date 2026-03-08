import type { ResolvedChartConfig } from './types';

import { createContext, use } from 'react';


export type ChartContextValue = {
  config: ResolvedChartConfig;
  width: number;
  height: number;
  animated: boolean;
};

export const ChartContext = createContext<ChartContextValue | null>(null);

export function useChartConfig() {
  const context = use(ChartContext);
  if (!context) {
    throw new Error('useChartConfig must be used within a ChartContainer');
  }
  return context;
}
