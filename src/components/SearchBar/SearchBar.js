import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {term: ''};
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
    this.handleSearchByEnter = this.handleSearchByEnter.bind(this);
  }

  handleSearchFieldChange(event){
    let promise = new Promise((resolve, reject) => {resolve(this.setState({term: event.target.value}))});
    promise.then(() => {this.props.searchSpotify(this.state.term)});
  }

  handleSearch(event) {
    event.preventDefault();
    this.props.searchSpotify(this.state.term);
  }

  handleSearchByEnter(event) {
    if(event.keyCode == 13){
    this.props.searchSpotify(this.state.term)};
  }

  render(){
    return (
      <div className="SearchBar">
        <input onChange = {this.handleSearchFieldChange}
               onKeyDown = {this.handleSearchByEnter}
               placeholder = "Enter A Song Title" />
        <a onClick = {this.handleSearch}>SEARCH</a>
      </div>
     );
   }
 }
export default SearchBar;
