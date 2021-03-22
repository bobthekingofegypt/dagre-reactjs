import * as React from 'react';

import { EdgeOptions } from 'dagre-reactjs';

type EdgeProps = {
  edgeMeta: EdgeOptions;
  index: number;
  colorMap: any;
};

const Edge: React.FC<EdgeProps> = ({ edgeMeta, colorMap }) => {
  if (!edgeMeta || !edgeMeta.points) {
    return null;
  }

  const urlId = `${edgeMeta.to}-${edgeMeta.from}`;
  const x1 = edgeMeta.points[0].x;
  const y1 = edgeMeta.points[0].y;
  const x2 = edgeMeta.points[edgeMeta.points.length - 1].x;
  const y2 = edgeMeta.points[edgeMeta.points.length - 1].y;

  const color1 = colorMap[edgeMeta.from];
  const color2 = colorMap[edgeMeta.to];

  return (
    <g className="edgePath" style={{ opacity: 1 }}>
      <path
        className={edgeMeta.styles.edge.className}
        d={edgeMeta.path}
        stroke={`url(#${urlId})`}
        strokeWidth={3}
        fill="none"
      ></path>
      <defs>
        <linearGradient
          id={urlId}
          gradientUnits="userSpaceOnUse"
          x1={x1}
          x2={x2}
          y1={y1}
          y2={y2}
        >
          <stop offset="0%" stopColor={color1}></stop>
          <stop offset="100%" stopColor={color2}></stop>
        </linearGradient>
      </defs>
    </g>
  );
};
export default Edge;
