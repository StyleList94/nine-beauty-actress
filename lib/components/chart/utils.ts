import type { CurveType } from './types';

import { curveMonotoneX, curveLinear, curveStep } from '@visx/curve';

export function getCurveFactory(curve: CurveType) {
  switch (curve) {
    case 'linear':
      return curveLinear;
    case 'step':
      return curveStep;
    case 'monotone':
    default:
      return curveMonotoneX;
  }
}

/** 극좌표계: 각도와 반지름에서 x, y 좌표 계산 */
export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

/** 극좌표 다각형 꼭짓점 좌표 생성 */
export function generatePolygonPoints(
  cx: number,
  cy: number,
  radius: number,
  sides: number,
): { x: number; y: number }[] {
  const angleStep = 360 / sides;
  return Array.from({ length: sides }, (_, i) =>
    polarToCartesian(cx, cy, radius, angleStep * i),
  );
}

/** 좌표 배열을 SVG path 문자열로 변환 */
export function pointsToPath(points: { x: number; y: number }[]): string {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')
    .concat(' Z');
}

/** 데이터 값을 극좌표 반지름으로 변환 */
export function valueToRadius(
  value: number,
  maxValue: number,
  maxRadius: number,
): number {
  return (value / maxValue) * maxRadius;
}
