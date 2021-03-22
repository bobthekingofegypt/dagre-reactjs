import { Point } from "dagre-reactjs";

import * as d3 from "d3-shape";

export const generatePathD3Curve = (points: Array<Point>): string => {
  const p: [number, number][] = points.map((point) => ([point.x, point.y]));
  const c = d3.line()
    .curve(d3.curveCatmullRom)(p)
  return c!;
};

