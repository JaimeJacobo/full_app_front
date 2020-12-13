import React from 'react'

const Home = (props)=>{
  return(
    <div>
      <h2>Home!!</h2>
      <h3>{props.loggedInUser && `Welcome, ${props.isLogged.username}`}</h3>
      {props.loggedInUser && <button onClick={()=>props.logOut()}>Log Out</button>}
    </div>
  )
}

export default Home