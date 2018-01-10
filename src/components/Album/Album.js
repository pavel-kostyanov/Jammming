import React from 'react';
import './Album.css'

class Album extends React.Component {
  constructor(props){
    super(props);
    this.linkForAlbumSearch = this.linkForAlbumSearch.bind(this);
  }

  linkForAlbumSearch(event){
    event.preventDefault();
    let term = `album:"${this.props.name}" artist:"${this.props.artistName}"`;
    this.props.searchSpotify(term);
  }

  render(){
    return (
      <div className="AlbumWrapper">
        <div className="AlbumPicture">
          <a onClick={this.linkForAlbumSearch}>
            <img src={this.props.picture} />
          </a>
        </div>
        <div className="AlbumName">
          <a onClick={this.linkForAlbumSearch}>
            {this.props.name}
          </a>
        </div>      
      </div>
    )
  }
}
export default Album;
