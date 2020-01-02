import * as React from "react";
import { CustomEdgeLabelProps } from "../../.";

export const ForeignLabel: React.FC<CustomEdgeLabelProps> = ({ edgeMeta }) => {
  return (
    <div
      style={{
        color: "#8b0000",
        minWidth: "200px"
      }}
    >
      <div style={{ fontWeight: "bold" }}>{edgeMeta.label}</div>
      <div style={{ fontSize: "10px" }}>{edgeMeta.meta.description}</div>
    </div>
  );
};
