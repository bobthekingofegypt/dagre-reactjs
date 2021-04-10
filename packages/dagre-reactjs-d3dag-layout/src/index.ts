import * as d3Dag from 'd3-dag';
import {
  EdgeOptions,
  Graph as Layout,
  GraphLayout,
  NodeOptions,
} from 'dagre-reactjs';

export class D3DagGraph extends Layout implements GraphLayout {
  dag: any;
  nodesMap: Map<string, NodeOptions>;
  d3DagLayout: any;

  constructor(layout: any) {
    super();
    console.log('LAYOUT D3Dag');

    this.dag = d3Dag.dagStratify();

    this.nodesMap = new Map();

    if (layout) {
      this.d3DagLayout = layout;
    } else {
      this.d3DagLayout = d3Dag
        .sugiyama()
        .layering(d3Dag.layeringLongestPath())
        .decross(d3Dag.decrossTwoLayer())
        .coord(d3Dag.coordCenter())
        .nodeSize((node: any) => {
          if (!node.data) {
            return [0, 0];
          }
          // TODO not set this for user, not sure how to configure it yet
          return [node.data._node.width + 60, node.data._node.height + 60];
        });
    }
  }

  layout() {
    const d3DagNodes = this.nodes.map((node) => {
      const parents = this.edges
        .filter((edge) => edge.to === node.id)
        .map((edge: EdgeOptions) => edge.from);

      this.nodesMap.set(node.id, node);

      return {
        id: node.id,
        _node: node,
        parentIds: parents,
      };
    });

    const dag = this.dag(d3DagNodes);
    const result = this.d3DagLayout(dag);
    this.size = {
      width: result.width,
      height: result.height,
    };

    const links = dag.links();
    const nodes = dag.descendants();
    nodes.forEach((node: any) => {
      const n = node.data._node;

      if (n) {
        n.x = node.x;
        n.y = node.y;
      }
    });

    links.forEach((link: any) => {
      // TODO replace this with faster lookup
      const edge = this.edges.find(
        (edge) => edge.from === link.source.id && edge.to === link.target.id
      );
      if (edge) {
        edge.points = link.points;
      }
    });

    this.dirty = false;
    return undefined;
  }
}
