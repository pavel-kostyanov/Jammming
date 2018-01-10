import React from 'react';
import './Artist.css';

class Artist extends React.Component {
  constructor(props){
    super(props);
    this.linkForArtistSearch = this.linkForArtistSearch.bind(this);
  }

  linkForArtistSearch(event){
    event.preventDefault();
    let term = `artist:"${this.props.name}"`;
    this.props.searchSpotify(term);
  }

  render(){
    return (
      <div className="ArtistWrapper">
        <div className="ArtistName"><a  onClick={this.linkForArtistSearch}>{this.props.name}</a></div>
      </div>
    )
  }
}
export default Artist;
