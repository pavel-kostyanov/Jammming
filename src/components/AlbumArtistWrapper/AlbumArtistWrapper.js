import React from 'react';
import AlbumList from '../AlbumList/AlbumList';
import ArtistList from '../ArtistList/ArtistList';
import './AlbumArtistWrapper.css';

class AlbumArtistWrapper extends React.Component {
  render() {
    return (
        <div className="AlbumArtistWrapper">
          <AlbumList   albumsList={this.props.albumsList}
                    searchSpotify={this.props.searchSpotify} />
          <ArtistList  artistList={this.props.artistList}
                    searchSpotify={this.props.searchSpotify}/>
        </div>

    );
   }
 }

export default AlbumArtistWrapper;
