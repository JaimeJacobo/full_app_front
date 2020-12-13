import React from 'react';
import Service from '../services/UserService';

class LogIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.service = new Service();
	}

	handleFormSubmit = (event) => {
		event.preventDefault();

		this.service
			.login(this.state.username, this.state.password)
			.then((response) => {
				this.setState({
					username: '',
					password: ''
				});
				this.props.getUser(response);
			})
			.catch((err) => console.error(err));
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<div>
				<h2>Log In</h2>
				<form onSubmit={this.handleFormSubmit}>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						name="username"
						value={this.state.username}
						onChange={(event) => this.handleChange(event)}
					/>

					<label htmlFor="password">Password: </label>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={(event) => this.handleChange(event)}
					/>

					<button type="submit">Log In</button>
				</form>
			</div>
		);
	}
}

export default LogIn;
