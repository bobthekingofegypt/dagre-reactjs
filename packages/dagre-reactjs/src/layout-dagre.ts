import { GraphLabel, graphlib, layout as dagreLayout } from 'dagre';

import { Graph as Layout } from './graph';
import {
  EdgeOptions,
  GraphLayout,
  LayoutDagreConstructorOptions,
  NodeOptions,
  RecursivePartial,
} from './types';

export class LayoutDagre extends Layout implements GraphLayout {
  graph: graphlib.Graph;

  constructor({ multigraph }: LayoutDagreConstructorOptions) {
    super();
    // console.log('LAYOUT DAGRE');
    this.graph = new graphlib.Graph({ multigraph });

    this.graph.setGraph({});
    this.graph.setDefaultEdgeLabel(function () {
      return {};
    });
  }

  setGraphLabelOptions(options: Partial<GraphLabel>) {
    const graphLabel = this.graph.graph();

    const opts = Object.assign(graphLabel, options);
    this.graph.setGraph(opts);
  }

  setGraphData(
    nodesIn: Array<RecursivePartial<NodeOptions>>,
    edgesIn: Array<RecursivePartial<EdgeOptions>>,
    userDefaultNodeConfig: RecursivePartial<NodeOptions>,
    userDefaultEdgeConfig: RecursivePartial<NodeOptions>
  ) {
    super.setGraphData(
      nodesIn,
      edgesIn,
      userDefaultNodeConfig,
      userDefaultEdgeConfig
    );

    this.graph.nodes().forEach((n) => this.graph.removeNode(n));
    this.graph.edges().forEach((e) => {
      // Typescript compiler complains that removeEdge only expects 2 args
      // @ts-ignore
      this.graph.removeEdge(e.v, e.w, e.name);
    });

    this.nodes.forEach((node) => {
      this.graph.setNode(node.id, node);
    });
    this.edges.forEach((edge) => {
      this.graph.setEdge(edge.from, edge.to, edge, edge.name);
    });
  }

  layout() {
    dagreLayout(this.graph);
    const graphLabel = this.graph.graph();
    this.size = {
      width: graphLabel.width != null ? graphLabel.width : 0,
      height: graphLabel.height != null ? graphLabel.height : 0,
    };
    this.dirty = false;
    return undefined;
  }
}
