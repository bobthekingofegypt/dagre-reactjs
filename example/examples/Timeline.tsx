import {
  DagreReact,
  EdgeOptions,
  NodeOptions,
  RecursivePartial,
} from 'dagre-reactjs';
import * as React from 'react';

import { animateStory, steps } from '../animatedStory';

type TimelineState = {
  data: {
    nodes: Array<RecursivePartial<NodeOptions>>;
    edges: Array<RecursivePartial<EdgeOptions>>;
  };
  stage: number;
};

const DEFAULT_NODE_CONFIG: RecursivePartial<NodeOptions> = {
  styles: {
    node: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    shape: {},
    label: {
      styles: {
        fontWeight: 'bold',
      },
    },
  },
};

export class Timeline extends React.Component<{}, TimelineState> {
  interval?: number;

  constructor(props: {}) {
    super(props);

    this.state = {
      data: {
        nodes: [],
        edges: [],
      },
      stage: 1,
    };
  }

  componentDidMount() {
    this.interval = animateStory(
      steps,
      2000,
      (data: any) => this.setState({ data, stage: this.state.stage + 1 }),
      () => this.state.data
    );
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const { nodes, edges } = this.state.data;

    return (
      <div>
        <h1>Timeline</h1>
        <p>
          Example that shows updating the graph overtime and forcing relayouts
          creating a sort of animation effect
        </p>
        <svg id="schedule" width={1150} height={1000}>
          <DagreReact
            nodes={nodes}
            edges={edges}
            defaultNodeConfig={DEFAULT_NODE_CONFIG}
            graphOptions={{
              marginx: 15,
              marginy: 15,
              ranksep: 15,
              nodesep: 15,
              rankdir: 'LR',
            }}
            stage={this.state.stage}
          />
        </svg>
      </div>
    );
  }
}
