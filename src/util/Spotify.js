const clientID = encodeURIComponent('121fe433b47446558d8fb26cace47dfa');
const scopes = encodeURIComponent('user-read-private playlist-modify-public');
const responseType = 'token';
const redirect_uri = encodeURIComponent('http://localhost:3000');
let accessToken;

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenHash = window.location.href.match(/access_token=([^&]*)/);
    const expireTimeHash = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenHash && expireTimeHash) {
      accessToken = accessTokenHash[1];
      window.history.replaceState('Access Token', null, '/');
      const expiresIn = Number(expireTimeHash[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      return accessToken;
    } else {
      const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=${responseType}`;
      window.location = url;
    };
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    const urlToFetch = `https://api.spotify.com/v1/search?q=${term}&type=track&limit=30`;
    return fetch(urlToFetch, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
        if(!jsonResponse.tracks.total){
          alert('Unfortunately, the search returned no results. Try another keyword please')
        }
        return jsonResponse.tracks.items.map(item => {
          return {
            id: item.id,
            name: item.name,
            album: item.album.name,
            artist: item.artists[0].name,
            uri: item.uri
          };
        })
    })
  },

  savePlaylist(URIs, PlaylistName) {
    let user_id;
    return fetch("https://api.spotify.com/v1/me", {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => console.log(networkError.message))
      .then(jsonResponse => {
        user_id = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: PlaylistName
          })
        })
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => console.log(networkError.message))
      .then(jsonResponse => {
        const playlist_id = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uris: URIs
          })
        })
      })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.snapshot_id) {
          throw new Error('Playlist creation failed!');
        }
      })
  }
}

export default Spotify;
