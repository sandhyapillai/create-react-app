import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Graph from './components/Graph.jsx';
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
               marginRight="40"
               marginLeft="140"
               height="35"
               data={graphData}
               targetTooltip="Target"
               measureTooltip="Performance Measure"
               measureColor="#000"
               targetColor="#CCC"/>
         <Graph width="960"
                marginRight="40"
                marginLeft="140"
                height="35"
                data={graphData}
                targetTooltip="Target"
                measureTooltip="Performance Measure"
                measureColor="#476FBA"
                targetColor="#000"/>
                
        </div>
      </div>
    );
  }
}

export default App;
