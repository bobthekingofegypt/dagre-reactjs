export const defaultNodeConfig = {
  styles: {
    node: {
      className: undefined,
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    },
    shape: {
      className: undefined,
      styles: undefined,
      cornerRadius: 5,
    },
    label: {
      className: undefined,
      styles: undefined
    }
  },
  labelType: "text",
  shape: "rect",
  meta: {},
};


export const  defaultEdgeConfig = {
  styles: {
    label: {
      className: undefined,
      styles: undefined
    },
    edge: {
      className: undefined,
      styles: undefined
    },
    marker: {
      className: undefined,
      styles: undefined
    },
  },
  labelType: "text",
  labelPos: "r",
  labelOffset: 10,
  pathType: "normal",
  markerType: "normal",
  meta: {},
}
