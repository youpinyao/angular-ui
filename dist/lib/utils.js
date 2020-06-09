webpackJsonp([26],{

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

exports.getCnReg = getCnReg;
exports.getLengthWithEn = getLengthWithEn;
exports.cutStringWithEn = cutStringWithEn;

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
  uuid: uuid,
  Base64: getBase64(),
  getLengthWithEn: getLengthWithEn,
  cutStringWithEn: cutStringWithEn
};

angular.module(_name2['default']).factory('$utils', function () {
  return utils;
});

Object.assign(angular, utils);

exports['default'] = utils;
function getCnReg() {
  return (/[\u4e00-\u9fa5\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]/g
  );
}

function getLengthWithEn(value) {
  var length = value.length;
  var cnLength = (value.match(getCnReg()) || []).length;
  var withEnLength = cnLength + (length - cnLength) * 0.5;
  return withEnLength;
}

function cutStringWithEn(value, length) {
  var count = 0;
  var arr = value.split('');
  var newArr = [];

  arr.forEach(function (item) {
    if (getCnReg().test(item)) {
      count += 1;
    } else {
      count += 0.5;
    }
    if (count <= length) {
      newArr.push(item);
    }
  });
  return newArr.join('');
}

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

function getBase64() {
  var Base64 = {

    // private property
    _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    // public method for encoding
    encode: function encode(input) {
      var output = '';
      // eslint-disable-next-line
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      input = Base64._utf8_encode(input);

      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        // eslint-disable-next-line
        enc1 = chr1 >> 2;
        // eslint-disable-next-line
        enc2 = (chr1 & 3) << 4 | chr2 >> 4;
        // eslint-disable-next-line
        enc3 = (chr2 & 15) << 2 | chr3 >> 6;
        // eslint-disable-next-line
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          // eslint-disable-next-line
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }

        output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
      }

      return output;
    },

    // public method for decoding
    decode: function decode(input) {
      var output = '';
      // eslint-disable-next-line
      var chr1, chr2, chr3;
      // eslint-disable-next-line
      var enc1, enc2, enc3, enc4;
      var i = 0;

      // eslint-disable-next-line
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

      while (i < input.length) {
        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));

        // eslint-disable-next-line
        chr1 = enc1 << 2 | enc2 >> 4;
        // eslint-disable-next-line
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        // eslint-disable-next-line
        chr3 = (enc3 & 3) << 6 | enc4;

        output += String.fromCharCode(chr1);

        if (enc3 != 64) {
          output += String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output += String.fromCharCode(chr3);
        }
      }

      output = Base64._utf8_decode(output);

      return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode: function _utf8_encode(string) {
      string = string.replace(/\r\n/g, '\n');
      var utftext = '';

      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);

        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
          // eslint-disable-next-line
          utftext += String.fromCharCode(c >> 6 | 192);
          // eslint-disable-next-line
          utftext += String.fromCharCode(c & 63 | 128);
        } else {
          // eslint-disable-next-line
          utftext += String.fromCharCode(c >> 12 | 224);
          // eslint-disable-next-line
          utftext += String.fromCharCode(c >> 6 & 63 | 128);
          // eslint-disable-next-line
          utftext += String.fromCharCode(c & 63 | 128);
        }
      }

      return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function _utf8_decode(utftext) {
      var string = '';
      var i = 0;
      // eslint-disable-next-line
      var c = c1 = c2 = 0;

      while (i < utftext.length) {
        c = utftext.charCodeAt(i);

        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if (c > 191 && c < 224) {
          // eslint-disable-next-line
          c2 = utftext.charCodeAt(i + 1);
          // eslint-disable-next-line
          string += String.fromCharCode((c & 31) << 6 | c2 & 63);
          i += 2;
        } else {
          // eslint-disable-next-line
          c2 = utftext.charCodeAt(i + 1);
          // eslint-disable-next-line
          c3 = utftext.charCodeAt(i + 2);
          // eslint-disable-next-line
          string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
          i += 3;
        }
      }

      return string;
    }

  };
  return Base64;
}

/***/ })

},["0xDb"]);
//# sourceMappingURL=utils.js.map