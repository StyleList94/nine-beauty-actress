import type { ComponentType, ReactNode } from 'react';

export type ChartConfig = Record<
  string,
  {
    label: string;
    color?: string;
    icon?: ComponentType;
  }
>;

/** config에 color가 확정된 상태 (자동 할당 후) */
export type ResolvedChartConfig = Record<
  string,
  {
    label: string;
    color: string;
    icon?: ComponentType;
  }
>;

export type CurveType = 'monotone' | 'linear' | 'step';

export type ChartGridProps = {
  columns?: boolean;
  rows?: boolean;
  numTicks?: number;
};

export type ChartAxisProps = {
  tickFormat?: (value: unknown) => string;
  numTicks?: number;
  label?: string;
  hide?: boolean;
};

export type ChartTooltipProps = {
  render?: (data: TooltipData) => ReactNode;
};

export type TooltipData = {
  key: string;
  label: string;
  color: string;
  value: unknown;
  datum: Record<string, unknown>;
};

export type ChartLegendProps = {
  position?: 'top' | 'bottom' | 'left' | 'right';
  direction?: 'row' | 'column';
};

export type ChartOverlayProps = {
  children: (ctx: {
    xScale: unknown;
    yScale: unknown;
    width: number;
    height: number;
  }) => ReactNode;
};
