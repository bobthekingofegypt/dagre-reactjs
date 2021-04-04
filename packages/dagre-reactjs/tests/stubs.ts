import defaultsDeep from 'lodash/defaultsDeep';
import { NodeOptions } from '../src/types';

export const defaultEdgeConfig = {
  styles: {
    label: {
      className: undefined,
      styles: undefined,
    },
    edge: {
      className: undefined,
      styles: undefined,
    },
    marker: {
      className: undefined,
      styles: undefined,
    },
  },
  labelType: 'text',
  labelPos: 'r',
  labelOffset: 10,
  pathType: 'normal',
  markerType: 'normal',
  meta: {},
};

export const getEdgeMeta = (from: string, to: string, label?: string) => {
  return defaultsDeep({}, { to, from, label }, defaultEdgeConfig);
};

export const getDefaultNodeOptions = (
  id: string,
  label: string
): NodeOptions => {
  return {
    id,
    label,
    styles: {
      node: {
        className: undefined,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      shape: {
        className: undefined,
        styles: { fillOpacity: 0, stroke: '#000' },
        cornerRadius: 5,
      },
      label: {
        className: undefined,
        styles: undefined,
      },
    },
    labelType: 'text',
    shape: 'rect',
    meta: {},
  };
};
