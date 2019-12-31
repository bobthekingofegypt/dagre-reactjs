import * as React from "react";
import { basic1 } from "../data";
import { Node, ValueCache, Rect, NodeTextLabel, DagreReact } from "../../src";
import { NodeOptions, EdgeOptions, RecursivePartial, ReportSize, Size } from "../../src/types";

type MouseEventsState = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  highlightedNode: string | undefined;
  stage: number;
};

export class MouseEvents extends React.Component<{}, MouseEventsState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      nodes: basic1.nodes,
      edges: basic1.edges,
      highlightedNode: undefined,
      stage: 1
    };
  }

  renderNode = (
    node: NodeOptions,
    reportSize: ReportSize,
    valueCache: ValueCache
  ) => {
    console.log("Testing");
    return (
      <Node
        key={node.id}
        node={node}
        reportSize={reportSize}
        valueCache={valueCache}
        html={false}
      >
        {{
          shape: (innerSize: Size) => {
            if (node.id === this.state.highlightedNode) {
              node.styles.shape.styles = {
                ...node.styles.shape.styles,
                fill: "#00008a"
              };
            }
            return (
              <g
                onMouseEnter={() =>
                  this.setState({
                    stage: this.state.stage + 1,
                    highlightedNode: node.id
                  })
                }
                onMouseLeave={() =>
                  this.setState({
                    stage: this.state.stage + 1,
                    highlightedNode: undefined
                  })
                }
              >
                <Rect node={node} innerSize={innerSize} />
              </g>
            );
          },
          label: () => <NodeTextLabel node={node} />
        }}
      </Node>
    );
  };

  render() {
    const { nodes, edges, stage } = this.state;

    return (
      <div>
        <svg id="schedule" width={1150} height={1000}>
          <DagreReact
            nodes={nodes}
            edges={edges}
            renderNode={this.renderNode}
            stage={stage}
            graphOptions={{
              marginx: 15,
              marginy: 15,
              rankdir: "LR",
              ranksep: 55,
              nodesep: 15
            }}
          />
        </svg>
      </div>
    );
  }
}
