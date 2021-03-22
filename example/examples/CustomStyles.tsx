import * as React from "react";
import { customStyles } from "../data";
import { DagreReact, NodeOptions, EdgeOptions, RecursivePartial, PathGeneratorTypes } from "dagre-reactjs";
import { generatePathD3Curve } from "../paths/d3curve";

type CustomStylesState = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  customPathGenerators: PathGeneratorTypes;
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
      styles: { fill: "#fff", stroke: "#000" },
      cornerRadius: 0
    },
    label: {}
  }
};

const DEFAULT_EDGE_CONFIG = {
  styles: {
    edge: {
      styles: { fillOpacity: 0, stroke: "#000", strokeWidth: "1px" }
    }
  }
};

export class CustomStyles extends React.Component<{}, CustomStylesState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      nodes: customStyles.nodes,
      edges: customStyles.edges,
      customPathGenerators: {
        "d3curve": generatePathD3Curve,
      },
    };
  }

  render() {
    const { nodes, edges } = this.state;

    return (
      <div>
        <h1>Custom styles</h1>
        <p>
          Example that replicates the dagre-d3 custom styles example
        </p>
        <svg id="schedule" width={1150} height={1000}>
          <DagreReact
            nodes={nodes}
            edges={edges}
            defaultNodeConfig={DEFAULT_NODE_CONFIG}
            defaultEdgeConfig={DEFAULT_EDGE_CONFIG}
            customPathGenerators={this.state.customPathGenerators}
            graphOptions={{
              marginx: 15,
              marginy: 15,
              ranksep: 35,
              nodesep: 35
            }}
          />
        </svg>
      </div>
    );
  }
}
