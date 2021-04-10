import { EdgeOptions, NodeOptions, RecursivePartial } from 'dagre-reactjs';

export const nodeOrdering: {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
} = {
  nodes: [
    {
      id: '0',
      label: 'Node 0',
      meta: {
        elk: {
          layoutOptions: {
            position: '(0.0, 0.0)',
          },
        },
      },
    },
    {
      id: '1',
      label: 'Node 1',
      meta: {
        elk: {
          layoutOptions: {
            position: '(0.0, 0.0)',
          },
        },
      },
    },
    {
      id: '2',
      label: 'Node 2',
    },
    {
      id: '3',
      label: 'Node 3',
    },
    {
      id: '4',
      label: 'Node 4',
    },
    {
      id: '5',
      label: 'Node 5',
    },
    {
      id: '6',
      label: 'Node 6',
    },
    {
      id: '7',
      label: 'Node 7',
    },
    {
      id: '8',
      label: 'Node 8',
    },
    {
      id: '9',
      label: 'Node 9',
    },
    {
      id: '10',
      label: 'Node 10',
    },
  ],
  edges: [
    {
      from: '0',
      to: '2',
    },
    {
      from: '0',
      to: '3',
    },
    {
      from: '3',
      to: '5',
    },
    {
      from: '3',
      to: '4',
    },
    {
      from: '4',
      to: '6',
    },
    {
      from: '4',
      to: '7',
    },
    {
      from: '7',
      to: '8',
    },
    {
      from: '1',
      to: '9',
    },
    {
      from: '9',
      to: '10',
    },
    {
      from: '10',
      to: '8',
    },
  ],
};
