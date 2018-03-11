import React, { Component } from 'react';
const PropTypes = require('prop-types');

class Test extends Component {
  render() {
    return (
      <div>
        {this.props.name}'s App!
      </div>
    );
  }
}

export default Test;