import * as React from 'react';

import { ShapeComponentProps } from '../types';

export const Circle: React.FC<ShapeComponentProps> = ({ node, innerSize }) => {
  if (!node || !innerSize || !(innerSize.width && innerSize.height)) {
    return null;
  }
  const r = Math.max(innerSize.width, innerSize.height) / 2;

  return (
    <circle
      style={node.styles.shape.styles || {}}
      x={-innerSize.width / 2}
      y={-innerSize.height / 2}
      r={r}
    ></circle>
  );
};
