import React from 'react';
import Nav from './Nav.js';
const Link = require('react-router-dom').Link;
class Home extends React.Component {

	render(){
		return (
			<div className="home-container">
				<h1>Github Battle: Battle your friends!</h1>
				<Link className='button' to='/battle'>
					Battle
				</Link>
			</div>

		);
	}
}

export default Home;