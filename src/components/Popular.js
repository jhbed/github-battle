import React from 'react';
import Nav from './Nav.js';
import Test from './test.js';
const PropTypes = require('prop-types');
const api = require('../utils/api');


//STATELESS FUNCTIONAL COMPONENT
/*
Something weird: The list of languages is stored here is this stateless component,
however, one of these languages is going to be stored in our parent's state. To me,
it seems more readable/intuitive to store this list in parent, however, Tyler seems
to want it here. 
*/


function RepoGrid(props){
	return (
		<ul className="popular-list">
			{props.repos.map((repo, index) => 
				<li key={repo.name} className="popular-item">
					<div className="popular-rank">#{index+1}</div>
					<ul className="space-list-items">
						<li>
							<img 
								className="avatar"
								src={repo.owner.avatar_url}
								alt={"Avatar for " + repo.owner.login}
							/>


						</li>

						<li>
							<a href={repo.html_url}>{repo.name}</a>
						</li>

						<li>
							@{repo.owner.login}
						</li>

						<li>
							{repo.stargazers_count} stars
						</li>
					</ul>
				</li>
			)}
		</ul>
	);
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired,
}


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
		//goes AS SOON as a category button is clicked
		this.setState(function(){
			return ({ 
				selectedLanguage: lang,
				repos: null, 
			});
		});

		//changes state once we get the response!
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

  //This re-renders every time there is a change in state that effects
  //this component
  render() {
    return (
    	<div>
    		<SelectLang 
			selectedLanguage = {this.state.selectedLanguage}
			onSelect = {this.updateLanguage}
    		/>
    		{/*Here it will render once as soon as the category is changed
    		which  will trigger 'loading', and then render again as soon as 
    	    a response is recieved from our ajax call.*/}
			{!this.state.repos 
			 ? <p>Loading...</p>
			 : <RepoGrid repos={this.state.repos} />}

    	</div>
    );
  }
}

//we only need to export Popular because Popular is rendering SelectLang, which then gets exported.
export default Popular;