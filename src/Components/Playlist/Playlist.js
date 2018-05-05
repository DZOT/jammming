import React, {Component} from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.showButton = this.showButton.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  showButton() {
    if (this.props.playlistTracks.length > 0)
      return (
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      )
  }

  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} value={this.props.playlistName}/>
        <TrackList onRemove={this.props.onRemove} isRemoval ={true} tracks={this.props.playlistTracks}/> {this.showButton(this.props.isRemoval)}

      </div>
    );
  }
}

export default Playlist;
