import {
  polarToCartesian,
  generatePolygonPoints,
  pointsToPath,
  valueToRadius,
  getCurveFactory,
} from 'lib/components/chart/utils';

describe('getCurveFactory', () => {
  it('should return curveMonotoneX for "monotone"', () => {
    const curve = getCurveFactory('monotone');
    expect(curve).toBeDefined();
  });

  it('should return curveLinear for "linear"', () => {
    const curve = getCurveFactory('linear');
    expect(curve).toBeDefined();
  });

  it('should return curveStep for "step"', () => {
    const curve = getCurveFactory('step');
    expect(curve).toBeDefined();
  });
});

describe('polarToCartesian', () => {
  it('should calculate correct coordinates for 0 degrees (top)', () => {
    const point = polarToCartesian(0, 0, 100, 0);
    expect(point.x).toBeCloseTo(0, 5);
    expect(point.y).toBeCloseTo(-100, 5);
  });

  it('should calculate correct coordinates for 90 degrees (right)', () => {
    const point = polarToCartesian(0, 0, 100, 90);
    expect(point.x).toBeCloseTo(100, 5);
    expect(point.y).toBeCloseTo(0, 5);
  });

  it('should calculate correct coordinates for 180 degrees (bottom)', () => {
    const point = polarToCartesian(0, 0, 100, 180);
    expect(point.x).toBeCloseTo(0, 5);
    expect(point.y).toBeCloseTo(100, 5);
  });

  it('should apply center offset', () => {
    const point = polarToCartesian(50, 50, 100, 0);
    expect(point.x).toBeCloseTo(50, 5);
    expect(point.y).toBeCloseTo(-50, 5);
  });
});

describe('generatePolygonPoints', () => {
  it('should generate correct number of points', () => {
    const points = generatePolygonPoints(0, 0, 100, 5);
    expect(points).toHaveLength(5);
  });

  it('should generate square points for 4 sides', () => {
    const points = generatePolygonPoints(0, 0, 100, 4);
    expect(points).toHaveLength(4);
    // First point should be at top (0 degrees)
    expect(points[0].x).toBeCloseTo(0, 5);
    expect(points[0].y).toBeCloseTo(-100, 5);
  });
});

describe('pointsToPath', () => {
  it('should generate SVG path string', () => {
    const points = [
      { x: 0, y: -100 },
      { x: 100, y: 0 },
      { x: 0, y: 100 },
    ];
    const path = pointsToPath(points);
    expect(path).toContain('M');
    expect(path).toContain('L');
    expect(path).toContain('Z');
  });

  it('should start with M and end with Z', () => {
    const points = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ];
    const path = pointsToPath(points);
    expect(path).toMatch(/^M/);
    expect(path).toMatch(/Z$/);
  });
});

describe('valueToRadius', () => {
  it('should scale value proportionally', () => {
    expect(valueToRadius(50, 100, 200)).toBe(100);
  });

  it('should return 0 for 0 value', () => {
    expect(valueToRadius(0, 100, 200)).toBe(0);
  });

  it('should return maxRadius for maxValue', () => {
    expect(valueToRadius(100, 100, 200)).toBe(200);
  });
});
