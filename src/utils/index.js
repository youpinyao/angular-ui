import $ from 'jquery';

const utils = {
  each,
  isNull,
  isEmpty,
};

Object.assign(angular, utils);

export default utils;

function isNull(value) {
  if (value === '' || value === undefined || value === null) {
    return true;
  }
  return false;
}

function isEmpty(data) {
  if (isNull(data)) {
    return true;
  }
  let count = 0;

  angular.forEach(data, function (d) {
    count++;
  });

  return count <= 0;
}

function each(data, callback) {
  if (!data) {
    return;
  }

  if (data && typeof data === 'object') {
    if (!isNaN(data.length)) {
      data.forEach((v, k, f) => {
        callback.call(v, v, k, f);
      });
    } else {
      const items = Object.keys(data);
      each(items, v => {
        callback.call(data[v], data[v], v, data);
      });
    }
  }
}
