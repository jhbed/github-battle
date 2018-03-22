import React from 'react';
const PropTypes = require('prop-types');


function PlayerPreview(props){
	return (
		<div>
			<div className="column">
				<img
				  className="avatar" 
				  src={props.avatar} 
				  alt={"Avatar for " + props.username}
				/>
				<h2 className="username">@{props.username}</h2>
				<button
				  className="reset"
				  onClick={props.onReset.bind(null, props.id)}
				>
				Reset	
				</button>
			</div>
		</div>
	);
}

PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired
}



class PlayerInput extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			username: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event){
		let value = event.target.value;
		this.setState(function(){
			return {
				username: value
			}
		});
	}

	handleSubmit(event){
		event.preventDefault();
		this.props.onSubmit(this.props.id, this.state.username);
	}



	render(){
		return(
			<form className='column' onSubmit={this.handleSubmit}>
				<label htmlFor="username" className='header'>
					{this.props.label}
				</label>
				<input 
					type="text"
					placeholder="github username"
					id="username"
					autoComplete="off"	
					value={this.state.username}
					onChange={this.handleChange}
				/>

				<button
					className='button'
					type='submit'
					disabled={!this.state.username}
				>
				Submit
				</button>

			</form>
			
		);
	}
}

PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			playerOneName: '',
			playerTwoName: '',
			playerOneImage: null,
			playerTwoImage: null
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleSubmit(id, username){
		this.setState(function(){
			let newState = {};
			newState[id + 'Name'] = username;
			newState[id + 'Image'] = 'https://github.com/' + username
			                       + '.png?size=200';
			return newState;
		});
	}

	handleReset(id) {
		console.log(id);
		this.setState(function(){
			let newState = {};
			newState[id + 'Name'] = '';
			newState[id + 'Image'] = null;
			
			return newState;
		});
	}

	render(){
		let playerOneName = this.state.playerOneName;
		let playerTwoName = this.state.playerTwoName;
		let playerOneImage = this.state.playerOneImage;
		let playerTwoImage = this.state.playerTwoImage;
		return(
			
			<div>
				<div className="row">
					{/*&& is shorthand if statement. Basically saying
					if !playerOneName is true then put input*/}	
					{!playerOneName && 
						<PlayerInput 
							id="playerOne"
							label="Player One"
							onSubmit={this.handleSubmit}
						/>
					}

					{playerOneImage !== null &&
						<PlayerPreview 
							username={playerOneName}
							avatar={playerOneImage}
							id="playerOne"
							onReset={this.handleReset.bind(null, 'playerOne')}
						/>
					}

					{!playerTwoName &&
						<PlayerInput 
							id="playerTwo"
							label="Player Two"
							onSubmit={this.handleSubmit}
						/>
					}

					{playerTwoImage !== null &&
						<PlayerPreview 
							username={playerTwoName}
							avatar={playerTwoImage}
							id="playerTwo"
							onReset={this.handleReset.bind(null, 'playerTwo')}
						/>
					}

				</div>
			</div>

		);
	}
}

export default Battle;