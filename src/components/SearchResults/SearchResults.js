import React from 'react';
import './SearchResults.css';
import Spotify from '../../util/Spotify';
import SearchResultsList from '../SearchResultsList/SearchResultsList';

class SearchResults extends React.Component {
  render(){
    return (


        <div className="TrackList">
              <div className="Track">
                  <div className="Track-information">
                    <h3>{this.props.searchResult.name}</h3>
                    <p>{this.props.searchResult.artist} | {this.props.searchResult.album}</p>
                  </div>

                  <a className="Track-action">+</a>
              </div>

        </div>
      )
  }
}
export default SearchResults;
