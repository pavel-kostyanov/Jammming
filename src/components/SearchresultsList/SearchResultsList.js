import React from 'react';
import './SearchResultsList.css';
import SearchResults from '../SearchResults/SearchResults';

class SearchResultsList extends React.Component {
  render(){
    return (
      <div className="SearchResults">
        {this.props.searchResults.map((item, i) => <SearchResults searchResult={item} key={i} />)};
      </div>
    );
  }
}
export default SearchResultsList;
