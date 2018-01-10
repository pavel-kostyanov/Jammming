import React from 'react';
import Artist from '../Artist/Artist';

class ArtistList extends React.Component {
  render(){
    return (
      <div className="ArtistList">
        {
          this.props.artistList.map(artist => {
            return <Artist key = {artist.id}
                          name = {artist.name}
                   searchSpotify={this.props.searchSpotify} />
          })
        }
      </div>
    )
  }
 }
export default ArtistList;
