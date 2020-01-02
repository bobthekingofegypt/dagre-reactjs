import * as React from "react";

import { ShapeComponentProps } from "../types";

export const Rect: React.FC<ShapeComponentProps> = ({ node, innerSize }) => {
  if (!node || !innerSize || !(innerSize.width && innerSize.height)) {
    return null;
  }

  const halfWidth = innerSize.width / 2;
  const halfHeight = innerSize.height / 2;

  return (
    <rect
      data-tip="hello world"
      className={node.styles.shape.className}
      style={node.styles.shape.styles || {}}
      rx={node.styles.shape.cornerRadius || 0 }
      ry={node.styles.shape.cornerRadius || 0 }
      x={-halfWidth}
      y={-halfHeight}
      width={innerSize.width}
      height={innerSize.height}
    ></rect>
  );
};
