import * as React from "react";
import { tcpStateData } from "../data";
import { DagreReact, NodeOptions, EdgeOptions, RecursivePartial } from "../../.";

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

const DEFAULT_EDGE_CONFIG: RecursivePartial<EdgeOptions> = {
  styles: {
    label: {
      styles: { fill: "#868686" }
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
        <h1>TCPState</h1>
        <p>Example that sort of mimics the dagre-d3 example showing tcp state, not supposed to be the exact same</p>
        <svg id="schedule" width={1150} height={1000}>
          <DagreReact
            nodes={nodes}
            edges={edges}
            defaultNodeConfig={DEFAULT_NODE_CONFIG}
            defaultEdgeConfig={DEFAULT_EDGE_CONFIG}
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
