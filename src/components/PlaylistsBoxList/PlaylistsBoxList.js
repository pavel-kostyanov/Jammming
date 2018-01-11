import React from 'react';
import PlaylistsBox from '../PlaylistsBox/PlaylistsBox'

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
                        playlistID = {playlist.playlistID}/>
            })}
        </div>
    )
  }
 }
export default PlaylistsBoxList;
