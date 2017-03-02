const axios = require('axios');
const { filterEmptyProperties, makeQueryString } = require('./urlParams');
const { ROOMS_ENDPOINT } = require('../endpoints');
class Rooms {
  constructor(fetch = axios) {
    this.fetch = fetch;
  }
  get(
    token = '',
    {
      roomid,
      roomname,
      siteid,
      sitename,
      classification,
      capacity
    } = {}
  ) {
    const queryParams = filterEmptyProperties({
      token, roomid, roomname, siteid, sitename, classification, capacity
    });
    return this.fetch(ROOMS_ENDPOINT + makeQueryString(queryParams))
      .then(({ data }) => {
        return data;
      })
      .then(({ rooms }) => {
        return rooms;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = Rooms;
