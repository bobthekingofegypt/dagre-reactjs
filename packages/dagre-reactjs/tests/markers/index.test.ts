import { builtInMarkers, getMarkerComponent } from '../../src/markers';
import { NormalMarker } from '../../src/markers/NormalMarker';
import { UndirectedMarker } from '../../src/markers/UndirectedMarker';
import { VeeMarker } from '../../src/markers/VeeMarker';

describe('markers index', () => {
  it('returns normal marker when asked', () => {
    const marker = getMarkerComponent('normal', builtInMarkers);
    expect(marker).toBe(NormalMarker);
  });

  it('returns undirected marker when asked', () => {
    const marker = getMarkerComponent('undirected', builtInMarkers);
    expect(marker).toBe(UndirectedMarker);
  });

  it('returns vee marker when asked', () => {
    const marker = getMarkerComponent('vee', builtInMarkers);
    expect(marker).toBe(VeeMarker);
  });

  it('throws error when marker doesnt exist', () => {
    expect(() => getMarkerComponent('nothing', builtInMarkers)).toThrow();
  });
});
