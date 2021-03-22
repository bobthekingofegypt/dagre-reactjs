import * as d3Dag from 'd3-dag';

import { Graph as Layout, NodeOptions, EdgeOptions, RecursivePartial, GraphLayout } from 'dagre-reactjs';

export class D3DagGraph extends Layout implements GraphLayout {
  dag: any;
  nodesMap: Map<String, NodeOptions>;
  d3DagLayout: any;

  constructor() {
    super();
    console.log('LAYOUT D3Dag');

    this.dag = d3Dag.dagStratify();

    this.nodesMap = new Map();

    this.d3DagLayout = d3Dag
      .sugiyama()
      .layering(d3Dag.layeringSimplex().rank((node) => {
        console.log("n", node); 
        if (node.id === "1" || node.id === "2") {
          return 1;
        }
        return undefined;
      }))
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
    super.setGraphData(nodesIn, edgesIn, userDefaultNodeConfig, userDefaultEdgeConfig);

    this.nodesMap.clear();

    this.nodes.forEach(node => {
      const parents = this.edges
        .filter(edge => edge.to === node.id)
        .map((edge: EdgeOptions) => edge.from);
      node.parentIds = parents;
      this.nodesMap.set(node.id, node);
    });
  }

  layout() {
    const dag = this.dag(this.nodes);
    const result = this.d3DagLayout(dag);
    this.size = {
      width: result.width,
      height: result.height,
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
    return undefined;
  }
}
