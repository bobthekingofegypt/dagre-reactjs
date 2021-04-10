import {
  DAGReact,
  EdgeOptions,
  NodeOptions,
  RecursivePartial,
} from 'dagre-reactjs';
import { ElkLayout } from 'dagre-reactjs-elk-layout';
import * as React from 'react';

import { nodeOrdering } from './data';
import { NodePositionForm } from './NodePositionForm';

type BasicState = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  layoutStage: number;
  width: number;
  height: number;
  layouting: boolean;
};

const DEFAULT_NODE_CONFIG = {
  shape: 'rect',
  styles: {
    node: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
    shape: {
      styles: {
        strokeWidth: '2',
      },
      className: 'basic2',
    },
    label: {
      className: 'basic2label',
      styles: {
        fill: '#000',
      },
    },
  },
  meta: {
    elk: {
      layoutOptions: {
        position: '(0.0, 0.0)',
      },
    },
  },
};

const DEFAULT_EDGE_CONFIG = {};

export class ElkOrdering extends React.Component<{}, BasicState> {
  elkLayout: ElkLayout;

  constructor(props: {}) {
    super(props);

    this.elkLayout = new ElkLayout({
      algorithm: 'layered',
      'crossingMinimization.semiInteractive': 'true',
      'elk.direction': 'DOWN',
      'org.eclipse.elk.layered.layering.strategy': 'INTERACTIVE',
    });

    this.state = {
      nodes: nodeOrdering.nodes,
      edges: nodeOrdering.edges,
      layoutStage: 1,
      width: 0,
      height: 0,
      layouting: false,
    };
  }

  orderChanged = (values: number[], pullUp: boolean) => {
    const nodes = this.state.nodes;
    for (let x = 0; x < nodes.length; ++x) {
      const node = nodes[x];
      const position = values[x];

      node.meta = {
        elk: {
          layoutOptions: {
            position: `(${10.0 * position}, 0.0)`,
          },
        },
      };
    }

    if (pullUp) {
      this.elkLayout.config['org.eclipse.elk.layered.layering.strategy'] =
        'INTERACTIVE';
    } else {
      delete this.elkLayout.config['org.eclipse.elk.layered.layering.strategy'];
    }

    this.setState({
      layoutStage: this.state.layoutStage + 1,
      nodes,
    });
  };

  render() {
    const { nodes, edges, width, height, layouting } = this.state;

    return (
      <div>
        <h1>Elk ordering</h1>
        <p>Graph laid out using Elk, passing node specific configuration</p>
        <svg id="schedule" width={width} height={height}>
          <DAGReact
            nodes={nodes}
            edges={edges}
            defaultNodeConfig={DEFAULT_NODE_CONFIG}
            defaultEdgeConfig={DEFAULT_EDGE_CONFIG}
            layoutStage={this.state.layoutStage}
            stage={this.state.layoutStage}
            graphLayoutStarted={() => {
              this.setState({ layouting: true });
            }}
            graphLayoutComplete={(width: number, height: number) => {
              this.setState({ layouting: false, width, height });
            }}
            graphLayout={this.elkLayout}
          />
          {layouting && (
            <rect style={{ fill: '#fff', width: '100%', height: '100%' }} />
          )}
        </svg>
        <div>
          <NodePositionForm orderChanged={this.orderChanged} />
        </div>
      </div>
    );
  }
}
