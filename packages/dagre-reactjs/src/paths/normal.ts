import { Point } from '../types';

export const generatePath = (points: Array<Point>) => {
  let path = '';
  for (let x = 0; x < points.length; ++x) {
    path = path + (x === 0 ? 'M' : 'L') + points[x].x + ',' + points[x].y;
  }

  return path;
};
