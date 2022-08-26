import * as d3Dag from 'd3-dag';
import {
  DAGReact,
  EdgeOptions,
  GraphLayout,
  LayoutDagre,
  NodeOptions,
  RecursivePartial,
} from 'dagre-reactjs';
import { D3DagGraph } from 'dagre-reactjs-d3dag-layout';
import { ElkLayout } from 'dagre-reactjs-elk-layout';
import * as React from 'react';

import { nodeOrdering } from '../data';

type Basic2State = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  layoutStage: number;
};

const DEFAULT_NODE_CONFIG = {
  shape: 'rect',
  styles: {
    node: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
    shape: {
      styles: {
        strokeWidth: '2',
      },
      className: 'basic2',
    },
    label: {
      className: 'basic2label',
      styles: {
        fill: '#000',
      },
    },
  },
};

const DEFAULT_EDGE_CONFIG = {};

export class CustomLayouts extends React.Component<{}, Basic2State> {
  currentLayout: GraphLayout;
  dagreLayout: GraphLayout;
  d3DagLayout: GraphLayout;
  elkLayout: GraphLayout;

  constructor(props: {}) {
    super(props);

    this.dagreLayout = new LayoutDagre();
    this.elkLayout = new ElkLayout({
      algorithm: 'layered',
      'crossingMinimization.semiInteractive': 'true',
      'elk.direction': 'DOWN',
      'org.eclipse.elk.layered.layering.strategy': 'INTERACTIVE',
    });
    this.d3DagLayout = new D3DagGraph(
      d3Dag
        .sugiyama()
        .layering(
          d3Dag.layeringSimplex().rank((node) => {
            if (node.id === '1' || node.id === '0') {
              return 1;
            }
            return undefined;
          })
        )
        .decross(d3Dag.decrossTwoLayer())
        .coord(d3Dag.coordCenter())
        .nodeSize((node: any) => {
          if (!node.data) {
            return [0, 0];
          }
          return [node.data._node.width + 60, node.data._node.height + 60];
        })
    );

    this.currentLayout = this.elkLayout;

    this.state = {
      nodes: nodeOrdering.nodes,
      edges: nodeOrdering.edges,
      layoutStage: 1,
    };
  }

  setLayout(e: any, layoutType: string) {
    if (layoutType === 'dagre') {
      this.currentLayout = this.dagreLayout;
    } else if (layoutType === 'elk') {
      this.currentLayout = this.elkLayout;
    } else {
      this.currentLayout = this.d3DagLayout;
    }

    e.preventDefault();

    this.setState({ layoutStage: this.state.layoutStage + 1 });
  }

  render() {
    const { nodes, edges } = this.state;

    return (
      <div>
        <h1>Custom layouts</h1>
        <p>Switch between custom layout engines, dagre, d3-dag and elk</p>
        <div>
          <a href="." onClick={(e) => this.setLayout(e, 'dagre')}>
            dagre
          </a>
          &nbsp;
          <a href="." onClick={(e) => this.setLayout(e, 'elk')}>
            elk
          </a>
          &nbsp;
          <a href="." onClick={(e) => this.setLayout(e, 'd3dag')}>
            d3dag
          </a>
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
