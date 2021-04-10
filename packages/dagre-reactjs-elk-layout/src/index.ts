import {
  EdgeOptions,
  Graph as Layout,
  GraphLayout,
  NodeOptions,
} from 'dagre-reactjs';
import { ElkExtendedEdge, ElkLabel, ElkPoint } from 'elkjs';
import ELKConstructor, {
  ELK,
  ElkNode,
  LayoutOptions,
} from 'elkjs/lib/elk.bundled';

export type ElkConfig = LayoutOptions;
interface DRElkNode extends ElkNode {
  _node: NodeOptions;
}
interface DRElkExtendedEdge extends ElkExtendedEdge {
  _edge: EdgeOptions;
}

export class ElkLayout extends Layout implements GraphLayout {
  config: ElkConfig;
  elk: ELK;

  constructor(config: ElkConfig) {
    super();
    console.log('RUNNING ELK');
    this.config = config;
    this.elk = new ELKConstructor();
  }

  setGraphLabelOptions() {
    // no-op
  }

  async layout() {
    this.dirty = false;

    const elkNode: ElkNode = {
      id: 'root',
      layoutOptions: this.config,
      children: this.nodes.map((node) => {
        const position = node.meta && node.meta.elk ? node.meta.elk : undefined;
        if (position) {
          return {
            ...node,
            ...node.meta.elk,
            _node: node,
          };
        }
        return {
          ...node,
          _node: node,
        };
      }),
      width: 0,
      height: 0,
      edges: this.edges.map((edge) => {
        const id = `${edge.to}-${edge.from}`;
        const labels: ElkLabel[] = [
          {
            id: 'something',
            width: edge.width,
            height: edge.height,
            text: 'something',
          },
        ];
        return {
          id,
          sources: [edge.from],
          targets: [edge.to],
          sections: [],
          labels,
          layoutOptions: {
            'org.eclipse.elk.layered.edgeLabels.sideSelection': 'SMART_DOWN',
          },
          _edge: edge,
        } as DRElkExtendedEdge;
      }),
    };

    console.log(elkNode);
    return this.elk.layout(elkNode).then((graph: ElkNode) => {
      if (!graph.children || !graph.edges || !graph.width || !graph.height) {
        console.log('Warning: layout did not complete correctly');
        return undefined;
      }

      this.size = {
        width: graph.width,
        height: graph.height,
      };

      graph.children.forEach((node: DRElkNode) => {
        if (!node.x || !node.y || !node.width || !node.height) {
          console.log('Warning: layout did not complete correctly');
        } else {
          const n = node._node;
          if (n) {
            n.x = node.x + n.width / 2;
            n.y = node.y + n.height / 2;
          }
        }
      });

      graph.edges.forEach((edge: DRElkExtendedEdge) => {
        if (!edge.sections) {
          console.log(
            'Warning: layout did not complete correctly, edges not complete'
          );
          return;
        }

        const e = edge._edge;
        const points: ElkPoint[] = [];

        points.push(edge.sections[0].startPoint);

        edge.sections[0].bendPoints?.forEach((point) => {
          points.push(point);
        });
        points.push(edge.sections[0].endPoint);
        e.points = points;

        if (edge.labels && edge.labels.length > 0) {
          if (!edge.labels[0].x || !edge.labels[0].y) {
            console.log(
              'Warning: layout did not complete correctly, edge label is not positioned'
            );
            return;
          }
          // if (!e.width || !e.height) {
          //   return;
          // }

          e.x = edge.labels[0].x + e.width / 2;
          e.y = edge.labels[0].y + e.height / 2;
        }
      });

      return undefined;
    });
  }
}
