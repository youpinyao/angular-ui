webpackJsonp([18],{

/***/ "MjHY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__("rwbG");

var _name = __webpack_require__("WC0F");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("yDg9");
__webpack_require__("bE9D");

exports['default'] = _name2['default'];

/***/ }),

/***/ "WC0F":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.spin';

/***/ }),

/***/ "bE9D":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("WC0F");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).service('$loading', loadingService);

loadingService.$inject = ['$rootScope', '$compile'];

function loadingService($rootScope, $compile) {
  var loadingEl = (0, _jquery2['default'])('<div class="ma-loading" ng-class="{show: $root.showGlobalLoading}">\n  <ma-spin></ma-spin>\n  </div>');

  (0, _jquery2['default'])('body').append(loadingEl);

  $compile(loadingEl)($rootScope);

  return {
    show: show,
    hide: hide
  };

  function show() {
    $rootScope.showGlobalLoading = true;
  }

  function hide() {
    $rootScope.showGlobalLoading = false;
  }
}

/***/ }),

/***/ "mvPg":
/***/ (function(module, exports) {

module.exports = "<div class=\"ma-spin\">\n  <div class=\"gif\"\n    ng-style=\"{\n      width: size + 'px',\n      height: size + 'px',\n    }\"\n    ng-if=\"isIE\"></div>\n  <svg ng-show=\"!isIE\"\n    width=\"0px\"\n    height=\"0px\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 100 100\"\n    preserveAspectRatio=\"xMidYMid\"\n    class=\"uil-ring\">\n    <rect x=\"0\"\n      y=\"0\"\n      width=\"100\"\n      height=\"100\"\n      fill=\"none\"\n      class=\"bk\">\n    </rect>\n    <defs>\n      <filter id=\"uil-ring-shadow\"\n        x=\"-100%\"\n        y=\"-100%\"\n        width=\"300%\"\n        height=\"300%\">\n        <feOffset result=\"offOut\"\n          in=\"SourceGraphic\"\n          dx=\"0\"\n          dy=\"0\">\n        </feOffset>\n        <feGaussianBlur result=\"blurOut\"\n          in=\"offOut\"\n          stdDeviation=\"0\">\n        </feGaussianBlur>\n        <feBlend in=\"SourceGraphic\"\n          in2=\"blurOut\"\n          mode=\"normal\">\n        </feBlend>\n      </filter>\n    </defs>\n    <path d=\"M10,50c0,0,0,0.5,0.1,1.4c0,0.5,0.1,1,0.2,1.7c0,0.3,0.1,0.7,0.1,1.1c0.1,0.4,0.1,0.8,0.2,1.2c0.2,0.8,0.3,1.8,0.5,2.8 c0.3,1,0.6,2.1,0.9,3.2c0.3,1.1,0.9,2.3,1.4,3.5c0.5,1.2,1.2,2.4,1.8,3.7c0.3,0.6,0.8,1.2,1.2,1.9c0.4,0.6,0.8,1.3,1.3,1.9 c1,1.2,1.9,2.6,3.1,3.7c2.2,2.5,5,4.7,7.9,6.7c3,2,6.5,3.4,10.1,4.6c3.6,1.1,7.5,1.5,11.2,1.6c4-0.1,7.7-0.6,11.3-1.6 c3.6-1.2,7-2.6,10-4.6c3-2,5.8-4.2,7.9-6.7c1.2-1.2,2.1-2.5,3.1-3.7c0.5-0.6,0.9-1.3,1.3-1.9c0.4-0.6,0.8-1.3,1.2-1.9 c0.6-1.3,1.3-2.5,1.8-3.7c0.5-1.2,1-2.4,1.4-3.5c0.3-1.1,0.6-2.2,0.9-3.2c0.2-1,0.4-1.9,0.5-2.8c0.1-0.4,0.1-0.8,0.2-1.2 c0-0.4,0.1-0.7,0.1-1.1c0.1-0.7,0.1-1.2,0.2-1.7C90,50.5,90,50,90,50s0,0.5,0,1.4c0,0.5,0,1,0,1.7c0,0.3,0,0.7,0,1.1 c0,0.4-0.1,0.8-0.1,1.2c-0.1,0.9-0.2,1.8-0.4,2.8c-0.2,1-0.5,2.1-0.7,3.3c-0.3,1.2-0.8,2.4-1.2,3.7c-0.2,0.7-0.5,1.3-0.8,1.9 c-0.3,0.7-0.6,1.3-0.9,2c-0.3,0.7-0.7,1.3-1.1,2c-0.4,0.7-0.7,1.4-1.2,2c-1,1.3-1.9,2.7-3.1,4c-2.2,2.7-5,5-8.1,7.1 c-0.8,0.5-1.6,1-2.4,1.5c-0.8,0.5-1.7,0.9-2.6,1.3L66,87.7l-1.4,0.5c-0.9,0.3-1.8,0.7-2.8,1c-3.8,1.1-7.9,1.7-11.8,1.8L47,90.8 c-1,0-2-0.2-3-0.3l-1.5-0.2l-0.7-0.1L41.1,90c-1-0.3-1.9-0.5-2.9-0.7c-0.9-0.3-1.9-0.7-2.8-1L34,87.7l-1.3-0.6 c-0.9-0.4-1.8-0.8-2.6-1.3c-0.8-0.5-1.6-1-2.4-1.5c-3.1-2.1-5.9-4.5-8.1-7.1c-1.2-1.2-2.1-2.7-3.1-4c-0.5-0.6-0.8-1.4-1.2-2 c-0.4-0.7-0.8-1.3-1.1-2c-0.3-0.7-0.6-1.3-0.9-2c-0.3-0.7-0.6-1.3-0.8-1.9c-0.4-1.3-0.9-2.5-1.2-3.7c-0.3-1.2-0.5-2.3-0.7-3.3 c-0.2-1-0.3-2-0.4-2.8c-0.1-0.4-0.1-0.8-0.1-1.2c0-0.4,0-0.7,0-1.1c0-0.7,0-1.2,0-1.7C10,50.5,10,50,10,50z\"\n\n      fill=\"#FF74B9\"\n      filter=\"url(#uil-ring-shadow)\"\n      transform=\"rotate(96 50 50)\">\n      <animateTransform attributeName=\"transform\"\n        type=\"rotate\"\n        from=\"0 50 50\"\n        to=\"360 50 50\"\n        repeatCount=\"indefinite\"\n        dur=\"1s\"></animateTransform>\n    </path>\n  </svg>\n</div>\n";

/***/ }),

/***/ "rwbG":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "yDg9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("WC0F");

var _name2 = _interopRequireDefault(_name);

var _maSpinTpl = __webpack_require__("mvPg");

var _maSpinTpl2 = _interopRequireDefault(_maSpinTpl);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maSpin', maSpin);

maSpin.$inject = [];

function maSpin() {
  return {
    restrict: 'E',
    template: _maSpinTpl2['default'],
    replace: true,
    scope: {
      size: '@maSize'
    },
    link: function link(scope, element, attrs, ctrl) {
      scope.size = 120;
      scope.isIE = /msie/g.test(navigator.userAgent.toLocaleLowerCase());
      updateSpin();

      attrs.$observe('maSize', function (d) {
        scope.size = d ? parseInt(d, 10) : 120;
        updateSpin();
      });

      function updateSpin() {
        var svg = (0, _jquery2['default'])(element).find('svg');
        svg.attr('width', scope.size);
        svg.attr('height', scope.size);
      }
    }
  };
}

/***/ })

},["MjHY"]);
//# sourceMappingURL=spin.js.map