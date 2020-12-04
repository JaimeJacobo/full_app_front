import React from 'react'

const Home = (props)=>{
  return(
    <div>
      <h2>Home</h2>
      <button onClick={()=>props.logOut()}>Log Out</button>
    </div>
  )
}

export default Home