import React from 'react';
import PlaylistsBox from '../PlaylistsBox/PlaylistsBox'
import Spotify from '../../util/Spotify';

class PlaylistsBoxList extends React.Component {

  componentWillMount(){
  this.props.playlistsLoad();
  }

  render(){
    return (
        <div className="PlaylistsBoxList">
        <h3>playlists</h3>
          {this.props.playlistsBox.map(playlist => {
            return <PlaylistsBox key={playlist.id}
                      playlistName = {playlist.playlistName}
                        playlistID = {playlist.id}
                 getPlaylistTracks = {this.props.getPlaylistTracks}/>
            })}
        </div>
    )
  }
 }
export default PlaylistsBoxList;
