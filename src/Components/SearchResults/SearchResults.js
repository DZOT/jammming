import React, {Component} from 'react';
import './SearchResults.css';

import TrackList from '../TrackList/TrackList';

class SearchResults extends Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList isRemoval={false} onAdd={this.props.onAdd} tracks={this.props.searchResults}/>
      </div>
    );
  }
}

export default SearchResults;
