import React, { Component } from 'react';
import './App.css';
import ComponenteHeader from './components/header';
import { Progress, Button } from 'antd';

class App extends Component {
    state = {
        percent: 10,
      }
  render() {
    return (
      <div className="App">
        <ComponenteHeader></ComponenteHeader>
        <div> <Progress percent={this.state.percent}></Progress>  </div>
        
      </div>
    );
  }
}

export default App;
