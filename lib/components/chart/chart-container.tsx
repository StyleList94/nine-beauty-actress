import type { ChartConfig, ResolvedChartConfig } from './types';

import { useMemo, type ComponentProps } from 'react';

import { ParentSize } from '@visx/responsive';

import { cn } from 'lib/core/utils';

import { ChartContext, type ChartContextValue } from './context';
import { chartContainer } from './style.css';

const DEFAULT_CHART_COLORS = [
  'oklch(58% 0.215 258)', // blue    #0072f5
  'oklch(58% 0.204 25)',  // red     #d93036
  'oklch(78% 0.158 145)', // green
  'oklch(82% 0.164 76)',  // amber   #ffb224
  'oklch(70% 0.178 310)', // purple  #bf7af0
  'oklch(69% 0.190 4)',   // pink    #f75f8f
  'oklch(75% 0.132 183)', // teal    #0ac7b4
  'oklch(72% 0.152 251)', // sky     #52a8ff
];

function resolveConfig(config: ChartConfig): ResolvedChartConfig {
  const keys = Object.keys(config);
  const resolved: ResolvedChartConfig = {};

  keys.forEach((key, index) => {
    const entry = config[key];
    resolved[key] = {
      ...entry,
      color:
        entry.color ?? DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length],
    };
  });

  return resolved;
}

export type ChartContainerProps = ComponentProps<'div'> & {
  /**
   * 차트 데이터-시리즈 매핑 설정. 키는 data의 필드명과 일치해야 합니다.
   * @see {@link ChartConfig}
   */
  config: ChartConfig;
  /**
   * 컨테이너 높이 (px). `style={{ height: N }}`으로도 오버라이드 가능
   * @defaultValue 300
   */
  height?: number;
  /**
   * false 시 non-animated 시리즈 사용.
   * config.color에 CSS 변수(vars.color.*)를 사용할 때 필요합니다 (다크모드 자동 대응).
   * @defaultValue true
   */
  animated?: boolean;
};

/**
 * 차트를 감싸는 반응형 컨테이너
 *
 * @remarks
 * - ParentSize로 반응형 래핑 (부모 크기 자동 감지)
 * - 기본 높이 300px. `height` prop으로 변경 가능
 * - config에서 color 미지정 시 기본 chart 팔레트 자동 할당
 * - React context로 resolved config + dimensions 전달
 *
 * @example
 * ```tsx
 * const config: ChartConfig = {
 *   revenue: { label: '매출' },
 *   cost: { label: '비용', color: 'oklch(73% 0.17 22)' },
 * };
 *
 * <ChartContainer config={config}>
 *   <LineChart data={data} xKey="month">
 *     <LineChart.Grid />
 *     <LineChart.XAxis />
 *     <LineChart.Tooltip />
 *   </LineChart>
 * </ChartContainer>
 *
 * // 높이 변경
 * <ChartContainer config={config} height={500}>
 *   <LineChart data={data} xKey="month" />
 * </ChartContainer>
 * ```
 */
function ChartContainer({
  config,
  height = 300,
  animated = true,
  className,
  style,
  children,
  ref,
  ...props
}: ChartContainerProps) {
  const resolvedConfig = useMemo(() => resolveConfig(config), [config]);

  return (
    <div
      ref={ref}
      data-slot="chart"
      role="img"
      className={cn(chartContainer, className)}
      style={{ height, ...style }}
      {...props}
    >
      <ParentSize>
        {({ width, height: measuredHeight }) => {
          const contextValue: ChartContextValue = {
            config: resolvedConfig,
            width,
            height: measuredHeight,
            animated,
          };

          return (
            <ChartContext value={contextValue}>{children}</ChartContext>
          );
        }}
      </ParentSize>
    </div>
  );
}

export { ChartContainer, resolveConfig, DEFAULT_CHART_COLORS };
