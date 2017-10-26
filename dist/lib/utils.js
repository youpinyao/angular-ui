webpackJsonp([30],{

/***/ "+VfW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.utils';

/***/ }),

/***/ "0xDb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("+VfW");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("YkQ5");

exports['default'] = _name2['default'];

/***/ }),

/***/ "YkQ5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _name = __webpack_require__("+VfW");

var _name2 = _interopRequireDefault(_name);

var _v = __webpack_require__("DtRx");

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var utils = {
  each: each,
  isNull: isNull,
  isEmpty: isEmpty,
  isArray: isArray,
  uuid: uuid
};

angular.module(_name2['default']).factory('$utils', function () {
  return utils;
});

Object.assign(angular, utils);

exports['default'] = utils;


function each(data, callback) {
  if (!data) {
    return;
  }

  if (isObject(data)) {
    if (!isNaN(data.length)) {
      data.forEach(function (v, k, f) {
        callback.call(v, v, k, f);
      });
    } else {
      var items = Object.keys(data);
      each(items, function (v) {
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
  var count = 0;

  angular.forEach(data, function (d) {
    count++;
  });

  return count <= 0;
}

function isObject(data) {
  return (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data !== null;
}

function isArray(data) {
  if (Array.isArray) {
    return Array.isArray(data);
  }
  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data && data.length) {
    return true;
  }
  return false;
}

function uuid() {
  // const uuidV1 = require('uuid/v1');
  // uuidV1();
  // const uuidV4 = require('uuid/v4');
  return (0, _v2['default'])();
}

/***/ })

},["0xDb"]);
//# sourceMappingURL=utils.js.map