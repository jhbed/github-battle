import React, { Component } from 'react';
import Test from './components/test.js';
import Popular from './components/Popular.js';
import Nav from './components/Nav.js';
import Home from './components/Home.js';
import Battle from './components/Battle.js';
import Results from './components/Results';
var ReactRouter = require('react-router-dom');

var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
            <Nav />
            <Switch>
              <Route path='/popular' component={Popular} />
              <Route exact path='/' component={Home} />
              <Route exact path='/battle' component={Battle} /> 
              <Route path='/battle/results' component={Results} /> 
              <Route render={function(){
                return <p>Not Found</p>
              }} />
            </Switch>         
        </div>
      </Router>

    );
  }
}

export default App;
