import * as React from "react";
import {MarkerProps} from "dagre-reactjs";

export const CircleMarker: React.FC<MarkerProps> = ({ edgeMeta, markerId }) => {
  return ( 
    <marker id={markerId} markerWidth="14" markerHeight="14" refX="5" refY="5">
      <circle cx="5" cy="5" r="3" style={edgeMeta.styles.marker.styles} />
    </marker>
  );
}
