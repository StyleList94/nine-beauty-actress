import type { CurveType } from './types';

import { useMemo } from 'react';

import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';

import { getCurveFactory } from './utils';

export type SparklineProps = {
  data: Record<string, unknown>[];
  dataKey: string;
  color?: string;
  curve?: CurveType;
  height?: number;
  width?: number;
  strokeWidth?: number;
  className?: string;
};

/**
 * 미니 인라인 차트
 *
 * @remarks
 * - ChartContainer 불필요 (standalone)
 * - 축/그리드/범례 없음
 * - color: 단색 (기본 chart.blue)
 * - height: 기본 32px
 * - curve: monotone 기본
 *
 * @example
 * ```tsx
 * <Sparkline data={miniData} dataKey="value" height={32} />
 * ```
 */
export function Sparkline({
  data,
  dataKey,
  color = 'oklch(62% 0.15 265)',
  curve = 'monotone',
  height = 32,
  width: widthProp,
  strokeWidth = 1.5,
  className,
}: SparklineProps) {
  const curveFactory = getCurveFactory(curve);
  const w = widthProp ?? data.length * 8;

  const { xScale, yScale } = useMemo(() => {
    const values = data.map((d) => Number(d[dataKey]) || 0);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1 || 1;

    return {
      xScale: scaleLinear({
        domain: [0, data.length - 1],
        range: [0, w],
      }),
      yScale: scaleLinear({
        domain: [min - padding, max + padding],
        range: [height, 0],
      }),
    };
  }, [data, dataKey, w, height]);

  return (
    <svg
      data-slot="sparkline"
      width={w}
      height={height}
      className={className}
    >
      <LinePath
        data={data}
        x={(_, i) => xScale(i)}
        y={(d) => yScale(Number(d[dataKey]) || 0)}
        stroke={color}
        strokeWidth={strokeWidth}
        curve={curveFactory}
      />
    </svg>
  );
}
