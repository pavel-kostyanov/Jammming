const clientID = encodeURIComponent('121fe433b47446558d8fb26cace47dfa');
const scopes = encodeURIComponent('user-read-private user-read-email');
const responseType = 'token';
const redirect_uri = encodeURIComponent('http://localhost:3000/');
let accessToken = null;
const url = `https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=${responseType}`;

const Spotify = {
  getAccessToken(){
    if(accessToken){
     return new Promise(resolve => resolve(accessToken));
   }
   return fetch (url).then((response)=>console.log(response));
   
  }
}
export default Spotify;
