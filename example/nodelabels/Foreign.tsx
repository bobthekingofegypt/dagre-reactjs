import { CustomNodeLabelProps } from 'dagre-reactjs';
import * as React from 'react';

export const Foreign: React.FC<CustomNodeLabelProps> = ({ node }) => {
  return (
    <div
      style={{
        borderRadius: '5px',
        borderWidth: '2px 2px 2px 10px',
        borderColor: '#000',
        borderStyle: 'solid',
        maxWidth: '200px',
        minWidth: '180px',
        padding: '10px 10px',
        backgroundColor: '#868686',
      }}
    >
      <div style={{ fontWeight: 'bold' }}>{node.label}</div>
      <div style={{ fontSize: '10px' }}>{node.meta.description}</div>
    </div>
  );
};
