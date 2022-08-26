import {
  DagreReact,
  EdgeOptions,
  Node,
  NodeOptions,
  NodeTextLabel,
  Rect,
  RecursivePartial,
  ReportSize,
  Size,
  ValueCache,
} from 'dagre-reactjs';
import * as React from 'react';
import ReactTooltip from 'react-tooltip';

import { basic1 } from '../data';

type MouseEventsState = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  highlightedNode: string | undefined;
  stage: number;
};

export class Tooltips extends React.Component<{}, MouseEventsState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      nodes: basic1.nodes,
      edges: basic1.edges,
      highlightedNode: undefined,
      stage: 1,
    };
  }

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
        html={false}
      >
        {{
          shape: (innerSize: Size) => {
            return (
              <g data-tip={node.label} data-type="error">
                <Rect node={node} innerSize={innerSize} />
              </g>
            );
          },
          label: () => <NodeTextLabel node={node} />,
        }}
      </Node>
    );
  };

  render() {
    const { nodes, edges, stage } = this.state;

    return (
      <div>
        <h1>Tooltips</h1>
        <p>
          Example that shows how a third party tooltip library could be
          integrated for use
        </p>
        <svg id="schedule" width={1150} height={1000}>
          <DagreReact
            nodes={nodes}
            edges={edges}
            renderNode={this.renderNode}
            stage={stage}
            graphOptions={{
              marginx: 15,
              marginy: 15,
              rankdir: 'LR',
              ranksep: 55,
              nodesep: 15,
            }}
          />
        </svg>
        <ReactTooltip />
      </div>
    );
  }
}
