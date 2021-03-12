import * as React from 'react';

import useSize from './useSize';
import { EdgeOptions, ReportSize } from './types';

declare module 'react' {
  interface HTMLAttributes<T> {
    xmlns?: string;
  }
}

type EdgeLabelProps = {
  html: boolean;
  edgeMeta: EdgeOptions;
  reportSize: ReportSize;
  children: () => React.ReactElement<any>;
};

const EdgeLabel: React.FC<EdgeLabelProps> = ({
  html,
  edgeMeta,
  reportSize,
  children,
}) => {
  const targetRef = React.useRef<SVGGElement>(null);
  const labelRef = React.useRef<any>(null);

  const labelSize = useSize(
    labelRef,
    `edge ${edgeMeta.from}-${edgeMeta.to} labelSize`
  );

  useSize(
    targetRef,
    `edge ${edgeMeta.from}-${edgeMeta.to} edgelabel`,
    { width: edgeMeta.width, height: edgeMeta.height },
    reportSize,
    labelSize
  );

  if (!html && !edgeMeta.label) {
    if (edgeMeta.width === undefined || edgeMeta.height === undefined) {
      reportSize(0, 0);
    }
    return null;
  }

  const x = edgeMeta.x! || 0;
  const y = edgeMeta.y! || 0;
  const offsetX = -(edgeMeta.width || 0) / 2;
  const offsetY = -(edgeMeta.height || 0) / 2;

  return (
    <g ref={targetRef} className="edgeLabel" transform={`translate(${x},${y})`}>
      <g transform={`translate(${offsetX},${offsetY})`} className="label">
        {html ? (
          <foreignObject width={labelSize.width} height={labelSize.height}>
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ display: 'inline-block' }}
            >
              <div ref={labelRef}>{children()}</div>
            </div>
          </foreignObject>
        ) : (
          <g ref={labelRef} transform="translate(0, 0)">
            {children()}
          </g>
        )}
      </g>
    </g>
  );
};
export default EdgeLabel;
