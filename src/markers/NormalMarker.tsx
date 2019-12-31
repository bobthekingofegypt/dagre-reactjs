import * as React from "react";
import {MarkerProps} from "../types";

export const NormalMarker: React.FC<MarkerProps> = ({ edgeMeta, markerId }) => {
  return ( 
    <marker
      id={markerId}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerUnits="strokeWidth"
      markerWidth="8"
      markerHeight="6"
      orient="auto"
    >
      <path
        d="M 0 0 L 10 5 L 0 10 z"
        style={
          edgeMeta.styles.marker.styles || {
            strokeWidth: 1,
            strokeDasharray: "1, 0"
          }
        }
      ></path>
    </marker>
  );
}
