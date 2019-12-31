import { Rect } from "./Rect";
import { Circle } from "./Circle";
import { intersectRect } from "./intersects/rect";
import { intersectEllipse } from "./intersects/ellipse";
import { ShapesDefinition, ShapeDefinition } from "../types";

export const builtInShapes: ShapesDefinition = {
  rect: {
    renderer: Rect,
    intersection: intersectRect
  },
  circle: {
    renderer: Circle,
    intersection: intersectEllipse
  }
};

export const getShapeDefinition = (shape: string, shapes: ShapesDefinition): ShapeDefinition => {
  if (shapes[shape]) {
    return shapes[shape];
  }

  throw Error(`shape ('${shape}') not found in builtins or custom`);
};
