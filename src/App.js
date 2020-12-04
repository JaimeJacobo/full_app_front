import React from 'react';
import './App.css';

//Componentes
import SignUp from './components/SignUp';
import Home from './components/Home';
import AllMangas from './components/AllMangas';
import IndividualManga from './components/IndividualManga';
import LogIn from './components/LogIn';

//Dependencias
import { Link, Route } from 'react-router-dom';
import UserService from './services/UserService';

class App extends React.Component {
	state = {
		isLogged: {},
		newUser: { username: '', password: '' },
		loggingUser: { username: '', password: '' }
	};

	service = new UserService();

	//SIGNUP CONFIG
	submitSignUp = (event) => {
		event.preventDefault();
    this.service.signup(this.state.newUser.username, this.state.newUser.password)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	changeHandlerSignUp = (_eventTarget) => {
		this.setState({ newUser: { ...this.state.newUser, [_eventTarget.name]: _eventTarget.value } });
	};

	//LOGIN CONFIG
	submitLogIn = (event) => {
		event.preventDefault();
		this.service
			.login(this.state.loggingUser.username, this.state.loggingUser.password)
			.then(() => {
        this.checkIfLoggedIn()
			})
			.catch((err) => {
				console.log('Sorry something went wrong on submit.', err);
			});
	};

	changeHandlerLogIn = (_eventTarget) => {
		this.setState({ loggingUser: { ...this.state.loggingUser, [_eventTarget.name]: _eventTarget.value } });
	};

	checkIfLoggedIn = () => {
    this.service.loggedin()
    .then((result)=>{
      console.log(result)
    })
  };
  
  logOut = ()=>{
    this.service.logout()
    .then((result)=>{
      console.log(result)
      this.checkIfLoggedIn()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

	componentDidMount() {
		this.checkIfLoggedIn();
	}

	render() {
		return (
			<div className="App">
				<Link to="/">Home Page</Link>
				<br />
				<Link to="/all-mangas">All Mangas</Link>
				<br />
				<Link to="/signup">Sign Up</Link>
				<br />
				<Link to="/login">Log In</Link>

				<Route exact path="/" render={()=><Home logOut={this.logOut}/>} />
				<Route exact path="/all-mangas" component={AllMangas} />
				<Route path="/all-mangas/:id" component={IndividualManga} />
				<Route
					path="/signup"
					render={() => (
						<SignUp
							submitSignUp={this.submitSignUp}
							newUser={this.state.newUser}
							changeHandlerSignUp={this.changeHandlerSignUp}
						/>
					)}
				/>
				<Route
					path="/login"
					render={() => (
						<LogIn
							submitLogIn={this.submitLogIn}
							loggingUser={this.state.loggingUser}
							changeHandlerLogIn={this.changeHandlerLogIn}
						/>
					)}
				/>
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
