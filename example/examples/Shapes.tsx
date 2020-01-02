import * as React from "react";
import { shapes } from "../data";
import { DagreReact, NodeOptions, EdgeOptions, RecursivePartial } from "../../.";

type ShapesState = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
};

const DEFAULT_NODE_CONFIG = {
  styles: {
    node: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    },
    shape: {},
    label: {}
  }
};

export class Shapes extends React.Component<{}, ShapesState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      nodes: shapes.nodes,
      edges: shapes.edges,
    };
  }

  render() {
    const { nodes, edges } = this.state;

    return (
      <div>
        <h1>Shapes</h1>
        <p>Example showing the use of built in shapes circle, diamond and rectangle</p>
        <svg id="schedule" width={1150} height={1000}>
          <DagreReact
            nodes={nodes}
            edges={edges}
            defaultNodeConfig={DEFAULT_NODE_CONFIG}
            graphOptions={{
              marginx: 15,
              marginy: 15,
              ranksep: 55,
              nodesep: 35
            }}
          />
        </svg>
      </div>
    );
  }
}
