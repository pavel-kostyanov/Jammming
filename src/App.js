import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Spotify from './util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    
  }





  render() {
    return (
      <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                    < SearchBar />


                    <div className="App-playlist">
                      <SearchResults />
                      <Playlist />

                    </div>
            </div>
      </div>
    );
  }
}

export default App;
