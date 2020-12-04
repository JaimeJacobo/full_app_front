import React from 'react'

class IndividualManga extends React.Component{

  state = {
    mangaInfo: {}
  }

  componentDidMount(){
    fetch(`https://api.jikan.moe/v3/manga/${this.props.match.params.id}`)
    .then((data)=>{
      return data.json()
    })
    .then((dataJSON)=>{
      this.setState({mangaInfo: dataJSON})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  render(){
    return(
      <div>
        <h2>{this.state.mangaInfo.title_english}</h2>
        <img src={this.state.mangaInfo.image_url} alt={this.state.mangaInfo.title_english}/>
      </div>
    )    
  }
}

export default IndividualManga