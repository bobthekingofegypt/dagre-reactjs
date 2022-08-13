import * as CSS from 'csstype';

import { ValueCache } from './valuecache';

export type ReportSize = (width: number, height: number) => void;

export type Size = {
  width: number;
  height: number;
};

export type Dimensions = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Point = { x: number; y: number };

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export type ShapeComponentProps = {
  node: NodeOptions;
  innerSize: Size;
};

export type CustomNodeLabelProps = {
  node: NodeOptions;
};

export type MarkerProps = {
  edgeMeta: EdgeOptions;
  markerId: string;
};

export type ShapesDefinition = {
  [key: string]: ShapeDefinition;
};

export type NodeLabelDefinition = {
  renderer: React.FC<CustomNodeLabelProps>;
  html: boolean;
};

export type CustomEdgeLabelProps = {
  edgeMeta: EdgeOptions;
};

export type NodeLabelsDefinition = { [key: string]: NodeLabelDefinition };

export type EdgeLabelDefinition = {
  renderer: React.FC<CustomEdgeLabelProps>;
  html: boolean;
};

export type MarkerComponent = React.FC<MarkerProps>;
export type MarkerComponents = { [key: string]: MarkerComponent };

export type PathGenerator = (points: Array<Point>) => string;
export type PathGeneratorTypes = { [key: string]: PathGenerator };

export type EdgeLabelsDefinition = { [key: string]: EdgeLabelDefinition };

export type ShapeDefinition = {
  renderer: React.FC<ShapeComponentProps>;
  intersection: (
    node: NodeOptions,
    point: Point,
    valueCache: ValueCache
  ) => Point;
};

export enum LayoutType {
  Dagre = 1,
  D3Dag,
}

export type DAGReactProps = DAGReactGeneralProps & DAGReactGraphLayoutProps;

export interface DAGReactGeneralProps {
  customShapes: ShapesDefinition;
  customNodeLabels: NodeLabelsDefinition;
  customEdgeLabels: EdgeLabelsDefinition;
  customPathGenerators: PathGeneratorTypes;
  customMarkerComponents: MarkerComponents;
  defaultNodeConfig: RecursivePartial<NodeOptions>;
  defaultEdgeConfig: RecursivePartial<EdgeOptions>;
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
  graphLayoutStarted: () => void;
  graphLayoutComplete: (width?: number, height?: number) => void;
  stage: number;
  layoutStage: number;
  renderNode?: (
    node: NodeOptions,
    reportSize: ReportSize,
    valueCache: ValueCache,
    layoutStage: number
  ) => React.ReactElement<any>;
  renderEdge?: (
    index: number,
    edgeMeta: EdgeOptions
  ) => React.ReactElement<any>;
  renderEdgeLabel?: (
    index: number,
    edgeMeta: EdgeOptions,
    reportSize: ReportSize
  ) => React.ReactElement<any>;
  renderingOrder: Array<keyof RenderingOrderMapping>;
  graphOptions: { [key: string]: any };
}

export interface DAGReactGraphLayoutProps {
  graphLayout: GraphLayout;
}

export interface GraphLayout {
  nodes: Array<NodeOptions>;
  edges: Array<EdgeOptions>;
  dirty: boolean;
  setGraphLabelOptions(options: { [key: string]: any }): void;
  setGraphData(
    nodesIn: Array<RecursivePartial<NodeOptions>>,
    edgesIn: Array<RecursivePartial<EdgeOptions>>,
    userDefaultNodeConfig: RecursivePartial<NodeOptions>,
    userDefaultEdgeConfig: RecursivePartial<NodeOptions>
  ): void;
  scheduleLayout(): void;
  layout(): Promise<void> | undefined;
  layoutIfSized(): boolean;
  graphSize(): Size;
  graphNodeById(id: string): NodeOptions | undefined;
  setEdgeLabelSize(index: number, width: number, height: number): void;
  setNodeSize(index: number, width: number, height: number): void;
}

export interface LayoutDagreConstructorOptions {
  multigraph: boolean;
}

export interface NodeOptions {
  id: string;
  label: string;
  shape: string;
  labelType: string;
  styles: {
    node: {
      className?: string;
      padding: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
    };
    shape: {
      className?: string;
      styles?: CSS.Properties;
      cornerRadius?: number;
    };
    label: {
      className?: string;
      styles?: CSS.Properties;
    };
  };
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  meta: {
    [key: string]: any;
  };
}

export interface EdgeOptions {
  from: string;
  to: string;
  name?: string;
  label?: string;
  labelPos: 'l' | 'r' | 'c';
  labelOffset: number;
  labelType: string;
  markerType: string;
  pathType: string;
  points?: Array<Point>;
  path?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  styles: {
    label: {
      className: string;
      styles: CSS.Properties;
    };
    edge: {
      className: string;
      styles: CSS.Properties;
    };
    marker: {
      className: string;
      styles: CSS.Properties;
    };
  };
  meta: {
    [key: string]: any;
  };
}

export type RenderingOrderMapping = {
  nodes: React.ReactElement<any>[];
  edges: React.ReactElement<any>[];
  edgeLabels: React.ReactElement<any>[];
};
