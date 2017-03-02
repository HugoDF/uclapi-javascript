const test = require('ava');
const sinon = require('sinon');
const moxios = require('moxios');
const UclApi = require('./UclApi');

test.beforeEach(() => {
  moxios.install();
});

test.afterEach(() => {
  moxios.uninstall();
});

test('UclAPI should set token when passed in constructor', t => {
  const token = 'some-token';
  const api = new UclApi({ token });
  t.is(api.token, token);
});

test('UclAPI should set a resources field with 3 resources in constructor', t => {
  const api = new UclApi();
  t.is(Object.keys(api.resources).length, 3);
});

test('UclApi#getRooms should return a Promise', t => {
  const api = new UclApi();
  t.true(api.getRooms() instanceof Promise);
});

test('UclApi#getRooms should call Api.resources.rooms#get', t => {
  const api = new UclApi();
  const resourceStub = sinon.stub(api.resources.rooms, 'get');
  api.getRooms();
  t.true(resourceStub.called);
});

test('UclApi#getBookings should return a Promise', t => {
  const api = new UclApi();
  t.true(api.getBookings() instanceof Promise);
});

test('UclApi#getBookings should call Api.resources.bookings#get', t => {
  const api = new UclApi();
  const resourceStub = sinon.stub(api.resources.bookings, 'get');
  api.getBookings();
  t.true(resourceStub.called);
});

test('UclApi#getEquipment should return a Promise', t => {
  const api = new UclApi();
  t.true(api.getEquipment() instanceof Promise);
});

test('UclApi#getEquipment should call Api.resources.equipment#get', t => {
  const api = new UclApi();
  const resourceStub = sinon.stub(api.resources.equipment, 'get');
  api.getEquipment();
  t.true(resourceStub.called);
});
