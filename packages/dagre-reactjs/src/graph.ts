import defaultsDeep from 'lodash/defaultsDeep';
import { defaultNodeConfig, defaultEdgeConfig } from './config_defaults';
import { NodeOptions, EdgeOptions, GraphLayout, RecursivePartial, Size } from './types';

export class Graph implements GraphLayout {
  nodes: Array<NodeOptions>;
  edges: Array<EdgeOptions>;
  dirty: boolean;
  size: Size;

  constructor() {
    this.nodes = [];
    this.edges = [];
    this.size = { width: 0, height: 0 };
    this.dirty = false;
  }

  setGraphLabelOptions(options: { [key: string]: any }) {
    // no-op
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

    nodes.forEach(node => {
      node.width = undefined;
      node.height = undefined;
      node.x = 0;
      node.y = 0;
    });
    edges.forEach(edge => {
      edge.width = undefined;
      edge.height = undefined;
      edge.points = undefined;
    });

    this.nodes = nodes;
    this.edges = edges;
  }

  scheduleLayout() {
    this.dirty = true;
  }

  layout(): Promise<void> | undefined {
    this.dirty = false;
    return undefined;
  }

  layoutIfSized() {
    if (this.isValuesSized()) {
      this.scheduleLayout();
      return true;
    }
    return false;
  }

  graphSize(): Size {
    return this.size;
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
