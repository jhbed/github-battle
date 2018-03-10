import React, { Component } from 'react';
import Test from './components/test.js';
import Popular from './components/Popular.js';

class App extends Component {
  render() {
    return (
      <div className="container">
          <h1 className="App-title">Welcome to <Test name="jake" /> </h1>
        <Popular />
      </div>
    );
  }
}

export default App;
