import * as React from "react";
import { basic1 } from "../data";
import DagreReact from "../../src/DagreReact";
import { RecursivePartial, NodeOptions, EdgeOptions } from "../../src/types";

type Basic1State = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
};

export class Basic1 extends React.Component<{}, Basic1State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      nodes: basic1.nodes,
      edges: basic1.edges
    };
  }

  render() {
    const { nodes, edges } = this.state;

    return (
      <div>
        <svg id="schedule" width={1150} height={1000}>
          <DagreReact
            nodes={nodes}
            edges={edges}
            graphOptions={{
              marginx: 15,
              marginy: 15,
              rankdir: "LR",
              ranksep: 55,
              nodesep: 15
            }}
          />
        </svg>
      </div>
    );
  }
}
