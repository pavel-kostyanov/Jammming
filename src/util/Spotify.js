const clientID = encodeURIComponent('121fe433b47446558d8fb26cace47dfa');
const scopes = encodeURIComponent('user-read-private user-read-email');
const responseType = 'token';
const redirect_uri = encodeURIComponent('http://localhost:3000');
let accessToken;
const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=${responseType}`;

const Spotify = {

  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
      const accessTokenHash = window.location.href.match(/access_token=([^&]*)/);
      const expireTimeHash = window.location.href.match(/expires_in=([^&]*)/);
    if(accessTokenHash && expireTimeHash){
       accessToken = accessTokenHash[1];
       window.history.replaceState('Access Token', null, '/');
       const expiresIn = Number(expireTimeHash[1]);
       window.setTimeout(() => accessToken = '',expiresIn * 1000);
       return accessToken;
     }else{
       window.location = url;

     }
  },

  search(term){
      const accessToken = Spotify.getAccessToken();
      const urlToFetch = `https://api.spotify.com/v1/search?q=${term}&type=track&limit=12`;
      return fetch(urlToFetch,
          {
            headers: {'Authorization': 'Bearer ' + accessToken}
          }).then(response => {
            if(response.ok){
              return response.json();
            }
          throw new Error ('Request failed!');
          }, networkError => console.log(networkError.message)
          ).then(jsonResponse => {
            console.log(jsonResponse);
              return jsonResponse.tracks.items.map(item => {
                return {
                  id: item.id,
                  name: item.name,
                  album: item.album.name,
                  artist: item.artists[0].name
                };
              })
          })

    }
}

export default Spotify;
