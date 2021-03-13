import * as d3Dag from 'd3-dag';

import defaultsDeep from 'lodash/defaultsDeep';
import { defaultNodeConfig, defaultEdgeConfig } from './config_defaults';
import { NodeOptions, EdgeOptions, RecursivePartial, Size } from './types';

export class D3DagGraph {
  dag: any;
  nodes: Array<NodeOptions>;
  nodesMap: Map<String, NodeOptions>;
  edges: Array<EdgeOptions>;
  dirty: boolean;
  d3DagLayout: any;
  dagSize: Size;

  constructor() {
    console.log("RUNNING D3Dag");
    this.dag = d3Dag.dagStratify();

    this.nodes = [];
    this.nodesMap = new Map();
    this.edges = [];
    this.dirty = false;
    this.dagSize = {
      width: 0,
      height: 0
    };

    this.d3DagLayout = d3Dag
      .sugiyama()
      .layering(d3Dag.layeringLongestPath())
      .decross(d3Dag.decrossTwoLayer())
      .coord(d3Dag.coordCenter())
      .nodeSize((node: any) => {
        if (!node.data) {
          return [0, 0];
        }
        return [node.data.width + 60, node.data.height + 60];
      });
  }

  setGraphLabelOptions() {
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

    this.nodesMap.clear();

    nodes.forEach(node => {
      const parents = edges
        .filter(edge => edge.to === node.id)
        .map((edge: EdgeOptions) => edge.from);
      node.parentIds = parents;
      this.nodesMap.set(node.id, node);
    });

    this.nodes = nodes;
    this.edges = edges;
  }

  scheduleLayout() {
    this.dirty = true;
  }

  layout() {
    const dag = this.dag(this.nodes);
    const result = this.d3DagLayout(dag);
    this.dagSize = {
      width: result.width,
      height: result.height
    };

    const links = dag.links();
    const nodes = dag.descendants();
    nodes.forEach((node: any) => {
      const n = this.nodesMap.get(node.id);
      if (n) {
        n.x = node.x;
        n.y = node.y;
      }
    });
    links.forEach((link: any) => {
      // TODO replace this with faster lookup
      const edge = this.edges.find(
        edge => edge.from === link.source.id && edge.to === link.target.id
      );
      if (edge) {
        edge.points = link.points;
      }
    });

    this.dirty = false;
  }

  graphSize(): Size {
    return {
      width: this.dagSize.width,
      height: this.dagSize.height,
    };
  }

  layoutIfSized() {
    if (this.isValuesSized()) {
      this.scheduleLayout();
      return true;
    }
    return false;
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
