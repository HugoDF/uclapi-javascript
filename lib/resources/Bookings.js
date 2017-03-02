const axios = require('axios');
const { filterEmptyProperties, makeQueryString } = require('./urlParams');
const { BOOKINGS_ENDPOINT } = require('../endpoints');
class Bookings {
  constructor(fetch = axios) {
    this.fetch = fetch;
  }
  get(
    token = '',
    {
      roomid,
      start_datetime,
      end_datetime,
      date,
      siteid,
      description,
      contact,
      results_per_page,
      roomname
    } = {}
  ) {
    const queryParams = filterEmptyProperties({
      token, roomid, start_datetime, end_datetime, date, siteid, description, contact, results_per_page, roomname
    });
    return this.fetch(BOOKINGS_ENDPOINT + makeQueryString(queryParams))
      .then(({ data }) => {
        return data;
      })
      .then(({ bookings }) => {
        return bookings;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = Bookings;
