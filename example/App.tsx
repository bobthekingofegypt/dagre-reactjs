import './App.css';

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Basic1 } from './examples/Basic1';
import { Basic2 } from './examples/Basic2';
import { CustomButtonNodes } from './examples/CustomButtonNodes';
import { CustomLayouts } from './examples/CustomLayouts';
import { CustomPathsType } from './examples/CustomPathType';
import { CustomShapes } from './examples/CustomShapes';
import { CustomStyles } from './examples/CustomStyles';
import { D3Dag } from './examples/D3Dag';
import { DagreMultigraph } from './examples/DagreMultigraph';
import { ElkOrdering } from './examples/elkordering/ElkOrdering';
import { ForeignObjects1 } from './examples/ForeignObjects1';
import { MouseEvents } from './examples/MouseEvents';
import { NodeSize } from './examples/NodeSize';
import { PanAndZoom } from './examples/PanAndZoom';
import { Shapes } from './examples/Shapes';
import { TCPState } from './examples/TCPState';
import { Timeline } from './examples/Timeline';
import { Tooltips } from './examples/Tooltips';
import { Sidebar } from './Sidebar';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="container">
        <Sidebar />
        <div className="page-content">
          <Switch>
            <Route exact path="/" component={Basic1} />
            <Route path="/basic1" component={Basic1} />
            <Route path="/basic2" component={Basic2} />
            <Route path="/shapes" component={Shapes} />
            <Route path="/tcpStateData" component={TCPState} />
            <Route path="/customShapes" component={CustomShapes} />
            <Route path="/foreignObjects" component={ForeignObjects1} />
            <Route path="/customPaths" component={CustomPathsType} />
            <Route path="/timeline" component={Timeline} />
            <Route path="/mouseEvents" component={MouseEvents} />
            <Route path="/customButtonNodes" component={CustomButtonNodes} />
            <Route path="/panAndZoom" component={PanAndZoom} />
            <Route path="/tooltips" component={Tooltips} />
            <Route path="/customStyles" component={CustomStyles} />
            <Route path="/nodeSize" component={NodeSize} />
            <Route path="/d3dag" component={D3Dag} />
            <Route path="/elktest" component={CustomLayouts} />
            <Route path="/elkOrdering" component={ElkOrdering} />
            <Route path="/dagremultigraph" component={DagreMultigraph} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
