import * as React from "react";

import { Graph } from "./graph";
import {
  RecursivePartial,
  ShapesDefinition,
  NodeLabelsDefinition,
  EdgeLabelsDefinition,
  PathGeneratorTypes,
  MarkerComponents,
  ShapeDefinition,
  ReportSize,
  Size,
  NodeOptions,
  EdgeOptions
} from "./types";
import { builtInShapes, getShapeDefinition } from "./shapes/shapes";
import { builtInNodeLabels, getNodeLabel } from "./nodelabels";
import { builtInEdgeLabels, getEdgeLabel } from "./edgelabels";
import { getPathGenerator, builtInPaths } from "./paths";
import { ValueCache } from "./valuecache";
import { builtInMarkers, getMarkerComponent } from "./markers";
import Node from "./Node";
import Edge from "./Edge";
import EdgeLabel from "./EdgeLabel";

export interface DagreReactProps {
  customShapes: ShapesDefinition;
  customNodeLabels: NodeLabelsDefinition;
  customEdgeLabels: EdgeLabelsDefinition;
  customPathGenerators: PathGeneratorTypes;
  customMarkerComponents: MarkerComponents;
  defaultNodeConfig: RecursivePartial<NodeOptions>;
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  graphLayoutComplete: (width?: number, height?: number) => void;
  graphOptions: GraphOptions;
  stage: number;
  renderNode?: (node: NodeOptions, reportSize: ReportSize, valueCache: ValueCache) => React.ReactElement<any>;
  renderEdge?: (index: number, edgeMeta: EdgeOptions) => React.ReactElement<any>;
  renderEdgeLabel?: (index: number, edgeMeta: EdgeOptions, reportSize: ReportSize) => React.ReactElement<any>;
}

export interface GraphOptions {
  marginx?: number;
  marginy?: number;
  rankdir?: string;
  ranksep?: number;
  nodesep?: number;
  [key: string]: number | string | object | undefined;
}

type DagreReactState = {
  pathGenerators: PathGeneratorTypes;
  markerComponents: MarkerComponents;
  nodeLabels: NodeLabelsDefinition;
  edgeLabels: EdgeLabelsDefinition;
  shapes: ShapesDefinition;
  graph: Graph;
  previousStage: number;
};

const getShapeDefinitionFunc = (
  shapes: ShapesDefinition
): ((shape: string) => ShapeDefinition) => (shape: string): ShapeDefinition =>
  getShapeDefinition(shape, shapes);

export default class DagreReact extends React.Component<
  DagreReactProps,
  DagreReactState
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
    nodes: [],
    edges: [],
    graphOptions: {},
    graphLayoutComplete: () => {},
    stage: 1,
  };

  constructor(props: DagreReactProps) {
    super(props);
    const graph = new Graph();
    graph.setGraphLabelOptions(props.graphOptions);
    graph.setGraphData(props.nodes, props.edges, props.defaultNodeConfig);

    this.state = {
      pathGenerators: { ...builtInPaths, ...props.customPathGenerators },
      markerComponents: { ...builtInMarkers, ...props.customMarkerComponents },
      nodeLabels: { ...builtInNodeLabels, ...props.customNodeLabels },
      edgeLabels: { ...builtInEdgeLabels, ...props.customEdgeLabels },
      shapes: { ...builtInShapes, ...props.customShapes },
      graph: graph,
      previousStage: props.stage
    };

    this.valueCache = new ValueCache();
  }

  static getDerivedStateFromProps(nextProps: any, state: any) {
    // console.log("getderivedstate", nextProps, state);
    if (nextProps.stage !== state.previousStage) {
      const graph = state.graph;
      graph.setGraphLabelOptions(nextProps.graphOptions);
      graph.setGraphData(
        nextProps.nodes,
        nextProps.edges,
        nextProps.defaultNodeConfig
      );

      return {
        graph,
        previousStage: nextProps.stage
      };
    }

    return null;
  }

  reportEdgeLabelSize(index: number, width: number, height: number) {
    // console.log("edge label");
    this.state.graph.setEdgeLabelSize(index, width, height);
    this.checkRender();
  }

  reportNodeSize(index: number, width: number, height: number) {
    // console.log("node size");
    this.state.graph.setNodeSize(index, width, height);
    this.checkRender();
  }

  checkRender() {
    if (this.state.graph.layoutIfSized()) {
      // console.log("Forcing an update");
      this.state.graph.layout();
      this.adjustIntersections();
      this.props.graphLayoutComplete(this.state.graph.graph.graph().width, this.state.graph.graph.graph().height);
      this.forceUpdate();
    }
  }

  render() {
    console.log("render =====================================================");
    if (this.state.graph.dirty) {
    }

    const { renderNode, renderEdge, renderEdgeLabel } = this.props;

    const renderNodeFunc = renderNode || this.renderNode;
    const renderEdgeFunc = renderEdge || this.renderEdge;
    const renderEdgeLabelFunc = renderEdgeLabel || this.renderEdgeLabel;
    const graph = this.state.graph;
    const edges = graph.edges;
    const nodes = graph.nodes;

    return (
      <g>
        {nodes.map((node, index) => {
          return renderNodeFunc(
            node,
            this.reportNodeSize.bind(this, index),
            this.valueCache
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
      >
        {{
          shape: (innerSize: Size) => (
            <shape.renderer node={node} innerSize={innerSize} />
          ),
          label: () => <nodeLabel.renderer node={node} />
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
        { () => 
          <edgeLabel.renderer edgeMeta={edgeMeta} />
        }
      </EdgeLabel>
    );
  };

  adjustIntersections = () => {
    const { graph, shapes, pathGenerators } = this.state;
    const valueCache = this.valueCache;
    const edges = this.state.graph.edges;

    edges.forEach(edgeMeta => {
      const from = graph.graphNodeById(edgeMeta.from);
      const to = graph.graphNodeById(edgeMeta.to);

      if (!from || !to) {
        throw new Error("graph node not found from edge");
      }
      if (!edgeMeta.points) {
        throw new Error(
          "points should be set before adjustIntersections is called"
        );
      }

      let points = edgeMeta.points.slice(1, edgeMeta.points.length - 1);

      const fromShapeDefinition = getShapeDefinition(from.shape, shapes);
      const toShapeDefinition = getShapeDefinition(to.shape, shapes);

      points.unshift(
        fromShapeDefinition.intersection(from, edgeMeta.points[0], valueCache)
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
