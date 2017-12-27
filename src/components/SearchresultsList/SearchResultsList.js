import React from 'react';
import './SearchResultsList.css';
import Spotify from '../../util/Spotify';
import SearchResults from '../SearchResults/SearchResults';

class SearchResultsList extends React.Component {
  render(){
      return (
        <div className="SearchResults">
          <h2>Results</h2>
            {this.props.searchResults.map((item, i) => {return <SearchResults searchResult={item} key={item.id} />})}



        </div>

      );
    }
}
export default SearchResultsList;
