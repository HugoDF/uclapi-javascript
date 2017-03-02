const BASE_URL = 'https://uclapi.com';

const ROOM_BOOKINGS_URL = BASE_URL + '/roombookings';

const ROOMS_ENDPOINT = ROOM_BOOKINGS_URL + '/rooms';

const BOOKINGS_ENDPOINT = ROOM_BOOKINGS_URL + '/bookings';

const EQUIPMENT_ENDPOINT = ROOM_BOOKINGS_URL + '/equipment';

module.exports = {
  ROOMS_ENDPOINT,
  BOOKINGS_ENDPOINT,
  EQUIPMENT_ENDPOINT
};
