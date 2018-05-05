const clientID = 'fb7d78ea0f9b401095a28d3e21b5da31';
const redirectURI = 'http://localhost:3000/';

let accessToken;
let expiresIn;

const Spotify = {

  getAccessToken() {
    if (accessToken)
      return accessToken;

    let url = window.location.href;

    let access = /access_token=([^&]*)/;
    let exprie = /expires_in=([^&]*)/;

    if (url.match(access) && url.match(exprie)) {

      accessToken = url.match(access)[1];
      expiresIn = url.match(exprie)[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;

  },

  search(term) {

    if (accessToken) {

      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {

        if (jsonResponse.tracks.items) {
          return jsonResponse.tracks.items.map(track => ({id: track.id, name: track.name, artist: track.artists[0].name, album: track.album.name, uri: track.uri}));
        }
      });
    } else {
      this.getAccessToken();
      return true;
    }
  },

  savePlaylist(playlistName, playlistTracks) {
    if (!playlistName || !playlistTracks)
      return;
    let uriArray = playlistTracks.map(track => {
      return track.uri
    });

    let token = accessToken;

    let header = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    return fetch(`https://api.spotify.com/v1/me`, header).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return (jsonResponse.id);
    }).then(userID => {
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({name: playlistName})
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        return (jsonResponse.id);
      }).then(playlist_id => {
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlist_id}/tracks`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: "POST",
          body: JSON.stringify({uris: uriArray})

        });
      })

    });

  }

};

export default Spotify;
