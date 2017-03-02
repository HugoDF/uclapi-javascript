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
      })
      .then(({ equipment }) => {
        return equipment;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = Equipment;
