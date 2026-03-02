import { type ReactNode } from 'react';

import { Text } from '@visx/text';
import { Group } from '@visx/group';
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';

import { vars } from 'lib/core/styles/theme.css';

import { useChartConfig } from './context';
import {
  generatePolygonPoints,
  pointsToPath,
  polarToCartesian,
  valueToRadius,
} from './utils';
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

type RadarTooltipData = {
  axis: string;
  entries: { key: string; label: string; color: string; value: number }[];
};

type RadarGridProps = {
  levels?: number;
};

function RadarGrid(_props: RadarGridProps) {
  return null;
}
RadarGrid.__radarGrid = true as const;

type RadarLegendProps = {
  direction?: 'row' | 'column';
};

function RadarLegend({ direction = 'row' }: RadarLegendProps) {
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
RadarLegend.__chartLegend = true as const;

function RadarTooltip() {
  return null;
}
RadarTooltip.__radarTooltip = true as const;

export type RadarChartProps = {
  data: Record<string, unknown>[];
  axisKey: string;
  maxValue?: number;
  fillOpacity?: number;
  levels?: number;
  children?: ReactNode;
};

function RadarChartRoot({
  data,
  axisKey,
  maxValue: maxValueProp,
  fillOpacity = 0.25,
  levels = 5,
  children,
}: RadarChartProps) {
  const { config, width, height } = useChartConfig();
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    showTooltip,
    hideTooltip,
  } = useTooltip<RadarTooltipData>();

  const keys = Object.keys(config);
  const sides = data.length;
  const radius = Math.min(width, height) / 2 - 40;
  const cx = width / 2;
  const cy = height / 2;

  const maxValue =
    maxValueProp ??
    Math.max(
      ...data.flatMap((d) =>
        keys.map((k) => Number(d[k]) || 0),
      ),
    );

  const angleStep = 360 / sides;

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <Group top={cy} left={cx}>
          {/* Grid rings */}
          {Array.from({ length: levels }, (_, i) => {
            const r = (radius / levels) * (i + 1);
            const points = generatePolygonPoints(0, 0, r, sides);
            return (
              <path
                key={`grid-${i}`}
                d={pointsToPath(points)}
                fill="none"
                stroke={vars.color.border}
                strokeOpacity={0.5}
              />
            );
          })}

          {/* Axis lines */}
          {data.map((_, i) => {
            const point = polarToCartesian(0, 0, radius, angleStep * i);
            return (
              <line
                key={`axis-${i}`}
                x1={0}
                y1={0}
                x2={point.x}
                y2={point.y}
                stroke={vars.color.border}
                strokeOpacity={0.4}
              />
            );
          })}

          {/* Series polygons */}
          {keys.map((key) => {
            const entry = config[key];
            const points = data.map((d, i) => {
              const value = Number(d[key]) || 0;
              const r = valueToRadius(value, maxValue, radius);
              return polarToCartesian(0, 0, r, angleStep * i);
            });

            return (
              <path
                key={key}
                d={pointsToPath(points)}
                fill={entry.color}
                fillOpacity={fillOpacity}
                stroke={entry.color}
                strokeWidth={2}
                style={{ transition: 'd 300ms ease' }}
              />
            );
          })}

          {/* Axis labels */}
          {data.map((d, i) => {
            const point = polarToCartesian(0, 0, radius + 20, angleStep * i);
            const label = String(d[axisKey]);
            return (
              <Text
                key={`label-${i}`}
                x={point.x}
                y={point.y}
                textAnchor="middle"
                verticalAnchor="middle"
                fill={vars.color.mutedForeground}
                fontSize={12}
                pointerEvents="none"
              >
                {label}
              </Text>
            );
          })}

          {/* Sector hit areas for smooth tooltip tracking */}
          {data.map((d, i) => {
            const startAngle = angleStep * i - angleStep / 2;
            const endAngle = angleStep * i + angleStep / 2;
            const outerR = radius + 20;
            const segments = 8;
            const arcPoints = Array.from(
              { length: segments + 1 },
              (_, s) => {
                const angle =
                  startAngle +
                  (endAngle - startAngle) * (s / segments);
                return polarToCartesian(0, 0, outerR, angle);
              },
            );
            const sectorPath = `M 0 0 ${arcPoints.map((p) => `L ${p.x} ${p.y}`).join(' ')} Z`;

            return (
              <path
                key={`sector-${i}`}
                d={sectorPath}
                fill="transparent"
                onMouseMove={(event) => {
                  const svgEl =
                    event.currentTarget.ownerSVGElement;
                  if (!svgEl) return;
                  const coords = localPoint(svgEl, event);
                  if (coords) {
                    showTooltip({
                      tooltipLeft: coords.x,
                      tooltipTop: coords.y,
                      tooltipData: {
                        axis: String(d[axisKey]),
                        entries: keys.map((key) => ({
                          key,
                          label: config[key].label,
                          color: config[key].color,
                          value: Number(d[key]) || 0,
                        })),
                      },
                    });
                  }
                }}
                onMouseLeave={hideTooltip}
                style={{ cursor: 'pointer' }}
              />
            );
          })}
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
            <div
              style={{
                fontWeight: 500,
                marginBottom: '4px',
              }}
            >
              {tooltipData.axis}
            </div>
            {tooltipData.entries.map((entry) => (
              <div key={entry.key} className={chartTooltipRow}>
                <span
                  className={chartTooltipIndicator}
                  style={{ background: entry.color }}
                />
                <span className={chartTooltipLabel}>{entry.label}</span>
                <span className={chartTooltipValue}>{entry.value}</span>
              </div>
            ))}
          </div>
        </TooltipWithBounds>
      )}

      {children}
    </div>
  );
}

/**
 * 레이더(스파이더) 차트
 *
 * @remarks
 * - 극좌표계 다각형 기반 차트
 * - axisKey: 극좌표 축 데이터 키
 * - levels: 그리드 링 수 (기본 5)
 * - fillOpacity: 영역 투명도 (기본 0.25)
 * - Compound: Grid, Legend, Tooltip
 *
 * @example
 * ```tsx
 * <ChartContainer config={skillConfig}>
 *   <RadarChart data={skillData} axisKey="skill">
 *     <RadarChart.Grid />
 *     <RadarChart.Legend />
 *   </RadarChart>
 * </ChartContainer>
 * ```
 */
export const RadarChart = Object.assign(RadarChartRoot, {
  Grid: RadarGrid,
  Legend: RadarLegend,
  Tooltip: RadarTooltip,
});
