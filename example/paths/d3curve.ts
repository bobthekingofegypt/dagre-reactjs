import * as d3 from 'd3-shape';
import { Point } from 'dagre-reactjs';

export const generatePathD3Curve = (points: Array<Point>): string => {
  const p: [number, number][] = points.map((point) => [point.x, point.y]);
  const c = d3.line().curve(d3.curveBasis)(p);

  if (c) {
    return c;
  }
  return '';
};
