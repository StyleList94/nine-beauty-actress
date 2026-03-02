import type { ChartConfig, ResolvedChartConfig } from './types';

import { useMemo, type ComponentProps } from 'react';

import { ParentSize } from '@visx/responsive';

import { cn } from 'lib/core/utils';

import { ChartContext, type ChartContextValue } from './context';
import { chartContainer } from './style.css';

const DEFAULT_CHART_COLORS = [
  'oklch(62% 0.15 265)', // blue
  'oklch(73% 0.17 22)', // rose
  'oklch(80% 0.12 150)', // sage
  'oklch(85% 0.13 85)', // gold
  'oklch(72% 0.16 148)', // green
  'oklch(78% 0.15 350)', // pink
  'oklch(65% 0.2 295)', // purple
  'oklch(83% 0.09 250)', // sky
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
  config: ChartConfig;
};

/**
 * 차트를 감싸는 반응형 컨테이너
 *
 * @remarks
 * - ParentSize로 반응형 래핑
 * - config에서 color 미지정 시 기본 chart 팔레트 자동 할당
 * - React context로 resolved config + dimensions 전달
 */
function ChartContainer({
  config,
  className,
  children,
  ref,
  ...props
}: ChartContainerProps) {
  const resolvedConfig = useMemo(() => resolveConfig(config), [config]);

  return (
    <div
      ref={ref}
      data-slot="chart"
      className={cn(chartContainer, className)}
      {...props}
    >
      <ParentSize>
        {({ width, height }) => {
          const contextValue: ChartContextValue = {
            config: resolvedConfig,
            width,
            height,
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
