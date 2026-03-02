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
  AnimatedBarSeries,
  AnimatedAreaSeries,
} from '@visx/xychart';

import { useChartConfig } from './context';
import { getCurveFactory } from './utils';
import {
  useXYChartTheme,
  xyChartMargin,
  ChartGrid,
  ChartXAxis,
  ChartYAxis,
  ChartTooltip,
  ChartLegend,
} from './xy-shared';

type ComposedSeriesProps = {
  dataKey: string;
  curve?: CurveType;
  fillOpacity?: number;
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
  data: Record<string, unknown>[];
  xKey: string;
  xScale?: ComponentProps<typeof XYChart>['xScale'];
  yScale?: ComponentProps<typeof XYChart>['yScale'];
  margin?: ComponentProps<typeof XYChart>['margin'];
  children?: ReactNode;
};

function separateChildren(children: ReactNode) {
  const legends: ReactNode[] = [];
  const seriesMarkers: {
    type: 'line' | 'bar' | 'area';
    props: ComposedSeriesProps;
  }[] = [];
  const xyChildren: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;

    if (
      typeof child.type === 'function' &&
      '__chartLegend' in child.type
    ) {
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
      xyChildren.push(child);
    }
  });

  return { legends, seriesMarkers, xyChildren };
}

function ComposedChartRoot({
  data,
  xKey,
  xScale = { type: 'band', paddingInner: 0.3, paddingOuter: 0.15 },
  yScale = { type: 'linear' },
  margin = xyChartMargin,
  children,
}: ComposedChartProps) {
  const { config, height } = useChartConfig();
  const theme = useXYChartTheme(config);
  const { legends, seriesMarkers, xyChildren } = separateChildren(children);

  return (
    <>
      <XYChart
        height={height || 300}
        xScale={xScale}
        yScale={yScale}
        theme={theme}
        margin={margin}
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
            case 'line':
              return (
                <AnimatedLineSeries
                  key={dataKey}
                  dataKey={dataKey}
                  data={data}
                  curve={curveFactory}
                  {...accessors}
                />
              );
            case 'bar':
              return (
                <AnimatedBarSeries
                  key={dataKey}
                  dataKey={dataKey}
                  data={data}
                  radius={barRadius ?? 4}
                  radiusTop
                  {...accessors}
                />
              );
            case 'area':
              return (
                <AnimatedAreaSeries
                  key={dataKey}
                  dataKey={dataKey}
                  data={data}
                  fillOpacity={fillOpacity}
                  curve={curveFactory}
                  {...accessors}
                />
              );
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
