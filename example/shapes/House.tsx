import * as React from "react";
import { ShapeComponentProps, Point, Size } from "dagre-reactjs";

export const calculateHousePoints = (size: Size): Array<Point> => {
  const width = size.width;
  const height = size.height;

  const xOffset = width / 2;
  const yOffset = (-height * 3) / 5;

  const points = [
    { x: 0 - xOffset, y: 0 - yOffset },
    { x: width - xOffset, y: 0 - yOffset },
    { x: width - xOffset, y: -height - yOffset },
    { x: width / 2 - xOffset, y: (-height * 3) / 2 - yOffset },
    { x: 0 - xOffset, y: -height - yOffset }
  ];

  return points;
};

export const House: React.FC<ShapeComponentProps> = ({ node, innerSize }) => {
  if (!node || !innerSize || !(innerSize.width && innerSize.height)) {
    return null;
  }

  const points = calculateHousePoints(innerSize);

  return (
    <polygon
      style={node.styles.shape.styles || {}}
      points={points.map(d => `${d.x}, ${d.y}`).join(" ")}
    />
  );
};
