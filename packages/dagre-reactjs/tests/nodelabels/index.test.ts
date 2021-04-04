import { builtInNodeLabels, getNodeLabel } from '../../src/nodelabels';
import { Text } from '../../src/nodelabels/Text';
import { NodeLabelsDefinition } from '../../src/types';

describe('nodelabels index', () => {
  it('returns text node label when asked', () => {
    const nodeLabel = getNodeLabel('text', builtInNodeLabels);
    expect(nodeLabel).not.toBeNull();
  });

  it('returns custom node label when asked', () => {
    const bobType = {
      html: false,
      renderer: Text,
    };

    const labels: NodeLabelsDefinition = { bobType };
    const nodeLabel = getNodeLabel('bobType', labels);
    expect(nodeLabel).toBe(bobType);
  });

  it('throws error when node label type doesnt exist', () => {
    expect(() => getNodeLabel('nothing', builtInNodeLabels)).toThrow();
  });
});
