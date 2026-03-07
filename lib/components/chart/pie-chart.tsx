import { type ReactNode } from 'react';

import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';

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

type PieTooltipData = {
  name: string;
  label: string;
  color: string;
  value: number;
};

type PieLegendProps = {
  direction?: 'row' | 'column';
};

function PieLegend({ direction = 'row' }: PieLegendProps) {
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
PieLegend.__chartLegend = true as const;

export type PieChartProps = {
  data: Record<string, unknown>[];
  dataKey: string;
  nameKey: string;
  /** 0이면 파이, 0.6이면 도넛 (0~1 비율) */
  innerRadius?: number;
  padAngle?: number;
  cornerRadius?: number;
  children?: ReactNode;
};

function PieChartRoot({
  data,
  dataKey,
  nameKey,
  innerRadius = 0.6,
  padAngle = 0.02,
  cornerRadius = 4,
  children,
}: PieChartProps) {
  const { config, width, height } = useChartConfig();
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    showTooltip,
    hideTooltip,
  } = useTooltip<PieTooltipData>();

  const radius = Math.min(width, height) / 2;
  const innerR = radius * innerRadius;
  const cx = width / 2;
  const cy = height / 2;

  const configEntries = Object.entries(config);

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <Group top={cy} left={cx}>
          <Pie
            data={data}
            pieValue={(d) => Number(d[dataKey]) || 0}
            outerRadius={radius - 8}
            innerRadius={innerR}
            padAngle={padAngle}
            cornerRadius={cornerRadius}
          >
            {(pie) =>
              pie.arcs.map((arc, i) => {
                const datum = arc.data;
                const name = String(datum[nameKey]);
                const configEntry =
                  configEntries.find(([k]) => k === name)?.[1] ??
                  configEntries[i % configEntries.length]?.[1];

                return (
                  <path
                    key={name}
                    d={pie.path(arc) ?? ''}
                    fill={configEntry.color}
                    style={{
                      cursor: 'pointer',
                      transition:
                        'opacity 150ms ease, transform 150ms ease',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.opacity = '0.8';
                      el.style.filter = 'brightness(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.opacity = '1';
                      el.style.filter = 'none';
                      hideTooltip();
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
                            value: Number(datum[dataKey]) || 0,
                          },
                        });
                      }
                    }}
                  />
                );
              })
            }
          </Pie>
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
 * 파이/도넛 차트
 *
 * @remarks
 * - innerRadius: 0이면 파이, 0.6이면 도넛 (0~1 비율)
 * - padAngle: 조각 간 간격
 * - cornerRadius: 조각 모서리 둥글기
 * - Compound: Legend, Tooltip
 *
 * @example
 * ```tsx
 * <ChartContainer config={appConfig}>
 *   <PieChart data={data} dataKey="count" nameKey="app" innerRadius={0.6}>
 *     <PieChart.Legend />
 *   </PieChart>
 * </ChartContainer>
 * ```
 */
export const PieChart = Object.assign(PieChartRoot, {
  Legend: PieLegend,
});
