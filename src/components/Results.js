import React from 'react';
const PropTypes = require('prop-types');
const queryString = require('query-string');
const api = require('../utils/api');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');


function Profile(props){

	let info = props.info;
	return (
		<PlayerPreview avatar={info.avatar_url} username={info.login}>
			<ul className='space-list-items'>
			  {info.name && <li>{info.name}</li>}
			  {info.location && <li>{info.location}</li>}
			  {info.company && <li>{info.company}</li>}
			  <li>Followers: {info.followers}</li>
			  <li>Following: {info.following}</li>
			  <li>Public Repos: {info.public_repos}</li>
			  {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
			</ul>
		</PlayerPreview>
	);
}
Profile.propTypes = {
	info: PropTypes.object.isRequired
}



function Player(props){
    
	return(
		<div>
			<h1 className="header">{props.label}</h1>
			<h3 stlye={{textAlign: 'center'}}>Score: {props.score}</h3>
			<Profile info={props.profile} />
		</div>
	);
}
Player.propTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired
}


class Results extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true
		};
	}
	
	componentDidMount(){
		let players = queryString.parse(this.props.location.search);
		api.battle([players.playerOneName, players.playerTwoName])
			.then(function(results){
				if(results === null){
					console.log(results);
					this.setState(function(){
						return {
							error: 'Error, make sure both usernames are github users!',
							loading: false
						}
					});
				} else {
					this.setState(function(){
						return {
							loading: false,
							winner: results[0],
							loser: results[1],
							error: null
						}
					});
				}
				
			}.bind(this));
	}


	render(){

		let winner = this.state.winner;
		let loser = this.state.loser;
		let error = this.state.error;
		let loading = this.state.loading;

		if(loading)
			return (<p>Loading...</p>);

		if(error)
			return (
				<div>
					<p>{error}</p>
					<Link to="/battle" className ="button">Reset</Link>
				</div>
			);
		
		return (
			<div className="row">
				<Player 
				  label="Winner"
				  score={winner.score}
				  profile={winner.profile}
				/>

				<Player 
				  label="Loser"
				  score={loser.score}
				  profile={loser.profile}
				/>
			</div>
		);
	}

}

export default Results;