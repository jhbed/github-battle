import React, { Component } from 'react';
const PropTypes = require('prop-types');

class Test extends Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

Test.proptypes = {
	name: PropTypes.array.isRequired,
}

export default Test;