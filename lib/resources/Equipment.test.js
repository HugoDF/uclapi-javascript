const test = require('ava');
const sinon = require('sinon');
const moxios = require('moxios');
const Equipment = require('./Equipment');

test.beforeEach(() => {
  moxios.install();
  moxios.stubRequest(/.*equipment.*/, {
    status: 200,
    response: { equipment: [] }
  });
});

test.afterEach(() => {
  moxios.uninstall();
});

test('Equipment should default fetch to a \'Function\' if no fetch passed in constructor', t => {
  const equipment = new Equipment;
  t.true(equipment.fetch instanceof Function);
});

test('Equipment#get should return a Promise', t => {
  const equipment = new Equipment;
  t.true(equipment.get() instanceof Promise);
});

test('Equipment#get should call fetch with a URL that contains no empty parameters', t => {
  const fetchStub = sinon
    .stub()
    .returns(new Promise(resolve => {
      resolve({ data: {} })
    }));
  const equipment = new Equipment(fetchStub);
  equipment.get();
  t.true(fetchStub.called);
  t.true(fetchStub.calledOnce);
  t.true(fetchStub.getCall(0).args[0].match(/=&/g) === null);
});

test('Equipment#get should call fetch with a URL that contains 3 parameters if token, roomid and siteid are set and non-falsy', t => {
  const fetchStub = sinon
    .stub()
    .returns(new Promise(resolve => {
      resolve({ data: {} })
    }));
  const equipment = new Equipment(fetchStub);
  const token = 'some-token';
  const options = { roomid: 'id', siteid: 'ID' };
  equipment.get(token, options);
  t.is(fetchStub.getCall(0).args[0].match(/=/g).length, 3);
});

test('Equipment#get should call fetch with a URL that does not contain parameters other than token, roomid and siteid', t => {
  const fetchStub = sinon
    .stub()
    .returns(new Promise(resolve => {
      resolve({ data: {} })
    }));
  const equipment = new Equipment(fetchStub);
  const token = 'some-token';
  const options = { a: 'id', b: 'ID', c: 'something' };
  equipment.get(token, options);
  t.is(fetchStub.getCall(0).args[0].match('a='), null);
  t.is(fetchStub.getCall(0).args[0].match('b='), null);
  t.is(fetchStub.getCall(0).args[0].match('c='), null);
});


