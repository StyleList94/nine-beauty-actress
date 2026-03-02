import { type ReactNode } from 'react';

import { Arc } from '@visx/shape';
import { Group } from '@visx/group';
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';

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

type RadialTooltipData = {
  name: string;
  label: string;
  color: string;
  value: number;
};

function RadialTooltip() {
  return null;
}
RadialTooltip.__radialTooltip = true as const;

type RadialLegendProps = {
  direction?: 'row' | 'column';
};

function RadialLegend({ direction = 'row' }: RadialLegendProps) {
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
RadialLegend.__chartLegend = true as const;

export type RadialChartProps = {
  data: Record<string, unknown>[];
  dataKey: string;
  nameKey: string;
  maxValue?: number;
  thickness?: number;
  children?: ReactNode;
};

function RadialChartRoot({
  data,
  dataKey,
  nameKey,
  maxValue = 100,
  thickness = 16,
  children,
}: RadialChartProps) {
  const { config, width, height } = useChartConfig();
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    showTooltip,
    hideTooltip,
  } = useTooltip<RadialTooltipData>();
  const configEntries = Object.entries(config);

  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 2 - 8;
  const gap = 4;

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <Group top={centerY} left={centerX}>
          {data.map((d, i) => {
            const name = String(d[nameKey]);
            const value = Number(d[dataKey]) || 0;
            const ratio = Math.min(value / maxValue, 1);
            const configEntry =
              configEntries.find(([k]) => k === name)?.[1] ??
              configEntries[i % configEntries.length]?.[1];

            const outerR = maxRadius - i * (thickness + gap);
            const innerR = outerR - thickness;

            if (innerR < 0) return null;

            const endAngle = ratio * Math.PI * 2;

            return (
              <g
                key={name}
                style={{
                  transition: 'opacity 150ms ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.opacity = '0.85';
                  el.style.filter = 'brightness(1.1)';
                }}
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
                        name,
                        label: configEntry.label,
                        color: configEntry.color,
                        value,
                      },
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.opacity = '1';
                  el.style.filter = 'none';
                  hideTooltip();
                }}
              >
                {/* Background track */}
                <Arc
                  startAngle={0}
                  endAngle={Math.PI * 2}
                  outerRadius={outerR}
                  innerRadius={innerR}
                  fill={vars.color.muted}
                  opacity={0.3}
                />
                {/* Value arc */}
                <Arc
                  startAngle={0}
                  endAngle={endAngle}
                  outerRadius={outerR}
                  innerRadius={innerR}
                  fill={configEntry.color}
                  cornerRadius={thickness / 2}
                />
              </g>
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
            <div className={chartTooltipRow}>
              <span
                className={chartTooltipIndicator}
                style={{ background: tooltipData.color }}
              />
              <span className={chartTooltipLabel}>
                {tooltipData.label}
              </span>
              <span className={chartTooltipValue}>
                {tooltipData.value}
              </span>
            </div>
          </div>
        </TooltipWithBounds>
      )}

      {children}
    </div>
  );
}

/**
 * 방사형(원형 프로그레스) 차트
 *
 * @remarks
 * - 동심원 링으로 각 데이터 항목의 진행률 표시
 * - maxValue: 최대값 (기본 100)
 * - thickness: 링 두께 (기본 16)
 * - Compound: Legend, Tooltip
 *
 * @example
 * ```tsx
 * <ChartContainer config={kpiConfig}>
 *   <RadialChart data={kpiData} dataKey="usage" nameKey="metric" maxValue={100}>
 *     <RadialChart.Legend />
 *   </RadialChart>
 * </ChartContainer>
 * ```
 */
export const RadialChart = Object.assign(RadialChartRoot, {
  Legend: RadialLegend,
  Tooltip: RadialTooltip,
});
