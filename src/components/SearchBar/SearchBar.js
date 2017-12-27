import React from 'react';
import './SearchBar.css';
import Spotify from '../../util/Spotify';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {term: ''};
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
  }

  handleSearchFieldChange(event){
    this.setState({term: event.target.value});

  }



  handleSearch(event) {
    event.preventDefault();

    this.props.searchSpotify(this.state.term);
    // this.props.getToken();
    // const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);


  }

  render(){
    return (
      <div className="SearchBar">
        <input onChange = {this.handleSearchFieldChange} placeholder = "Enter A Song Title" />
        <a onClick = {this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}
export default SearchBar;
