import * as React from "react";
import { basic1 } from "../data";
import {} from "../../src";
import { Node, ValueCache, Rect, NodeTextLabel, DagreReact, NodeOptions, EdgeOptions, RecursivePartial, ReportSize, Size } from "dagre-reactjs";

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
              node.styles.label.styles = {
                ...node.styles.label.styles,
                fill: "#fff"
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
        <h1>Timeline</h1>
        <p>Example that shows updating styles on mouse over, currently unsure of the best way to perform these operations, this is one possible route I was looking at.  Warning changing the raw data without issuing a stage change will not trigger a change in the graph as the dagrereact component has its own copy of the data from the initial props.</p>
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
