import * as React from "react";
import { shapes } from "../data";
import { DagreReact, ValueCache } from "../../src";
import { NodeOptions, EdgeOptions, RecursivePartial, Point, ShapesDefinition } from "../../src/types";
import {Diamond, calculateDiamondPoints} from "../shapes/Diamond";
import {intersectPolygon2} from "../shapes/intersects/diamond";

type ShapesState = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  customShapes: ShapesDefinition;
};

const DEFAULT_NODE_CONFIG = {
  styles: {
    node: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    },
    shape: {},
    label: {}
  }
};

export class Shapes extends React.Component<{}, ShapesState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      nodes: shapes.nodes,
      edges: shapes.edges,
      customShapes: {
        diamond: {
          renderer: Diamond,
          intersection: (node: NodeOptions, point: Point, valueCache: ValueCache) => {
            const labelSize = valueCache.value(`${node.id}-label-size`);
            const points = calculateDiamondPoints(labelSize);
            return intersectPolygon2(node, point, points);
          }
        }
      }
    };
  }

  render() {
    const { nodes, edges } = this.state;

    return (
      <div>
        <svg id="schedule" width={1150} height={1000}>
          <DagreReact
            nodes={nodes}
            edges={edges}
            defaultNodeConfig={DEFAULT_NODE_CONFIG}
            customShapes={this.state.customShapes}
            graphOptions={{
              marginx: 15,
              marginy: 15,
              ranksep: 55,
              nodesep: 35
            }}
          />
        </svg>
      </div>
    );
  }
}
