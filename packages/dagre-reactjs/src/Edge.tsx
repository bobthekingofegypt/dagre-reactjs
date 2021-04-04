import * as React from 'react';

import { EdgeOptions, MarkerComponent } from './types';

type EdgeProps = {
  edgeMeta: EdgeOptions;
  markerComponent: MarkerComponent;
  index: number;
};

const Edge: React.FC<EdgeProps> = ({ index, edgeMeta, markerComponent }) => {
  if (!edgeMeta || !edgeMeta.points) {
    return null;
  }

  const MarkerComponent = markerComponent;
  const markerId = `marker${index}`;

  return (
    <g className="edgePath" style={{ opacity: 1 }}>
      <path
        className={edgeMeta.styles.edge.className}
        d={edgeMeta.path}
        markerEnd={`url(#${markerId})`}
        style={edgeMeta.styles.edge.styles || { stroke: '#000', fill: 'none' }}
      ></path>
      <defs>
        <MarkerComponent edgeMeta={edgeMeta} markerId={markerId} />
      </defs>
    </g>
  );
};
export default Edge;
