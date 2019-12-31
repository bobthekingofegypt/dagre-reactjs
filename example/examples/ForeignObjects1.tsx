import * as React from "react";
import { foreignObjects } from "../data";
import { DagreReact } from "../../src";
import { NodeOptions, EdgeOptions, RecursivePartial, NodeLabelsDefinition, EdgeLabelsDefinition } from "../../src/types";
import {Foreign} from "../nodelabels/Foreign";
import {ForeignLabel} from "../edgelabels/ForeignLabel";

type ForeignObjectsState = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  customNodeLabels: NodeLabelsDefinition;
  customEdgeLabels: EdgeLabelsDefinition;
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

export class ForeignObjects1 extends React.Component<{}, ForeignObjectsState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      nodes: foreignObjects.nodes,
      edges: foreignObjects.edges,
      customNodeLabels: {
        "foreign": {
          renderer: Foreign,
          html: true
        }
      },
      customEdgeLabels: {
        "foreign": {
          renderer: ForeignLabel,
          html: true
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
            customNodeLabels={this.state.customNodeLabels}
            customEdgeLabels={this.state.customEdgeLabels}
            defaultNodeConfig={DEFAULT_NODE_CONFIG}
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
