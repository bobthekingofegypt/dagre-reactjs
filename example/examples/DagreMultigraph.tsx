import {
  DagreReact,
  EdgeOptions,
  NodeOptions,
  RecursivePartial,
} from 'dagre-reactjs';
import * as React from 'react';

import { multigraph } from '../data';

type Basic1State = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  width: number;
  height: number;
};

export class DagreMultigraph extends React.Component<{}, Basic1State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      nodes: multigraph.nodes,
      edges: multigraph.edges,
      width: 0,
      height: 0,
    };
  }

  render() {
    const { nodes, edges } = this.state;

    return (
      <div>
        <h1>Dagre Multigraph</h1>
        <p>Demonstration of dagre multigraph</p>
        <svg id="schedule" width={this.state.width} height={this.state.height}>
          <DagreReact
            nodes={nodes}
            edges={edges}
            multigraph
            graphOptions={{
              marginx: 15,
              marginy: 15,
              rankdir: 'LR',
              ranksep: 55,
              nodesep: 15,
            }}
            graphLayoutComplete={(width, height) =>
              this.setState({
                width: width as number,
                height: height as number,
              })
            }
          />
        </svg>
      </div>
    );
  }
}
