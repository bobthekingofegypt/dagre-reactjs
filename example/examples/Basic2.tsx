import * as React from "react";
import { basic2 } from "../data";
import { DagreReact } from "../../src";
import { RecursivePartial, NodeOptions, EdgeOptions } from "../../src/types";

type Basic2State = {
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
    shape: {
      styles: { stroke: "#000" },
      className: "basic2"
    },
    label: {
      className: "basic2label"
    }
  }
};


export class Basic2 extends React.Component<{}, Basic2State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      nodes: basic2.nodes,
      edges: basic2.edges 
    };
  }

  render() {
    const { nodes, edges } = this.state;

    return (
      <div>
        <h1>Basic 2</h1>
        <p>Extends basic 1 with some custom class names applied to the end nodes</p>
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

