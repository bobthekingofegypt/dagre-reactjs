import { NodeOptions, EdgeOptions } from "./config_defaults";
import { RecursivePartial } from "./types";

export const basic1: {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
} = {
  nodes: [
    {
      id: "0",
      label: "Project Start",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {
          styles: { pointerEvents: "none" }
        }
      }
    },
    {
      id: "2",
      label: "Project End",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {}
      }
    },
    {
      id: "3",
      label: "A",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {}
      }
    },
    {
      id: "4",
      label: "B",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {}
      }
    }
  ],
  edges: [
    {
      from: "0",
      to: "3"
    },
    {
      from: "0",
      to: "4"
    },
    {
      from: "3",
      to: "2"
    },
    {
      from: "4",
      to: "2"
    }
  ]
};

export const basic2: {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
} = {
  nodes: [
    {
      id: "0",
      label: "TOP"
    },
    {
      id: "1",
      label: "S"
    },
    {
      id: "2",
      label: "NP"
    },
    {
      id: "3",
      label: "DT"
    },
    {
      id: "4",
      label: "This"
    },
    {
      id: "5",
      label: "VP"
    },
    {
      id: "6",
      label: "VBZ"
    },
    {
      id: "7",
      label: "is"
    },
    {
      id: "8",
      label: "NP"
    },
    {
      id: "9",
      label: "DT"
    },
    {
      id: "10",
      label: "an"
    },
    {
      id: "11",
      label: "NN"
    },
    {
      id: "12",
      label: "example"
    },
    {
      id: "13",
      label: "."
    },
    {
      id: "14",
      label: "sentence"
    }
  ].map(node => {
    return {
      ...node,
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {},
        label: {}
      }
    };
  }),

  edges: [
    {
      from: "3",
      to: "4"
    },
    {
      from: "2",
      to: "3"
    },
    {
      from: "1",
      to: "2"
    },
    {
      from: "6",
      to: "7"
    },
    {
      from: "5",
      to: "6"
    },
    {
      from: "9",
      to: "10"
    },
    {
      from: "8",
      to: "9"
    },
    {
      from: "11",
      to: "12"
    },
    {
      from: "8",
      to: "11"
    },
    {
      from: "5",
      to: "8"
    },
    {
      from: "1",
      to: "5"
    },
    {
      from: "13",
      to: "14"
    },
    {
      from: "1",
      to: "13"
    },
    {
      from: "0",
      to: "1"
    }
  ]
};

export const shapes: {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
} = {
  nodes: [
    {
      id: "0",
      label: "Project Start",
      shape: "diamond",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {},
        label: {}
      }
    },
    {
      id: "2",
      label: "Project End",
      shape: "diamond",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {},
        label: {}
      }
    },
    {
      id: "3",
      label: "A",
      shape: "circle",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {},
        label: {}
      }
    },
    {
      id: "4",
      label: "B",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {},
        label: {}
      }
    }
  ],
  edges: [
    {
      from: "0",
      to: "3"
    },
    {
      from: "0",
      to: "4"
    },
    {
      from: "3",
      to: "2"
    },
    {
      from: "4",
      to: "2"
    }
  ]
};

export const tcpStateData: {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
} = {
  nodes: [
    "CLOSED",
    "LISTEN",
    "SYN RCVD",
    "SYN SENT",
    "ESTAB",
    "FINWAIT-1",
    "CLOSE WAIT",
    "FINWAIT-2",
    "CLOSING",
    "LAST-ACK",
    "TIME WAIT"
  ].map(node => {
    return {
      id: node,
      label: node,
      styles: {
        shape: {
          styles: {
            strokeWidth: "1.5",
            stroke: "#868686",
            fill: "#fff"
          }
        },
        label: {
          styles: {
            fill: "#00008a"
          }
        },
        node: {}
      }
    };
  }),
  edges: [
    {
      from: "CLOSED",
      to: "LISTEN",
      label: "open"
    },
    {
      from: "LISTEN",
      to: "SYN RCVD",
      label: "rcv SYN"
    },
    {
      from: "LISTEN",
      to: "SYN SENT",
      label: "send"
    },
    {
      from: "LISTEN",
      to: "CLOSED",
      label: "close"
    },
    {
      from: "SYN RCVD",
      to: "FINWAIT-1",
      label: "close"
    },
    {
      from: "SYN RCVD",
      to: "ESTAB",
      label: "rcv ACK of SYN",
      styles: {
        label: {
          styles: { fill: "#8a0000" }
        }
      }
    },
    {
      from: "SYN SENT",
      to: "SYN RCVD",
      label: "rcv SYN"
    },
    {
      from: "SYN SENT",
      to: "ESTAB",
      label: "rcv SYN, ACK"
    },
    {
      from: "SYN SENT",
      to: "CLOSED",
      label: "close"
    },
    {
      from: "ESTAB",
      to: "FINWAIT-1",
      label: "close"
    },
    {
      from: "ESTAB",
      to: "CLOSE WAIT",
      label: "rcv FIN"
    },
    {
      from: "FINWAIT-1",
      to: "FINWAIT-2",
      label: "rcv ACK of FIN"
    },
    {
      from: "FINWAIT-1",
      to: "CLOSING",
      label: "rcv FIN"
    },
    {
      from: "CLOSE WAIT",
      to: "LAST-ACK",
      label: "close"
    },
    {
      from: "FINWAIT-2",
      to: "TIME WAIT",
      label: "rcv FIN"
    },
    {
      from: "CLOSING",
      to: "TIME WAIT",
      label: "rcv ACK of FIN"
    },
    {
      from: "LAST-ACK",
      to: "CLOSED",
      label: "rcv ACK of FIN"
    },
    {
      from: "TIME WAIT",
      to: "CLOSED",
      label: "timeout=2MSL"
    }
  ]
};

export const customShapes: {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
} = {
  nodes: [
    {
      id: "99",
      label: "GO",
      shape: "circle",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {}
      }
    },
    {
      id: "0",
      label: "Project Start",
      shape: "house",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000"}
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {}
      }
    },
    {
      id: "2",
      label: "Project End",
      shape: "cloud",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {}
      }
    },
    {
      id: "3",
      label: "A",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {}
      }
    },
    {
      id: "4",
      label: "B",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {}
      }
    },
    {
      id: "5",
      label: "C",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {}
      }
    },
    {
      id: "6",
      label: "D",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {}
      }
    }
  ],
  edges: [
    {
      from: "99",
      to: "0"
    },
    {
      from: "0",
      to: "3"
    },
    {
      from: "0",
      to: "4"
    },
    {
      from: "3",
      to: "2"
    },
    {
      from: "4",
      to: "2"
    },
    {
      from: "5",
      to: "2"
    },
    {
      from: "6",
      to: "2"
    }
  ]
};

export const foreignObjects: {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
} = {
  nodes: [
    {
      id: "0",
      label: "Scan for tests",
      meta: {
        description: "run a scan on the test directory",
      },
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000", strokeWidth: "0" }
        },
        node: {
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }
        },
        label: {}
      },
      labelType: "foreign"
    },
    {
      id: "2",
      label: "Add new tests",
      meta: {
        "description": "add the new test cases to the database",
      },
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000", strokeWidth: "0" }
        },
        node: {
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }
        },
        label: {}
      },
      labelType: "foreign"
    },
  ],
  edges: [
    {
      from: "0",
      to: "2",
      label: "Execute in memory",
      labelType: "foreign",
      meta: {
        description: "I have no idea what to say about this so here is some text"
      }
    },
  ]
};

export const customPaths: {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
} = {
  nodes: [
    {
      id: "0",
      label: "Project Start",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {}
      }
    },
    {
      id: "2",
      label: "Project End",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {}
      }
    },
    {
      id: "3",
      label: "A",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {}
      }
    },
    {
      id: "4",
      label: "B",
      styles: {
        shape: {
          styles: { fill: "#fff", stroke: "#000" }
        },
        node: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        label: {}
      }
    }
  ],
  edges: [
    {
      from: "0",
      to: "3",
      pathType: "d3curve",
      styles: {
        edge: {
          styles: {
            strokeWidth: "4px",
            fill: "#ffffffff",
            stroke: "#8a0000"
          }
        },
        marker: {
          styles: {
            strokeWidth: "2px",
            fill: "#00008a",
            stroke: "#00008a"
          }
        }
      },
      markerType: "vee"
    },
    {
      from: "0",
      to: "4",
      styles: {
        edge: {
          styles: {
            strokeWidth: "4px",
            fill: "#ffffffff",
            stroke: "#8a0000"
          }
        },
        marker: {
          styles: {
            strokeWidth: "2px",
            fill: "#00008a",
            stroke: "#00008a"
          }
        }
      }
    },
    {
      from: "3",
      to: "2",
      styles: {
        edge: {
          styles: {
            strokeWidth: "4px",
            fill: "#ffffffff",
            stroke: "#00008a"
          }
        },
        marker: {
          styles: {
            strokeWidth: "2px",
            fill: "#00008a",
            stroke: "#8a0000"
          }
        }
      },
      markerType: "undirected"
    },
    {
      from: "4",
      to: "2",
      pathType: "d3curve",
      styles: {
        edge: {
          styles: {
            strokeWidth: "4px",
            fill: "#ffffffff",
            stroke: "#00008a"
          }
        },
        marker: {
          styles: {
            strokeWidth: "0",
            fill: "#00008a",
          }
        }
      },
      markerType: "circle"
    }
  ]
};

export const customButtonNodes: {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
} = {
  nodes: [
    {
      id: "1",
      label: "Phase 1",
      styles: {
        shape: {
          styles: { fillOpacity: 1, fill: "#fff", stroke: "#fff" }
        }
      },
      meta: {
        description: "Scan watch directory for new files"
      }
    },
    {
      id: "2",
      label: "Phase 2",
      styles: {
        shape: {
          styles: { fillOpacity: 1, fill: "#fff", stroke: "#fff" }
        },
      },
      meta: {
        description: "Create queue jobs for identified files"
      }
    },
    {
      id: "3",
      label: "Phase 3",
      styles: {
        shape: {
          styles: { fillOpacity: 1, fill: "#fff", stroke: "#fff" }
        }
      },
      meta: {
        description: "Execute processing of new jobs"
      }
    },
    {
      id: "4",
      label: "Phase 4",
      styles: {
        shape: {
          styles: { fillOpacity: 1, fill: "#fff", stroke: "#fff" }
        }
      },
      meta: {
        description: "Store results of processing"
      }
    }
  ],
  edges: [
    {
      from: "1",
      to: "2"
    },
    {
      from: "2",
      to: "3"
    },
    {
      from: "3",
      to: "4"
    }
  ]
};


