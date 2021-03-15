import { graphlib, GraphLabel, layout as dagreLayout, Edge } from 'dagre';
import defaultsDeep from 'lodash/defaultsDeep';
import { defaultNodeConfig, defaultEdgeConfig } from './config_defaults';
import { NodeOptions, EdgeOptions, RecursivePartial, Size } from './types';

export class Graph {
  graph: graphlib.Graph;
  nodes: Array<NodeOptions>;
  edges: Array<EdgeOptions>;
  dirty: boolean;

  constructor() {
    console.log('RUNNING DAGRE');
    this.graph = new graphlib.Graph();

    this.graph.setGraph({});
    this.graph.setDefaultEdgeLabel(function() {
      return {};
    });

    this.nodes = [];
    this.edges = [];
    this.dirty = false;
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
    const nodesInCopy: Array<NodeOptions> = JSON.parse(JSON.stringify(nodesIn));
    const edgesInCopy: Array<EdgeOptions> = JSON.parse(JSON.stringify(edgesIn));

    const nodes = nodesInCopy.map(node =>
      defaultsDeep({}, node, userDefaultNodeConfig, defaultNodeConfig)
    );
    const edges = edgesInCopy.map(edge =>
      defaultsDeep({}, edge, userDefaultEdgeConfig, defaultEdgeConfig)
    );

    this.graph.nodes().forEach(n => this.graph.removeNode(n));
    this.graph.edges().forEach(e => this.graph.removeEdge(e.v, e.w));

    nodes.forEach(node => {
      node.width = undefined;
      node.height = undefined;

      this.graph.setNode(node.id, node);
    });
    edges.forEach(edge => {
      edge.width = undefined;
      edge.height = undefined;
      edge.points = undefined;

      this.graph.setEdge(edge.from, edge.to, edge);
    });

    this.nodes = nodes;
    this.edges = edges;
  }

  graphEdges(): Array<Edge> {
    return this.graph.edges();
  }

  scheduleLayout() {
    this.dirty = true;
  }

  layout() {
    // console.log("running dagre layout");
    dagreLayout(this.graph);
    this.dirty = false;
  }

  layoutIfSized() {
    if (this.isValuesSized()) {
      this.scheduleLayout();
      return true;
    }
    return false;
  }

  graphSize(): Size {
    return {
      width: this.graph.graph().width!,
      height: this.graph.graph().height!,
    };
  }

  graphNodeById(id: string): NodeOptions | undefined {
    return this.nodes.find(node => node.id === id);
  }

  setEdgeLabelSize(index: number, width: number, height: number) {
    const edges = this.edges;

    const edge = edges[index];
    edge.width = width;
    edge.height = height;
  }

  setNodeSize(index: number, width: number, height: number) {
    const nodes = this.nodes;

    const node = nodes[index];
    node.width = width;
    node.height = height;
  }

  isValuesSized() {
    const nodes = this.nodes;
    const edges = this.edges;

    const nonSizedEdge = edges.find(
      edge => !(edge.width !== undefined && edge.height !== undefined)
    );
    const nonSizedNode = nodes.find(
      node => !(node.width !== undefined && node.height !== undefined)
    );
    // console.log(
    // `nonSizedNode: ${nonSizedNode}; nonSizedEdge: ${nonSizedEdge}`,
    // nonSizedEdge
    // );

    return !nonSizedNode && !nonSizedEdge;
  }
}
