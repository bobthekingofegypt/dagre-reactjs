import * as React from "react";
import { basic1 } from "../data";
import { DagreReact, RecursivePartial, NodeOptions, EdgeOptions } from "dagre-reactjs";

type Basic1State = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  width: number;
  height: number;
};

export class Basic1 extends React.Component<{}, Basic1State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      nodes: basic1.nodes,
      edges: basic1.edges,
      width: 0,
      height: 0,
    };
  }

  render() {
    const { nodes, edges } = this.state;

    return (
      <div>
        <h1>Basic 1</h1>
        <p>Simple demonstration of some nodes connected together with some edges</p>
        <svg id="schedule" width={this.state.width} height={this.state.height}>
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
            graphLayoutComplete={(width, height) => this.setState({width: width as number, height: height as number})}
          />
        </svg>
      </div>
    );
  }
}
