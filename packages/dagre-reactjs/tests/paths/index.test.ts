import { builtInPaths, getPathGenerator } from '../../src/paths';
import { generatePath } from '../../src/paths/normal';

describe('paths index', () => {
  it('returns normal path when asked', () => {
    const path = getPathGenerator('normal', builtInPaths);
    expect(path).toBe(generatePath);
  });

  it('throws error when path doesnt exist', () => {
    expect(() => getPathGenerator('nothing', builtInPaths)).toThrow();
  });
});
