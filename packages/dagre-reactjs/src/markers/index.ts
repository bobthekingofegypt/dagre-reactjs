import { MarkerComponent, MarkerComponents } from '../types';
import { NormalMarker } from './NormalMarker';
import { UndirectedMarker } from './UndirectedMarker';
import { VeeMarker } from './VeeMarker';

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
