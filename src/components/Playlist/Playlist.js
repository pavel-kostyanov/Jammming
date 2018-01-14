import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';


class Playlist extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSaveToSpotify = this.handleSaveToSpotify.bind(this);
    }

  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }

  handleSaveToSpotify(){
    if(this.props.playlistTracks[0].marker){
      this.props.playlistUpdate(this.props.playlistTracks[0].playlist_id);
    }else{
      this.props.onSave();
    }
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
          <div className="ButtonsWrapper">
          <a className="Playlist-save" onClick = {this.handleSaveToSpotify}>SAVE TO SPOTIFY</a>
          <a className="CleanList"     onClick = {this.props.cleanList}>CLEAN LIST</a>
          </div>
        </div>
      )
    }
}
export default Playlist;
