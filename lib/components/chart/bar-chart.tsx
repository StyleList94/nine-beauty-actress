import { type ComponentProps, type ReactNode } from 'react';

import {
  XYChart,
  AnimatedBarSeries,
  BarSeries,
  AnimatedBarStack,
  BarStack,
  AnimatedBarGroup,
  BarGroup,
} from '@visx/xychart';

import { useChartConfig } from './context';
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

export type BarChartProps = {
  /** data 배열 (각 항목은 xKey + 시리즈 키를 포함해야 합니다) */
  data: Record<string, unknown>[];
  /** X축으로 사용할 data 필드명 */
  xKey: string;
  /** 표시할 시리즈 키 목록. 미지정 시 config의 모든 키를 사용합니다 */
  series?: string[];
  /**
   * 누적 막대 모드
   * @defaultValue false
   */
  stacked?: boolean;
  /**
   * 수평 막대 모드
   * @defaultValue false
   */
  horizontal?: boolean;
  /**
   * 막대 상단 모서리 둥글기 (px)
   * @defaultValue 4
   */
  barRadius?: number;
  /** visx XYChart xScale 설정 */
  xScale?: ComponentProps<typeof XYChart>['xScale'];
  /** visx XYChart yScale 설정 */
  yScale?: ComponentProps<typeof XYChart>['yScale'];
  /** 차트 내부 여백 (기본: YAxis 유무에 따라 자동 결정) */
  margin?: ComponentProps<typeof XYChart>['margin'];
  children?: ReactNode;
};

function BarChartRoot({
  data,
  xKey,
  series,
  stacked = false,
  horizontal = false,
  barRadius,
  xScale,
  yScale,
  margin,
  children,
}: BarChartProps) {
  const { config, height, animated } = useChartConfig();
  const theme = useXYChartTheme(config);
  const { legends, xyChildren, hasYAxis } = separateChildren(children);
  const resolvedMargin =
    margin ?? (hasYAxis ? xyChartMargin : xyChartMarginNoYAxis);
  const keys = series ?? Object.keys(config);

  const defaultXScale: ComponentProps<typeof XYChart>['xScale'] = horizontal
    ? { type: 'linear' }
    : { type: 'band', paddingInner: 0.3, paddingOuter: 0.15 };
  const defaultYScale: ComponentProps<typeof XYChart>['yScale'] = horizontal
    ? { type: 'band', paddingInner: 0.3, paddingOuter: 0.15 }
    : { type: 'linear' };

  const resolvedRadius = barRadius ?? 4;
  const lastKey = keys[keys.length - 1];
  const Series = animated ? AnimatedBarSeries : BarSeries;
  const Stack = animated ? AnimatedBarStack : BarStack;
  const Group = animated ? AnimatedBarGroup : BarGroup;

  const barSeries = keys.map((key) => {
    const isTop = !stacked || key === lastKey;
    return (
      <Series
        key={key}
        dataKey={key}
        data={data}
        xAccessor={(d: Record<string, unknown>) =>
          horizontal ? d[key] : d[xKey]
        }
        yAccessor={(d: Record<string, unknown>) =>
          horizontal ? d[xKey] : d[key]
        }
        radius={isTop ? resolvedRadius : 0}
        radiusTop={isTop && !horizontal}
        radiusRight={isTop && horizontal}
      />
    );
  });

  return (
    <>
      <XYChart
        height={height}
        xScale={xScale ?? defaultXScale}
        yScale={yScale ?? defaultYScale}
        theme={theme}
        margin={resolvedMargin}
      >
        {xyChildren}
        {stacked ? <Stack>{barSeries}</Stack> : <Group>{barSeries}</Group>}
      </XYChart>
      {legends}
    </>
  );
}

/**
 * 막대 차트
 *
 * @remarks
 * - config 키에서 시리즈 자동 생성
 * - stacked: 누적 막대 (기본 false)
 * - horizontal: 수평 막대 (기본 false)
 * - barRadius: 모서리 둥글기
 * - Compound: Grid, XAxis, YAxis, Tooltip, Legend
 *
 * @example
 * ```tsx
 * <ChartContainer config={chartConfig}>
 *   <BarChart data={data} xKey="month" stacked>
 *     <BarChart.Grid />
 *     <BarChart.XAxis />
 *     <BarChart.YAxis />
 *     <BarChart.Tooltip />
 *   </BarChart>
 * </ChartContainer>
 * ```
 */
export const BarChart = Object.assign(BarChartRoot, {
  Grid: ChartGrid,
  XAxis: ChartXAxis,
  YAxis: ChartYAxis,
  Tooltip: ChartTooltip,
  Legend: ChartLegend,
});
