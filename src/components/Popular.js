import React, { Component } from 'react';
const PropTypes = require('prop-types');
const api = require('../utils/api');


//STATELESS FUNCTIONAL COMPONENT
/*
Something weird: The list of languages is stored here is this stateless component,
however, one of these languages is going to be stored in our parent's state. To me,
it seems more readable/intuitive to store this list in parent, however, Tyler seems
to want it here. 
*/
function SelectLang(props){
	const languages = ['All', 'Javascript', 'Ruby','Java','CSS','Python'];
	return (
		<ul className="languages">
			{languages.map(language => 
				<li 
					style={language === props.selectedLanguage ? {color: 'blue'} : null}
					onClick={props.onSelect.bind(null, language)} //UPDATES PARENT STATE
					key={language}>
					{language}
				</li>
			)}
		</ul>
	);
}

SelectLang.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
}



//REGULAR COMPONENT
class Popular extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null,
		}

		this.updateLanguage = this.updateLanguage.bind(this);
	}

	updateLanguage(lang){
		this.setState(function(){
			return ({ 
				selectedLanguage: lang,
				repos: null, 
			});
		});


		api.fetchPopularRepos(lang)
			.then(function(repos){
				this.setState(function(){
					return({
						repos: repos,
					})
				})
			}.bind(this));
	}

	componentDidUpdate(){
		console.log("State updated to: " + this.state.selectedLanguage);
	}

	componentDidMount(){
		this.updateLanguage(this.state.selectedLanguage);
	}


  render() {
    return (
    	<div>
    		<SelectLang 
			selectedLanguage = {this.state.selectedLanguage}
			onSelect = {this.updateLanguage}
    		/>
    		{JSON.stringify(this.state.repos, null, 2)}
    	</div>
    );
  }
}

//we only need to export Popular because Popular is rendering SelectLang, which then gets exported.
export default Popular;