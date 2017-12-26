import React from 'react';
import './SearchResults.css';
import Spotify from '../../util/Spotify';

class SearchResults extends React.Component {
  render(){
    return (
      <div>
        <h2>Results</h2>
        <div className="TrackList">
          <div className="Track">
            <div className="Track-information">
              <h3>{this.props.searchResult.name}</h3>
              <p>Elton John | Madman Across The Water</p>
            </div>
            <a className="Track-action">+</a>
          </div>

        </div>
      </div>
    );
  }
}
export default SearchResults;
