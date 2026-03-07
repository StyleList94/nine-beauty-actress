import type { ComponentType, ReactNode } from 'react';

/**
 * 차트 데이터-시리즈 매핑 설정
 *
 * @remarks
 * - 키는 data 배열 각 항목의 필드명과 일치해야 합니다 (XY 차트)
 * - PieChart/RadialChart는 키가 nameKey 값과 매핑됩니다
 * - color 미지정 시 차트 기본 팔레트에서 자동 할당
 *
 * @example
 * ```ts
 * const config: ChartConfig = {
 *   revenue: { label: '매출', color: 'oklch(62% 0.15 265)' },
 *   cost:    { label: '비용' }, // color 자동 할당
 * };
 * ```
 */
export type ChartConfig = Record<
  string,
  {
    /** 툴팁/범례에 표시할 레이블 */
    label: string;
    /** 시리즈 색상 (미지정 시 기본 팔레트 자동 할당) */
    color?: string;
    /** 범례에 표시할 아이콘 컴포넌트 */
    icon?: ComponentType;
  }
>;

/** config에 color가 확정된 상태 (자동 할당 후) */
export type ResolvedChartConfig = Record<
  string,
  {
    label: string;
    color: string;
    icon?: ComponentType;
  }
>;

export type CurveType = 'monotone' | 'linear' | 'step';

export type ChartGridProps = {
  /** 세로 그리드 라인 표시 여부
   * @defaultValue false
   */
  columns?: boolean;
  /** 가로 그리드 라인 표시 여부
   * @defaultValue true
   */
  rows?: boolean;
  /** 그리드 틱 개수 */
  numTicks?: number;
};

export type ChartAxisProps = {
  /** 틱 값 포맷터 함수 */
  tickFormat?: (value: unknown) => string;
  /** 틱 개수 */
  numTicks?: number;
  /** 축 레이블 텍스트 */
  label?: string;
  /** 축 숨김 여부
   * @defaultValue false
   */
  hide?: boolean;
};

export type ChartTooltipProps = {
  /** 커스텀 툴팁 렌더러. 미지정 시 기본 툴팁 사용 */
  render?: (data: TooltipData) => ReactNode;
};

export type TooltipData = {
  /** config 키 */
  key: string;
  /** config label */
  label: string;
  /** 시리즈 색상 */
  color: string;
  /** 해당 키의 값 */
  value: unknown;
  /** 원본 데이터 행 */
  datum: Record<string, unknown>;
};

export type ChartLegendProps = {
  /** 범례 아이템 방향
   * @defaultValue 'row'
   */
  direction?: 'row' | 'column';
};

export type ChartOverlayProps = {
  children: (ctx: {
    xScale: unknown;
    yScale: unknown;
    width: number;
    height: number;
  }) => ReactNode;
};
