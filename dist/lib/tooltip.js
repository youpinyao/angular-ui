webpackJsonp([21],{

/***/ "VSd5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("wV6C");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("wULG");

exports['default'] = _name2['default'];

/***/ }),

/***/ "pSmv":
/***/ (function(module, exports) {

module.exports = "<div\n  class=\"ma-tooltip\"\n>\n  <div\n    class=\"ma-tooltip-content\"\n  ></div>\n</div>\n";

/***/ }),

/***/ "wULG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("wV6C");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _debounce = __webpack_require__("HhAh");

var _debounce2 = _interopRequireDefault(_debounce);

var _v = __webpack_require__("DtRx");

var _v2 = _interopRequireDefault(_v);

var _maTooltipTpl = __webpack_require__("pSmv");

var _maTooltipTpl2 = _interopRequireDefault(_maTooltipTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maTooltip', maTooltip);

maTooltip.$inject = ['$timeout', '$compile'];

function maTooltip($timeout, $compile) {
  return {
    restrict: 'A',
    scope: {
      contentScope: '=maScope',
      contentWidth: '@maWidth',
      changeCallback: '&maChangeCallback',
      showMask: '@maShowMask'
    },
    link: function link(scope, element, attrs, ctrl) {
      var uid = (0, _v2['default'])();
      var el = (0, _jquery2['default'])(_maTooltipTpl2['default']);
      var content = el.find('.ma-tooltip-content');
      var defaultDirection = 'tc';

      var isPopconfirm = false;
      var direction = defaultDirection;
      var prevDirection = '';
      var isClickHide = false;

      // 模拟trigger 触发元素
      var triggerElement = void 0;

      (0, _jquery2['default'])('body').append(el);

      (0, _jquery2['default'])(element).hover(function (d) {
        updateSize();
        if (isClickHide) {
          return;
        }
        if (isPopconfirm) {
          return;
        }
        showTip();
      }, function () {
        if (isClickHide) {
          return;
        }
        if (isPopconfirm) {
          return;
        }
        hideTip();
      }).on('mousemove', stopp);

      el.hover(function (d) {
        if (isClickHide) {
          return;
        }
        if (isPopconfirm) {
          return;
        }
        showTip();
      }, function () {
        if (isClickHide) {
          return;
        }
        if (isPopconfirm) {
          return;
        }
        hideTip();
      }).on('mousemove', stopp);

      (0, _jquery2['default'])('body').on('mousemove', hideTip);

      attrs.$observe('maTooltip', function (d) {
        content.html(d);
        updateSize();
        $compile(content.contents())(scope.contentScope || scope);
      });
      attrs.$observe('maClickHide', function (d) {
        if (d == 'true') {
          isClickHide = true;
          // $(element).on('click', stopp);
          el.on('click', stopp);
          (0, _jquery2['default'])('body').off('mousemove', hideTip);

          (0, _jquery2['default'])('body').on('click', function (e, a) {
            // a 控制主动trigger 传当前触发元素
            if (a) {
              triggerElement = a;
            }
            if (!a && !((0, _jquery2['default'])(e.target).parents('.ma-popconfirm').length && (0, _jquery2['default'])(e.target).parents('.ma-popconfirm').get(0) === element[0])) {
              hideTip(e);
            }
          });
        }
      });
      attrs.$observe('maPopconfirm', function (d) {
        if (d == 'true') {
          isPopconfirm = true;
          el.addClass('ma-popconfirm-tooltip');
          element.on('click', function () {
            showTip(undefined, triggerElement);

            triggerElement = undefined;
          });
        }
      });
      scope.$on('$destroy', function (d) {
        el.remove();
        (0, _jquery2['default'])('body').off('mousemove', hideTip);
        (0, _jquery2['default'])('body').off('click', hideTip);
      });
      attrs.$observe('maDirection', setDirection);

      scope.$on('tooltip.hide', hideTip);

      setDirection(defaultDirection);

      function updateSize() {
        var customWidth = parseInt(scope.contentWidth, 10);
        el.css({
          width: '',
          height: '',
          maxWidth: ''
        });
        $timeout(function () {
          el.width((customWidth || el.width()) + 1);
          el.height(el.height() + 1);
          if (customWidth) {
            el.css({
              maxWidth: customWidth
            });
          }
        }, 50);
      }

      function setDirection(d) {
        direction = d || defaultDirection;
        el.attr('data-direction', d || defaultDirection);
        content.attr('data-direction', d || defaultDirection);
        $timeout(function () {
          el.width(el.width() + 1);
          el.height(el.height() + 1);
        });
      }

      function showTip(newDirection, e) {
        $timeout.cancel(scope.hideTimer);
        $timeout.cancel(scope.hidePosTimer);

        var targetElement = e || element;

        var offsetTop = (0, _jquery2['default'])(targetElement).offset().top;
        var offsetLeft = (0, _jquery2['default'])(targetElement).offset().left;
        var elHeight = el.outerHeight();
        var elWidth = el.outerWidth();
        var elementHeight = (0, _jquery2['default'])(targetElement).outerHeight();
        var elementWidth = (0, _jquery2['default'])(targetElement).outerWidth();

        var boxPadding = 10;

        var ltrt = (elHeight - boxPadding * 2) * 0.15 - elementHeight / 2 + 5;
        var lbrb = (elHeight - boxPadding * 2) * 0.85 - elementHeight / 2 - 5;
        var tlbl = (elWidth - boxPadding * 2) * 0.15 - elementWidth / 2 + 5;
        var trbr = (elWidth - boxPadding * 2) * 0.85 - elementWidth / 2 - 5;

        var top = 0;
        var left = 0;
        var hasNew = false;

        if (prevDirection) {
          direction = prevDirection;
          el.attr('data-direction', direction);
          content.attr('data-direction', direction);
        }

        if (newDirection && typeof newDirection === 'string') {
          prevDirection = direction;
          direction = newDirection;
          hasNew = true;
          el.attr('data-direction', direction);
          content.attr('data-direction', direction);
        }

        switch (direction) {
          case 'tc':
            top = offsetTop - elHeight;
            left = offsetLeft + (elementWidth - elWidth) / 2;
            break;
          case 'tl':
            top = offsetTop - elHeight;
            left = offsetLeft - boxPadding - tlbl;
            break;
          case 'tr':
            top = offsetTop - elHeight;
            left = offsetLeft - boxPadding - trbr;
            break;
          case 'lc':
            top = offsetTop - (elHeight - elementHeight) / 2;
            left = offsetLeft - elWidth;
            break;
          case 'lt':
            top = offsetTop - boxPadding - ltrt;
            left = offsetLeft - elWidth;
            break;
          case 'lb':
            top = offsetTop - boxPadding - lbrb;
            left = offsetLeft - elWidth;
            break;
          case 'rc':
            top = offsetTop - (elHeight - elementHeight) / 2;
            left = offsetLeft + elementWidth;
            break;
          case 'rt':
            top = offsetTop - boxPadding - ltrt;
            left = offsetLeft + elementWidth;
            break;
          case 'rb':
            top = offsetTop - boxPadding - lbrb;
            left = offsetLeft + elementWidth;
            break;
          case 'bc':
            top = offsetTop + elementHeight;
            left = offsetLeft + (elementWidth - elWidth) / 2;
            break;
          case 'bl':
            top = offsetTop + elementHeight;
            left = offsetLeft - boxPadding - tlbl;
            break;
          case 'br':
            top = offsetTop + elementHeight;
            left = offsetLeft - boxPadding - trbr;
            break;
        }

        el.css({
          top: top,
          left: left
        });

        // $timeout(function() {
        if (!hasNew) {
          checkPositon(e);
        }
        if (!el.hasClass('show')) {
          scope.changeCallback({
            show: true
          });
        }
        el.addClass('show');
        // }, 10);

        showMask();
      }

      function checkPositon(e) {
        var offsetTop = el.offset().top - (0, _jquery2['default'])(window).scrollTop();
        var offsetLeft = el.offset().left - (0, _jquery2['default'])(window).scrollLeft();
        var wh = (0, _jquery2['default'])(window).height();
        var ww = (0, _jquery2['default'])(window).width();
        var elHeight = el.outerHeight();
        var elWidth = el.outerWidth();
        var elementHeight = (0, _jquery2['default'])(element).outerHeight();
        var elementWidth = (0, _jquery2['default'])(element).outerWidth();

        // console.log(offsetTop, offsetLeft);

        var newDirectionFirst = direction.split('')[0];
        var newDirectionSecond = direction.split('')[1];
        var newDirectionFirstReseted = false;
        var newDirection = '';

        if (offsetTop < 0) {
          newDirectionFirst = 'b';
        } else if (offsetTop + elHeight > wh) {
          newDirectionFirst = 't';
        } else if (offsetLeft < 0) {
          newDirectionFirst = 'r';
        } else if (offsetLeft + elWidth > ww) {
          newDirectionFirst = 'l';
        }

        if (newDirectionFirst == 't' || newDirectionFirst == 'b') {
          if (offsetLeft < 0) {
            newDirectionSecond = 'l';
          } else if (offsetLeft + elWidth > ww) {
            newDirectionSecond = 'r';
          } else if (newDirectionSecond === 't' || newDirectionSecond === 'b') {
            newDirectionSecond = 'c';
          }
        }

        if (newDirectionFirst == 'l' || newDirectionFirst == 'r') {
          if (offsetTop < 0) {
            newDirectionSecond = 't';
          } else if (offsetTop + elHeight > wh) {
            newDirectionSecond = 'b';
          } else if (newDirectionSecond === 'l' || newDirectionSecond === 'r') {
            newDirectionSecond = 'c';
          }
        }

        newDirection = newDirectionFirst + newDirectionSecond;

        if (newDirection !== direction) {
          prevDirection = '';
          showTip(newDirection, e);
        }
      }

      function hideTip() {
        $timeout.cancel(scope.hidePosTimer);
        $timeout.cancel(scope.hideTimer);
        if (el.hasClass('show')) {
          scope.changeCallback({
            show: false
          });
          scope.hidePosTimer = $timeout(function () {
            el.css({
              left: 0,
              top: 0
            });
          }, 300);
          scope.hideTimer = $timeout(function () {
            el.removeClass('show');
          }, 10);
        }
        hideMask();
      }

      function stopp(e) {
        e.stopPropagation();
      }
      function showMask() {
        var ifShowMask = scope.showMask == 'true';

        if (ifShowMask) {
          (0, _jquery2['default'])('body').append('<div class="ma-tooltip-mask id_' + uid + '"></div>');
        }
      }
      function hideMask() {
        var ifShowMask = scope.showMask == 'true';
        if (ifShowMask) {
          (0, _jquery2['default'])('.ma-tooltip-mask.id_' + uid).remove();
        }
      }
    }
  };
}

/***/ }),

/***/ "wV6C":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.tooltip';

/***/ })

},["VSd5"]);
//# sourceMappingURL=tooltip.js.map