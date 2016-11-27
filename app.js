const fs = require('fs');
const fetch = require('fetch').fetchUrl;
const moment = require('moment');

let usr = 'lenoreo';

class LastfmClient {

  /***
   * constructor
   * @param username
   */
  constructor(username) {
    this.currentPage = 1;
    this.timestamp = this.getUnixTimestamp();
    this.url = this.uriBuilder(username, this.currentPage, this.timestamp);
    this.childFetch(this.url);
  };

  /***
   * Returns unix timestamp for 30 days prior
   * @returns {*}
   */
  getUnixTimestamp() {
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
  };

  /***
   * Last.fm URI request builder
   * @param username
   * @param pageNum
   * @param timestamp
   * @returns {string}
   */
  uriBuilder(username, pageNum, timestamp) {
    const API_KEY = '4cb074e4b8ec4ee9ad3eb37d6f7eb240';
    const API_URL = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks';
    const API_LIMIT = '200';
    const API_FORMAT = 'json';
    return API_URL + '&user=' + username + '&from=' + timestamp + '&limit=' + API_LIMIT + '&format=' + API_FORMAT + '&api_key=' + API_KEY + '&page=' + pageNum;
  }

  /***
   * Spawns async child fetch processes
   * @param url
   */
  childFetch(url) {
    fetch(url, (error, meta, body) => {
      var reqBody = body.toString();
      console.log(JSON.parse(body.toString()));
    });
  };

  /***
   * @param request.body
   * @returns [] of tracks
   */
  getRecentTracks(body) {
    let t = JSON.parse(body);
    return body['recenttracks']['track']; // [] of tracks
  };

  /***
   * @param request.body
   * @returns {"user":"","page":"1","perPage":"200","totalPages":"197","total":"39272"}
   */
  getReqBodyAttrs(body) {
    let b = JSON.parse(body);
    return body['recenttracks']['@attr'];
  };

}

new LastfmClient(usr);