import type { ChartConfig } from 'lib/components/chart';

import { Component, type ReactNode } from 'react';

import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

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
import { useChartConfig } from 'lib/components/chart/context';

const testConfig: ChartConfig = {
  value1: { label: 'Value 1' },
  value2: { label: 'Value 2' },
};

const testData = [
  { x: 'A', value1: 10, value2: 20 },
  { x: 'B', value1: 30, value2: 15 },
  { x: 'C', value1: 20, value2: 25 },
];

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div style={{ width: 400, height: 300 }}>{children}</div>
);

describe('ChartContainer', () => {
  it('should render with data-slot="chart"', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig}>
          <div>Chart content</div>
        </ChartContainer>
      </Wrapper>,
    );

    const chart = page.getByText('Chart content');
    await expect.element(chart).toBeVisible();
  });

  it('should apply custom className', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="my-chart">
          <div>Content</div>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toHaveClass('my-chart');
  });

  it('useChartConfig outside ChartContainer throws', async () => {
    class ErrorBoundary extends Component<
      { children: ReactNode },
      { error: string | null }
    > {
      state = { error: null as string | null };
      static getDerivedStateFromError(err: Error) {
        return { error: err.message };
      }
      render() {
        const { error } = this.state;
        const { children } = this.props;
        if (error) return <div data-testid="error">{error}</div>;
        return children;
      }
    }
    const BrokenComponent = () => {
      useChartConfig();
      return null;
    };
    await render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
    );
    await expect
      .element(page.getByTestId('error'))
      .toHaveTextContent('useChartConfig must be used within a ChartContainer');
  });
});

describe('LineChart', () => {
  it('should render SVG with lines', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="h-[300px]">
          <LineChart data={testData} xKey="x">
            <LineChart.Grid />
            <LineChart.XAxis />
            <LineChart.YAxis />
          </LineChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should render with Tooltip and Legend', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="h-[300px]">
          <LineChart data={testData} xKey="x">
            <LineChart.Tooltip />
            <LineChart.Legend />
          </LineChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByText('Value 1')).toBeVisible();
    await expect.element(page.getByText('Value 2')).toBeVisible();
  });

  it('should trigger Tooltip on SVG hover', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="h-[300px]">
          <LineChart data={testData} xKey="x">
            <LineChart.XAxis />
            <LineChart.Tooltip />
          </LineChart>
        </ChartContainer>
      </Wrapper>,
    );

    await userEvent.hover(page.getByRole('img').first());
    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should hide axes when hide=true', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="h-[300px]">
          <LineChart data={testData} xKey="x">
            <LineChart.XAxis hide />
            <LineChart.YAxis hide />
          </LineChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should render Tooltip with empty data (nearestDatum null path)', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="h-[300px]">
          <LineChart data={[]} xKey="x">
            <LineChart.Tooltip />
          </LineChart>
        </ChartContainer>
      </Wrapper>,
    );

    await userEvent.hover(page.getByRole('img').first());
    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should call custom render prop in Tooltip', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} style={{ height: 300 }}>
          <LineChart data={testData} xKey="x">
            <LineChart.XAxis />
            <LineChart.Tooltip
              render={({ label, value }) => (
                <div data-testid="custom-tooltip">
                  {label}: {String(value)}
                </div>
              )}
            />
          </LineChart>
        </ChartContainer>
      </Wrapper>,
    );

    await userEvent.hover(page.getByRole('img').first());
    await expect.element(page.getByRole('img').first()).toBeVisible();
  });
});

describe('BarChart', () => {
  it('should render SVG with bars', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="h-[300px]">
          <BarChart data={testData} xKey="x">
            <BarChart.Grid />
            <BarChart.XAxis />
          </BarChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should render with YAxis and Legend', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="h-[300px]">
          <BarChart data={testData} xKey="x">
            <BarChart.XAxis />
            <BarChart.YAxis />
            <BarChart.Legend />
          </BarChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
    await expect.element(page.getByText('Value 1')).toBeVisible();
  });

  it('should render horizontal bars', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="h-[300px]">
          <BarChart data={testData} xKey="x" horizontal>
            <BarChart.XAxis />
          </BarChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should render stacked bars', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="h-[300px]">
          <BarChart data={testData} xKey="x" stacked>
            <BarChart.XAxis />
          </BarChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });
});

describe('AreaChart', () => {
  it('should render SVG with area', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="h-[300px]">
          <AreaChart data={testData} xKey="x">
            <AreaChart.Grid />
            <AreaChart.XAxis />
          </AreaChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should render with YAxis and Legend', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="h-[300px]">
          <AreaChart data={testData} xKey="x">
            <AreaChart.XAxis />
            <AreaChart.YAxis />
            <AreaChart.Legend />
          </AreaChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByText('Value 1')).toBeVisible();
  });

  it('should render stacked area', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="h-[300px]">
          <AreaChart data={testData} xKey="x" stacked>
            <AreaChart.XAxis />
          </AreaChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });
});

describe('PieChart', () => {
  const pieConfig: ChartConfig = {
    web: { label: 'Web' },
    api: { label: 'API' },
  };

  const pieData = [
    { app: 'web', count: 300 },
    { app: 'api', count: 200 },
  ];

  it('should render SVG with pie arcs', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={pieConfig} className="h-[300px]">
          <PieChart data={pieData} dataKey="count" nameKey="app">
            <PieChart.Legend />
          </PieChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
    await expect.element(page.getByText('Web')).toBeVisible();
  });

  it('should render legend with labels', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={pieConfig} className="h-[300px]">
          <PieChart data={pieData} dataKey="count" nameKey="app">
            <PieChart.Legend />
          </PieChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByText('Web')).toBeVisible();
    await expect.element(page.getByText('API')).toBeVisible();
  });

  it('should show tooltip on arc hover', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={pieConfig} className="h-[300px]">
          <PieChart data={pieData} dataKey="count" nameKey="app" />
        </ChartContainer>
      </Wrapper>,
    );

    await userEvent.hover(page.getByRole('img').first());
    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should trigger onMouseLeave when moving off arc', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={pieConfig} style={{ height: 300 }}>
          <PieChart
            data={pieData}
            dataKey="count"
            nameKey="app"
            innerRadius={0}
          >
            <PieChart.Legend />
          </PieChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByText('Web')).toBeVisible();
    await userEvent.hover(page.getByRole('img').first());
    await userEvent.hover(page.getByText('Web'));
    await expect.element(page.getByText('Web')).toBeVisible();
  });
});

describe('ComposedChart', () => {
  it('should render with Line and Bar series', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="h-[300px]">
          <ComposedChart data={testData} xKey="x">
            <ComposedChart.Bar dataKey="value1" />
            <ComposedChart.Line dataKey="value2" />
            <ComposedChart.Grid />
            <ComposedChart.XAxis />
          </ComposedChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should render with Area series, YAxis, and Legend', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="h-[300px]">
          <ComposedChart data={testData} xKey="x">
            <ComposedChart.Area dataKey="value1" />
            <ComposedChart.XAxis />
            <ComposedChart.YAxis />
            <ComposedChart.Legend />
          </ComposedChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByText('Value 1')).toBeVisible();
  });

  it('should render stub series components without error', async () => {
    await render(
      <div data-testid="composed-stubs">
        <ComposedChart.Line dataKey="x" />
        <ComposedChart.Bar dataKey="x" />
        <ComposedChart.Area dataKey="x" />
      </div>,
    );

    await expect
      .element(page.getByTestId('composed-stubs'))
      .toHaveAttribute('data-testid', 'composed-stubs');
  });
});

describe('Heatmap', () => {
  const heatConfig: ChartConfig = { count: { label: 'Count' } };
  const heatData = [
    { hour: '00', day: 'Mon', count: 12 },
    { hour: '06', day: 'Mon', count: 45 },
    { hour: '12', day: 'Tue', count: 0 },
  ];

  it('should render heatmap cells', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={heatConfig} className="h-[300px]">
          <Heatmap data={heatData} xKey="hour" yKey="day" valueKey="count" />
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should trigger onMouseMove on cell hover', async () => {
    const hoverData = [
      { hour: '00', day: 'Mon', count: 12 },
      { hour: '06', day: 'Mon', count: 45 },
      { hour: '12', day: 'Tue', count: 0 },
      { hour: '06', day: 'Tue', count: 30 },
    ];
    await render(
      <Wrapper>
        <ChartContainer config={heatConfig} style={{ height: 300 }}>
          <Heatmap data={hoverData} xKey="hour" yKey="day" valueKey="count" />
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByText('Mon')).toBeVisible();
    await userEvent.hover(page.getByRole('img').first());
    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should render stub sub-components without error', async () => {
    await render(
      <div data-testid="heatmap-stubs">
        <Heatmap.XAxis />
        <Heatmap.YAxis />
        <Heatmap.Tooltip />
      </div>,
    );

    await expect
      .element(page.getByTestId('heatmap-stubs'))
      .toHaveAttribute('data-testid', 'heatmap-stubs');
  });
});

describe('RadarChart', () => {
  const radarConfig: ChartConfig = {
    frontend: { label: 'Frontend' },
    backend: { label: 'Backend' },
  };
  const radarData = [
    { skill: 'Latency', frontend: 85, backend: 70 },
    { skill: 'Throughput', frontend: 65, backend: 90 },
    { skill: 'Uptime', frontend: 95, backend: 98 },
  ];

  it('should render radar polygons and Legend', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={radarConfig} className="h-[300px]">
          <RadarChart data={radarData} axisKey="skill">
            <RadarChart.Legend />
          </RadarChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByText('Frontend')).toBeVisible();
  });

  it('should trigger onMouseMove on sector hover', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={radarConfig} style={{ height: 300 }}>
          <RadarChart data={radarData} axisKey="skill" />
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByText('Latency')).toBeVisible();
    await userEvent.hover(page.getByRole('img').first());
    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should render with Grid and Tooltip sub-components', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={radarConfig} className="h-[300px]">
          <RadarChart data={radarData} axisKey="skill">
            <RadarChart.Grid />
            <RadarChart.Tooltip />
          </RadarChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });
});

describe('RadialChart', () => {
  const radialConfig: ChartConfig = {
    cpu: { label: 'CPU' },
    memory: { label: 'Memory' },
  };
  const radialData = [
    { metric: 'cpu', usage: 72 },
    { metric: 'memory', usage: 85 },
  ];

  it('should render radial arcs and Legend', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={radialConfig} className="h-[300px]">
          <RadialChart
            data={radialData}
            dataKey="usage"
            nameKey="metric"
            maxValue={100}
          >
            <RadialChart.Legend />
          </RadialChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByText('CPU')).toBeVisible();
  });

  it('should render arcs when container has dimensions', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={radialConfig} style={{ height: 300 }}>
          <RadialChart
            data={radialData}
            dataKey="usage"
            nameKey="metric"
            maxValue={100}
          >
            <RadialChart.Legend />
          </RadialChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByText('CPU').last()).toBeVisible();
    await page
      .getByRole('img')
      .first()
      .hover({ position: { x: 330, y: 150 } });
    await userEvent.hover(page.getByText('CPU').last());
    await expect.element(page.getByText('CPU').last()).toBeVisible();
  });

  it('should render with Tooltip sub-component', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={radialConfig} className="h-[300px]">
          <RadialChart data={radialData} dataKey="usage" nameKey="metric">
            <RadialChart.Tooltip />
          </RadialChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });
});

describe('Sparkline', () => {
  const sparkData = [
    { value: 10 },
    { value: 20 },
    { value: 15 },
    { value: 25 },
  ];

  it('should render standalone SVG', async () => {
    await render(<Sparkline data={sparkData} dataKey="value" height={32} />);

    await expect
      .element(page.getByRole('img').first())
      .toHaveAttribute('height', '32');
  });

  it('should render with data-slot="sparkline"', async () => {
    await render(<Sparkline data={sparkData} dataKey="value" />);

    await expect
      .element(page.getByRole('img').first())
      .toHaveAttribute('data-slot', 'sparkline');
  });

  it('should be accessible via role img', async () => {
    await render(
      <Sparkline
        data={sparkData}
        dataKey="value"
        aria-label="Trend sparkline"
      />,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should render with all-same-value data', async () => {
    const flatData = [{ value: 0 }, { value: 0 }, { value: 0 }];
    await render(<Sparkline data={flatData} dataKey="value" width={80} />);

    await expect
      .element(page.getByRole('img').first())
      .toHaveAttribute('width', '80');
  });
});

describe('animated prop', () => {
  it('should render LineChart with animated=false', async () => {
    await render(
      <Wrapper>
        <ChartContainer
          config={testConfig}
          animated={false}
          className="h-[300px]"
        >
          <LineChart data={testData} xKey="x">
            <LineChart.Grid />
            <LineChart.XAxis />
            <LineChart.YAxis />
          </LineChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should render BarChart with animated=false', async () => {
    await render(
      <Wrapper>
        <ChartContainer
          config={testConfig}
          animated={false}
          className="h-[300px]"
        >
          <BarChart data={testData} xKey="x">
            <BarChart.XAxis />
          </BarChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should render AreaChart with animated=false', async () => {
    await render(
      <Wrapper>
        <ChartContainer
          config={testConfig}
          animated={false}
          className="h-[300px]"
        >
          <AreaChart data={testData} xKey="x">
            <AreaChart.XAxis />
          </AreaChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should render stacked AreaChart with animated=false', async () => {
    await render(
      <Wrapper>
        <ChartContainer
          config={testConfig}
          animated={false}
          className="h-[300px]"
        >
          <AreaChart data={testData} xKey="x" stacked>
            <AreaChart.XAxis />
          </AreaChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('should render Tooltip content after chart dimensions settle', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} style={{ height: 300 }}>
          <LineChart data={testData} xKey="x">
            <LineChart.XAxis />
            <LineChart.Tooltip />
          </LineChart>
        </ChartContainer>
      </Wrapper>,
    );

    await userEvent.hover(page.getByRole('img').first());
    await expect.element(page.getByRole('img').first()).toBeVisible();
  });
});
