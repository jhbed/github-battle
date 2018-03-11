import React, { Component } from 'react';
const PropTypes = require('prop-types');

class Popular extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			selectedLanguage: 'All',
		}

		this.updateLanguage = this.updateLanguage.bind(this);
	}

	updateLanguage(lang){
		this.setState(function(){
			return ({ 
				selectedLanguage: lang 
			});
		});
	}


	render() {
	  	let languages = ['All', 'Javascript', 'Ruby','Java','CSS','Python'];
	    return (
	    	/*
			Notice the arrow function** 
			Since we have a function there, it is important to bind 'this' t
			to the object, so it is not bound to the arrow function. We do this 
			binding in the constructor.
	    	*/
	    	<ul className="languages">
	    		{languages.map(language => 
	    			<li 
	    				style={language === this.state.selectedLanguage ? {color: 'blue'} : null}
	    				onClick={this.updateLanguage.bind(null, language)}
	    				key={language}>
	    				{language}
	    			</li>
	    		,this)}
	    	</ul>

	    );
	}
}

export default Popular;