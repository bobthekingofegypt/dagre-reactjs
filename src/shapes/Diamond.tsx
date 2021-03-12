import * as React from 'react';
import { ShapeComponentProps, Point, Size } from '../../src/types';

export const calculateDiamondPoints = (size: Size): Array<Point> => {
  const width = (size.width * Math.SQRT2) / 2;
  const height = (size.height * Math.SQRT2) / 2;

  const points = [
    { x: 0, y: -height },
    { x: -width, y: 0 },
    { x: 0, y: height },
    { x: width, y: 0 },
  ];

  return points;
};

export const Diamond: React.FC<ShapeComponentProps> = ({ node, innerSize }) => {
  if (!node || !innerSize || !(innerSize.width && innerSize.height)) {
    return null;
  }

  const points = calculateDiamondPoints(innerSize);

  return (
    <polygon
      style={node.styles.shape.styles || {}}
      points={points.map(p => `${p.x}, ${p.y}`).join(' ')}
    />
  );
};
