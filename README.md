# DagreReact

React component for rendering a dagre graph layout without any dependency on d3.

# Getting started

Install dagre-reactjs using npm.

```
npm install dagre-reactjs --save
```

or using yarn

```
yarn add dagre-reactjs
```

# Dependencies

This project has a peer dependency on dagre so your project version can be used, but this means you will need to install it separetely from this library.

# Examples

Running version of the examples can be seen here https://5e0e39f5892713725473186a--infallible-davinci-4bc8e0.netlify.com/

# Basic usage

DagreReact component needs the data to display in a format it understands.

```typescript
import * as React from "react";

import { RecursivePartial, NodeOptions, EdgeOptions, DagreReact } from "dagre-reactjs";

export const basic1: {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
} = {
  nodes: [
    {
      id: "0",
      label: "Project Start",
    },
    {
      id: "1",
      label: "Project End",
    }
  ],
  edges: [
    {
      from: "0",
      to: "1"
    }
  ]
};

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <svg id="schedule" width={1000} height={1000}>
        <DagreReact
          nodes={basic1.nodes}
          edges={basic1.edges}
        />
      </svg>
    );
  }
}
```

# Overriding dagre graph settings

Dagre's defaults can be overriden by passing the graphOptions prop to the DagreReact component.

See dagre documentation here https://github.com/dagrejs/dagre/wiki#configuring-the-layout

All values under object graph can be passed through using this prop and they will be used in the next layout pass.

# Node settings

If using typescript the exact type definition for nodes is exported as NodeOptions interface.  

```typescript
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
  }
}
```

The prop passed into DagreReact accepts a partial representation of this object, only "id" is required. 
WARNING: Currently manually setting nodes width and height from this object will not work, they will be erased before the graph layout is run.  This is a design issue were it interferes with the sizing hooks and the intersection logic.

## User defaults

Rather than setting common configuration on every node object you can pass a defaults object to DagreReact and it will merge the custom node settings with the user defaults and the DagreReact defaults for you. This is achieved with the defaultNodeConfig prop.

```typescript
const DEFAULT_NODE_CONFIG = {
  styles: {
    node: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    },
    shape: {
      styles: { fill: "#845" }
    }
  }
};

...


<DagreReact
  nodes={nodes}
  edges={edges}
  defaultNodeConfig={DEFAULT_NODE_CONFIG}
/>

```

# Edge settings

If using typescript the exact type definition for edges is exported as EdgeOptions interface.  

```typescript
export interface EdgeOptions {
  from: string;
  to: string;
  label?: string;
  labelPos: "l" | "r" | "c";
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
```

The prop passed into DagreReact accepts a partial representation of this object, only "to" and "from" is required. 
WARNING: Currently manually setting edge width and height from this object will not work, they will be erased before the graph layout is run.  This is a design issue were it interferes with the sizing hooks and the intersection logic.

## User defaults

Rather than setting common configuration on every edge object you can pass a defaults object to DagreReact and it will merge the custom edge settings with the user defaults and the DagreReact defaults for you. This is achieved with the defaultEdgeConfig prop.

```typescript
const DEFAULT_EDGE_CONFIG = {
  styles: {
    edge: {
      styles: { fillOpacity: 0, stroke: "#000", strokeWidth: "1px" }
    }
  }
};
...


<DagreReact
  nodes={nodes}
  edges={edges}
  defaultEdgeConfig={DEFAULT_EDGE_CONFIG}
/>

```

# Custom Shapes

Each built in node is rendered as a shape layer and a label layer.  The shape layer is responsible for rendering a shape if required and handling the intersection detection so that edge lines can line up correctly with complex shapes. Shapes do not have to render anything to the screen.

Build in there are three shapes circle/rect/diamond, if something else is needed the user can pass a map of custom shapes. The examples include a custom shapes demonstration.

To add a house shape for example, you need to create a component for the renderer.
```typescript
export const calculateHousePoints = (size: Size): Array<Point> => {
  const width = size.width;
  const height = size.height;

  const xOffset = width / 2;
  const yOffset = (-height * 3) / 5;

  const points = [
    { x: 0 - xOffset, y: 0 - yOffset },
    { x: width - xOffset, y: 0 - yOffset },
    { x: width - xOffset, y: -height - yOffset },
    { x: width / 2 - xOffset, y: (-height * 3) / 2 - yOffset },
    { x: 0 - xOffset, y: -height - yOffset }
  ];

  return points;
};

export const House: React.FC<ShapeComponentProps> = ({ node, innerSize }) => {
  if (!node || !innerSize || !(innerSize.width && innerSize.height)) {
    return null;
  }

  const points = calculateHousePoints(innerSize);

  return (
    <polygon
      style={node.styles.shape.styles || {}}
      points={points.map(d => `${d.x}, ${d.y}`).join(" ")}
    />
  );
};
```

The house component above is passed a reference to the node being rendered and the innerSize.  innerSize is a reference to the size of the label (svg or foreign object) including its padding, this is the content that will appear inside the custom shape. A shape can then increases its size beyond this innerSize if required, this house for example increases the height to allow for its roof.  The sizing hooks will take care of reporting the final rendered size to the graph layout, the component does not have to report the change.

The second requirement is an intersection method, creating a custom component you are required to handle the intersection maths.  I'd recommend using a third party library like kld-intersections. Using a kld-intersection you could calculate polygon intersections using the pattern in the examples directory, create a generic intersection method like:
```typescript
export const intersectPolygon = (node:NodeOptions, point: Point, polyPoints:Array<Point>): Point => {
  const polygon = ShapeInfo.polygon(polyPoints);
  const line = ShapeInfo.line([point.x - node.x!, point.y - node.y!, 0, 0]);
  const intersections2 = Intersection.intersect(polygon, line);
  
  if (intersections2.points.length > 0) {
    return {
      x: intersections2.points[0].x + node.x!,
      y: intersections2.points[0].y + node.y!
    };
  }
  return { x: node.y!, y: node.y! };
}
```

Then in your application code you would instantiate DagreReact like
```typescript

<DagreReact
  nodes={nodes}
  edges={edges}
  customShapes={{
    house: {
      renderer: House,
      intersection: (node: NodeOptions, point: Point, valueCache: ValueCache) => {
        const labelSize = valueCache.value(`${node.id}-label-size`);
        const polyPoints = calculateHousePoints(labelSize);
        return intersectPolygon2(node, point, polyPoints);
      }
      }}
  }
/>
```

The intersection method above illustrates a compromise that currently exists in the components API, valueCache. In order to handle intersections correctly the edge positioning needs to know about the Node renderings internals, to work around this for now DagreReact will put the labels rendered size into a valueCache map that is available to all parts of the layout and render system. This allows the graph layout to recreate a rendered polygons points without rendering it and check intersections against a line. 

Now all that is left to do is set the shape on your node object to "house" and you will have custom shapes rendering.

# Custom node labels

The content rendered inside a node is referred to as a label, it can be a simple svg text element or a complex foreignobject html block but its still called a label. Custom node labels are passed in as a map using the customNodeLabels prop. See the foreign objects example code for a running demo. To create a custom node label create a component that takes the CustomNodeLabelProps, this only contains a reference to the node being rendered and return a react element.

Then in your application code you would instantiate DagreReact like
```typescript

<DagreReact
  nodes={nodes}
  edges={edges}
  customNodeLabels={{
    "mycustomlabel": {
      renderer: YourCustomLabel,
      html: true // if true will be rendered inside a foreign object element otherwise expects pure svg component
    }
  }}
/>
```

In your node objects you then set the labelType to "mycustomlabel"

# Custom markers

Edges have markers or arrowheads on the end of them to show direction. There are three arrowheads built in normal, undirected and vee same as dagre-d3. Custom markers can be used by passing them into ReactDagre using the customMarkerComponents prop.

```typescript
export const CircleMarker: React.FC<MarkerProps> = ({ edgeMeta, markerId }) => {
  return ( 
    <marker id={markerId} markerWidth="14" markerHeight="14" refX="5" refY="5">
      <circle cx="5" cy="5" r="3" style={edgeMeta.styles.marker.styles} />
    </marker>
  );
}

<DagreReact
  nodes={nodes}
  edges={edges}
  customMarkerComponents={{
    "circle": CircleMarker //custom react component
  }}
/>
```

Markers should accept the edgeMeta containing the options for that edge and markerid that svg uses to link the marker to its edge.

See the custom path types example.

# Custom edge labels

Custom edge labels can be a simple svg text element or a complex foreignobject html block. Custom edge labels are passed in as a map using the customEdgeLabels prop. See the foreign objects example code for a running demo. To create a custom edge label create a component that takes the CustomEdgeLabelProps, this only contains a reference to the edge being rendered and return a react element.

Then in your application code you would instantiate DagreReact like
```typescript

<DagreReact
  nodes={nodes}
  edges={edges}
  customEdgeLabels={{
    "mycustomlabel": {
      renderer: YourCustomLabel,
      html: true // if true will be rendered inside a foreign object element otherwise expects pure svg component
    }
  }}
/>
```

In your edge objects you then set the labelType to "mycustomlabel"

# Override render methods

If you need to handle button presses, pass custom data, or do something I can't think of inside your node or edge you can override the render methods and take over how nodes or edges are displayed. I'd recommend you continue to use the Node component unless you know what you are doing as Node handles all the size reporting for you. To not use it you would be required to report the sizes to the layout yourself, I have no examples available that do this.

```typescript
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

  .....

  <DagreReact
    nodes={nodes}
    edges={edges}
    renderNode={this.renderNode}
  />
```

Node takes a render map, expecting a render function for the shape and the label. Doing this you are free to render whatever you want, pass event handlers etc.

WARNING: if overriding this function and using a custom shape class you are still required to pass in the customShapes map to DagreReact with an intersection method for your custom shape.

EdgeLabel and Edge can be overridden in a similar manner.

See the Tooltips or mouseevents examples.

# Design decisions

## Not implementing pan and zoom, tooltips, positioning

The decision was made not to attempt to include these features directly in the library, I have attempted to provide enough hooks and override points to allow you to implement these features using libraries that are specifically build for these features.  I have added some examples in the examples directory to help guide you on how to do this.

## valueCache

Currently valueCache is passed around internally and to some hooks to allow different parts of the rendering steps to share data with each other.  I do not like this, but I can't think of another way to do it. Currently is it only used for the label size value, which may in future be added directly to the NodeOptions interface instead, but I'm unsure at the moment.

## dagre labelpos 

Currently dagre labelpos is not respected, it can be passed but internally the edge label is being offset slightly by its size. This is because I have had issues with labelpos so do not use it. This may need to be addressed in the future.

## Changing of data

Currently you cannot change the original prop data and see a change on the graph without changing the "stage" prop on DagreReact. The graph internally takes a copy of the data props on first render and that is the data that is manipulated and rendered internally.  The data props are then ignored until the stage value changes.  This was a decision made so that the component is not changing your state without telling you. Changing the data without triggering dagre to re-layout is not advised anyway as any style change will change the size of a node and should trigger a full stage layout.  This can make using the default built in labels and shapes difficult if you want to change the background on mouse over for example, a possible work around is provided on MouseEvents example. A better solution would be to create your own shape component that takes in the style props that you can store separately from the node data. Again only do this if you know that the change does not affect the width and height on the node.

