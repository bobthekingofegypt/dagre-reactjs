import * as React from 'react';
import { basic1 } from '../data';
import DagreReact from '../../src/DagreReact';
import { RecursivePartial, NodeOptions, EdgeOptions } from '../../src/types';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import AutoSizer from 'react-virtualized-auto-sizer';
import {number} from 'prop-types';

type PanAndZoomState = {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  width: number,
  height: number;
};

export class PanAndZoom extends React.Component<{}, PanAndZoomState> {
  viewer: any;

  constructor(props: {}) {
    super(props);

    this.state = {
      nodes: basic1.nodes,
      edges: basic1.edges,
      width: 0,
      height: 0,
    };
  }

  render() {
    const { nodes, edges } = this.state;

    return (
      <AutoSizer>
        {({ height, width }) => (
          <UncontrolledReactSVGPanZoom
            width={width}
            height={height}
            tool="pan"
            background="#fff"
            detectAutoPan={false}
            miniatureProps={{
              position: 'none',
              background: '#fff',
              width: 100,
              height: 100,
            }}
            toolbarProps={{
              position: 'none',
              SVGAlignX: undefined,
              SVGAlignY: undefined,
            }}
            ref={viewer => (this.viewer = viewer)}
          >
            <svg id="schedule" width={this.state.width} height={this.state.height}>
              <DagreReact
                nodes={nodes}
                edges={edges}
                graphLayoutComplete={(width: number, height: number) => {
                  this.setState({ width, height }); 
                  setTimeout(() => {
                    this.viewer.fitToViewer()
                  }, 0);
                }}
                graphOptions={{
                  marginx: 15,
                  marginy: 15,
                  rankdir: 'LR',
                  ranksep: 55,
                  nodesep: 15,
                }}
              />
            </svg>
          </UncontrolledReactSVGPanZoom>
        )}
      </AutoSizer>
    );
  }
}
