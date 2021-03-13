import * as React from "react";
import { interpolateRainbow } from "d3-scale-chromatic";
import { d3DagGrafo} from "../data";
import { DagreReact, RecursivePartial, NodeOptions, EdgeOptions, PathGeneratorTypes, LayoutType } from "../../.";
import { generatePathD3Curve } from "../paths/d3CatmullRomcurve";
import GradientEdge from "../edges/GradientEdge";

type Basic2State = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  customPathGenerators: PathGeneratorTypes;
  colorMap: any;
};

const DEFAULT_NODE_CONFIG = {
  shape: "circle",
  styles: {
    node: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      }
    },
    shape: {
      styles: { 
        strokeWidth: "0",
      },
      className: "basic2"
    },
    label: {
      className: "basic2label",
      styles: { 
        fill: "#fff",
        fontWeight: "bold"
      },
    }
  }
};

const DEFAULT_EDGE_CONFIG = {
  pathType: "d3curve",
  styles: {
  }
};


export class D3Dag extends React.Component<{}, Basic2State> {
  constructor(props: {}) {
    super(props);

    const size = d3DagGrafo.nodes.length
    const interp = interpolateRainbow;
    const colorMap = {};
    for (let i = 0; i < d3DagGrafo.nodes.length; i++) {
      const node = d3DagGrafo.nodes[i];
      const color = interp(i / size);

      node.styles = {
        shape: {
          styles: {
            fill: color,
            fillOpacity: 1
          }
        }
      };
      colorMap[node.id] = color; 
    }

    this.state = {
      nodes: d3DagGrafo.nodes,
      colorMap,
      edges: d3DagGrafo.edges,
      customPathGenerators: {
        "d3curve": generatePathD3Curve,
      },
    };
  }

  renderEdge = (index: number, edgeMeta: EdgeOptions) => {

    return (
      <GradientEdge
        key={`${edgeMeta.from}-${edgeMeta.to}`}
        index={index}
        edgeMeta={edgeMeta}
        colorMap={this.state.colorMap}
      />
    );
  };


  render() {
    const { nodes, edges } = this.state;

    return (
      <div>
        <h1>D3 Dag</h1>
        <p>Graph laid out using d3-dag</p>
        <svg id="schedule" width={1150} height={1000}>
          <DagreReact
            nodes={nodes}
            edges={edges}
            defaultNodeConfig={DEFAULT_NODE_CONFIG}
            defaultEdgeConfig={DEFAULT_EDGE_CONFIG}
            renderEdge={this.renderEdge}
            customPathGenerators={this.state.customPathGenerators}
            graphOptions={{
              marginx: 15,
              marginy: 15,
              ranksep: 55,
              nodesep: 35
            }}
            layoutType={LayoutType.D3Dag}
          />
        </svg>
      </div>
    );
  }
}

