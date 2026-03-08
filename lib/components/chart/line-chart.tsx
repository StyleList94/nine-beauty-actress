import type { CurveType } from './types';

import {
  type ComponentProps,
  type ReactNode,
} from 'react';

import { XYChart, AnimatedLineSeries, LineSeries } from '@visx/xychart';

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

export type LineChartProps = {
  /** data 배열 (각 항목은 xKey + 시리즈 키를 포함해야 합니다) */
  data: Record<string, unknown>[];
  /** X축으로 사용할 data 필드명 */
  xKey: string;
  /** 표시할 시리즈 키 목록. 미지정 시 config의 모든 키를 사용합니다 */
  series?: string[];
  /**
   * 선 곡선 종류
   * @defaultValue 'monotone'
   */
  curve?: CurveType;
  /** visx XYChart xScale 설정 (기본: point scale) */
  xScale?: ComponentProps<typeof XYChart>['xScale'];
  /** visx XYChart yScale 설정 (기본: linear scale) */
  yScale?: ComponentProps<typeof XYChart>['yScale'];
  /** 차트 내부 여백 (기본: YAxis 유무에 따라 자동 결정) */
  margin?: ComponentProps<typeof XYChart>['margin'];
  children?: ReactNode;
};

function LineChartRoot({
  data,
  xKey,
  series,
  curve = 'monotone',
  xScale = { type: 'point', padding: 0 },
  yScale = { type: 'linear' },
  margin,
  children,
}: LineChartProps) {
  const { config, height, animated } = useChartConfig();
  const theme = useXYChartTheme(config);
  const { legends, xyChildren, hasYAxis } = separateChildren(children);
  const resolvedMargin = margin ?? (hasYAxis ? xyChartMargin : xyChartMarginNoYAxis);
  const keys = series ?? Object.keys(config);
  const curveFactory = getCurveFactory(curve);
  const Series = animated ? AnimatedLineSeries : LineSeries;

  return (
    <>
      <XYChart
        height={height}
        xScale={xScale}
        yScale={yScale}
        theme={theme}
        margin={resolvedMargin}
      >
        {xyChildren}
        {keys.map((key) => (
          <Series
            key={key}
            dataKey={key}
            data={data}
            xAccessor={(d: Record<string, unknown>) => d[xKey]}
            yAccessor={(d: Record<string, unknown>) => d[key]}
            curve={curveFactory}
          />
        ))}
      </XYChart>
      {legends}
    </>
  );
}

/**
 * 선형 차트
 *
 * @remarks
 * - config 키에서 시리즈 자동 생성
 * - curve: monotone(기본) | linear | step
 * - Compound: Grid, XAxis, YAxis, Tooltip, Legend
 *
 * @example
 * ```tsx
 * <ChartContainer config={chartConfig}>
 *   <LineChart data={data} xKey="timestamp">
 *     <LineChart.Grid />
 *     <LineChart.XAxis />
 *     <LineChart.YAxis />
 *     <LineChart.Tooltip />
 *     <LineChart.Legend />
 *   </LineChart>
 * </ChartContainer>
 * ```
 */
export const LineChart = Object.assign(LineChartRoot, {
  Grid: ChartGrid,
  XAxis: ChartXAxis,
  YAxis: ChartYAxis,
  Tooltip: ChartTooltip,
  Legend: ChartLegend,
});
