const fetch = require('fetch').fetchUrl;
const moment = require('moment');

let usr = 'lenoreo';

function uriBuilder(username, pageNum) {
  const API_KEY = '4cb074e4b8ec4ee9ad3eb37d6f7eb240';
  const API_URL = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks';
  const API_LIMIT = '200';
  const API_FORMAT = 'json';
  return API_URL + '&user=' + username + '&limit=' + API_LIMIT + '&format=' + API_FORMAT + '&api_key=' + API_KEY + '&page=' + pageNum;
}

//{"user":"","page":"1","perPage":"200","totalPages":"197","total":"39272"}
function getReqBodyAttrs(body) {
  let b = JSON.parse(body);

};

function getRecentTracks(body) {
  let t = JSON.parse(body);
}

function childFetch(url) {
  fetch(url, (error, meta, body) => {
    var reqBody = body.toString();
    console.log(JSON.parse(body.toString()));
  });
}

function getUnixTimestamp() {
  // get 30 days prior
  let z = moment(new Date());
  let m = z.get('month')
  let priorMonth = m - 1;
  if (priorMonth < 0) priorMonth = 11;
  z.set({ 'month': priorMonth });
  //console.log(z)
  let n = z.get('month')
  //console.log(n);
  //console.log(moment(z).unix(m));
  return moment(z).unix(m);
}


//
// console.assert(url,
//   'http://ws.audioscrobbler.com/2.0/?' +
//   'method=user.getrecenttracks&user=lenoreo' +
//   '&limit=200&format=json' +
//   '&api_key=4cb074e4b8ec4ee9ad3eb37d6f7eb240');

//hof
function init(username) {

  let currentPage = 1;
  let url = uriBuilder(username, currentPage);
  let timestamp = getUnixTimestamp();

}

init(usr);