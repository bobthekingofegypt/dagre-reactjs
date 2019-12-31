import * as React from "react";
import { tcpStateData } from "../data";
import { DagreReact } from "../../src";
import { NodeOptions, EdgeOptions, RecursivePartial } from "../../src/types";

type TCPStateState = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
};

const DEFAULT_NODE_CONFIG: RecursivePartial<NodeOptions> = {
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
    label: {
      styles: {
        fontWeight: "bold"
      }
    }
  }
};

export class TCPState extends React.Component<{}, TCPStateState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      nodes: tcpStateData.nodes,
      edges: tcpStateData.edges
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
