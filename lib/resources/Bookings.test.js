const test = require('ava');
const sinon = require('sinon');
const moxios = require('moxios');
const Bookings = require('./Bookings');

test.beforeEach(() => {
  moxios.install();
  moxios.stubRequest(/.*bookings.*/, {
    status: 200,
    response: { bookings: [] }
  });
});

test.afterEach(() => {
  moxios.uninstall();
});

test('Bookings should default fetch to a \'Function\' if no fetch passed in constructor', t => {
  const bookings = new Bookings;
  t.true(bookings.fetch instanceof Function);
});

test('Bookings#get should return a Promise', t => {
  const bookings = new Bookings;
  t.true(bookings.get() instanceof Promise);
});

test('Bookings#get should call fetch with a URL that doesn\'t contain empty fields', t => {
  const fetchStub = sinon
    .stub()
    .returns(new Promise(resolve => {
      resolve({ data: {} })
    }));
  const bookings = new Bookings(fetchStub);
  bookings.get();
  t.true(fetchStub.called);
  t.true(fetchStub.calledOnce);
  t.true(fetchStub.getCall(0).args[0].match(/=&/g) === null);
});
test('Bookings#get should call fetch with a URL that has 10 params if all optional fields and token are set', t => {
  const fetchStub = sinon
    .stub()
    .returns(new Promise(resolve => {
      resolve({ data: {} })
    }));
  const bookings = new Bookings(fetchStub);
  const token = 'some-token';
  const options = {
    roomid: 1,
    start_datetime: 1,
    end_datetime: 2,
    date: 10,
    siteid: 'site',
    description: 'description',
    contact: 'contact',
    results_per_page: 50,
    roomname: 'room'
  };
  bookings.get(token, options);
  t.is(fetchStub.getCall(0).args[0].match(/=/g).length, 10);
});

test('Equipment#get should call fetch with a URL that does not contain parameters other than token, roomid and siteid', t => {
  const fetchStub = sinon
    .stub()
    .returns(new Promise(resolve => {
      resolve({ data: {} })
    }));
  const bookings = new Bookings(fetchStub);
  const token = 'some-token';
  const options = { a: 'id', b: 'ID', c: 'something' };
  bookings.get(token, options);
  t.is(fetchStub.getCall(0).args[0].match('a='), null);
  t.is(fetchStub.getCall(0).args[0].match('b='), null);
  t.is(fetchStub.getCall(0).args[0].match('c='), null);
});
