# uclapi
JavaScript wrapper for the UCL API. Works both in the browser and in Node.

## Usage

```js
// ES6 modules
import UclApi from 'uclapi';

// CommonJS
const UclApi = require('uclapi');

// Initialise the API wrapper

const token = 'my-ucl-api-token';
const uclApi = new UclApi({ token });

uclApi.getRooms(/* { options } */)
  .then(rooms => {
    console.log(rooms);
  });

uclApi.getBookings(/* { options } */)
  .then(bookings => {
    console.log(bookings);
  });

uclApi.getEquipment(/* { options } */)
  .then(equipment => {
    console.log(equipment);
  });
```

## API

`UclApi#getRooms`:
- params: (all optional) roomid, roomname, siteid, sitename, classification, capacity
- return: Promise that resolves to an array of room objects

`UclApi#getBookings`:
- params: (all optional) roomid, start\_datetime, end\_datetime, date, siteid, description, contact, results\_per\_page, roomname
- return: Promise that resolves to an array of booking objects

`UclApi#getBookings`:
- params: (all optional) roomid, siteid
- return: Promise that resolves to an array of equipment objects
