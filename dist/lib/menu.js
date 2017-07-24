webpackJsonp([8,22,27],{

/***/ "/cD4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("brJl");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("qSUM");

exports['default'] = _name2['default'];

/***/ }),

/***/ "Bn4U":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("ZPr7");

var _name2 = _interopRequireDefault(_name);

var _button = __webpack_require__("lkey");

var _button2 = _interopRequireDefault(_button);

var _icons = __webpack_require__("/cD4");

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], [_button2['default'], _icons2['default']]).config(function () {}).run(function () {});

__webpack_require__("GCjy");

exports['default'] = _name2['default'];

/***/ }),

/***/ "GCjy":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("ZPr7");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _maFirstMenuTpl = __webpack_require__("I5es");

var _maFirstMenuTpl2 = _interopRequireDefault(_maFirstMenuTpl);

var _maSecondMenuTpl = __webpack_require__("rM0R");

var _maSecondMenuTpl2 = _interopRequireDefault(_maSecondMenuTpl);

var _maSiderMenuTpl = __webpack_require__("LY4P");

var _maSiderMenuTpl2 = _interopRequireDefault(_maSiderMenuTpl);

var _maSiderMenuContentTpl = __webpack_require__("PIS4");

var _maSiderMenuContentTpl2 = _interopRequireDefault(_maSiderMenuContentTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maUiTransition', maUiTransition).directive('maFirstMenu', maFirstMenu).directive('maSecondMenu', maSecondMenu).directive('maSiderMenu', maSiderMenu).directive('maSiderMenuContent', maSiderMenuContent).directive('maFullContainer', maFullContainer);

maUiTransition.$inject = ['$state', '$rootScope', '$timeout'];

function maUiTransition($state, $rootScope, $timeout) {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs, controllers) {
      scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        element.removeClass('fade-in');
      });
      scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $timeout(function () {
          element.addClass('fade-in');
        });
      });
    }
  };
}

maFirstMenu.$inject = ['$state', '$rootScope'];

function maFirstMenu($state, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: _maFirstMenuTpl2['default'],
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;

      if (!$rootScope.routerConfig) {
        console.error('请在 $rootScope 下赋值 routerConfig');
      }
      $scope.routers = $rootScope.routerConfig;
    }],
    link: function link(scope, element, attrs, controllers) {}
  };
}

maSecondMenu.$inject = ['$state', '$rootScope'];

function maSecondMenu($state, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    require: ['^maFirstMenu'],
    template: _maSecondMenuTpl2['default'],
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;

      if (!$rootScope.routerConfig) {
        console.error('请在 $rootScope 下赋值 routerConfig');
      }
      $scope.routers = $rootScope.routerConfig;

      $scope.$on('$stateChangeSuccess', function () {
        var cls = 'has-second-nav';
        var hasSecondNav = false;

        $scope.routers.forEach(function (router) {
          if (router.parent && router.state.indexOf(router.parent.state + '.') !== -1 && $state.current.name.indexOf(router.parent.state + '.') !== -1) {
            hasSecondNav = true;
          }
        });

        if (hasSecondNav) {
          (0, _jquery2['default'])('body').addClass(cls);
        } else {
          (0, _jquery2['default'])('body').removeClass(cls);
        }

        $scope.$on('$destroy', function (e) {
          (0, _jquery2['default'])('body').removeClass(cls);
        });

        $scope.hasSecondNav = hasSecondNav;
      });
    }],
    link: function link(scope, element, attrs, controllers) {}
  };
}

maSiderMenu.$inject = ['$state', '$rootScope'];

function maSiderMenu($state, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      routers: '=maRouters',
      title: '@maTitle'
    },
    template: _maSiderMenuTpl2['default'],
    controller: ['$scope', function ($scope) {
      var cls = 'has-sider-menu';

      $scope.$state = $state;

      (0, _jquery2['default'])('body').addClass(cls);

      $scope.$on('$destroy', function (e) {
        (0, _jquery2['default'])('body').removeClass(cls);
      });
    }],
    link: function link(scope, element, attrs, controllers) {}
  };
}

maSiderMenuContent.$inject = ['$state', '$timeout', '$rootScope'];

function maSiderMenuContent($state, $timeout, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    require: ['^maSiderMenu'],
    scope: {
      routers: '=maRouters'
    },
    template: _maSiderMenuContentTpl2['default'],
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;
      $scope.itemClick = itemClick;
      $scope.hasRouters = hasRouters;
      expandCurrentMenu();
      bindStateChangeSuccess();

      function bindStateChangeSuccess() {
        $scope.$on('$stateChangeSuccess', expandCurrentMenu);
      }

      function expandCurrentMenu() {
        var cState = $state.current.name;
        var cUrl = $state.href(cState, $state.params);

        if ($scope.routers) {
          angular.each($scope.routers, function (router) {
            if (cState.indexOf(router.state + '.') !== -1) {
              router.expand = true;
            }
          });
        }
      }

      function hasRouters(routers) {
        var count = 0;

        angular.each(routers, function (d) {
          if (d.hidden !== true) {
            count++;
          }
        });

        return count > 0;
      }

      function itemClick(router, $event) {
        if (hasRouters(router.routers) && angular.isNull(router.state)) {
          toggleMenu(router, $event);
        } else {
          $state.go(router.state, router.params);
        }

        if (hasRouters(router.routers)) {
          router.expand = true;
        }
      }

      function toggleMenu(router, $event) {
        var el = (0, _jquery2['default'])($event.target);
        var content = null;
        var height = 0;

        if (el.get(0).tagName.toLowerCase() !== 'a') {
          el = el.parents('a');
        }

        content = el.next('.sider-menu-content');

        content.find('> *').each(function () {
          height += (0, _jquery2['default'])(this).outerHeight();
        });

        content.height(height);
        $timeout(function () {
          router.expand = !router.expand;
        });
      }
    }],
    link: function link(scope, element, attrs, controllers) {}
  };
}

maFullContainer.$inject = ['$state', '$timeout'];

function maFullContainer($state, $timeout) {
  return {
    restrict: 'A',
    replace: true,
    link: function link(scope, element, attrs, controllers) {
      element = (0, _jquery2['default'])(element);

      $timeout(updateMinHeight);
      (0, _jquery2['default'])(window).resize(updateMinHeight);

      function updateMinHeight() {
        element.css({
          minHeight: (0, _jquery2['default'])(window).height() - element.offset().top
        });
      }
    }
  };
}

/***/ }),

/***/ "I5es":
/***/ (function(module, exports) {

module.exports = "<div class=\"nav\">\n  <ul>\n    <li\n      ng-repeat=\"router in routers\"\n      ng-if=\"!router.parent && router.hidden !== true\"\n      ng-class=\"{active: $state.href($state.current.name, $state.params) === $state.href(router.state, router.params) || $state.current.name.indexOf(router.state + '.') !== -1}\"\n    >\n      <a\n        href=\"javascript:void(0)\"\n        ma-click=\"$state.go(router.state, router.params)\"\n      >{{router.title}}</a>\n    </li>\n  </ul>\n  <div ng-transclude></div>\n</div>\n";

/***/ }),

/***/ "LY4P":
/***/ (function(module, exports) {

module.exports = "<div class=\"sider-menu\">\n  <div class=\"sider-menu-title\" ng-if=\"title\">{{title}}</div>\n  <ma-sider-menu-content ma-routers=\"routers\"></ma-sider-menu-content>\n</div>\n";

/***/ }),

/***/ "PIS4":
/***/ (function(module, exports) {

module.exports = "<div class=\"sider-menu-content\">\n  <div\n    class=\"sider-menu-item\"\n    ng-repeat=\"router in routers\"\n    ng-if=\"router.hidden !== true\">\n    <a\n    href=\"javascript:void(0);\"\n    ng-class=\"{\n      active: $state.href($state.current.name, $state.params) === $state.href(router.state, router.params),\n      arrow: router.routers && router.routers.length\n    }\"\n    ma-click=\"itemClick(router, $event)\">\n      <span>{{router.title}}</span>\n      <ma-icon ma-type=\"{{router.expand ? 'up' : 'down'}}\" ng-if=\"hasRouters(router.routers)\"></ma-icon>\n    </a>\n    <ma-sider-menu-content ng-class=\"{hide: !router.expand}\" ng-if=\"router.routers && router.routers.length\" ma-routers=\"router.routers\"></ma-sider-menu-content>\n  </div>\n</div>\n";

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
          // if (scope.$odd !== undefined || scope.$even !== undefined ||
          //   scope.$last !== undefined || scope.$index !== undefined ||
          //   scope.$middle !== undefined) {
          //   scope.$event = e;
          //   $parse(attrs.maClick)(scope);
          // } else {
          scope.$event = e;
          $parse(attrs.maClick)(scope);
          // }
        }

        $timeout();

        $timeout(function () {
          element.removeClass('ma-click-disabled');
        }, parseInt(attrs.delay, 10) || 50);
      });

      function hasFn(fn, sc) {
        var _hasFn = false;
        angular.each(fn, function (d) {
          if (sc[d]) {
            _hasFn = true;
          } else {
            _hasFn = false;
          }
          sc = sc[d];
        });
        return _hasFn;
      }
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

/***/ "UX8a":
/***/ (function(module, exports) {

module.exports = "<svg\n  class=\"ma-circle\"\n>\n  <circle\n    fill=\"none\"\n  ></circle>\n  <circle\n    fill=\"none\"\n  ></circle>\n</svg>\n";

/***/ }),

/***/ "ZPr7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.menu';

/***/ }),

/***/ "brJl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.icons';

/***/ }),

/***/ "g66R":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.button';

/***/ }),

/***/ "lkey":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("g66R");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("S1RN");

exports['default'] = _name2['default'];

/***/ }),

/***/ "qSUM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("brJl");

var _name2 = _interopRequireDefault(_name);

var _maCircleTpl = __webpack_require__("UX8a");

var _maCircleTpl2 = _interopRequireDefault(_maCircleTpl);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maIcon', maIcon);
// .directive('maCircle', maCircle);

maIcon.$inject = [];

function maIcon() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      type: '@maType',
      size: '@maSize'
    },
    template: '\n    <i\n      class="iconfont icon-{{type}}"\n      ng-style="{fontSize: size + \'px\'}"\n    ></i>',
    link: function link(scope, element, attrs, controllers) {}
  };
}

// maCircle.$inject = [];

// function maCircle() {
//   return {
//     restrict: 'E',
//     replace: true,
//     scope: {
//       size: '@maSize',
//       strokeWidth: '@maStrokeWidth',
//       percent: '@maPercent',
//       backStroke: '@maBackStroke',
//       frontStroke: '@maFrontStoke',
//     },
//     template: maCircleTpl,
//     link: function (scope, element, attrs, controllers) {
//       scope.pi = Math.PI;
//       scope.size = 12;
//       scope.strokeWidth = 1;
//       scope.percent = 0;
//       scope.backStroke = '#FFFFFF';
//       scope.frontStroke = '#FF74B9';
//       updateCircle();

//       attrs.$observe('maSize', d => {
//         scope.size = d ? parseInt(d, 10) : 12;
//         updateCircle();
//       });
//       attrs.$observe('maStrokeWidth', d => {
//         scope.strokeWidth = d ? parseInt(d, 10) : 1;
//         updateCircle();
//       });
//       attrs.$observe('maPercent', d => {
//         scope.percent = d ? parseInt(d, 10) / 100 : 0;
//         updateCircle();
//       });
//       attrs.$observe('maBackStroke', d => {
//         scope.backStroke = d || '#FFFFFF';
//         updateCircle();
//       });
//       attrs.$observe('maFrontStoke', d => {
//         scope.frontStroke = d || '#FF74B9';
//         updateCircle();
//       });

//       function updateCircle() {
//         const circles = $(element).find('circle');
//         const back = circles.eq(0);
//         const front = circles.eq(1);

//         element.attr('width', scope.size);
//         element.attr('height', scope.size);

//         back.attr('cx', scope.size / 2);
//         back.attr('cy', scope.size / 2);
//         back.attr('r', (scope.size / 2) - scope.strokeWidth);
//         back.attr('stroke-width', (scope.size / 2) - scope.strokeWidth);
//         back.attr('stroke', scope.backStroke);

//         front.attr('cx', scope.size / 2);
//         front.attr('cy', scope.size / 2);
//         front.attr('r', (scope.size / 2) - scope.strokeWidth);
//         front.attr('stroke-width', scope.strokeWidth);
//         front.attr('stroke', scope.frontStroke);
//         front.attr('transform', `matrix(0,-1,1,0,0,${scope.size})`);
//         front.attr('stroke-dasharray',
//           `${2 * Math.PI * ((scope.size / 2) - scope.strokeWidth) * scope.percent} ${2 * Math.PI * ((scope.size / 2) - scope.strokeWidth)}`
//         );
//       }
//     }
//   };
// }

/***/ }),

/***/ "rM0R":
/***/ (function(module, exports) {

module.exports = "<div class=\"second-nav\" ng-class=\"{show: hasSecondNav}\">\n  <ul class=\"clearfix\">\n    <li\n      ng-repeat=\"router in routers\"\n      ng-if=\"router.state.indexOf(router.parent.state + '.') !== -1 &&\n      $state.current.name.indexOf(router.parent.state + '.') !== -1 &&\n      router.hidden !== true &&\n      router.level <= 2\"\n\n      ng-class=\"{active: $state.href($state.current.name, $state.params) === $state.href(router.state, router.params) || $state.current.name.indexOf(router.state + '.') !== -1}\">\n      <a\n        href=\"javascript:void(0)\"\n        ma-click=\"$state.go(router.state, router.params)\"\n      >{{router.title}}</a>\n    </li>\n  </ul>\n</div>\n";

/***/ })

},["Bn4U"]);
//# sourceMappingURL=menu.js.map