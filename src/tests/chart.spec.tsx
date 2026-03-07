import type { ChartConfig } from 'lib/components/chart';

import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { ChartContainer, LineChart, BarChart, AreaChart, PieChart, Sparkline } from 'lib/components/chart';

const testConfig: ChartConfig = {
  value1: { label: 'Value 1' },
  value2: { label: 'Value 2' },
};

const testData = [
  { x: 'A', value1: 10, value2: 20 },
  { x: 'B', value1: 30, value2: 15 },
  { x: 'C', value1: 20, value2: 25 },
];

const Wrapper = ({ children }: { children: React.ReactNode }) => (
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
    const { container } = await render(
      <Wrapper>
        <ChartContainer config={testConfig} className="my-chart">
          <div>Content</div>
        </ChartContainer>
      </Wrapper>,
    );

    const chartEl = container.querySelector('[data-slot="chart"]');
    expect(chartEl?.classList.contains('my-chart')).toBe(true);
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
    const { container } = await render(
      <Wrapper>
        <ChartContainer config={pieConfig} className="h-[300px]">
          <PieChart data={pieData} dataKey="count" nameKey="app">
            <PieChart.Legend />
          </PieChart>
        </ChartContainer>
      </Wrapper>,
    );

    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();

    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
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
});

describe('Sparkline', () => {
  const sparkData = [
    { value: 10 },
    { value: 20 },
    { value: 15 },
    { value: 25 },
  ];

  it('should render standalone SVG', async () => {
    const { container } = await render(
      <Sparkline data={sparkData} dataKey="value" height={32} />,
    );

    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('height')).toBe('32');
  });

  it('should render with data-slot="sparkline"', async () => {
    const { container } = await render(
      <Sparkline data={sparkData} dataKey="value" />,
    );

    const sparkline = container.querySelector('[data-slot="sparkline"]');
    expect(sparkline).not.toBeNull();
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
});

describe('animated prop', () => {
  it('animated=false + LineChart 렌더링', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} animated={false} className="h-[300px]">
          <LineChart data={testData} xKey="x">
            <LineChart.Grid />
            <LineChart.XAxis />
          </LineChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });

  it('animated=false + BarChart 렌더링', async () => {
    await render(
      <Wrapper>
        <ChartContainer config={testConfig} animated={false} className="h-[300px]">
          <BarChart data={testData} xKey="x">
            <BarChart.XAxis />
          </BarChart>
        </ChartContainer>
      </Wrapper>,
    );

    await expect.element(page.getByRole('img').first()).toBeVisible();
  });
});
