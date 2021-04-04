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
} from 'dagre-reactjs';
import * as React from 'react';

import { customButtonNodes } from '../data';
import { CustomButtonLabel } from '../nodelabels/CustomButtonLabel';

export type CustomButtonNodesState = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
};

export class CustomButtonNodes extends React.Component<
  {},
  CustomButtonNodesState
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      ...customButtonNodes,
    };
  }

  buttonClicked = (node: NodeOptions) => {
    console.log('button clicked');
    alert(`node ${node.id} button clicked`);
  };

  renderNode = (
    node: NodeOptions,
    reportSize: ReportSize,
    valueCache: ValueCache
  ) => {
    return (
      <Node
        key={node.id}
        node={node}
        reportSize={reportSize}
        valueCache={valueCache}
        html={true}
      >
        {{
          shape: (innerSize: Size) => (
            <Rect node={node} innerSize={innerSize} />
          ),
          label: () => (
            <CustomButtonLabel
              onButtonClicked={() => this.buttonClicked(node)}
              title={node.label}
              description={node.meta.description}
            />
          ),
        }}
      </Node>
    );
  };

  render() {
    const { nodes, edges } = this.state;

    return (
      <div>
        <h1>Custom button nodes</h1>
        <p>
          Example that shows the use of custom foreign objects using the
          override renderNode method. This allows the insertion of your own
          event handling, prop passing or complex flows you may want to perform
        </p>
        <svg id="schedule" width={1150} height={1000}>
          <DagreReact
            nodes={nodes}
            edges={edges}
            renderNode={this.renderNode}
            graphOptions={{
              marginx: 15,
              marginy: 15,
              rankdir: 'LR',
              ranksep: 55,
              nodesep: 15,
            }}
          />
        </svg>
      </div>
    );
  }
}
