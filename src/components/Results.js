import React from 'react';
const PropTypes = require('prop-types');
const Link = require('react-router-dom').Link;

class Results extends React.Component {
	
	render(){
		console.log(this.props);
		return (
			<div>
				Results!
			</div>
		);
	}

}

export default Results;