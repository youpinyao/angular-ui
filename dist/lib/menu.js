webpackJsonp([7,25,29],{

/***/ "/cD4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__("t40P");

var _name = __webpack_require__("brJl");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("qSUM");

exports['default'] = _name2['default'];

/***/ }),

/***/ "AlX2":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Bn4U":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__("AlX2");

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

var _maSiderMenuContentItemTpl = __webpack_require__("RzpN");

var _maSiderMenuContentItemTpl2 = _interopRequireDefault(_maSiderMenuContentItemTpl);

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

maSecondMenu.$inject = ['$state', '$rootScope', '$timeout'];

function maSecondMenu($state, $rootScope, $timeout) {
  return {
    restrict: 'EA',
    replace: true,
    template: function template(element, attrs) {
      if (attrs.maSecondMenu !== undefined) {
        element.removeAttr('ma-second-menu');
        return element[0].outerHTML;
      }
      return _maSecondMenuTpl2['default'];
    },
    controller: ['$scope', '$attrs', '$element', function ($scope, $attrs, $element) {
      var cls = 'has-second-nav';

      // 如果是通过元素标签初始化 E
      if ($attrs.maSecondMenu === undefined) {
        $scope.$state = $state;

        if (!$rootScope.routerConfig) {
          console.error('请在 $rootScope 下赋值 routerConfig');
        }
        $scope.routers = $rootScope.routerConfig;

        $scope.$on('$stateChangeSuccess', function () {
          var hasSecondNav = false;

          $scope.routers.forEach(function (router) {
            if (router.parent && (router.state + '').indexOf(router.parent.state + '.') !== -1 && ($state.current.name + '').indexOf(router.parent.state + '.') !== -1 && router.hidden !== true && router.hiddenSecond !== true && router.level <= 2) {
              hasSecondNav = true;
            }
          });

          if (hasSecondNav) {
            (0, _jquery2['default'])('body').addClass(cls);
          } else {
            (0, _jquery2['default'])('body').removeClass(cls);
            $element.addClass('second-nav').addClass('show');
          }

          $rootScope.$broadcast('update.second.menu');

          $scope.hasSecondNav = hasSecondNav;
        });
      } else {
        (0, _jquery2['default'])('body').addClass(cls);
        $rootScope.$broadcast('update.second.menu');
      }

      $scope.$on('$destroy', function (e) {
        (0, _jquery2['default'])('body').removeClass(cls);
        (0, _jquery2['default'])(window).off('resize', $scope.resize);
        $rootScope.$broadcast('update.second.menu');
      });
    }],
    link: function link(scope, element, attrs, controllers) {
      (0, _jquery2['default'])(window).on('resize', resize);
      (0, _jquery2['default'])(window).on('scroll', resize);

      scope.$watch(function () {
        return (0, _jquery2['default'])(window).width();
      }, function (d) {
        resize();
      });

      scope.resize = resize;

      $timeout(function () {
        resize();
      });

      function resize() {
        var header = (0, _jquery2['default'])('.header').eq(0);
        var minWidth = parseInt(header.css('min-width'), 10);

        if ((0, _jquery2['default'])(window).width() > minWidth) {
          minWidth = (0, _jquery2['default'])(window).width();
        }

        (0, _jquery2['default'])(element).css({
          'min-width': minWidth,
          top: header.outerHeight() - (0, _jquery2['default'])(window).scrollTop()
        });
      }
    }
  };
}

maSiderMenu.$inject = ['$state', '$rootScope'];

function maSiderMenu($state, $rootScope) {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      routers: '=maRouters',
      title: '@maTitle'
    },
    template: function template(element, attrs) {
      if (attrs.maSiderMenu !== undefined) {
        element.removeAttr('ma-sider-menu');
        return element[0].outerHTML;
      }
      return _maSiderMenuTpl2['default'];
    },
    controller: ['$scope', '$element', '$timeout', function ($scope, $element, $timeout) {
      var cls = 'has-sider-menu';

      $scope.$state = $state;

      (0, _jquery2['default'])('body').addClass(cls);

      if (!$rootScope.$siderMenuCount) {
        $rootScope.$siderMenuCount = 0;
      }
      $rootScope.$siderMenuCount++;

      $scope.$watch('routers', function (d) {
        $timeout(function () {
          $scope.$broadcast('update.sider.menu.cls');
        }, 600);
      });

      $scope.$on('$destroy', function (e) {
        $rootScope.$siderMenuCount--;
        if ($rootScope.$siderMenuCount <= 0) {
          (0, _jquery2['default'])('body').removeClass(cls);
        }
        (0, _jquery2['default'])(window).off('scroll', setTop);
        (0, _jquery2['default'])(window).off('resize', setTop);
      });

      // 绑定全局滚动，相对顶部
      (0, _jquery2['default'])(window).on('scroll', setTop);
      (0, _jquery2['default'])(window).on('resize', setTop);
      $scope.$on('update.second.menu', setTop);

      $timeout(function () {
        setTop();
      });

      function setTop() {
        var header = (0, _jquery2['default'])('body > .header');
        var top = header.height() - (0, _jquery2['default'])(window).scrollTop();

        if ((0, _jquery2['default'])('.header-fixed').length) {
          top = header.height();
        }

        if ((0, _jquery2['default'])('.has-second-nav').length) {
          top += (0, _jquery2['default'])('.second-nav').height();
        }

        if (top < 0) {
          top = 0;
        }

        (0, _jquery2['default'])($element).css({
          top: top
        });
      }
    }],
    link: function link(scope, element, attrs, controllers) {
      if (attrs.maSiderMenu !== undefined) {
        var items = (0, _jquery2['default'])(element).find('.sider-menu-item');

        items.each(function (i) {
          if (items.eq(i).find('> a').next('.sider-menu-content').length) {
            var icon = (0, _jquery2['default'])('<i class="iconfont icon-down"></i>');
            var a = items.eq(i).find('> a');
            a.append(icon).addClass('arrow');

            icon.bind('click', toggleMenu);
            if (a.attr('ma-toggle') !== undefined) {
              a.bind('click', toggleMenu);
            }
          }
        });
      }

      function toggleMenu(e) {
        e.stopPropagation();

        var icon = (0, _jquery2['default'])(this);
        var a = icon.parent();

        if (icon.get(0).tagName.toLowerCase() === 'a') {
          icon = icon.find('.iconfont');
          a = icon.parent();
        }

        if (icon.hasClass('icon-down')) {
          icon.removeClass('icon-down');
          icon.addClass('icon-up');
        } else {
          icon.addClass('icon-down');
          icon.removeClass('icon-up');
        }

        a.next().toggleClass('hide');
      }
    }
  };
}

maSiderMenuContent.$inject = ['$state', '$timeout', '$rootScope', '$compile'];

function maSiderMenuContent($state, $timeout, $rootScope, $compile) {
  return {
    restrict: 'E',
    replace: true,
    // require: ['^maSiderMenu'],
    scope: {
      routers: '=maRouters',
      parentRouter: '=maParentRouter'
    },
    template: _maSiderMenuContentTpl2['default'],
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;
      $scope.itemClick = itemClick;
      $scope.iconClick = iconClick;
      $scope.isParent = isParent;
      $scope.isActive = isActive;
      expandCurrentMenu();

      $scope.$on('update.sider.menu.cls', expandCurrentMenu);
      $scope.$on('$stateChangeSuccess', expandCurrentMenu);

      function expandCurrentMenu(routers) {
        var cState = $state.current.name + '';
        var currentUrl = $state.href(cState, $state.params);
        var isFromParent = angular.isArray(routers);

        if (isFromParent || $scope.routers) {
          angular.each(isFromParent ? routers[0] : $scope.routers, function (router) {
            var routerUrl = $state.href(router.state, router.params);

            if (cState.indexOf(router.state + '.') !== -1) {
              router.expand = true;
            }
            if (isFromParent) {
              if (isActive(router)) {
                routers[1].expand = true;
              }
            } else if (!!$scope.parentRouter && isActive(router)) {
              $scope.parentRouter.expand = true;
            }

            router.cls = '';
            router.cls += isActive(router) ? 'active ' : '';
            router.cls += router.routers && router.routers.length ? 'arrow ' : '';
            router.cls += isParent(currentUrl, routerUrl) ? 'parent ' : '';

            if (router.routers && router.routers.length) {
              expandCurrentMenu([router.routers, router]);
            }
          });
        }
      }

      function itemClick(router, $event) {
        if (router.routers && router.routers.length && angular.isNull(router.state)) {
          toggleMenu(router, $event);
        } else {
          $state.go(router.state, router.params);
        }

        if (router.routers && router.routers.length) {
          router.expand = true;
        }
      }

      function iconClick(router, $event) {
        $event.stopPropagation();
        toggleMenu(router, $event);
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

      function isParent(currentUrl, routerUrl) {
        return (currentUrl + '').indexOf(routerUrl + '/') !== -1 && currentUrl !== routerUrl;
      }

      function isActive(router) {
        var urls = [];
        var params = _jquery2['default'].extend(true, {}, router.params);
        var currentUrl = $state.href($state.current.name, $state.params);
        var active = false;

        urls.push($state.href(router.state, params));

        if (router.activeParams && router.activeParams.length) {
          router.activeParams.forEach(function (d) {
            urls.push($state.href(router.state, _jquery2['default'].extend(true, params, d)));
          });
        }

        active = currentUrl && urls.indexOf(currentUrl) !== -1 || isParent($state.href($state.current.name, $state.params), urls[0]) && !(router.routers && router.routers.length);

        if (active === false && router.childs && router.childs.length) {
          router.childs.forEach(function (d) {
            if ($state.current.name && $state.current.name === d.state) {
              if (angular.isEmpty(d.params)) {
                active = true;
              } else {
                var count = 0;
                var sameCount = 0;
                angular.each(d.params, function (v, k) {
                  if ($state.params[k] == v) {
                    sameCount++;
                  }
                  count++;
                });
                active = count === sameCount;
              }
            }
          });
        }

        return active;
      }
    }],
    link: function link(scope, element, attrs, controllers) {
      var target = (0, _jquery2['default'])(element);

      scope.$watch('routers', function (routers) {
        var index = -1;

        target.html('');

        if (angular.isEmpty(routers)) {
          return;
        }

        angular.each(routers, function (item) {
          index++;
          var itemElement = (0, _jquery2['default'])(_maSiderMenuContentItemTpl2['default'].replace(/&&\{index\}/g, index));
          target.append(itemElement);

          scope['router' + index] = item;
        });
        $compile(target.contents())(scope);
        $timeout();
      });
    }
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

module.exports = "<div class=\"sider-menu-content\">\n\n</div>\n";

/***/ }),

/***/ "RzpN":
/***/ (function(module, exports) {

module.exports = "<div class=\"sider-menu-item\"\n  ng-if=\"router&&{index}.hidden !== true\">\n  <a href=\"javascript:void(0);\"\n    class=\"{{router&&{index}.cls}}\"\n    ma-click=\"itemClick(router&&{index}, $event)\">\n    <span>{{router&&{index}.title}}</span>\n    <ma-icon ma-type=\"{{router&&{index}.expand ? 'up' : 'down'}}\"\n      ng-if=\"router&&{index}.routers.length\"\n      ma-click=\"iconClick(router&&{index}, $event)\"></ma-icon>\n  </a>\n  <ma-sider-menu-content ng-class=\"{hide: !router&&{index}.expand}\"\n    ng-if=\"router&&{index}.routers && router&&{index}.routers.length && router&&{index}.expand\"\n    ma-routers=\"router&&{index}.routers\"\n    ma-parent-router=\"router&&{index}\"></ma-sider-menu-content>\n</div>\n";

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

__webpack_require__("SJFQ");

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
    transclude: true,
    scope: {
      type: '@maType',
      size: '@maSize'
    },
    template: '\n    <i\n      class="iconfont icon-{{type}}"\n      ng-style="{fontSize: size + \'px\'}"\n      ng-transclude\n    ></i>',
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

module.exports = "<div class=\"second-nav\" ng-class=\"{show: hasSecondNav}\">\n  <ul class=\"clearfix\">\n    <li\n      ng-repeat=\"router in routers\"\n      ng-if=\"router.state.indexOf(router.parent.state + '.') !== -1 &&\n      $state.current.name.indexOf(router.parent.state + '.') !== -1 &&\n      router.hidden !== true &&\n      router.hiddenSecond !== true &&\n      router.level <= 2\"\n\n      ng-class=\"{active: $state.href($state.current.name, $state.params) === $state.href(router.state, router.params) || $state.current.name.indexOf(router.state + '.') !== -1 || (router.childState && router.childState.indexOf($state.current.name) !== -1)}\">\n      <a\n        href=\"javascript:void(0)\"\n        ma-click=\"$state.go(router.state, router.params)\"\n      >{{router.title}}</a>\n    </li>\n  </ul>\n</div>\n";

/***/ }),

/***/ "t40P":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},["Bn4U"]);
//# sourceMappingURL=menu.js.map