import { Point, NodeOptions } from '../../types';

// intersections from https://github.com/dagrejs/dagre-d3
/*
 * Returns the point at which two lines, p and q, intersect or returns
 * undefined if they do not intersect.
 */
const intersectLine = (p1: Point, p2: Point, q1: Point, q2: Point) => {
  // Algorithm from J. Avro, (ed.) Graphics Gems, No 2, Morgan Kaufmann, 1994,
  // p7 and p473.
  let num: number;

  // Compute a1, b1, c1, where line joining points 1 and 2 is F(x,y) = a1 x +
  // b1 y + c1 = 0.
  const a1 = p2.y - p1.y;
  const b1 = p1.x - p2.x;
  const c1 = p2.x * p1.y - p1.x * p2.y;

  // Compute r3 and r4.
  const r3 = a1 * q1.x + b1 * q1.y + c1;
  const r4 = a1 * q2.x + b1 * q2.y + c1;

  // Check signs of r3 and r4. If both point 3 and point 4 lie on
  // same side of line 1, the line segments do not intersect.
  if (r3 !== 0 && r4 !== 0 && sameSign(r3, r4)) {
    return /*DONT_INTERSECT*/;
  }

  // Compute a2, b2, c2 where line joining points 3 and 4 is G(x,y) = a2 x + b2 y + c2 = 0
  const a2 = q2.y - q1.y;
  const b2 = q1.x - q2.x;
  const c2 = q2.x * q1.y - q1.x * q2.y;

  // Compute r1 and r2
  const r1 = a2 * p1.x + b2 * p1.y + c2;
  const r2 = a2 * p2.x + b2 * p2.y + c2;

  // Check signs of r1 and r2. If both point 1 and point 2 lie
  // on same side of second line segment, the line segments do
  // not intersect.
  if (r1 !== 0 && r2 !== 0 && sameSign(r1, r2)) {
    return /*DONT_INTERSECT*/;
  }

  // Line segments intersect: compute intersection point.
  const denom = a1 * b2 - a2 * b1;
  if (denom === 0) {
    return /*COLLINEAR*/;
  }

  const offset = Math.abs(denom / 2);

  // The denom/2 is to get rounding instead of truncating. It
  // is added or subtracted to the numerator, depending upon the
  // sign of the numerator.
  num = b1 * c2 - b2 * c1;
  const x = num < 0 ? (num - offset) / denom : (num + offset) / denom;

  num = a2 * c1 - a1 * c2;
  const y = num < 0 ? (num - offset) / denom : (num + offset) / denom;

  return { x: x, y: y };
};

const sameSign = (r1: number, r2: number): boolean => {
  return r1 * r2 > 0;
};

export const intersectDiamond = (node: NodeOptions, point: Point): Point => {
  if (
    node.width === null ||
    node.height === null ||
    node.x === null ||
    node.y === null
  ) {
    throw new Error('intersect diamond called before layout complete');
  }

  const width = node.width / 2;
  const height = node.height / 2;

  const polyPoints = [
    { x: 0, y: -height },
    { x: -width, y: 0 },
    { x: 0, y: height },
    { x: width, y: 0 },
  ];

  const x1 = node.x;
  const y1 = node.y;

  const intersections: Point[] = [];

  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  polyPoints.forEach(function (entry) {
    minX = Math.min(minX, entry.x);
    minY = Math.min(minY, entry.y);
  });

  const left = x1 - node.width / 2 - minX;
  const top = y1 - node.height / 2 - minY;

  for (let i = 0; i < polyPoints.length; i++) {
    const p1 = polyPoints[i];
    const p2 = polyPoints[i < polyPoints.length - 1 ? i + 1 : 0];
    const intersect = intersectLine(
      { x: node.x, y: node.y },
      point,
      { x: left + p1.x, y: top + p1.y },
      { x: left + p2.x, y: top + p2.y }
    );
    if (intersect) {
      intersections.push(intersect);
    }
  }

  if (!intersections.length) {
    console.log('NO INTERSECTION FOUND, RETURN NODE CENTER', node);
    return { x: node.x, y: node.y };
  }

  if (intersections.length > 1) {
    // More intersections, find the one nearest to edge end point
    intersections.sort((p: Point, q: Point) => {
      const pdx = p.x - point.x;
      const pdy = p.y - point.y;
      const distp = Math.sqrt(pdx * pdx + pdy * pdy);

      const qdx = q.x - point.x;
      const qdy = q.y - point.y;
      const distq = Math.sqrt(qdx * qdx + qdy * qdy);

      return distp < distq ? -1 : distp === distq ? 0 : 1;
    });
  }
  return intersections[0];
};
