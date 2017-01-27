import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Graph from './Graph.jsx';
import graphData from './graph.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
        <h1>Bullet Graph</h1>
        <Graph width="960"
               marginRight="20"
               marginLeft="120"
               height="35"
               data={graphData}
               targetTooltip="Target"
               measureTooltip="Performance Measure"
               color="#CCC"/>
        </div>
      </div>
    );
  }
}

export default App;
