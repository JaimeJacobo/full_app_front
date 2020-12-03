import React from 'react'
import './App.css';

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
        <form onSubmit={this.submitForm}>

          <label htmlFor="username">Username: </label>
          <input type="text" name="username" value={this.state.user.username} onChange={(event)=>this.changeHandler(event.target)}/>

          <label htmlFor="password">Password: </label>
          <input type="password" name="password" value={this.state.user.password} onChange={(event)=>this.changeHandler(event.target)}/>

          <button type="submit">Crear Usuario</button>

        </form>
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