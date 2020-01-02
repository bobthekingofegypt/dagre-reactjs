import * as React from "react";
import { customPaths } from "../data";
import { DagreReact, NodeOptions, EdgeOptions, RecursivePartial, PathGeneratorTypes, MarkerComponents } from "../../.";
import { generatePathD3Curve } from "../paths/d3curve";
import { CircleMarker } from "../markers/CircleMarker";

type CustomPathsState = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  customPathGenerators: PathGeneratorTypes;
  customMarkerComponents: MarkerComponents;
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

export class CustomPathsType extends React.Component<{}, CustomPathsState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      nodes: customPaths.nodes,
      edges: customPaths.edges,
      customPathGenerators: {
        "d3curve": generatePathD3Curve,
      },
      customMarkerComponents: {
        "circle": CircleMarker,
      }
    };
  }

  render() {
    const { nodes, edges } = this.state;

    return (
      <div>
        <h1>Custom edge paths</h1>
        <p>Example that shows the use of custom interpolation for paths and custom markers</p>
        <svg id="schedule" width={1150} height={1000}>
          <DagreReact
            nodes={nodes}
            edges={edges}
            defaultNodeConfig={DEFAULT_NODE_CONFIG}
            customPathGenerators={this.state.customPathGenerators}
            customMarkerComponents={this.state.customMarkerComponents}
            graphOptions={{
              marginx: 15,
              marginy: 15,
              ranksep: 155,
              nodesep: 135
            }}
          />
        </svg>
      </div>
    );
  }
}
