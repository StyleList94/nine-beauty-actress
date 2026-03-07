import type { CurveType } from './types';

import {
  type ComponentProps,
  type ReactNode,
} from 'react';

import {
  XYChart,
  AnimatedAreaSeries,
  AreaSeries,
  AnimatedAreaStack,
  AreaStack,
} from '@visx/xychart';

import { useChartConfig } from './context';
import { getCurveFactory } from './utils';
import {
  useXYChartTheme,
  xyChartMargin,
  xyChartMarginNoYAxis,
  separateChildren,
  ChartGrid,
  ChartXAxis,
  ChartYAxis,
  ChartTooltip,
  ChartLegend,
} from './xy-shared';

export type AreaChartProps = {
  data: Record<string, unknown>[];
  xKey: string;
  /** 표시할 시리즈 키 (미지정 시 config의 모든 키 사용) */
  series?: string[];
  fillOpacity?: number;
  stacked?: boolean;
  curve?: CurveType;
  xScale?: ComponentProps<typeof XYChart>['xScale'];
  yScale?: ComponentProps<typeof XYChart>['yScale'];
  margin?: ComponentProps<typeof XYChart>['margin'];
  children?: ReactNode;
};

function AreaChartRoot({
  data,
  xKey,
  series,
  fillOpacity = 0.3,
  stacked = false,
  curve = 'monotone',
  xScale = { type: 'point', padding: 0 },
  yScale = { type: 'linear' },
  margin,
  children,
}: AreaChartProps) {
  const { config, height, animated } = useChartConfig();
  const theme = useXYChartTheme(config);
  const { legends, xyChildren, hasYAxis } = separateChildren(children);
  const resolvedMargin = margin ?? (hasYAxis ? xyChartMargin : xyChartMarginNoYAxis);
  const keys = series ?? Object.keys(config);
  const curveFactory = getCurveFactory(curve);
  const Series = animated ? AnimatedAreaSeries : AreaSeries;
  const Stack = animated ? AnimatedAreaStack : AreaStack;

  const areaSeries = keys.map((key) => (
    <Series
      key={key}
      dataKey={key}
      data={data}
      xAccessor={(d: Record<string, unknown>) => d[xKey]}
      yAccessor={(d: Record<string, unknown>) => d[key]}
      fillOpacity={fillOpacity}
      curve={curveFactory}
    />
  ));

  return (
    <>
      <XYChart
        height={height || 300}
        xScale={xScale}
        yScale={yScale}
        theme={theme}
        margin={resolvedMargin}
      >
        {xyChildren}
        {stacked ? (
          <Stack>{areaSeries}</Stack>
        ) : (
          areaSeries
        )}
      </XYChart>
      {legends}
    </>
  );
}

/**
 * 영역 차트
 *
 * @remarks
 * - config 키에서 시리즈 자동 생성
 * - fillOpacity: 영역 투명도 (0~1, 기본 0.3)
 * - stacked: 누적 영역 (기본 false)
 * - curve: monotone(기본) | linear | step
 * - Compound: Grid, XAxis, YAxis, Tooltip, Legend
 *
 * @example
 * ```tsx
 * <ChartContainer config={chartConfig}>
 *   <AreaChart data={data} xKey="timestamp" fillOpacity={0.3}>
 *     <AreaChart.Grid />
 *     <AreaChart.XAxis />
 *     <AreaChart.Tooltip />
 *   </AreaChart>
 * </ChartContainer>
 * ```
 */
export const AreaChart = Object.assign(AreaChartRoot, {
  Grid: ChartGrid,
  XAxis: ChartXAxis,
  YAxis: ChartYAxis,
  Tooltip: ChartTooltip,
  Legend: ChartLegend,
});
