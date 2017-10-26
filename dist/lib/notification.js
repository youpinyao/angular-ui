webpackJsonp([24],{

/***/ "+U+0":
/***/ (function(module, exports) {

module.exports = "<div class=\"ma-notification\">\n  <div class=\"ma-notification__group\">\n    <h2 class=\"ma-notification__title\"\n      ng-show=\"title\">{{title}}</h2>\n    <div class=\"ma-notification__content\"\n      ng-bind-html=\"message\"></div>\n    <a class=\"ma-notification__closeBtn ma-icon-close\"\n      ng-click=\"nClick()\"><i class=\"iconfont icon-close\"></i></a>\n  </div>\n</div>\n";

/***/ }),

/***/ "UJDU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__("eJ2A");

var _name = __webpack_require__("mBbU");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("wrGO");

exports['default'] = _name2['default'];

/***/ }),

/***/ "eJ2A":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "mBbU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.notification';

/***/ }),

/***/ "wrGO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _name = __webpack_require__("mBbU");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _maNotificationTpl = __webpack_require__("+U+0");

var _maNotificationTpl2 = _interopRequireDefault(_maNotificationTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).provider('$notification', notificationProvider);

notificationProvider.$inject = [];

function notificationProvider() {
  this.options = {
    delay: 5000,
    startTop: 20,
    startRight: 20,
    verticalSpacing: 10,
    horizontalSpacing: 10,
    positionX: 'right',
    positionY: 'top',
    replaceMessage: false,
    onClose: undefined,
    closeOnClick: true,
    maxCount: 0, // 0 - Infinite
    container: 'body',
    priority: 10
  };

  this.setOptions = function (options) {
    if (!angular.isObject(options)) throw new Error('Options should be an object!');
    this.options = angular.extend({}, this.options, options);
  };
  this.$get = ['$timeout', '$http', '$compile', '$rootScope', '$injector', '$sce', '$q', '$window', function ($timeout, $http, $compile, $rootScope, $injector, $sce, $q, $window) {
    var options = this.options;
    var startTop = options.startTop;
    var startRight = options.startRight;
    var verticalSpacing = options.verticalSpacing;
    var horizontalSpacing = options.horizontalSpacing;
    var delay = options.delay;

    var messageElements = [];
    var isResizeBound = false;

    var notify = function notify(args, t) {
      var deferred = $q.defer();
      if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) !== 'object' || args === null) {
        args = {
          message: args
        };
      }
      args.scope = args.scope ? args.scope : $rootScope;
      args.delay = !angular.isUndefined(args.delay) ? args.delay : delay;
      args.type = t || args.type || options.type || '';
      args.positionY = args.positionY ? args.positionY : options.positionY;
      args.positionX = args.positionX ? args.positionX : options.positionX;
      args.replaceMessage = args.replaceMessage ? args.replaceMessage : options.replaceMessage;
      args.onClose = args.onClose ? args.onClose : options.onClose;
      args.closeOnClick = args.closeOnClick !== null && args.closeOnClick !== undefined ? args.closeOnClick : options.closeOnClick;
      args.container = args.container ? args.container : options.container;
      args.priority = args.priority ? args.priority : options.priority;
      processNotificationTemplate(_maNotificationTpl2['default']);

      function processNotificationTemplate(template) {
        var scope = args.scope.$new();
        scope.message = $sce.trustAsHtml(args.message);
        scope.title = $sce.trustAsHtml(args.title);
        scope.nClick = args.nClick;
        scope.t = args.type.substr(0, 1);
        scope.delay = args.delay;
        scope.onClose = args.onClose;

        var priorityCompareTop = function priorityCompareTop(a, b) {
          return a._priority - b._priority;
        };

        var priorityCompareBtm = function priorityCompareBtm(a, b) {
          return b._priority - a._priority;
        };

        var reposite = function reposite() {
          var j = 0;
          var k = 0;
          var lastTop = startTop;
          var lastRight = startRight;
          var lastPosition = [];
          if (args.positionY === 'top') {
            messageElements.sort(priorityCompareTop);
          } else if (args.positionY === 'bottom') {
            messageElements.sort(priorityCompareBtm);
          }

          for (var i = messageElements.length - 1; i >= 0; i--) {
            var element = messageElements[i];
            if (args.replaceMessage && i < messageElements.length - 1) {
              element.addClass('killed');
            } else {
              var elHeight = parseInt(element[0].offsetHeight, 10);
              var elWidth = parseInt(element[0].offsetWidth, 10);
              var position = lastPosition[element._positionY + element._positionX];
              if (top + elHeight > window.innerHeight) {
                position = startTop;
                k++;
                j = 0;
              }
              var top;
              if (position) {
                if (j === 0) {
                  top = position;
                  lastTop = position;
                } else {
                  top = position + verticalSpacing;
                  lastTop = position + verticalSpacing;
                }
              } else {
                top = startTop;lastTop = startTop;
              }
              var right = lastRight + k * (horizontalSpacing + elWidth);
              element.css(element._positionY, top + 'px');
              if (element._positionX == 'center') {
                element.css('left', parseInt(window.innerWidth / 2 - elWidth / 2, 10) + 'px');
              } else {
                element.css(element._positionX, right + 'px');
              }
              lastPosition[element._positionY + element._positionX] = top + elHeight;

              if (options.maxCount > 0 && messageElements.length > options.maxCount && i === 0) {
                element.scope().kill(true);
              }
              j++;
            }
          }
        };

        var templateElement = $compile(template)(scope);
        templateElement._positionY = args.positionY;
        templateElement._positionX = args.positionX;
        templateElement._priority = args.priority;
        templateElement.addClass(args.type);
        var closeEvent = function closeEvent(e) {
          e = e.originalEvent || e;
          if (e.type === 'click' || e.propertyName === 'opacity' && e.elapsedTime >= 1) {
            if (scope.onClose) {
              scope.$apply(scope.onClose(templateElement));
            }

            templateElement.remove();
            messageElements.splice(messageElements.indexOf(templateElement), 1);
            scope.$destroy();
            reposite();
          }
        };
        angular.element(templateElement).find('a').bind('click', function () {
          templateElement.remove();
          messageElements.splice(messageElements.indexOf(templateElement), 1);
          scope.$destroy();
          reposite();
        });
        if (args.closeOnClick) {
          templateElement.addClass('clickable');
          templateElement.bind('click', closeEvent);
        }
        templateElement.bind('webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd', closeEvent);
        if (angular.isNumber(args.delay)) {
          $timeout(function () {
            templateElement.addClass('killed');
          }, args.delay);
        }
        setCssTransitions('none');

        angular.element(document.querySelector(args.container)).append(templateElement);
        var offset = -(parseInt(templateElement[0].offsetHeight, 10) + 50);
        templateElement.css(templateElement._positionY, offset + 'px');
        messageElements.push(templateElement);

        if (args.positionX == 'center') {
          var elWidth = parseInt(templateElement[0].offsetWidth, 10);
          templateElement.css('left', parseInt(window.innerWidth / 2 - elWidth / 2, 10) + 'px');
        }

        $timeout(function () {
          setCssTransitions('');
        });

        function setCssTransitions(value) {
          ['-webkit-transition', '-o-transition', 'transition'].forEach(function (prefix) {
            templateElement.css(prefix, value);
          });
        }

        scope._templateElement = templateElement;

        scope.kill = function (isHard) {
          if (isHard) {
            if (scope.onClose) {
              scope.$apply(scope.onClose(scope._templateElement));
            }

            messageElements.splice(messageElements.indexOf(scope._templateElement), 1);
            scope._templateElement.remove();
            scope.$destroy();
            $timeout(reposite);
          } else {
            scope._templateElement.addClass('killed');
          }
        };

        $timeout(reposite);

        if (!isResizeBound) {
          angular.element($window).bind('resize', function (e) {
            $timeout(reposite);
          });
          isResizeBound = true;
        }

        deferred.resolve(scope);
      }

      return deferred.promise;
    };

    notify.primary = function (args) {
      return this(args, 'primary');
    };
    notify.error = function (args) {
      return this(args, 'error');
    };
    notify.success = function (args) {
      return this(args, 'success');
    };
    notify.info = function (args) {
      return this(args, 'info');
    };
    notify.warning = function (args) {
      return this(args, 'warning');
    };

    notify.clearAll = function () {
      angular.forEach(messageElements, function (element) {
        element.addClass('killed');
      });
    };

    return notify;
  }];
}

/***/ })

},["UJDU"]);
//# sourceMappingURL=notification.js.map