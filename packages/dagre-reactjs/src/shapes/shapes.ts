import { ShapeDefinition, ShapesDefinition } from '../types';
import { Circle } from './Circle';
import { Diamond } from './Diamond';
import { intersectDiamond } from './intersects/diamond';
import { intersectEllipse } from './intersects/ellipse';
import { intersectRect } from './intersects/rect';
import { Rect } from './Rect';

export const builtInShapes: ShapesDefinition = {
  rect: {
    renderer: Rect,
    intersection: intersectRect,
  },
  circle: {
    renderer: Circle,
    intersection: intersectEllipse,
  },
  diamond: {
    renderer: Diamond,
    intersection: intersectDiamond,
  },
};

export const getShapeDefinition = (
  shape: string,
  shapes: ShapesDefinition
): ShapeDefinition => {
  if (shapes[shape]) {
    return shapes[shape];
  }

  throw Error(`shape ('${shape}') not found in builtins or custom`);
};
