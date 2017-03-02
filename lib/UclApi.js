const {
  Rooms,
  Bookings,
  Equipment
} = require('./resources');

class UclApi {
  constructor({ token } = {}) {
    this.token = token;
    this.resources = {
      rooms: new Rooms,
      bookings: new Bookings,
      equipment: new Equipment
    };
  }
  getRooms(options) {
    const { rooms } = this.resources;
    return rooms.get(this.token, options);
  }
  getBookings(options) {
    const { bookings } = this.resources;
    return bookings.get(this.token, options);
  }
  getEquipment(options) {
    const { equipment } = this.resources;
    return equipment.get(this.token, options);
  }
}
module.exports = UclApi;
