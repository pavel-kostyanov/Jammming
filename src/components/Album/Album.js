import React from 'react';
import './Album.css'

class Album extends React.Component {
  render(){
    return (
      <div className="AlbumWrapper">
        <div className="AlbumPicture"><img src={this.props.picture} /></div>
        <div className="AlbumName">{this.props.name}</div>

      </div>
    )
  }
}
export default Album;
