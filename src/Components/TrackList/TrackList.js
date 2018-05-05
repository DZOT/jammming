import React, {Component} from 'react';
import './TrackList.css';

import Track from '../Track/Track';

class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return <Track onRemove ={this.props.onRemove} onAdd ={this.props.onAdd} isRemoval={this.props.isRemoval} track={track} key={track.uri}/>
        })
        }
      </div>
    );
  }
}

export default TrackList;
