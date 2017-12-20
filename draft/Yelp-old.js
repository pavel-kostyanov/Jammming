const clientId = '-uvZNgilzBKzt-wcocaiZA';
const secret = 'x3diAL9yRqO4C0F8KoVMJiBYEEm82o4femK38aTaSywltafMdahzkNFGzSVXeZYH';
let accessToken = null;

const Yelp = {
  getAccessToken(){
    if(accessToken){
      return new Promise(resolve => resolve(accessToken));
    }
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,
    {
      method: 'POST',

    }).then(response => {
      if(response.ok){
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)).then(
      jsonResponse => {
        return accessToken = jsonResponse.access_token;
      }
    )
  },

  search(term, location, sortBy){
    return Yelp.getAccessToken().then(()=>{
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=term&location=location&sort_by=sortBy`,
                    {
                      headers: {Authorization: `Bearer ${accessToken}`}
                    })}).then(response => {
                      if(response.ok){
                        return response.json();
                      }
                      throw new Error('Request failed!');
                    }, networkError => console.log(networkError.message)).then(
                      jsonResponse => {
                        if(jsonResponse.businesses){
                          console.log(jsonResponse.businesses);
                          }
                        }
                        )


                      }


  };

export default Yelp;
