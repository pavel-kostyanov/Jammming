import React from 'react';
import './PlaylistsBox.css';

class PlaylistsBox extends React.Component {
  constructor(props){
    super(props);
    this.handleGettingPlaylistTracks = this.handleGettingPlaylistTracks.bind(this);
  }

  handleGettingPlaylistTracks(event){
    event.preventDefault();
    this.props.getPlaylistTracks(event.target.attributes.uri_data.value);
  }

  render(){
    return (
      <div className="Playlistsbox">
        <a onClick = {this.handleGettingPlaylistTracks} uri_data={this.props.playlistID}>
          {this.props.playlistName}
        </a>
      </div>
    )
  }
}
export default PlaylistsBox;
