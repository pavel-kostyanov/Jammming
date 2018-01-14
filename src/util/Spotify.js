const clientID = encodeURIComponent('121fe433b47446558d8fb26cace47dfa');
const scopes = encodeURIComponent('user-read-private playlist-modify-public');
const responseType = 'token';
const redirect_uri = encodeURIComponent('http://localhost:3000');
let accessToken;
let user_id;

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

  getUserID(){
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
      })
      .then(jsonResponse => {
        user_id = jsonResponse.id;
        return user_id;
      })
   },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    const urlToFetch = `https://api.spotify.com/v1/search?q=${term}&type=track,album,artist&limit=50`;
    return fetch(urlToFetch, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message))
      .then(jsonResponse => {
          if(!jsonResponse.tracks.total){
            alert('Unfortunately, the search returned no results. Try another keyword please')
          }//----------------
          const tracks = jsonResponse.tracks.items.map(item => {
            return {
              id: item.id,
              name: item.name,
              album: item.album.name,
              artist: item.artists[0].name,
              uri: item.uri
            };
          })//---------------
          const albums = jsonResponse.albums.items.map(item => {
            return {
              id: item.id,
              name: item.name,
              picture: item.images[1].url,
              artist: item.artists[0].name,
              uri: item.uri
            };
          })//---------------
          const artists = jsonResponse.artists.items.map(item => {
            return {
              id: item.id,
              name: item.name,
              uri: item.uri
            };
          })//---------------
        const totalSearchResult = [tracks, albums, artists];
        return totalSearchResult;
      })
  },

  savePlaylist(URIs, PlaylistName) {
      const user_id = localStorage.getItem('userID');
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
  },

  getPlaylists (){
     const user_id = localStorage.getItem('userID');
      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
          headers: {
            'Authorization': 'Bearer ' + accessToken
          }
        })
        .then(response => {
          if(response.ok){
              return response.json();
            }
            throw new Error('Request failed!');
        },networkError => console.log(networkError.message))
        .then(jsonResponse => {
          return jsonResponse.items.map(item => {
            return {
              id: item.id,
              playlistName: item.name,
              playlistID: item.uri
            }
          })
        })//--------
   },

   PlaylistTracks(playlistID){
      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlistID}/tracks`, {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error('Request failed!');
      },networkError => console.log(networkError.message))
      .then(jsonResponse => {
        return jsonResponse.items.map(item => {
          return {
            id: item.track.id,
            name: item.track.name,
            album: item.track.album.name,
            artist: item.track.artists[0].name,
            uri: item.track.uri,
            marker: 'existingPlayList',
            playlist_id: playlistID
            }
        })
      })
    },

   replacePlaylistTracks(URIs, playlist_id){
      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: URIs
        })
      })
    }
}

export default Spotify;
