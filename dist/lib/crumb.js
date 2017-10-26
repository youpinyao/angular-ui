webpackJsonp([15,29],{

/***/ "EGJ2":
/***/ (function(module, exports) {

module.exports = "<div class=\"crumb\" ng-transclude>\n</div>\n";

/***/ }),

/***/ "S1RN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("g66R");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maClick', maClick).directive('maButton', maButton);

maClick.$inject = ['$parse', '$timeout'];

function maClick($parse, $timeout) {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs, ctrl) {
      element.bind('click', function (e) {
        if (element.hasClass('ma-click-disabled') || element.hasClass('disabled')) {
          return;
        }
        element.addClass('ma-click-disabled');

        if (attrs.maClick) {
          scope.$event = e;
          $parse(attrs.maClick)(scope);
        }

        $timeout();

        $timeout(function () {
          element.removeClass('ma-click-disabled');
        }, parseInt(attrs.delay, 10) || 50);
      });
    }
  };
}

maButton.$inject = [];

function maButton() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div\n    class="ma-button {{size}} {{type}}"\n    ng-class="{\n      disabled: disabled,\n      flat: flat === \'true\',\n      active: active === \'true\',\n    }"\n    ng-transclude></div>',
    scope: {
      size: '@maSize',
      type: '@maType',
      flat: '@maFlat',
      active: '@maActive',
      disabled: '=ngDisabled'
    },
    replace: true,
    link: function link(scope, element, attrs, ctrl) {}
  };
}

/***/ }),

/***/ "SJFQ":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Un9e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.crumb';

/***/ }),

/***/ "bY6W":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "bd3B":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("Un9e");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _maCrumbAutoTpl = __webpack_require__("rcVz");

var _maCrumbAutoTpl2 = _interopRequireDefault(_maCrumbAutoTpl);

var _maCrumbItemTpl = __webpack_require__("ixWA");

var _maCrumbItemTpl2 = _interopRequireDefault(_maCrumbItemTpl);

var _maCrumbTpl = __webpack_require__("EGJ2");

var _maCrumbTpl2 = _interopRequireDefault(_maCrumbTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maCrumb', maCrumb).directive('maCrumbItem', maCrumbItem).directive('maCrumbAuto', maCrumbAuto);

maCrumb.$inject = ['$state'];

function maCrumb($state) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      separator: '@maSeparator'
    },
    template: _maCrumbTpl2['default'],
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;
      if (!$scope.separator) {
        $scope.separator = '/';
      }

      this.separator = $scope.separator;
    }],
    link: function link(scope, element, attrs, controllers) {}
  };
}

maCrumbItem.$inject = ['$state'];

function maCrumbItem($state) {
  return {
    restrict: 'E',
    transclude: true,
    require: ['^maCrumb'],
    replace: true,
    scope: {
      href: '@maHref'
    },
    template: _maCrumbItemTpl2['default'],
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;
    }],
    link: function link(scope, element, attrs, controllers) {
      scope.separator = controllers[0].separator;
    }
  };
}

maCrumbAuto.$inject = ['$state', '$rootScope'];

function maCrumbAuto($state, $rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      separator: '@maSeparator'
    },
    template: _maCrumbAutoTpl2['default'],
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;
      if (!$scope.separator) {
        $scope.separator = '/';
      }
    }],
    link: function link(scope, element, attrs, controllers) {
      if (!$rootScope.routerConfig) {
        console.error('请在 $rootScope 下赋值 routerConfig');
      }

      element = (0, _jquery2['default'])(element);

      if (!element.find('> span.crumb-item:last-child > span:nth-child(1)').last().html().trim()) {
        scope.showCurrent = true;
        element.find('> span.crumb-item:last-child').remove();
      }

      var crumbItems = [];
      var routerConfig = $rootScope.routerConfig;

      routerConfig.forEach(function (route) {
        if (route.state === $state.current.name) {
          crumbItems.unshift({
            title: route.title,
            state: route.state
          });
          getParentRoute(route);
        }
      });

      scope.crumbItems = crumbItems;

      function getParentRoute(route) {
        if (route.parent) {
          var parentRoute = route.parent;
          crumbItems.unshift({
            title: parentRoute.title,
            state: parentRoute.state
          });
          getParentRoute(parentRoute);
        }
      }
    }
  };
}

/***/ }),

/***/ "g66R":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.button';

/***/ }),

/***/ "ixWA":
/***/ (function(module, exports) {

module.exports = "<span class=\"crumb-item\">\n  <span>\n    <a ng-if=\"href\" href=\"{{href}}\" ng-transclude></a>\n    <span ng-if=\"!href\" ng-transclude></span>\n  </span>\n  <span>{{separator}}</span>\n</span>\n";

/***/ }),

/***/ "lkey":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__("SJFQ");

var _name = __webpack_require__("g66R");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("S1RN");

exports['default'] = _name2['default'];

/***/ }),

/***/ "rcVz":
/***/ (function(module, exports) {

module.exports = "<div class=\"crumb\">\n  <span class=\"crumb-item\" ng-repeat=\"item in crumbItems\" ng-if=\"!$last\">\n    <span>\n      <a href=\"javascript:void(0)\" ma-click=\"$state.go(item.state, item.params)\">{{item.title}}</a>\n    </span>\n    <span>{{separator}}</span>\n  </span>\n  <span class=\"crumb-item\" ng-repeat=\"item in crumbItems\" ng-if=\"$last && showCurrent === true\">\n    <span>{{item.title}}</span>\n    <span>{{separator}}</span>\n  </span>\n  <span class=\"crumb-item\">\n    <span ng-transclude></span>\n    <span>{{separator}}</span>\n  </span>\n</div>\n";

/***/ }),

/***/ "xOCM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__("bY6W");

var _name = __webpack_require__("Un9e");

var _name2 = _interopRequireDefault(_name);

var _button = __webpack_require__("lkey");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], [_button2['default']]).config(function () {}).run(function () {});

__webpack_require__("bd3B");

exports['default'] = _name2['default'];

/***/ })

},["xOCM"]);
//# sourceMappingURL=crumb.js.map