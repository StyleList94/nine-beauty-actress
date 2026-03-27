import type {
  ResolvedChartConfig,
  ChartGridProps,
  ChartAxisProps,
  ChartLegendProps,
} from './types';

import { Children, isValidElement, useMemo, type ReactNode } from 'react';

import {
  AnimatedGrid,
  Grid,
  AnimatedAxis,
  Axis,
  Tooltip as VisxTooltip,
  buildChartTheme,
} from '@visx/xychart';

import { vars } from 'lib/core/styles/theme.css';

import { useChartConfig } from './context';
import {
  chartTooltipContainer,
  chartTooltipRow,
  chartTooltipIndicator,
  chartTooltipLabel,
  chartTooltipValue,
  chartLegendContainer,
  chartLegendItem,
  chartLegendIndicator,
} from './style.css';

/** XY 차트 기본 마진 (YAxis 있을 때) */
export const xyChartMargin = {
  top: 8,
  right: 16,
  bottom: 24,
  left: 36,
} as const;

/** XY 차트 기본 마진 (YAxis 없을 때) */
export const xyChartMarginNoYAxis = {
  top: 8,
  right: 16,
  bottom: 24,
  left: 8,
} as const;

/** XY 차트 visx 테마 생성 */
export function useXYChartTheme(config: ResolvedChartConfig) {
  return useMemo(() => {
    const colors = Object.values(config).map((entry) => entry.color);
    return buildChartTheme({
      backgroundColor: 'transparent',
      colors,
      gridColor: vars.color.border,
      gridColorDark: vars.color.border,
      tickLength: 4,
      xAxisLineStyles: { stroke: vars.color.border, strokeWidth: 1 },
      yAxisLineStyles: { stroke: vars.color.border, strokeWidth: 1 },
      xTickLineStyles: { stroke: vars.color.border, strokeWidth: 1 },
      yTickLineStyles: { stroke: vars.color.border, strokeWidth: 1 },
    });
  }, [config]);
}

/** 그리드 라인 */
function ChartGrid({ columns = false, rows = true, numTicks }: ChartGridProps) {
  const { animated } = useChartConfig();
  const GridComponent = animated ? AnimatedGrid : Grid;
  return (
    <GridComponent
      columns={columns}
      rows={rows}
      numTicks={numTicks}
      lineStyle={{ strokeDasharray: '2,2', strokeOpacity: 0.5 }}
    />
  );
}

export const axisTickLabelProps = {
  fill: vars.color.mutedForeground,
  fontSize: 12,
  fontFamily: 'inherit',
} as const;

/** X축 */
function ChartXAxis({
  tickFormat,
  numTicks,
  label,
  hide = false,
}: ChartAxisProps) {
  const { animated } = useChartConfig();
  if (hide) return null;
  const AxisComponent = animated ? AnimatedAxis : Axis;
  return (
    <AxisComponent
      orientation="bottom"
      numTicks={numTicks}
      tickFormat={tickFormat as (value: unknown) => string}
      label={label}
      tickLabelProps={axisTickLabelProps}
      hideTicks
    />
  );
}

/** Y축 */
function ChartYAxis({
  tickFormat,
  numTicks,
  label,
  hide = false,
}: ChartAxisProps) {
  const { animated } = useChartConfig();
  if (hide) return null;
  const AxisComponent = animated ? AnimatedAxis : Axis;
  return (
    <AxisComponent
      orientation="left"
      numTicks={numTicks}
      tickFormat={tickFormat as (value: unknown) => string}
      label={label}
      tickLabelProps={axisTickLabelProps}
      hideTicks
    />
  );
}
ChartYAxis.__chartYAxis = true as const;

type ChartTooltipInternalProps = {
  /** 데이터 포인트에 점 표시 (라인/에리어용, 바 차트에서는 false 권장) */
  showGlyphs?: boolean;
  render?: (data: {
    key: string;
    label: string;
    color: string;
    value: unknown;
    datum: Record<string, unknown>;
  }) => ReactNode;
};

/** 툴팁 */
function ChartTooltip({ showGlyphs, render }: ChartTooltipInternalProps) {
  const { config } = useChartConfig();

  return (
    <VisxTooltip
      unstyled
      applyPositionStyle
      showVerticalCrosshair
      showSeriesGlyphs={showGlyphs ?? true}
      renderTooltip={({ tooltipData }) => {
        if (!tooltipData?.nearestDatum) return null;

        if (render) {
          const nearest = tooltipData.nearestDatum;
          const datum = nearest.datum as Record<string, unknown>;
          const entry = config[nearest.key];
          return render({
            key: nearest.key,
            label: entry.label,
            color: entry.color,
            value: datum[nearest.key],
            datum,
          });
        }

        return (
          <div className={chartTooltipContainer}>
            {Object.entries(tooltipData.datumByKey).map(([key, datumEntry]) => {
              const entry = config[key];
              const datum = datumEntry.datum as Record<string, unknown>;
              return (
                <div key={key} className={chartTooltipRow}>
                  <span
                    className={chartTooltipIndicator}
                    style={{
                      background: entry.color,
                    }}
                  />
                  <span className={chartTooltipLabel}>{entry.label}</span>
                  <span className={chartTooltipValue}>
                    {String(datum[key])}
                  </span>
                </div>
              );
            })}
          </div>
        );
      }}
    />
  );
}

/** 범례 (XYChart 외부에 렌더링) */
function ChartLegend({ direction = 'row' }: ChartLegendProps) {
  const { config } = useChartConfig();

  return (
    <div
      data-slot="chart-legend"
      className={chartLegendContainer}
      style={{ flexDirection: direction }}
    >
      {Object.entries(config).map(([key, entry]) => (
        <div key={key} className={chartLegendItem}>
          <span
            className={chartLegendIndicator}
            style={{ background: entry.color }}
          />
          <span>{entry.label}</span>
        </div>
      ))}
    </div>
  );
}
ChartLegend.__chartLegend = true as const;

export function separateChildren(children: ReactNode) {
  const legends: ReactNode[] = [];
  const xyChildren: ReactNode[] = [];
  let hasYAxis = false;

  Children.forEach(children, (child) => {
    if (isValidElement(child) && typeof child.type === 'function') {
      if ('__chartLegend' in child.type) {
        legends.push(child);
        return;
      }
      if ('__chartYAxis' in child.type) hasYAxis = true;
    }
    xyChildren.push(child);
  });

  return { legends, xyChildren, hasYAxis };
}

export { ChartGrid, ChartXAxis, ChartYAxis, ChartTooltip, ChartLegend };
