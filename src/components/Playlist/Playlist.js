import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';


class Playlist extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    }

  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }

  render(){
      return (
        <div className="Playlist">
        <input value={this.props.playlistName} onChange={this.handleNameChange}/>
          <div className="PlaylistTracks">            
            <TrackList
                trackList={this.props.playlistTracks}
                onRemove={this.props.onRemove}
                minus = {true} />
          </div>
          <a className="Playlist-save" onClick = {this.props.onSave}>SAVE TO SPOTIFY</a>
        </div>
      )
    }
}
export default Playlist;
