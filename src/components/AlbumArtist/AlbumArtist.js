import React from 'react';
import AlbumList from '../AlbumList/AlbumList';
import ArtistList from '../ArtistList/ArtistList';

class AlbumArtist extends React.Component {
  render() {
    return (
        <div className="albumAuthorWrapper">
          <AlbumList   albumsList={this.props.albumsList} />
          <ArtistList  artistList={this.props.artistList} />
        </div>

    );
   }
 }

export default AlbumArtist;
