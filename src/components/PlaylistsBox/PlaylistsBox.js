import React from 'react';
import './PlaylistsBox.css';

class PlaylistsBox extends React.Component {
  
  render(){
    return (
      <div className="Playlistsbox">
        {this.props.playlistName}
      </div>
    )
  }
}
export default PlaylistsBox;
