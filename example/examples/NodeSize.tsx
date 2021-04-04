import * as React from 'react';

import {
  DagreReact,
  EdgeOptions,
  Node,
  NodeOptions,
  Rect,
  RecursivePartial,
  ReportSize,
  Size,
  ValueCache,
} from '../../dist/';
import { customNodeSize } from '../data';

type CustomNodesState = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  layoutStage: number;
};

export class NodeSize extends React.Component<{}, CustomNodesState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      ...customNodeSize,
      layoutStage: 0,
    };
  }

  resize = () => {
    this.setState({ layoutStage: this.state.layoutStage + 1 });
  };

  renderNode = (
    node: NodeOptions,
    reportSize: ReportSize,
    valueCache: ValueCache,
    layoutStage: number
  ) => {
    return (
      <Node
        key={node.id}
        node={node}
        reportSize={reportSize}
        valueCache={valueCache}
        html={true}
        layoutStage={layoutStage}
      >
        {{
          shape: (innerSize: Size) => (
            <Rect node={node} innerSize={innerSize} />
          ),
          label: () => (
            <CustomLabel
              title={node.label}
              description={node.meta.description}
              multiplier={this.state.layoutStage}
            />
          ),
        }}
      </Node>
    );
  };

  render() {
    const { nodes, edges } = this.state;

    return (
      <div style={{ height: '100%' }}>
        <h1>Resize</h1>
        <p>Example that shows the resizing of a custom node label</p>
        <div>
          <input type="button" value="Resize" onClick={this.resize} />
        </div>
        <svg id="schedule" width={800} height={800}>
          <DagreReact
            layoutStage={this.state.layoutStage}
            nodes={nodes}
            edges={edges}
            renderNode={this.renderNode}
            graphOptions={{
              marginx: 15,
              marginy: 15,
              rankdir: 'TB',
              ranksep: 55,
              nodesep: 15,
            }}
          />
        </svg>
      </div>
    );
  }
}

type CustomLabelProps = {
  title: string;
  description: string;
  multiplier: number;
};

const CustomLabel: React.FC<CustomLabelProps> = ({
  title,
  description,
  multiplier,
}) => {
  return (
    <div
      style={{
        padding: '10px',
        border: '2px solid #000',
        width: `${180 + multiplier * 10}px`,
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{title}</div>
      <div>{description}</div>
    </div>
  );
};
