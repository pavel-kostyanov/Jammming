const clientID = encodeURIComponent('121fe433b47446558d8fb26cace47dfa');
const scopes = encodeURIComponent('user-read-private user-read-email');
const responseType = 'token';
const redirect_uri = encodeURIComponent('http://localhost:3000');
let accessToken;
const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=${responseType}`;

const Spotify = {

  getAccessToken(){


      const addressField = window.location.href.match(/access_token=([^&]*)/);
      if(addressField){
       accessToken = addressField[1];
       window.history.pushState('Access Token', null, '/');
       return accessToken;
     }else{
       window.location = url;

     }
  },

  search(term){
      const accessToken = Spotify.getAccessToken();
      const urlToFetch = `https://api.spotify.com/v1/search?q=${term}&type=artist&limit=3`;
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
              return jsonResponse.artists.items.map(item => {
                return {
                  id: item.id,
                  name: item.name
                };
              })
          })

    }
}

export default Spotify;
