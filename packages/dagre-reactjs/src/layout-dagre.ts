import { graphlib, GraphLabel, layout as dagreLayout } from 'dagre';
import { Graph as Layout } from './graph';
import { NodeOptions, EdgeOptions, RecursivePartial, GraphLayout } from './types';

export class LayoutDagre extends Layout implements GraphLayout {
  graph: graphlib.Graph;

  constructor() {
    super();
    console.log('LAYOUT DAGRE');
    this.graph = new graphlib.Graph();

    this.graph.setGraph({});
    this.graph.setDefaultEdgeLabel(function() {
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
    super.setGraphData(nodesIn, edgesIn, userDefaultNodeConfig, userDefaultEdgeConfig);

    this.graph.nodes().forEach(n => this.graph.removeNode(n));
    this.graph.edges().forEach(e => this.graph.removeEdge(e.v, e.w));

    this.nodes.forEach(node => {
      this.graph.setNode(node.id, node);
    });
    this.edges.forEach(edge => {
      this.graph.setEdge(edge.from, edge.to, edge);
    });
  }

  layout() {
    dagreLayout(this.graph);
    this.size = {
      width: this.graph.graph().width!,
      height: this.graph.graph().height!,
    };
    this.dirty = false;
    return undefined;
  }
}
