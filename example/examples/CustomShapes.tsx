import * as React from "react";
import { customShapes } from "../data";
import { DagreReact, ValueCache } from "../../src";
import { NodeOptions, EdgeOptions, Point, RecursivePartial, ShapesDefinition } from "../../src/types";
import { House, calculateHousePoints } from "../shapes/House";
import { intersectPolygon2, intersectPath } from "../shapes/intersects/custom";
import {Cloud, calculateCloudPath} from "../shapes/Cloud";

type CustomShapesState = {
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

export class CustomShapes extends React.Component<{}, CustomShapesState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      nodes: customShapes.nodes,
      edges: customShapes.edges,
      customShapes: {
        cloud: {
          renderer: Cloud,
          intersection: (node: NodeOptions, point: Point, valueCache: ValueCache) => {
            const labelSize = valueCache.value(`${node.id}-label-size`);
            const path = calculateCloudPath(labelSize);
            return intersectPath(node, point, path);
          }
        },
        house: {
          renderer: House,
          intersection: (node: NodeOptions, point: Point, valueCache: ValueCache) => {
            const labelSize = valueCache.value(`${node.id}-label-size`);
            const polyPoints = calculateHousePoints(labelSize);
            return intersectPolygon2(node, point, polyPoints);
          }
        }
      }
    };
  }

  render() {
    const { nodes, edges } = this.state;

    return (
      <div>
        <h1>Custom shapes</h1>
        <p>Example that shows how to declare and use custom shapes well still using the built in node component for sizing.  This example is currently broken as line intersections with the cloud don't work corectly, hopefully a new version of kld-intersection will be released soon that fixes the issue</p>
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
