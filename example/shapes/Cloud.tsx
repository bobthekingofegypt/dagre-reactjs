import * as React from "react";
import { ShapeComponentProps, Size } from "../../.";

export const calculateCloudPath = (size: Size): string => {
  const width = size.width;
  const height = size.height;
  const xOffset = width / 2;
  const yOffset = (-height * 3) / 4;

  const halfHeight = -(yOffset * 2) / 2;

  const path = `M ${-xOffset + 20},${-20} a ${-halfHeight /
    2},${halfHeight /
    2} 1 0,0 0,${halfHeight} h ${width - 40} a ${halfHeight / 2},${-halfHeight / 2} 1 0,0 0,${-halfHeight} a 10,10 1 0,0 -15,-10 a 15,15 1 0,0 -25, 10 z`;
  return path;
}

export const Cloud: React.FC<ShapeComponentProps> = ({ node, innerSize }) => {
  if (!node || !innerSize || !(innerSize.width && innerSize.height)) {
    return null;
  }

  const path = calculateCloudPath(innerSize);

  return (
    <g>
      <path style={node.styles.shape.styles || {}} d={path} />
    </g>
  );
};
