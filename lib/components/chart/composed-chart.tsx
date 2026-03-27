import type { CurveType } from './types';

import {
  Children,
  isValidElement,
  type ComponentProps,
  type ReactNode,
} from 'react';

import {
  XYChart,
  AnimatedLineSeries,
  LineSeries,
  AnimatedBarSeries,
  BarSeries,
  AnimatedAreaSeries,
  AreaSeries,
} from '@visx/xychart';

import { useChartConfig } from './context';
import { getCurveFactory } from './utils';
import {
  useXYChartTheme,
  xyChartMargin,
  xyChartMarginNoYAxis,
  ChartGrid,
  ChartXAxis,
  ChartYAxis,
  ChartTooltip,
  ChartLegend,
} from './xy-shared';

type ComposedSeriesProps = {
  /** 해당 시리즈의 data 필드명 (config 키와 일치해야 합니다) */
  dataKey: string;
  /**
   * 선 곡선 종류 (Line, Area 시리즈에 적용)
   * @defaultValue 'monotone'
   */
  curve?: CurveType;
  /**
   * 영역 채움 투명도 (Area 시리즈에 적용, 0~1)
   * @defaultValue 0.3
   */
  fillOpacity?: number;
  /**
   * 막대 상단 모서리 둥글기 (Bar 시리즈에 적용, px)
   * @defaultValue 4
   */
  barRadius?: number;
};

function ComposedLine(_props: ComposedSeriesProps) {
  return null;
}
ComposedLine.__composedType = 'line' as const;

function ComposedBar(_props: ComposedSeriesProps) {
  return null;
}
ComposedBar.__composedType = 'bar' as const;

function ComposedArea(_props: ComposedSeriesProps) {
  return null;
}
ComposedArea.__composedType = 'area' as const;

export type ComposedChartProps = {
  /** data 배열 (각 항목은 xKey + 시리즈 키를 포함해야 합니다) */
  data: Record<string, unknown>[];
  /** X축으로 사용할 data 필드명 */
  xKey: string;
  /** visx XYChart xScale 설정 (기본: band scale) */
  xScale?: ComponentProps<typeof XYChart>['xScale'];
  /** visx XYChart yScale 설정 (기본: linear scale) */
  yScale?: ComponentProps<typeof XYChart>['yScale'];
  /** 차트 내부 여백 (기본: YAxis 유무에 따라 자동 결정) */
  margin?: ComponentProps<typeof XYChart>['margin'];
  children?: ReactNode;
};

// ComposedChart는 seriesMarkers 버킷이 추가로 필요해 xy-shared의 separateChildren을 재사용할 수 없습니다.
function separateChildren(children: ReactNode) {
  const legends: ReactNode[] = [];
  const seriesMarkers: {
    type: 'line' | 'bar' | 'area';
    props: ComposedSeriesProps;
  }[] = [];
  const xyChildren: ReactNode[] = [];
  let hasYAxis = false;

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;

    if (typeof child.type === 'function' && '__chartLegend' in child.type) {
      legends.push(child);
    } else if (
      typeof child.type === 'function' &&
      '__composedType' in child.type
    ) {
      seriesMarkers.push({
        type: child.type.__composedType as 'line' | 'bar' | 'area',
        props: child.props as ComposedSeriesProps,
      });
    } else {
      if (typeof child.type === 'function' && '__chartYAxis' in child.type)
        hasYAxis = true;

      xyChildren.push(child);
    }
  });

  return { legends, seriesMarkers, xyChildren, hasYAxis };
}

function ComposedChartRoot({
  data,
  xKey,
  xScale = { type: 'band', paddingInner: 0.3, paddingOuter: 0.15 },
  yScale = { type: 'linear' },
  margin,
  children,
}: ComposedChartProps) {
  const { config, height, animated } = useChartConfig();
  const theme = useXYChartTheme(config);
  const { legends, seriesMarkers, xyChildren, hasYAxis } =
    separateChildren(children);
  const resolvedMargin =
    margin ?? (hasYAxis ? xyChartMargin : xyChartMarginNoYAxis);

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
        {seriesMarkers.map(({ type, props }) => {
          const {
            dataKey,
            curve = 'monotone',
            fillOpacity = 0.3,
            barRadius,
          } = props;
          const curveFactory = getCurveFactory(curve);
          const accessors = {
            xAccessor: (d: Record<string, unknown>) => d[xKey],
            yAccessor: (d: Record<string, unknown>) => d[dataKey],
          };

          switch (type) {
            case 'line': {
              const LineComp = animated ? AnimatedLineSeries : LineSeries;
              return (
                <LineComp
                  key={dataKey}
                  dataKey={dataKey}
                  data={data}
                  curve={curveFactory}
                  {...accessors}
                />
              );
            }
            case 'bar': {
              const BarComp = animated ? AnimatedBarSeries : BarSeries;
              return (
                <BarComp
                  key={dataKey}
                  dataKey={dataKey}
                  data={data}
                  radius={barRadius ?? 4}
                  radiusTop
                  {...accessors}
                />
              );
            }
            case 'area': {
              const AreaComp = animated ? AnimatedAreaSeries : AreaSeries;
              return (
                <AreaComp
                  key={dataKey}
                  dataKey={dataKey}
                  data={data}
                  fillOpacity={fillOpacity}
                  curve={curveFactory}
                  {...accessors}
                />
              );
            }
            default:
              return null;
          }
        })}
      </XYChart>
      {legends}
    </>
  );
}

/**
 * 혼합 차트
 *
 * @remarks
 * - 시리즈 타입을 명시적으로 지정 (Line, Bar, Area)
 * - config에서 색상/라벨 읽음
 * - Compound: Line, Bar, Area, Grid, XAxis, YAxis, Tooltip, Legend
 *
 * @example
 * ```tsx
 * <ChartContainer config={composedConfig}>
 *   <ComposedChart data={data} xKey="month">
 *     <ComposedChart.Bar dataKey="revenue" />
 *     <ComposedChart.Line dataKey="trend" />
 *     <ComposedChart.Grid />
 *     <ComposedChart.XAxis />
 *     <ComposedChart.Tooltip />
 *   </ComposedChart>
 * </ChartContainer>
 * ```
 */
export const ComposedChart = Object.assign(ComposedChartRoot, {
  Line: ComposedLine,
  Bar: ComposedBar,
  Area: ComposedArea,
  Grid: ChartGrid,
  XAxis: ChartXAxis,
  YAxis: ChartYAxis,
  Tooltip: ChartTooltip,
  Legend: ChartLegend,
});
