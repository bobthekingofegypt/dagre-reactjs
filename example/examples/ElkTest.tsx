import * as React from "react";
import { interpolateRainbow } from "d3-scale-chromatic";
import { nodeOrdering} from "../data";
import { ElkLayout } from "../layouts/layout-elk";
import { D3DagGraph } from "../layouts/layout-d3dag";
import { DAGReact, LayoutDagre, RecursivePartial, NodeOptions, EdgeOptions, PathGeneratorTypes, LayoutType, GraphLayout } from "dagre-reactjs";
import GradientEdge from "../edges/GradientEdge";
import {layout} from "dagre";

type Basic2State = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  layoutStage: number;
};

const DEFAULT_NODE_CONFIG = {
  shape: "rect",
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
        strokeWidth: "2",
      },
      className: "basic2"
    },
    label: {
      className: "basic2label",
      styles: { 
        fill: "#000",
      },
    }
  }
};

const DEFAULT_EDGE_CONFIG = {
};


export class ElkTest extends React.Component<{}, Basic2State> {
  currentLayout: GraphLayout;
  dagreLayout: GraphLayout;
  d3DagLayout: GraphLayout;
  elkLayout: GraphLayout;

  constructor(props: {}) {
    super(props);

    this.dagreLayout = new LayoutDagre();
    this.elkLayout = new ElkLayout();
    this.d3DagLayout = new D3DagGraph();

    this.currentLayout = this.elkLayout;

    this.state = {
      nodes: nodeOrdering.nodes,
      edges: nodeOrdering.edges,
      layoutStage: 1,
    };
  }

  setLayout(e: any, layoutType: string) {
    if (layoutType === "dagre") {
      this.currentLayout = this.dagreLayout;
    } else if (layoutType === "elk") {
      this.currentLayout = this.elkLayout;
    } else {
      this.currentLayout = this.d3DagLayout;
    }
    
    e.preventDefault();

    this.setState({ layoutStage: this.state.layoutStage + 1});
  }


  render() {
    const { nodes, edges } = this.state;

    return (
      <div>
        <h1>D3 Dag</h1>
        <p>Graph laid out using d3-dag</p>
        <div>
          <a href="" onClick={(e) => this.setLayout(e, "dagre")}>dagre</a>&nbsp;
          <a href="" onClick={(e) => this.setLayout(e, "elk")}>elk</a>&nbsp;
          <a href="" onClick={(e) => this.setLayout(e, "d3dag")}>d3dag</a>
        </div>
        <svg id="schedule" width={1150} height={1000}>
          <DAGReact
            nodes={nodes}
            edges={edges}
            defaultNodeConfig={DEFAULT_NODE_CONFIG}
            defaultEdgeConfig={DEFAULT_EDGE_CONFIG}
            layoutStage={this.state.layoutStage}
            stage={this.state.layoutStage}
            graphOptions={{
              rankdir: 'TB',
              align: 'UL',
              ranker: 'tight-tree',
              ranksep: 55,
              nodesep: 35,
              marginx: 0,
              marginy: 0,
            }}
            graphLayout={this.currentLayout}
          />
        </svg>
      </div>
    );
  }
}

