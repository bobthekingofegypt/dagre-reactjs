import * as React from "react";
import { customButtonNodes } from "../data";
import { DagreReact, Node, Rect, ValueCache } from "../../src";
import { RecursivePartial, ReportSize, Size, NodeOptions, EdgeOptions } from "../../src/types";
import { CustomButtonLabel } from "../nodelabels/CustomButtonLabel";

export type CustomButtonNodesState = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
};

export class CustomButtonNodes extends React.Component<
  {},
  CustomButtonNodesState
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      ...customButtonNodes
    };
  }

  buttonClicked = (node: NodeOptions) => {
    console.log("button clicked");
    alert(`node ${node.id} button clicked`);
  };

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
        html={true}
      >
        {{
          shape: (innerSize: Size) => (
            <Rect node={node} innerSize={innerSize} />
          ),
          label: () => (
            <CustomButtonLabel
              onButtonClicked={() => this.buttonClicked(node)}
              title={node.label}
              description={node.meta.description}
            />
          )
        }}
      </Node>
    );
  };

  render() {
    const { nodes, edges } = this.state;

    return (
      <div>
        <svg id="schedule" width={1150} height={1000}>
          <DagreReact
            nodes={nodes}
            edges={edges}
            renderNode={this.renderNode}
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
