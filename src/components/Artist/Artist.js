import React from 'react';
import './Artist.css';

class Artist extends React.Component {
  render(){
    return (
      <div className="ArtistWrapper">
        <div className="ArtistName">{this.props.name}</div>
        <img className="ArtistPicture" src={this.props.picture} />
      </div>
    )
  }
}
export default Artist;
