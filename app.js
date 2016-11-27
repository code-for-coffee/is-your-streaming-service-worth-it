const http = require('http');
//http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks
// &user=
// &limit=200
// &api_key=4cb074e4b8ec4ee9ad3eb37d6f7eb240
// &format=json
// &from=1480118400

let usr = 'lenoreo';

function uriBuilder(username) {
  const API_KEY = '4cb074e4b8ec4ee9ad3eb37d6f7eb240';
  const API_URL = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks';
  const API_LIMIT = '200';
  const API_FORMAT = 'json';
  return API_URL + '&user=' + username + '&limit=' + API_LIMIT + '&format=' + API_FORMAT + '&api_key=' + API_KEY;
}

var url = uriBuilder(usr);
console.log(url);
console.assert(url,
  'http://ws.audioscrobbler.com/2.0/?' +
  'method=user.getrecenttracks&user=lenoreo' +
  '&limit=200&format=json' +
  '&api_key=4cb074e4b8ec4ee9ad3eb37d6f7eb240');

//{"user":"","page":"1","perPage":"200","totalPages":"197","total":"39272"}