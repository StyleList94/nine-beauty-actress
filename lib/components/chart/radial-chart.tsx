import { type ReactNode } from 'react';

import { Arc } from '@visx/shape';
import { Group } from '@visx/group';
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';

import { vars } from 'lib/core/styles/theme.css';

import { useChartConfig } from './context';
import { ChartLegend } from './xy-shared';
import {
  chartTooltipContainer,
  chartTooltipRow,
  chartTooltipIndicator,
  chartTooltipLabel,
  chartTooltipValue,
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

export type RadialChartProps = {
  /** data 배열 (각 항목이 하나의 동심원 링으로 표시됩니다) */
  data: Record<string, unknown>[];
  /** 각 항목의 수치 값을 담은 data 필드명 */
  dataKey: string;
  /** 각 항목의 이름을 담은 data 필드명 (config 키와 매핑됩니다) */
  nameKey: string;
  /**
   * 100% 기준 최대값
   * @defaultValue 100
   */
  maxValue?: number;
  /**
   * 링 두께 (px)
   * @defaultValue 16
   */
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

            const outerRadius = maxRadius - i * (thickness + gap);
            const innerRadius = outerRadius - thickness;

            if (innerRadius < 0) return null;

            const endAngle = ratio * Math.PI * 2;

            return (
              <g
                key={name}
                style={{
                  transition: 'opacity 150ms ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const element = e.currentTarget;
                  element.style.opacity = '0.85';
                  element.style.filter = 'brightness(1.1)';
                }}
                onMouseMove={(event) => {
                  const svgElement = event.currentTarget.ownerSVGElement;
                  if (!svgElement) return;
                  const coords = localPoint(svgElement, event);
                  if (coords)
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
                }}
                onMouseLeave={(e) => {
                  const element = e.currentTarget;
                  element.style.opacity = '1';
                  element.style.filter = 'none';
                  hideTooltip();
                }}
              >
                {/* Background track */}
                <Arc
                  startAngle={0}
                  endAngle={Math.PI * 2}
                  outerRadius={outerRadius}
                  innerRadius={innerRadius}
                  fill={vars.color.muted}
                  opacity={0.3}
                />
                {/* Value arc */}
                <Arc
                  startAngle={0}
                  endAngle={endAngle}
                  outerRadius={outerRadius}
                  innerRadius={innerRadius}
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
              <span className={chartTooltipLabel}>{tooltipData.label}</span>
              <span className={chartTooltipValue}>{tooltipData.value}</span>
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
 *     <RadialChart.Tooltip />
 *     <RadialChart.Legend />
 *   </RadialChart>
 * </ChartContainer>
 * ```
 */
export const RadialChart = Object.assign(RadialChartRoot, {
  Legend: ChartLegend,
  Tooltip: RadialTooltip,
});
