import * as React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./Sidebar";
import { Basic1 } from "./examples/Basic1";
import { Basic2 } from "./examples/Basic2";
import { Shapes } from "./examples/Shapes";
import { TCPState } from "./examples/TCPState";
import {CustomShapes} from "./examples/CustomShapes";
import {ForeignObjects1} from "./examples/ForeignObjects1";
import {CustomPathsType} from "./examples/CustomPathType";
import {Timeline} from "./examples/Timeline";
import { MouseEvents } from "./examples/MouseEvents";
import { CustomButtonNodes} from "./examples/CustomButtonNodes";
import { PanAndZoom } from "./examples/PanAndZoom";
import { Tooltips } from "./examples/Tooltips";
import { CustomStyles } from "./examples/CustomStyles";
import { NodeSize } from "./examples/NodeSize";

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
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
