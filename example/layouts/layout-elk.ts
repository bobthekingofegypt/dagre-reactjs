import ELK from 'elkjs/lib/elk.bundled'
import { ElkExtendedEdge } from 'elkjs'

import { Graph as Layout, GraphLayout, NodeOptions, EdgeOptions, RecursivePartial, Size } from 'dagre-reactjs';

export class ElkLayout extends Layout implements GraphLayout {

  constructor() {
    super();
    console.log('RUNNING ELK');
  }

  setGraphLabelOptions() {
    // no-op
  }

  layout() {
      this.dirty = false;
    const elk = new ELK();

    const graph2: any = {
      id: "root",
      layoutOptions: { 
        'algorithm': 'layered',
        'crossingMinimization.semiInteractive': 'true',
        'elk.direction': 'DOWN',
        'org.eclipse.elk.layered.layering.strategy': 'INTERACTIVE',
        // 'org.eclipse.elk.edgeLabels.placement': 'CENTER',
        // 'org.eclipse.elk.layered.edgeLabels.sideSelection': 'SMART_UP',
      },
      children: this.nodes.map(node => {
        const position = node.meta && node.meta.elk ? node.meta.elk : undefined;
        if (position) {
          return {
            ...node,
            ...node.meta.elk,
          };
        }
        return node;
      }),
      width: 1000,
      height: 1000,
      edges: this.edges.map((edge) => {
        const id = `${edge.to}-${edge.from}`;
        const labels = [{
          width: edge.width,
          height: edge.height,
          text: "something",

        }];
        return {
          id,
          sources: [edge.from],
          targets: [edge.to],
          from: edge.from,
          to: edge.to,
          labels,
          layoutOptions: {
            'org.eclipse.elk.layered.edgeLabels.sideSelection': 'SMART_DOWN'
          }
        };
      })
    }

    console.log(graph2);
    return elk.layout(graph2)
      .then((graph) => {
        console.log(graph2);
        console.log(graph);
        const layoutEdges = graph.edges!;
        this.size = {
          width: graph.width!,
          height: graph.height!,
        };
        graph.children.forEach((node) => {
          console.log(node);
          const n = this.nodes.find((node2) => node2.id === node.id);
          n.x = node.x! + node.width!/2;
          n.y = node.y! + node.height!/2;
        });
        this.edges.forEach((edge) => {
          const id = `${edge.to}-${edge.from}`;
          const layoutEdge: ElkExtendedEdge = layoutEdges.find((link) => link.id === id) as ElkExtendedEdge;
          if (layoutEdge) {
            const points = [];
            points.push(layoutEdge.sections[0].startPoint);
            layoutEdge.sections[0].bendPoints?.forEach((point) => {
              points.push(point);
            });
            points.push(layoutEdge.sections[0].endPoint);
            edge.points = points;
            if (layoutEdge.labels && layoutEdge.labels.length > 0) {
              edge.x = layoutEdge.labels[0].x! + edge.width! / 2;
              edge.y = layoutEdge.labels[0].y! + edge.height! / 2;
            }
          }
        });
        return undefined;
      });
  }
}
