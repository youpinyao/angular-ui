webpackJsonp([27],{

/***/ "L+3a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.switch';

/***/ }),

/***/ "M6jT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("L+3a");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maSwitch', maSwitch);

maSwitch.$inject = [];

function maSwitch() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<label class="ma-switch">\n      <input\n      type="checkbox"\n      ng-model="model"\n      ng-disabled="disabled" />\n      <i class="switch-appearance"></i>\n      <span ng-transclude></span>\n    </label>',
    scope: {
      model: '=ngModel',
      disabled: '=ngDisabled'
    },
    link: function link(scope, element, attrs, ctrl) {}
  };
}

/***/ }),

/***/ "dyme":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("L+3a");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("M6jT");

exports['default'] = _name2['default'];

/***/ })

},["dyme"]);
//# sourceMappingURL=switch.js.map