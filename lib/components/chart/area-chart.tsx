import type { CurveType } from './types';

import { type ComponentProps, type ReactNode } from 'react';

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
  /** data 배열 (각 항목은 xKey + 시리즈 키를 포함해야 합니다) */
  data: Record<string, unknown>[];
  /** X축으로 사용할 data 필드명 */
  xKey: string;
  /** 표시할 시리즈 키 목록. 미지정 시 config의 모든 키를 사용합니다 */
  series?: string[];
  /**
   * 영역 채움 투명도 (0~1)
   * @defaultValue 0.3
   */
  fillOpacity?: number;
  /**
   * 누적 영역 모드
   * @defaultValue false
   */
  stacked?: boolean;
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
  const resolvedMargin =
    margin ?? (hasYAxis ? xyChartMargin : xyChartMarginNoYAxis);
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
        height={height}
        xScale={xScale}
        yScale={yScale}
        theme={theme}
        margin={resolvedMargin}
      >
        {xyChildren}
        {stacked ? <Stack>{areaSeries}</Stack> : areaSeries}
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
 *     <AreaChart.YAxis />
 *     <AreaChart.Tooltip />
 *     <AreaChart.Legend />
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
