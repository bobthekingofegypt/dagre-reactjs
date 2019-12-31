import { Text } from "./Text";
import { EdgeLabelsDefinition, EdgeLabelDefinition } from "../types";

export const builtInEdgeLabels: EdgeLabelsDefinition = {
  text: {
    renderer: Text,
    html: false
  }
};

export const getEdgeLabel = (type: string, edgeLabels: EdgeLabelsDefinition): EdgeLabelDefinition => {
  if (edgeLabels[type]) {
    return edgeLabels[type];
  }

  throw Error(`edge label ('${type}') not found in builtins or custom`);
};
