const test = require('ava');
const {
  filterEmptyProperties,
  makeQueryString
} = require('./urlParams');

test('filterEmptyProperties should remove falsy properties', t => {
  const obj = { a: undefined, b: null, c: false, d: '' };
  t.deepEqual(filterEmptyProperties(obj), {});
});

test('filterEmptyProperties should not modify truthy values', t => {
  const obj = { a: 1, b: 'c', c: true };
  t.deepEqual(filterEmptyProperties(obj), obj);
});

test('makeQueryString should start with a \'?\'', t => {
  t.true(makeQueryString({})[0] === '?');
});

test('makeQueryString should contain the correct number of \'&\'', t => {
  const ampersandCount = makeQueryString({ a: 1, b: 2 }).match(/&/g).length;
  t.is(ampersandCount, 1);
});

test('makeQueryString should contain the correct number of \'=\'', t => {
  const equalCount = makeQueryString({ a: 1, b: 3 }).match(/=/g).length;
  t.is(equalCount, 2);
});
