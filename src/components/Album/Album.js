import React from 'react';
import './Album.css'

class Album extends React.Component {
  render(){
    return (
      <div className="AlbumName">
        {this.props.name}
      </div>
    )
  }
}
export default Album;
