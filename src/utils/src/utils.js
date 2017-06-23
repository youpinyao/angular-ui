import $ from 'jquery';
import moduleName from '../name.js';
import uuidV4 from 'uuid/v4';

const utils = {
  each,
  isNull,
  isEmpty,
  isArray,
  uuid,
};

angular.module(moduleName).factory('$utils', function() {
  return utils;
});

Object.assign(angular, utils);

export default utils;

function each(data, callback) {
  if (!data) {
    return;
  }

  if (isObject(data)) {
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

  angular.forEach(data, function(d) {
    count++;
  });

  return count <= 0;
}

function isObject(data) {
  return typeof data === 'object' && data !== null;
}

function isArray(data) {
  if (Array.isArray) {
    return Array.isArray(data);
  }
  if (typeof data === 'object' && data && data.length) {
    return true;
  }
  return false;
}

function uuid() {
  // const uuidV1 = require('uuid/v1');
  // uuidV1();
  // const uuidV4 = require('uuid/v4');
  return uuidV4();
}
