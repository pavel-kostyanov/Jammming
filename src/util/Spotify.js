const clientID = encodeURIComponent('121fe433b47446558d8fb26cace47dfa');
const scopes = encodeURIComponent('user-read-private playlist-modify-public');
const responseType = 'token';
const redirect_uri = encodeURIComponent('http://localhost:3000');
let accessToken;
let user_id;
// 375cdd6fe8b743cabadc915d2511f27f
// '121fe433b47446558d8fb26cace47dfa'
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
      }, networkError => console.log(networkError.message))
      .then(jsonResponse => {
        user_id = jsonResponse.id;
        return user_id;
      })
    },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    const urlToFetch = `https://api.spotify.com/v1/search?q=${term}&type=track,album,artist&limit=16`;
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
        console.log(jsonResponse);
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
    },

    getPlaylists (){
      let user_id = '8dq8g1bfbkv7cgjum8dykgro3';
      //accessToken = 'BQBJWlglYXmj4jAsAYaoHFoFxmCiB8Cr7b6WSHt6VQF1c0swzXe2KGbRwBvJKBZbizYBxsPGYYAilVyjacvgnqx9o5rcV9_Y-IkyveL0323oehNtirsZnJAtCF9_RNWvE4lkd_ehh8Mk9H6z9WAM3pq1Vmwxujs8G6bLari3Ir0uWg1RfCazHheC9fP40TZu0N4z-gOp99HS';
      // return fetch("https://api.spotify.com/v1/me", {
      //     headers: {
      //       'Authorization': 'Bearer ' + accessToken
      //     }
      //   })
      //   .then(response => {
      //     if (response.ok) {
      //       return response.json();
      //     }
      //     throw new Error('Request failed!');
      //   }, networkError => console.log(networkError.message))
      //   .then(jsonResponse => {
      //     user_id = jsonResponse.id;
      //     console.log(user_id);
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
        })
        .then(jsonResponse => {
          console.log(jsonResponse);
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
      let user_id = '8dq8g1bfbkv7cgjum8dykgro3';

    }
}

export default Spotify;
