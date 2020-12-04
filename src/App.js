import React from 'react'
import './App.css';

//Componentes
import SignUp from './components/SignUp'
import Home from './components/Home'
import AllMangas from './components/AllMangas'
import IndividualManga from './components/IndividualManga'
import LogIn from './components/LogIn'
//Dependencias
import { Link, Route } from 'react-router-dom';
import UserService from './services/UserService'

class App extends React.Component {

  state = {
    isLogged: {},
    newUser: {username: '', password: ''},
    loggingUser: {username: '', password: ''}
  }

  userService = new UserService()

  //SIGNUP CONFIG
  submitSignUp = (event)=>{
    event.preventDefault()
    fetch('http://localhost:3000/signup', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(this.state.newUser)
    })
    .then((result)=>{
      console.log(result)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  changeHandlerSignUp = (_eventTarget) => {
    this.setState({newUser: {...this.state.newUser, [_eventTarget.name]: _eventTarget.value}})
  }

  //LOGIN CONFIG

  submitLogIn = (event)=>{
    event.preventDefault()
    fetch('http://localhost:3000/login', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(this.state.loggingUser)
    })
    .then((result)=>{
      this.userService.loggedin()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  changeHandlerLogIn = (_eventTarget) => {
    this.setState({loggingUser: {...this.state.loggingUser, [_eventTarget.name]: _eventTarget.value}})
  }

  checkIfLoggedIn = ()=>{
    fetch('http://localhost:3000/loggedin')
    .then((data)=>{
      return data.json()
    })
    .then((dataJSON)=>{
      this.setState({isLogged: dataJSON})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  componentDidMount(){
    this.checkIfLoggedIn()
  }


  render(){
    // this.checkIfLoggedIn()
    return (
      <div className="App">
        <Link to='/'>Home Page</Link>
        <br />
        <Link to='/all-mangas'>All Mangas</Link>
        <br />
        <Link to='/signup'>Sign Up</Link>
        <br />
        <Link to='/login'>Log In</Link>

        <Route exact path="/" component={Home} />
        <Route exact path="/all-mangas" component={AllMangas} />
        <Route path='/all-mangas/:id' component={IndividualManga} />
        <Route path='/signup' render={()=>
          <SignUp 
            submitSignUp={this.submitSignUp} 
            newUser={this.state.newUser} 
            changeHandlerSignUp={this.changeHandlerSignUp}
          /> 
        } />
        <Route path='/login' render={()=>
          <LogIn
            submitLogIn={this.submitLogIn} 
            loggingUser={this.state.loggingUser} 
            changeHandlerLogIn={this.changeHandlerLogIn}
          /> 
        } />
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


