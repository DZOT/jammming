import React, {Component} from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

const searchResults = []

const playlistName = 'New Playlist'

const playlistTracks = []

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchResults: searchResults,
      playlistTracks: playlistTracks,
      playlistName: playlistName
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    this.setState({
      playlistTracks: this.state.playlistTracks.concat([track])
    })

  }

  removeTrack(track) {
    let newPlayList = this.state.playlistTracks.filter(function(savedTrack) {
      return savedTrack.id !== track.id;
    });

    this.setState({playlistTracks: newPlayList});

  }

  savePlaylist() {
    Spotify.savePlaylist(this.state.playlistName, this.state.playlistTracks);
    this.setState({playlistName: 'New Playlist', playlistTracks: []})

  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  search(term) {

    if (Spotify.getAccessToken())
      Spotify.search(term).then(result => {

        this.setState({searchResults: result});
      });

    }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist onRemove={this.removeTrack} onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
