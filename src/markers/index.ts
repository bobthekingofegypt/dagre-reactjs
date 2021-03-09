import { NormalMarker } from './NormalMarker';
import { VeeMarker } from './VeeMarker';
import { UndirectedMarker } from './UndirectedMarker';

import { MarkerComponent, MarkerComponents } from '../types';

export const builtInMarkers: MarkerComponents = {
  normal: NormalMarker,
  vee: VeeMarker,
  undirected: UndirectedMarker,
};

export const getMarkerComponent = (
  type: string,
  markerComponents: MarkerComponents
): MarkerComponent => {
  if (markerComponents[type]) {
    return markerComponents[type];
  }

  throw Error(`marker component ('${type}') not found in builtins or custom`);
};
