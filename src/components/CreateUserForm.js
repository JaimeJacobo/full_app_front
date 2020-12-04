import React from 'react'

const CreateUserForm = (props)=>{
  // const {submitForm, user, changeHandler} = props
  return(
    <div>
      <form onSubmit={props.submitForm}>

        <label htmlFor="username">Username: </label>
        <input 
          type="text" 
          name="username" 
          value={props.user.username} 
          onChange={(event)=>props.changeHandler(event.target)}
        />

        <label htmlFor="password">Password: </label>
        <input 
          type="password" 
          name="password" 
          value={props.user.password} 
          onChange={(event)=>props.changeHandler(event.target)}
        />

        <button type="submit">Crear Usuario</button>

      </form>
    </div>
  )
}

export default CreateUserForm