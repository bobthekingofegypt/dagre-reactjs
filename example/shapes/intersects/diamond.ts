/* eslint "no-console": off */
import { ShapeInfo, Intersection } from "kld-intersections";
import { Point, NodeOptions } from "../../../src/types";
import {ValueCache} from "../../../src";

export const intersectDiamond = (node: NodeOptions, point: Point, valueCache: ValueCache): Point => {
  const width = node.width! / 2;
  const height = node.height! / 2;

  const polyPoints = [
    { x: 0, y: -height },
    { x: -width, y: 0 },
    { x: 0, y: height },
    { x: width, y: 0 }
  ];

  return intersectPolygon2(node, point, polyPoints);

  // const polygon = ShapeInfo.polygon(polyPoints);
  // const line = ShapeInfo.line([point.x - node.x, point.y - node.y, 0, 0]);
  // const intersections2 = Intersection.intersect(polygon, line);

  // console.log("inter2", intersections2);
  // intersections2.points.forEach(console.log);

  // console.log('intersect points', polyPoints);
  // console.log(`node x: ${node.x},  y: ${node.y}`);

  // if (intersections2.points.length === 0) {
  //   return null;
  // }
  //
  // return {
  //   x: intersections2.points[0].x + node.x,
  //   y: intersections2.points[0].y + node.y
  // };
}

export const intersectPolygon2 = (node:NodeOptions, point: Point, polyPoints:Array<Point>): Point => {

  const polygon = ShapeInfo.polygon(polyPoints);
  const line = ShapeInfo.line([point.x - node.x!, point.y - node.y!, 0, 0]);
  const intersections2 = Intersection.intersect(polygon, line);

  // console.log("inter2", intersections2);
  // intersections2.points.forEach(console.log);

  // console.log("intersect points", polyPoints);
  // console.log(`node x: ${node.x},  y: ${node.y}`);

  if (intersections2.points.length > 0) {
    return {
      x: intersections2.points[0].x + node.x!,
      y: intersections2.points[0].y + node.y!
    };
  }
  return { x: node.y!, y: node.y! };
}

export const intersectPath = (node:NodeOptions, point: Point, pathString: string): Point => {

  const path = ShapeInfo.path(pathString);
  const line = ShapeInfo.line([point.x - node.x!, point.y - node.y!, 0, 0]);
  const intersections2 = Intersection.intersect(line, path);

  console.log(line);

  console.log("path inter2", intersections2);
  if (intersections2.points.length > 0) {
    return {
      x: intersections2.points[0].x + node.x!,
      y: intersections2.points[0].y + node.y!
    };
  }
  return { x: node.y!, y: node.y! };
}
