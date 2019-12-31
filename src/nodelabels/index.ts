import { Text } from "./Text";
import { NodeLabelsDefinition, NodeLabelDefinition } from "../types";

export const builtInNodeLabels: NodeLabelsDefinition = {
  text: {
    renderer: Text,
    html: false
  }
};

export const getNodeLabel = (type: string, nodeLabels: NodeLabelsDefinition): NodeLabelDefinition => {
  if (nodeLabels[type]) {
    return nodeLabels[type];
  }

  throw Error(`node label ('${type}') not found in builtins or custom`);
};
