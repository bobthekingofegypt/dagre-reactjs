import * as React from "react";
import {CustomNodeLabelProps} from "../types";

export const Text: React.FC<CustomNodeLabelProps> = ({node}) => {
  return (
    <text className={node.styles.label.className} style={node.styles.label.styles || {}}>
      <tspan xmlSpace="preserve" dy="1em" x="1">
        {node.label}
      </tspan>
    </text>
  );
}


