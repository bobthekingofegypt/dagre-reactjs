import { builtInEdgeLabels, getEdgeLabel } from '../../src/edgelabels';
import { Text } from '../../src/edgelabels/Text';
import { EdgeLabelsDefinition } from '../../src/types';

test('throws error if no edgelabel type registered', () => {
  const labels: EdgeLabelsDefinition = {};

  expect(() => getEdgeLabel('bob', labels)).toThrow();
});

test('returns edge label type requested', () => {
  const bobType = {
    html: false,
    renderer: Text,
  };

  const labels: EdgeLabelsDefinition = { bobType };

  expect(getEdgeLabel('bobType', labels)).toBe(bobType);
});

test('returns default text edge label type', () => {
  expect(getEdgeLabel('text', builtInEdgeLabels)).not.toBeNull();
});
