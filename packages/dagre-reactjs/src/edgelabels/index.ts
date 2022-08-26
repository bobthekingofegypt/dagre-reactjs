import { EdgeLabelDefinition, EdgeLabelsDefinition } from '../types';
import { Text } from './Text';

export const builtInEdgeLabels: EdgeLabelsDefinition = {
  text: {
    renderer: Text,
    html: false,
  },
};

export const getEdgeLabel = (
  type: string,
  edgeLabels: EdgeLabelsDefinition
): EdgeLabelDefinition => {
  if (edgeLabels[type]) {
    return edgeLabels[type];
  }

  throw Error(`edge label ('${type}') not found in builtins or custom`);
};
