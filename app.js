const fs = require('fs');
const fetch = require('fetch').fetchUrl;
const moment = require('moment');

let usr = 'neythas';

console.log('Is your Streaming service worth it?')

/***
 * Class for detecting if you save money by using a music subscription service
 */
class LastfmClient {

  /***
   * Constructor
   * @param username
   * @param songPrice
   * @param subscriptionPrice (per year)
   */
  constructor(username, songPrice, subscriptionPrice) {
    console.log('Warning: this class loads data async')
    this.price = songPrice;
    this.subPrice = subscriptionPrice;
    this.user = username;
    this.props = {};
    this.currentPage = 1;
    this.totalPages = 1;
    this.timestamp = this.getUnixTimestamp();
    this.url = this.uriBuilder(username, this.currentPage, this.timestamp);
    this.childFetch(this.url);
  };

  /***
   * Add track count to this.props[artist]
   * @param track
   */
  addTrack(track) {
    let artist = track['artist']['#text'];
    let song = track['name'];
    let t = artist + '-' + song;
    if (!this.props.hasOwnProperty(t)) {
      this.props[t] = 1;
    } else {
      this.props[t] = this.props[t] + 1;
    }
  }

  /***
   * Returns unix timestamp for 30 days prior
   * @returns {*}
   */
  getUnixTimestamp() {
    let z = moment(new Date());
    let m = z.get('year')
    let pY = m - 1;
    z.set({ 'year': pY });
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
    return API_URL + '&user=' +
      username + '&from=' +
      timestamp + '&limit=' +
      API_LIMIT + '&format=' +
      API_FORMAT + '&api_key=' +
      API_KEY + '&page=' +
      pageNum;
  }

  /***
   * Spawns async child fetch processes
   * @param url
   */
  childFetch(url) {

    fetch(url, (error, meta, body) => {
      let reqBody = body.toString();
      let m = this.getReqBodyAttrs(reqBody);
      let t = this.getRecentTracks(reqBody);
      this.totalPages = m.totalPages;
      if (t < 1) {
        console.log('No tracks for user in 30 day period');
      } else {
        //console.log('No. of tracks: ',t.length)
        // add track
        t.forEach((track) => {
          this.addTrack(track);
        });
        //console.log('b4 while')
        // spawn async child processes
        while (this.totalPages > this.currentPage) {
          this.currentPage++;
          //console.log('Async Child Task No. Spanwed', this.currentPage);
          this.url = this.uriBuilder(this.user, this.currentPage, this.timestamp);
          this.childFetch(this.url);
        }
        //console.log('a4 while')
      }
    });
    // console.log('Unique Songs');
    // console.log(Object.keys(this.props).length);
  };

  saveJson() {
    fs.writeFileSync(this.user + '-dataset.json', JSON.stringify(this.props));
  }

  calculateSavings() {
    console.log(Object.keys(this.props).length);
    let cost = Object.keys(this.props).length * this.price;
    if (cost > this.subPrice) {
      console.log('You save money by using your subscription service.');
      return true;
    } else {
      console.log('You DO NOT save money by using your subscription service.');
      return false;
    }
  }

  /***
   * @param request.body
   * @returns [] of tracks
   */
  getRecentTracks(body) {
    let t = JSON.parse(body);
    return t['recenttracks']['track']; // [] of tracks
  };

  /***
   * @param request.body
   * @returns {"user":"","page":"1","perPage":"200","totalPages":"197","total":"39272"}
   */
  getReqBodyAttrs(body) {
    let b = JSON.parse(body);
    return b['recenttracks']['@attr'];
  };

  /***
   * Return a string format
   */
  toString() {
    return JSON.stringify(this.props);
  }

  /***
   * Return a POJO
   * @returns {{}|*}
   */
  toObject() {
    return this.props;
  }

}

let client = new LastfmClient(usr, 0.99, 240);

process.on('exit', function (){
  console.log('Results...');
  console.log(client.calculateSavings());
  console.log(`Saving to ${usr}-dataset.json`);
  client.saveJson();
  //console.log(client.toString());
});