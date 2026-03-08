import type { CurveType } from './types';

import { useMemo } from 'react';

import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';

import { getCurveFactory } from './utils';

export type SparklineProps = {
  /** data 배열 */
  data: Record<string, unknown>[];
  /** 수치 값을 담은 data 필드명 */
  dataKey: string;
  /**
   * 선 색상
   * @defaultValue 'oklch(62% 0.15 265)' (chart blue)
   */
  color?: string;
  /**
   * 선 곡선 종류
   * @defaultValue 'monotone'
   */
  curve?: CurveType;
  /**
   * SVG 높이 (px)
   * @defaultValue 32
   */
  height?: number;
  /** SVG 너비 (px). 미지정 시 `data.length * 8` */
  width?: number;
  /**
   * 선 두께 (px)
   * @defaultValue 1.5
   */
  strokeWidth?: number;
  /** SVG에 적용할 className */
  className?: string;
  /** 접근성 레이블 */
  'aria-label'?: string;
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
  'aria-label': ariaLabel,
}: SparklineProps) {
  const curveFactory = getCurveFactory(curve);
  const width = widthProp ?? data.length * 8;

  const { xScale, yScale } = useMemo(() => {
    const values = data.map((d) => Number(d[dataKey]) || 0);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1 || 1;

    return {
      xScale: scaleLinear({
        domain: [0, data.length - 1],
        range: [0, width],
      }),
      yScale: scaleLinear({
        domain: [min - padding, max + padding],
        range: [height, 0],
      }),
    };
  }, [data, dataKey, width, height]);

  return (
    <svg
      data-slot="sparkline"
      role="img"
      aria-label={ariaLabel}
      width={width}
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
