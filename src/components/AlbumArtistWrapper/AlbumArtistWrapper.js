import React from 'react';
import AlbumList from '../AlbumList/AlbumList';
import ArtistList from '../ArtistList/ArtistList';
import './AlbumArtistWrapper.css';

class AlbumArtistWrapper extends React.Component {
  render() {
    return (
        <div className="AlbumArtistWrapper">
          <AlbumList   albumsList={this.props.albumsList} />
          <ArtistList  artistList={this.props.artistList} />
        </div>

    );
   }
 }

export default AlbumArtistWrapper;
