import {ValueCache} from "./valuecache";
import * as CSS from "csstype";

export type ReportSize = (width: number, height: number) => void;

export type Size = {
  width: number;
  height: number;
};

export type Point = { x: number; y: number };

export type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
    T[P];
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
}

export type CustomEdgeLabelProps = {
  edgeMeta: EdgeOptions;
};

export type NodeLabelsDefinition = { [key: string]: NodeLabelDefinition };

export type EdgeLabelDefinition = {
  renderer: React.FC<CustomEdgeLabelProps>;
  html: boolean;
}

export type MarkerComponent = React.FC<MarkerProps>; 
export type MarkerComponents = { [key: string]: MarkerComponent }; 

export type PathGenerator = (points: Array<Point>) => string; 
export type PathGeneratorTypes = { [key: string]: PathGenerator }; 

export type EdgeLabelsDefinition = { [key: string]: EdgeLabelDefinition };

export type ShapeDefinition = {
  renderer: React.FC<ShapeComponentProps>;
  intersection: (node: NodeOptions, point: Point, valueCache: ValueCache) => Point;
};

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
  }
}

export interface EdgeOptions {
  from: string;
  to: string;
  label?: string;
  labelPos: "l" | "r" | "c";
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
    },
    edge: {
      className: string;
      styles: CSS.Properties;
    },
    marker: {
      className: string;
      styles: CSS.Properties;
    },
  },
  meta: {
    [key: string]: any;
  }
}

