const axios = require('axios');
const { filterEmptyProperties, makeQueryString } = require('./urlParams');
const { EQUIPMENT_ENDPOINT } = require('../endpoints');
class Equipment {
  constructor(fetch = axios) {
    this.fetch = fetch;
  }
  get(
    token = '',
    { roomid, siteid } = {}
  ) {
    const queryParams = filterEmptyProperties({ token, roomid, siteid });
    return this.fetch(EQUIPMENT_ENDPOINT + makeQueryString(queryParams))
      .then(({ data }) => {
        return data;
      }, (err) => {
        console.error(err);
      })
      .then(({ equipment }) => {
        return equipment;
      });
  }
}

module.exports = Equipment;
