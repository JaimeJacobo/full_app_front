import React from 'react';
import './App.css';

//Componentes
import SignUp from './components/SignUp';
import Home from './components/Home';
import AllMangas from './components/AllMangas';
import IndividualManga from './components/IndividualManga';
import LogIn from './components/LogIn';
import Profile from './components/Profile';

//Dependencias
import { Link, Route, Redirect } from 'react-router-dom';
import UserService from './services/UserService';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: null,
			publicProfileId: ''
		};
		this.service = new UserService();
	}

	fetchUser() {
		if (this.state.loggedInUser === null) {
			this.service
				.loggedin()
				.then((response) => {
					this.setState({
						loggedInUser: response
					});
				})
				.catch((err) => {
					this.setState({
						loggedInUser: false
					});
				});
		}
	}

	getTheUser = (userObj) => {
		this.setState({
			loggedInUser: userObj
		});
	};

	getProfilePublicId = (id) => {
		this.setState({
			publicProfileId: id
		});
	};
	changeAvatar = (avatarUrl) => {
		const copyUser = { ...this.state.loggedInUser, imgPath: avatarUrl };
		this.setState({
			loggedInUser: copyUser
		});
	};
	changeUserInfo = (userInfo) => {
		const copyUser = { ...this.state.loggedInUser, name: userInfo.name, lastName: userInfo.lastName };
		this.setState({ loggedInUser: copyUser });
	};

	render() {
		this.fetchUser()
		return (
			<div className="App">
				<Link to="/">Home Page</Link>
				<br />
				<Link to="/all-mangas">All Mangas</Link>
				<br />
				{!this.state.loggedInUser && <Link to="/signup">Sign Up</Link>}
				<br />
				{!this.state.loggedInUser && <Link to="/login">Log In</Link>}
				<br />
				{this.state.loggedInUser && <Link to="/profile">Profile</Link>}

				<Route exact path="/" render={() => <Home isLogged={this.state.loggedInUser} />} />
				<Route exact path="/all-mangas" component={AllMangas} />
				{/* <Route path="/all-mangas/:id" render={()=><Individualmanga} /> */}
				<Route
					path="/all-mangas/:id"
					render={(props) => {
						return <IndividualManga {...props} loggedInUser={this.state.loggedInUser} />;
					}}
				/>
				<Route
					path="/signup"
					render={() =>
						!this.state.loggedInUser ? (
							<SignUp
								submitSignUp={this.submitSignUp}
								newUser={this.state.newUser}
								changeHandlerSignUp={this.changeHandlerSignUp}
							/>
						) : (
							<Redirect to="/" />
						)}
				/>
				<Route
					path="/login"
					render={() =>
						!this.state.loggedInUser ? <LogIn getUser={this.getTheUser} /> : <Redirect to="/" />}
				/>
				{/* {this.state.loggedInUser && (
					<Route path="/profile" render={() => <Profile loggedInUser={this.state.loggedInUser} />} />
				)} */}
			</div>
		);
	}
}

export default App;

//Componentes
//Props
//Rutas
//Autentificación (passport)
//Deployment
//Consultas a APIs externas
