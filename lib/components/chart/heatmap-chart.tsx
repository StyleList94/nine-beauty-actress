import { useMemo } from 'react';

import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';

import { vars } from 'lib/core/styles/theme.css';

import { useChartConfig } from './context';
import {
  chartTooltipContainer,
  chartTooltipRow,
  chartTooltipLabel,
  chartTooltipValue,
} from './style.css';

type HeatmapTooltipData = {
  x: string;
  y: string;
  value: number;
};

function HeatmapXAxis() {
  return null;
}
HeatmapXAxis.__heatmapAxis = 'x' as const;

function HeatmapYAxis() {
  return null;
}
HeatmapYAxis.__heatmapAxis = 'y' as const;

function HeatmapTooltip() {
  return null;
}
HeatmapTooltip.__heatmapTooltip = true as const;

export type HeatmapChartProps = {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  valueKey: string;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const GAP = 2;

function HeatmapChartRoot({
  data,
  xKey,
  yKey,
  valueKey,
  margin = { top: 10, right: 10, bottom: 40, left: 60 },
}: HeatmapChartProps) {
  const { config, width, height } = useChartConfig();
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    showTooltip,
    hideTooltip,
  } = useTooltip<HeatmapTooltipData>();

  const configEntry = Object.values(config)[0];
  const baseColor = configEntry.color;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const { cells, xScale, yScale } = useMemo(() => {
    const xVals = [...new Set(data.map((d) => String(d[xKey])))];
    const yVals = [...new Set(data.map((d) => String(d[yKey])))];
    const max = Math.max(
      ...data.map((d) => Number(d[valueKey]) || 0),
    );

    const xS = scaleBand({
      domain: xVals,
      range: [0, innerWidth],
      padding: 0.05,
    });
    const yS = scaleBand({
      domain: yVals,
      range: [0, innerHeight],
      padding: 0.05,
    });

    const colorS = scaleLinear({
      domain: [0, max],
      range: [0.08, 1],
    });

    const cellData = data.map((d) => {
      const xVal = String(d[xKey]);
      const yVal = String(d[yKey]);
      const value = Number(d[valueKey]) || 0;
      return {
        x: xS(xVal) ?? 0,
        y: yS(yVal) ?? 0,
        width: Math.max(xS.bandwidth() - GAP, 0),
        height: Math.max(yS.bandwidth() - GAP, 0),
        xVal,
        yVal,
        value,
        opacity: value === 0 ? 0.04 : colorS(value),
      };
    });

    return { cells: cellData, xScale: xS, yScale: yS };
  }, [data, xKey, yKey, valueKey, innerWidth, innerHeight]);

  const axisTickLabelProps = {
    fill: vars.color.mutedForeground,
    fontSize: 12,
    fontFamily: 'inherit',
  } as const;

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left}>
          {cells.map((cell) => (
            <rect
              key={`${cell.xVal}-${cell.yVal}`}
              x={cell.x}
              y={cell.y}
              width={cell.width}
              height={cell.height}
              fill={baseColor}
              opacity={cell.opacity}
              rx={3}
              onMouseMove={(event) => {
                const svgEl = event.currentTarget.ownerSVGElement;
                if (!svgEl) return;
                const coords = localPoint(svgEl, event);
                if (coords) {
                  showTooltip({
                    tooltipLeft: coords.x,
                    tooltipTop: coords.y,
                    tooltipData: {
                      x: cell.xVal,
                      y: cell.yVal,
                      value: cell.value,
                    },
                  });
                }
              }}
              onMouseLeave={hideTooltip}
              style={{
                cursor: 'pointer',
                transition: 'opacity 150ms ease',
              }}
            />
          ))}

          <AxisBottom
            top={innerHeight}
            scale={xScale}
            stroke={vars.color.border}
            hideTicks
            tickLabelProps={axisTickLabelProps}
          />
          <AxisLeft
            scale={yScale}
            stroke={vars.color.border}
            hideTicks
            tickLabelProps={axisTickLabelProps}
          />
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          unstyled
          applyPositionStyle
        >
          <div className={chartTooltipContainer}>
            <div className={chartTooltipRow}>
              <span className={chartTooltipLabel}>
                {tooltipData.y} {tooltipData.x}
              </span>
              <span className={chartTooltipValue}>
                {tooltipData.value}
              </span>
            </div>
          </div>
        </TooltipWithBounds>
      )}
    </div>
  );
}

/**
 * 히트맵 차트
 *
 * @remarks
 * - xKey, yKey, valueKey: 3차원 데이터 매핑
 * - 색상 그라데이션: config color 기반 (투명 → 진함)
 * - Compound: XAxis, YAxis, Tooltip
 *
 * @example
 * ```tsx
 * <ChartContainer config={heatConfig}>
 *   <Heatmap data={heatmapData} xKey="hour" yKey="day" valueKey="count">
 *     <Heatmap.XAxis />
 *     <Heatmap.YAxis />
 *     <Heatmap.Tooltip />
 *   </Heatmap>
 * </ChartContainer>
 * ```
 */
export const Heatmap = Object.assign(HeatmapChartRoot, {
  XAxis: HeatmapXAxis,
  YAxis: HeatmapYAxis,
  Tooltip: HeatmapTooltip,
});
