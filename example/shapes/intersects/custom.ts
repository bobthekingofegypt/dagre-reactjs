/* eslint "no-console": off */
import { NodeOptions, Point } from 'dagre-reactjs';
import { Intersection, ShapeInfo } from 'kld-intersections';

export const intersectPolygon2 = (
  node: NodeOptions,
  point: Point,
  polyPoints: Array<Point>
): Point => {
  if (!node.x || !node.y) {
    return point;
  }

  const polygon = ShapeInfo.polygon(polyPoints);
  const line = ShapeInfo.line([point.x - node.x, point.y - node.y], [0, 0]);
  const intersections2 = Intersection.intersect(polygon, line);

  if (intersections2.points.length > 0) {
    return {
      x: intersections2.points[0].x + node.x,
      y: intersections2.points[0].y + node.y,
    };
  }
  return { x: node.y, y: node.y };
};

export const intersectPath = (
  node: NodeOptions,
  point: Point,
  pathString: string
): Point => {
  if (!node.x || !node.y) {
    return point;
  }
  const path = ShapeInfo.path(pathString);
  const line = ShapeInfo.line([point.x - node.x, point.y - node.y], [0, 0]);
  const intersections2 = Intersection.intersect(line, path);

  if (intersections2.points.length > 0) {
    return {
      x: intersections2.points[0].x + node.x,
      y: intersections2.points[0].y + node.y,
    };
  }
  return { x: node.y, y: node.y };
};
