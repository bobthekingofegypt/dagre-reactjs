import * as React from "react";
import {CustomEdgeLabelProps} from "../types";

export const Text: React.FC<CustomEdgeLabelProps> = ({edgeMeta}) => {
  return (
    <text style={edgeMeta.styles.label.styles || {}}>
      <tspan xmlSpace="preserve" dy="1em" x="1">
        {edgeMeta.label || ""}
      </tspan>
    </text>
  );
}


