import { PathGenerator, PathGeneratorTypes } from '../types';
import { generatePath } from './normal';

export const builtInPaths: PathGeneratorTypes = {
  normal: generatePath,
};

export const getPathGenerator = (
  type: string,
  pathGenerators: PathGeneratorTypes
): PathGenerator => {
  if (pathGenerators[type]) {
    return pathGenerators[type];
  }

  throw Error(`path generator ('${type}') not found in builtins or custom`);
};
