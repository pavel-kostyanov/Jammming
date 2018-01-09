import React, {Component} from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import AlbumArtistWrapper from './components/AlbumArtistWrapper/AlbumArtistWrapper';
import Spotify from './util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackList: [],
      albumsList:[],
      artistList:[],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  searchSpotify(term) {
    const encodedTerm = encodeURIComponent(term);
    Spotify.search(encodedTerm).then(value => {
      console.log(value);
      this.setState({
        trackList:  value[0],
        albumsList: value[1],
        artistList: value[2]
      });
    });
  }

  addTrack(track) {
    let TemporaryArray = this.state.playlistTracks;
    if(!TemporaryArray.some((e) => {return e.id === track.id}));
    let updatedPlayList = TemporaryArray.push(track);
    this.setState({
      playlistTracks: updatedPlayList
    });
  }

  removeTrack(track) {
    let TemporaryArray = this.state.playlistTracks;
    let updatedPlaylist = TemporaryArray.filter(item => item.id !== track.id);
    this.setState({
      playlistTracks: updatedPlaylist
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(item => item.uri);
    Spotify.savePlaylist(trackURIs, this.state.playlistName)
      .then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
      });
  }

  render() {
    return ( <div>
      <h1>Ja<span className = "highlight" >mmm</span>ing</h1 >
      <SearchBar searchSpotify = {this.searchSpotify} />
      <div className = "App">
          <div className = "App-playlist">
            < Playlist playlistName = {this.state.playlistName}
                     playlistTracks = {this.state.playlistTracks}
                           onRemove = {this.removeTrack}
                       onNameChange = {this.updatePlaylistName}
                             onSave = {this.savePlaylist} />
          </div>
          <div className = "App-SearchResults">
            < SearchResults trackList = {this.state.trackList}
                                onAdd = {this.addTrack} />
            < AlbumArtistWrapper  albumsList = {this.state.albumsList}
                                  artistList = {this.state.artistList} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
