import React from 'react'
import './App.css';

//Componentes
import CreateUserForm from './components/CreateUserForm'
import Home from './components/Home'
import AllMangas from './components/AllMangas'
//Dependencias
import { Link, Route } from 'react-router-dom';

class App extends React.Component {

  state = {
    user: {username: '', password: ''}
  }

  submitForm = (event)=>{
    event.preventDefault()
    fetch('http://localhost:3000/new-user', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(this.state.user)
    })
    .then((result)=>{
      console.log(result)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  changeHandler = (_eventTarget) => {
    this.setState({user: {...this.state.user, [_eventTarget.name]: _eventTarget.value}})
  }

  render(){
    return (
      <div className="App">
        <Link to='/'>Home Page</Link>
        <br />
        <Link to='/all-mangas'>All Mangas</Link>

        <Route exact path="/" component={Home} />
        <Route exact path="/all-mangas" component={AllMangas} />
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




// <CreateUserForm 
 // submitForm={this.submitForm}
 // user={this.state.user}
 // changeHandler={this.changeHandler}
///> 