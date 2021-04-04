import { NodeLabelDefinition, NodeLabelsDefinition } from '../types';
import { Text } from './Text';

export const builtInNodeLabels: NodeLabelsDefinition = {
  text: {
    renderer: Text,
    html: false,
  },
};

export const getNodeLabel = (
  type: string,
  nodeLabels: NodeLabelsDefinition
): NodeLabelDefinition => {
  if (nodeLabels[type]) {
    return nodeLabels[type];
  }

  throw Error(`node label ('${type}') not found in builtins or custom`);
};
