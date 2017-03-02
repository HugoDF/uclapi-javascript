function filterEmptyProperties(obj) {
  return Object.keys(obj)
    .reduce((prev, curr) => {
      if (obj[curr]) {
        prev[curr] = obj[curr];
      }
      return prev;
    }, {})
}

function makeQueryString(obj) {
  return '?' + Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join('&');
}

module.exports = {
  filterEmptyProperties,
  makeQueryString
};
