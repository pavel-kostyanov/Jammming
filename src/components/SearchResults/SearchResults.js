import React from 'react';
import TrackList from '../TrackList/TrackList';
import AlbumList from '../AlbumList/AlbumList';
import ArtistList from '../ArtistList/ArtistList';
import './SearchResults.css';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <div className="Title">
          <div className="space"></div>
          <div className="track">Track</div>
          <div className="artist">Artist</div>
          <div className="album">Album</div>
        </div>
        <TrackList
        trackList={this.props.trackList}
            onAdd={this.props.onAdd} />        
      </div>
    );
   }
 }

export default SearchResults;
