import * as React from 'react';

import { LayoutDagre } from './layout-dagre';
import DAGReact from './DAGReact';
import {
  LayoutType,
  DAGReactProps
} from './types';

type DagreReactProps = DAGReactProps & {
  graphOptions: GraphOptions
};

export interface GraphOptions {
  marginx?: number;
  marginy?: number;
  rankdir?: string;
  ranksep?: number;
  nodesep?: number;
  [key: string]: number | string | object | undefined;
}

type DagreReactState = {
  graphLayout: LayoutDagre;
};

export default class DagreReact extends React.Component<
  DagreReactProps,
  DagreReactState
> {
  static defaultProps = {
    customShapes: {},
    customNodeLabels: {},
    customEdgeLabels: {},
    customPathGenerators: {},
    customArrowHeads: {},
    customMarkerComponents: {},
    defaultNodeConfig: {},
    defaultEdgeConfig: {},
    nodes: [],
    edges: [],
    graphOptions: {},
    graphLayoutComplete: () => {},
    stage: 1,
    layoutStage: 1,
    layoutType: LayoutType.Dagre,
  };

  constructor(props: DagreReactProps) {
    super(props);

    this.state = {
      graphLayout: new LayoutDagre()
    };
  }

  render() {
    return (
      <DAGReact 
        {...this.props}
        {...this.state}
      />
    );
  }
}
