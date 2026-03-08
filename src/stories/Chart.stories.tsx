import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ChartConfig } from 'lib/components/chart';

import {
  ChartContainer,
  LineChart,
  BarChart,
  AreaChart,
  ComposedChart,
  PieChart,
  RadarChart,
  RadialChart,
  Sparkline,
  Heatmap,
} from 'lib/components/chart';
import { vars } from 'lib/core/styles/theme.css';

const meta: Meta = {
  title: 'UI/Chart',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'visx 기반 차트 컴포넌트 모음. ChartContainer로 감싸서 config를 제공하고, 각 차트의 sub-component로 Grid, Axis, Tooltip, Legend를 선언합니다.',
      },
    },
  },
};

export default meta;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

// --- Mock Data ---

const latencyData = [
  { timestamp: '00:00', p50: 45, p95: 120, p99: 250 },
  { timestamp: '04:00', p50: 42, p95: 110, p99: 230 },
  { timestamp: '08:00', p50: 65, p95: 180, p99: 380 },
  { timestamp: '12:00', p50: 78, p95: 200, p99: 420 },
  { timestamp: '16:00', p50: 72, p95: 190, p99: 400 },
  { timestamp: '20:00', p50: 55, p95: 140, p99: 300 },
];

const statusData = [
  { hour: '00:00', success: 120, error: 45, redirect: 60 },
  { hour: '04:00', success: 80, error: 30, redirect: 40 },
  { hour: '08:00', success: 280, error: 90, redirect: 120 },
  { hour: '12:00', success: 320, error: 110, redirect: 150 },
  { hour: '16:00', success: 300, error: 95, redirect: 130 },
  { hour: '20:00', success: 160, error: 55, redirect: 75 },
];

const trafficData = [
  { timestamp: '00:00', incoming: 500, outgoing: 320 },
  { timestamp: '04:00', incoming: 350, outgoing: 200 },
  { timestamp: '08:00', incoming: 1200, outgoing: 800 },
  { timestamp: '12:00', incoming: 1500, outgoing: 1100 },
  { timestamp: '16:00', incoming: 1300, outgoing: 900 },
  { timestamp: '20:00', incoming: 800, outgoing: 550 },
];

const appData = [
  { app: 'web', count: 450 },
  { app: 'api', count: 320 },
  { app: 'admin', count: 130 },
  { app: 'worker', count: 80 },
];

const skillData = [
  { skill: 'Latency', frontend: 85, backend: 70 },
  { skill: 'Throughput', frontend: 65, backend: 90 },
  { skill: 'Uptime', frontend: 95, backend: 98 },
  { skill: 'Errors', frontend: 20, backend: 15 },
  { skill: 'Cache Hit', frontend: 75, backend: 60 },
];

const kpiData = [
  { metric: 'cpu', usage: 72 },
  { metric: 'memory', usage: 85 },
  { metric: 'disk', usage: 45 },
];

const miniData = [
  { value: 10 },
  { value: 15 },
  { value: 12 },
  { value: 18 },
  { value: 14 },
  { value: 22 },
  { value: 19 },
  { value: 25 },
  { value: 20 },
  { value: 28 },
];

const heatmapData = [
  { hour: '00', day: 'Mon', count: 12 },
  { hour: '06', day: 'Mon', count: 45 },
  { hour: '12', day: 'Mon', count: 89 },
  { hour: '18', day: 'Mon', count: 67 },
  { hour: '00', day: 'Tue', count: 15 },
  { hour: '06', day: 'Tue', count: 52 },
  { hour: '12', day: 'Tue', count: 95 },
  { hour: '18', day: 'Tue', count: 73 },
  { hour: '00', day: 'Wed', count: 8 },
  { hour: '06', day: 'Wed', count: 38 },
  { hour: '12', day: 'Wed', count: 78 },
  { hour: '18', day: 'Wed', count: 55 },
  { hour: '00', day: 'Thu', count: 10 },
  { hour: '06', day: 'Thu', count: 42 },
  { hour: '12', day: 'Thu', count: 85 },
  { hour: '18', day: 'Thu', count: 62 },
  { hour: '00', day: 'Fri', count: 18 },
  { hour: '06', day: 'Fri', count: 55 },
  { hour: '12', day: 'Fri', count: 92 },
  { hour: '18', day: 'Fri', count: 48 },
];

// --- Configs ---

const latencyConfig: ChartConfig = {
  p50: { label: 'p50' },
  p95: { label: 'p95' },
  p99: { label: 'p99' },
};

const statusConfig: ChartConfig = {
  success: { label: 'Success' },
  error: { label: 'Error' },
  redirect: { label: 'Redirect' },
};

const trafficConfig: ChartConfig = {
  incoming: { label: 'Incoming' },
  outgoing: { label: 'Outgoing' },
};

const appConfig: ChartConfig = {
  web: { label: 'Web App' },
  api: { label: 'API Server' },
  admin: { label: 'Admin' },
  worker: { label: 'Worker' },
};

const skillConfig: ChartConfig = {
  frontend: { label: 'Frontend' },
  backend: { label: 'Backend' },
};

const kpiConfig: ChartConfig = {
  cpu: { label: 'CPU' },
  memory: { label: 'Memory' },
  disk: { label: 'Disk' },
};

const composedConfig: ChartConfig = {
  success: { label: 'Requests' },
  error: { label: 'Error Trend' },
};

const heatConfig: ChartConfig = {
  count: { label: 'Request Count' },
};

// --- Stories ---

export const Line: StoryObj = {
  ...noControls('시계열 데이터에 적합한 선형 차트'),
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={latencyConfig}>
        <LineChart data={latencyData} xKey="timestamp">
          <LineChart.Grid />
          <LineChart.XAxis />
          <LineChart.YAxis />
          <LineChart.Tooltip />
          <LineChart.Legend />
        </LineChart>
      </ChartContainer>
    </div>
  ),
};

export const Bar: StoryObj = {
  ...noControls('카테고리 비교에 적합한 막대 차트'),
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={statusConfig}>
        <BarChart data={statusData} xKey="hour">
          <BarChart.Grid />
          <BarChart.XAxis />
          <BarChart.Tooltip showGlyphs={false} />
          <BarChart.Legend />
        </BarChart>
      </ChartContainer>
    </div>
  ),
};

export const StackedBar: StoryObj = {
  ...noControls('누적 막대 차트'),
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={statusConfig}>
        <BarChart data={statusData} xKey="hour" stacked>
          <BarChart.Grid />
          <BarChart.XAxis />
          <BarChart.Tooltip showGlyphs={false} />
          <BarChart.Legend />
        </BarChart>
      </ChartContainer>
    </div>
  ),
};

export const HorizontalBar: StoryObj = {
  ...noControls('horizontal=true로 수평 막대 차트'),
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={statusConfig}>
        <BarChart data={statusData} xKey="hour" horizontal>
          <BarChart.Grid />
          <BarChart.YAxis />
          <BarChart.Tooltip showGlyphs={false} />
          <BarChart.Legend />
        </BarChart>
      </ChartContainer>
    </div>
  ),
};

export const Area: StoryObj = {
  ...noControls('트래픽 흐름 시각화에 적합한 영역 차트'),
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={trafficConfig}>
        <AreaChart data={trafficData} xKey="timestamp" fillOpacity={0.3}>
          <AreaChart.Grid />
          <AreaChart.XAxis />
          <AreaChart.Tooltip />
          <AreaChart.Legend />
        </AreaChart>
      </ChartContainer>
    </div>
  ),
};

export const StackedArea: StoryObj = {
  ...noControls('stacked=true로 누적 영역 차트'),
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={trafficConfig}>
        <AreaChart data={trafficData} xKey="timestamp" stacked fillOpacity={0.4}>
          <AreaChart.Grid />
          <AreaChart.XAxis />
          <AreaChart.Tooltip />
          <AreaChart.Legend />
        </AreaChart>
      </ChartContainer>
    </div>
  ),
};

export const Composed: StoryObj = {
  ...noControls('막대와 선을 혼합한 복합 차트'),
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={composedConfig}>
        <ComposedChart data={statusData} xKey="hour">
          <ComposedChart.Bar dataKey="success" />
          <ComposedChart.Line dataKey="error" />
          <ComposedChart.Grid />
          <ComposedChart.XAxis />
          <ComposedChart.YAxis />
          <ComposedChart.Tooltip />
          <ComposedChart.Legend />
        </ComposedChart>
      </ChartContainer>
    </div>
  ),
};

export const ComposedWithArea: StoryObj = {
  ...noControls('Bar + Line + Area 복합 차트'),
  render: () => (
    <div className="w-[600px]">
      <ChartContainer
        config={{
          success: { label: 'Requests' },
          redirect: { label: 'Trend (area)' },
          error: { label: 'Error (line)' },
        }}
      >
        <ComposedChart data={statusData} xKey="hour">
          <ComposedChart.Bar dataKey="success" />
          <ComposedChart.Area dataKey="redirect" fillOpacity={0.3} />
          <ComposedChart.Line dataKey="error" />
          <ComposedChart.Grid />
          <ComposedChart.XAxis />
          <ComposedChart.Tooltip />
          <ComposedChart.Legend />
        </ComposedChart>
      </ChartContainer>
    </div>
  ),
};

export const Donut: StoryObj = {
  ...noControls('비율 표시에 적합한 도넛 차트'),
  render: () => (
    <div className="w-[400px]">
      <ChartContainer config={appConfig}>
        <PieChart
          data={appData}
          dataKey="count"
          nameKey="app"
          innerRadius={0.6}
        >
          <PieChart.Legend />
        </PieChart>
      </ChartContainer>
    </div>
  ),
};

export const Pie: StoryObj = {
  ...noControls('innerRadius=0으로 파이 차트'),
  render: () => (
    <div className="w-[400px]">
      <ChartContainer config={appConfig}>
        <PieChart
          data={appData}
          dataKey="count"
          nameKey="app"
          innerRadius={0}
          padAngle={0}
          cornerRadius={0}
        >
          <PieChart.Legend />
        </PieChart>
      </ChartContainer>
    </div>
  ),
};

export const Radar: StoryObj = {
  ...noControls('다축 비교에 적합한 레이더 차트'),
  render: () => (
    <div className="w-[500px]">
      <ChartContainer config={skillConfig} height={400}>
        <RadarChart data={skillData} axisKey="skill" maxValue={100} levels={4}>
          <RadarChart.Grid />
          <RadarChart.Tooltip />
          <RadarChart.Legend />
        </RadarChart>
      </ChartContainer>
    </div>
  ),
};

export const Radial: StoryObj = {
  ...noControls('KPI 게이지에 적합한 방사형 차트'),
  render: () => (
    <div className="w-[300px]">
      <ChartContainer config={kpiConfig}>
        <RadialChart
          data={kpiData}
          dataKey="usage"
          nameKey="metric"
          maxValue={100}
        >
          <RadialChart.Tooltip />
          <RadialChart.Legend />
        </RadialChart>
      </ChartContainer>
    </div>
  ),
};

export const SparklineStory: StoryObj = {
  name: 'Sparkline',
  ...noControls('인라인 미니 차트 (ChartContainer 불필요)'),
  render: () => (
    <div className="flex items-center gap-4">
      <span className="text-sm text-neutral-500">Requests</span>
      <Sparkline data={miniData} dataKey="value" height={32} />
    </div>
  ),
};

export const HeatmapStory: StoryObj = {
  name: 'Heatmap',
  ...noControls('시간×요일 요청 수 히트맵'),
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={heatConfig}>
        <Heatmap
          data={heatmapData}
          xKey="hour"
          yKey="day"
          valueKey="count"
        />
      </ChartContainer>
    </div>
  ),
};

export const CustomColor: StoryObj = {
  ...noControls(
    'animated={false}로 CSS 변수 다크모드 자동 대응. config.color에 vars.color.* 사용 가능 (react-spring baking 우회)',
  ),
  render: (_args, { globals }) => {
    const isDark = globals.theme === 'dark';
    const customConfig: ChartConfig = isDark
      ? {
          p50: { label: 'p50', color: vars.color.primary.base },
          p95: { label: 'p95', color: vars.color.warning.base },
          p99: { label: 'p99', color: vars.color.error.base },
        }
      : {
          p50: { label: 'p50', color: 'oklch(55% 0.2 260)' },
          p95: { label: 'p95', color: 'oklch(70% 0.18 30)' },
          p99: { label: 'p99', color: 'oklch(75% 0.15 145)' },
        };
    return (
      <div className="w-[600px]">
        <ChartContainer
          config={customConfig}
          animated={false}
        >
          <LineChart data={latencyData} xKey="timestamp">
            <LineChart.Grid />
            <LineChart.XAxis />
            <LineChart.YAxis />
            <LineChart.Tooltip />
            <LineChart.Legend />
          </LineChart>
        </ChartContainer>
      </div>
    );
  },
};
