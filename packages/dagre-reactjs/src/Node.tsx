import * as React from 'react';

import useSize from './useSize';
import { NodeOptions, ReportSize, Size } from './types';
import { ValueCache } from './valuecache';

declare module 'react' {
  interface HTMLAttributes<T> {
    xmlns?: string;
  }
}

type NodeProps = {
  node: NodeOptions;
  reportSize: ReportSize;
  valueCache: ValueCache;
  html: boolean;
  layoutStage?: number;
  children: {
    shape: (innerSize: Size) => React.ReactElement<any>;
    label: () => React.ReactElement<any>;
  };
};

const Node: React.FC<NodeProps> = ({
  node,
  reportSize,
  valueCache,
  layoutStage,
  html,
  children,
}) => {
  const targetRef = React.useRef<SVGGElement>(null);
  const labelRef = React.useRef<any>(null);
  const shapeRef = React.useRef<SVGGElement>(null);

  const labelSize = useSize(
    labelRef,
    `Node: ${node.id} - labelSize`,
    undefined,
    undefined,
    undefined,
    layoutStage
  );

  const labelWithPaddingSize = {
    width: labelSize.width,
    height: labelSize.height,
  };
  const padding = node.styles.node.padding || {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  if (
    !node.label ||
    (node.label &&
      node.label !== '' &&
      labelSize.width > 0 &&
      labelSize.height > 0)
  ) {
    if (padding && padding.left) {
      labelWithPaddingSize.width += padding.left;
    }
    if (padding && padding.right) {
      labelWithPaddingSize.width += padding.right;
    }
    if (padding && padding.top) {
      labelWithPaddingSize.height += padding.top;
    }
    if (padding && padding.bottom) {
      labelWithPaddingSize.height += padding.bottom;
    }
  }

  const shapeSize = useSize(
    shapeRef,
    `Node: ${node.id} - shapeSize`,
    undefined,
    undefined,
    labelSize,
    layoutStage
  );
  useSize(
    targetRef,
    `Node: ${node.id} - nodesize`,
    { width: node.width, height: node.height },
    reportSize,
    shapeSize,
    layoutStage
  );

  // TODO probably a better solution for this, maybe just editing node to store the shapesize
  valueCache.cache(`${node.id}-label-size`, labelWithPaddingSize);

  const x = node.x || 0;
  const y = node.y || 0;

  const paddingLeft = padding.left;
  const paddingTop = padding.top;

  const textOffsetX = labelWithPaddingSize
    ? labelWithPaddingSize.width
      ? labelWithPaddingSize.width / 2 - paddingLeft
      : 0
    : 0;
  const textOffsetY = labelWithPaddingSize
    ? labelWithPaddingSize.height
      ? labelWithPaddingSize.height / 2 - paddingTop
      : 0
    : 0;

  return (
    <g
      ref={targetRef}
      className={node.styles.node.className}
      transform={`translate(${x},${y})`}
    >
      <g ref={shapeRef}>{children.shape(labelWithPaddingSize)}</g>
      <g transform={`translate(${-textOffsetX},${-textOffsetY})`}>
        {html ? (
          <foreignObject width={labelSize.width} height={labelSize.height}>
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ display: 'inline-block' }}
            >
              <div ref={labelRef}>{children.label()}</div>
            </div>
          </foreignObject>
        ) : (
          <g ref={labelRef} transform="translate(0, 0)">
            {children.label()}
          </g>
        )}
      </g>
    </g>
  );
};

export default Node;
