import { NodeOptions, Point } from '../../types';

// intersections from https://github.com/dagrejs/dagre-d3
export const intersectEllipse = (node: NodeOptions, point: Point) => {
  if (
    node.width === null ||
    node.height === null ||
    node.x === null ||
    node.y === null
  ) {
    throw new Error('intersect ellipse called before layout complete');
  }
  // Formulae from: http://mathworld.wolfram.com/Ellipse-LineIntersection.html
  const rx = node.width / 2;
  const ry = node.height / 2;

  const cx = node.x;
  const cy = node.y;

  const px = cx - point.x;
  const py = cy - point.y;

  const det = Math.sqrt(rx * rx * py * py + ry * ry * px * px);

  let dx = Math.abs((rx * ry * px) / det);
  if (point.x < cx) {
    dx = -dx;
  }
  let dy = Math.abs((rx * ry * py) / det);
  if (point.y < cy) {
    dy = -dy;
  }

  return { x: cx + dx, y: cy + dy };
};
