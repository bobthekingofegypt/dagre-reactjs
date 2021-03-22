import * as React from 'react';

import {
  ShapesDefinition,
  NodeLabelsDefinition,
  EdgeLabelsDefinition,
  PathGeneratorTypes,
  MarkerComponents,
  ShapeDefinition,
  ReportSize,
  Size,
  NodeOptions,
  EdgeOptions,
  LayoutType,
  GraphLayout,
  DAGReactProps
} from './types';
import { builtInShapes, getShapeDefinition } from './shapes/shapes';
import { builtInNodeLabels, getNodeLabel } from './nodelabels';
import { builtInEdgeLabels, getEdgeLabel } from './edgelabels';
import { getPathGenerator, builtInPaths } from './paths';
import { ValueCache } from './valuecache';
import { builtInMarkers, getMarkerComponent } from './markers';
import Node from './Node';
import Edge from './Edge';
import EdgeLabel from './EdgeLabel';


export interface GraphOptions {
  marginx?: number;
  marginy?: number;
  rankdir?: string;
  ranksep?: number;
  nodesep?: number;
  [key: string]: number | string | object | undefined;
}

type DAGReactState = {
  pathGenerators: PathGeneratorTypes;
  markerComponents: MarkerComponents;
  nodeLabels: NodeLabelsDefinition;
  edgeLabels: EdgeLabelsDefinition;
  shapes: ShapesDefinition;
  graphLayout: GraphLayout;
  previousStage: number;
  layoutStage: number;
};

const getShapeDefinitionFunc = (
  shapes: ShapesDefinition
): ((shape: string) => ShapeDefinition) => (shape: string): ShapeDefinition =>
  getShapeDefinition(shape, shapes);

export default class DAGReact extends React.Component<
  DAGReactProps,
  DAGReactState
> {
  valueCache: ValueCache;

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

  constructor(props: DAGReactProps) {
    super(props);

    this.props.graphLayout.setGraphLabelOptions(props.graphOptions);
    
    props.graphLayout.setGraphData(
      props.nodes,
      props.edges,
      props.defaultNodeConfig,
      props.defaultEdgeConfig
    );

    this.state = {
      pathGenerators: { ...builtInPaths, ...props.customPathGenerators },
      markerComponents: { ...builtInMarkers, ...props.customMarkerComponents },
      nodeLabels: { ...builtInNodeLabels, ...props.customNodeLabels },
      edgeLabels: { ...builtInEdgeLabels, ...props.customEdgeLabels },
      shapes: { ...builtInShapes, ...props.customShapes },
      graphLayout: props.graphLayout,
      previousStage: props.stage,
      layoutStage: props.layoutStage,
    };

    this.valueCache = new ValueCache();
  }

  static getDerivedStateFromProps(nextProps: any, state: any) {
    if (nextProps.stage !== state.previousStage) {
      console.log("resetting");
      const graphLayout = nextProps.graphLayout;
      graphLayout.setGraphLabelOptions(nextProps.graphOptions);
      graphLayout.setGraphData(
        nextProps.nodes,
        nextProps.edges,
        nextProps.defaultNodeConfig,
        nextProps.defaultEdgeConfig
      );

      return {
        graphLayout,
        previousStage: nextProps.stage,
      };
    }

    return null;
  }

  reportEdgeLabelSize(index: number, width: number, height: number) {
    // console.log("edge label");
    this.state.graphLayout.setEdgeLabelSize(index, width, height);
    this.checkRender();
  }

  reportNodeSize(index: number, width: number, height: number) {
    // console.log("node size");
    this.state.graphLayout.setNodeSize(index, width, height);
    this.checkRender();
  }

  checkRender() {
    if (this.state.graphLayout.layoutIfSized()) {
      this.forceUpdate();
    }
  }

  componentDidUpdate() {
    if (this.state.graphLayout.dirty) {
      console.log("Forcing a layout");
      const returnValue = this.state.graphLayout.layout();
      const adjustForResults = () => {
          console.log("layout is done");
          this.adjustIntersections();
          const size = this.state.graphLayout.graphSize();
          this.props.graphLayoutComplete(size.width, size.height);
          this.forceUpdate();
      }
      if (returnValue) {
        returnValue.then(adjustForResults);
      } else {
        adjustForResults();
      }
    }
  }

  render() {
    // console.log("render =====================================================");
    const { renderNode, renderEdge, renderEdgeLabel } = this.props;

    const renderNodeFunc = renderNode || this.renderNode;
    const renderEdgeFunc = renderEdge || this.renderEdge;
    const renderEdgeLabelFunc = renderEdgeLabel || this.renderEdgeLabel;
    const graph = this.state.graphLayout;
    const edges = graph.edges;
    const nodes = graph.nodes;

    console.log(edges);
    return (
      <g>
        {nodes.map((node, index) => {
          return renderNodeFunc(
            node,
            this.reportNodeSize.bind(this, index),
            this.valueCache,
            this.props.layoutStage
          );
        })}
        {edges.map((edgeMeta, index) => {
          return renderEdgeFunc(index, edgeMeta);
        })}
        {edges.map((edgeMeta, index) => {
          return renderEdgeLabelFunc(
            index,
            edgeMeta,
            this.reportEdgeLabelSize.bind(this, index)
          );
        })}
      </g>
    );
  }

  renderNode = (
    node: NodeOptions,
    reportSize: ReportSize,
    valueCache: ValueCache
  ): React.ReactElement<any> => {
    const { shapes, nodeLabels } = this.state;
    const shapeDefinitionFunc = getShapeDefinitionFunc(shapes);
    const shape = shapeDefinitionFunc(node.shape);
    const nodeLabel = getNodeLabel(node.labelType, nodeLabels);

    return (
      <Node
        key={node.id}
        node={node}
        reportSize={reportSize}
        valueCache={valueCache}
        html={nodeLabel.html}
        layoutStage={this.props.layoutStage}
      >
        {{
          shape: (innerSize: Size) => (
            <shape.renderer node={node} innerSize={innerSize} />
          ),
          label: () => <nodeLabel.renderer node={node} />,
        }}
      </Node>
    );
  };

  renderEdge = (index: number, edgeMeta: EdgeOptions) => {
    const markerComponent = getMarkerComponent(
      edgeMeta.markerType,
      this.state.markerComponents
    );

    return (
      <Edge
        key={`${edgeMeta.from}-${edgeMeta.to}`}
        index={index}
        edgeMeta={edgeMeta}
        markerComponent={markerComponent}
      />
    );
  };

  renderEdgeLabel = (
    index: number,
    edgeMeta: EdgeOptions,
    reportSize: ReportSize
  ) => {
    const edgeLabel = getEdgeLabel(edgeMeta.labelType, this.state.edgeLabels);
    return (
      <EdgeLabel
        key={index}
        html={edgeLabel.html}
        edgeMeta={edgeMeta}
        reportSize={reportSize}
      >
        {() => <edgeLabel.renderer edgeMeta={edgeMeta} />}
      </EdgeLabel>
    );
  };

  adjustIntersections = () => {
    const { graphLayout, shapes, pathGenerators } = this.state;
    const valueCache = this.valueCache;
    const edges = this.state.graphLayout.edges;

    edges.forEach(edgeMeta => {
      const from = graphLayout.graphNodeById(edgeMeta.from);
      const to = graphLayout.graphNodeById(edgeMeta.to);

      if (!from || !to) {
        throw new Error('graph node not found from edge');
      }
      if (!edgeMeta.points) {
        throw new Error(
          'points should be set before adjustIntersections is called'
        );
      }

      let points = edgeMeta.points.slice(1, edgeMeta.points.length - 1);

      const fromShapeDefinition = getShapeDefinition(from.shape, shapes);
      const toShapeDefinition = getShapeDefinition(to.shape, shapes);

      points.unshift(
        fromShapeDefinition.intersection(from, edgeMeta.points[1], valueCache)
      );
      points.push(
        toShapeDefinition.intersection(
          to,
          points[points.length - 1],
          valueCache
        )
      );

      const path = getPathGenerator(edgeMeta.pathType, pathGenerators)(points);

      edgeMeta.path = path;
      edgeMeta.points = points;
    });
  };
}
