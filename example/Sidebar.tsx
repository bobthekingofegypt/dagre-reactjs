import * as React from 'react';
import { Link } from 'react-router-dom';

export const Sidebar: React.FC<{}> = () => {
  return (
    <div className="Sidebar">
      <h2>Examples</h2>
      <ul>
        <li>
          <Link to="/basic1">Basic 1</Link>
        </li>
        <li>
          <Link to="/basic2">Basic 2</Link>
        </li>
        <li>
          <Link to="/shapes">Shapes</Link>
        </li>
        <li>
          <Link to="/tcpStateData">TCP State Data</Link>
        </li>
        <li>
          <Link to="/customShapes">Custom shapes</Link>
        </li>
        <li>
          <Link to="/foreignObjects">Foreign Objects</Link>
        </li>
        <li>
          <Link to="/customPaths">Custom edge paths</Link>
        </li>
        <li>
          <Link to="/timeline">Timeline</Link>
        </li>
        <li>
          <Link to="/mouseEvents">Mouse Events</Link>
        </li>
        <li>
          <Link to="/customButtonNodes">Custom button nodes</Link>
        </li>
        <li>
          <Link to="/panAndZoom">Pan and zoom</Link>
        </li>
        <li>
          <Link to="/tooltips">Tooltips</Link>
        </li>
        <li>
          <Link to="/customStyles">Custom styles</Link>
        </li>
        <li>
          <Link to="/nodeSize">Resize</Link>
        </li>
        <li>
          <Link to="/d3dag">D3-Dag</Link>
        </li>
        <li>
          <Link to="/elktest">Custom layouts</Link>
        </li>
        <li>
          <Link to="/elkordering">Elk Ordering</Link>
        </li>
        <li>
          <Link to="/dagremultigraph">Dagre multigraph</Link>
        </li>
      </ul>
    </div>
  );
};
