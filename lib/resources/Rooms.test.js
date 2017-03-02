const test = require('ava');
const sinon = require('sinon');
const moxios = require('moxios');
const Rooms = require('./Rooms');

test.beforeEach(() => {
  moxios.install();
  moxios.stubRequest(/.*rooms.*/, {
    status: 200,
    response: { rooms: [] }
  });
});

test.afterEach(() => {
  moxios.uninstall();
});

test('Rooms should default fetch to a \'Function\' if no fetch passed in constructor', t => {
  const rooms = new Rooms;
  t.true(rooms.fetch instanceof Function);
});

test('Rooms#get should return a Promise', t => {
  const rooms = new Rooms;
  t.true(rooms.get() instanceof Promise);
});

test('Rooms#get should call fetch with a URL that contains no empty parameters', t => {
  const fetchStub = sinon
    .stub()
    .returns(new Promise(resolve => {
      resolve({ data: {} })
    }));
  const rooms = new Rooms(fetchStub);
  rooms.get();
  t.true(fetchStub.called);
  t.true(fetchStub.calledOnce);
  t.true(fetchStub.getCall(0).args[0].match(/=&/g) === null);
});

test('Rooms#get should call fetch with a URL that contains 3 parameters if token, roomid, roomname, \
      siteid, sitename, classification, capacity are set and non-falsy', t => {
  const fetchStub = sinon
    .stub()
    .returns(new Promise(resolve => {
      resolve({ data: {} })
    }));
  const rooms = new Rooms(fetchStub);
  const token = 'some-token';
  const options = {
    roomid: 'roomid',
    roomname: 'roomname',
    siteid: 'siteid',
    sitename: 'sitename',
    classification: 'classification',
    capacity: 'capacity'
  };
  rooms.get(token, options);
  t.is(fetchStub.getCall(0).args[0].match(/=/g).length, 7);
});

test('Rooms#get should call fetch with a URL that does not contain parameters other than token, roomid and siteid', t => {
  const fetchStub = sinon
    .stub()
    .returns(new Promise(resolve => {
      resolve({ data: {} })
    }));
  const rooms = new Rooms(fetchStub);
  const token = 'some-token';
  const options = { a: 'id', b: 'ID', c: 'something' };
  rooms.get(token, options);
  t.is(fetchStub.getCall(0).args[0].match('a='), null);
  t.is(fetchStub.getCall(0).args[0].match('b='), null);
  t.is(fetchStub.getCall(0).args[0].match('c='), null);
});


