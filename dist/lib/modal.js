webpackJsonp([10,23,28],{

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

/***/ "DafX":
/***/ (function(module, exports) {

module.exports = "<div\n  class=\"ma-modal {{config.cls}}\"\n  ng-class=\"{\n    show: config.show,\n    confirm: config.isConfirm,\n    alert: config.isAlert,\n  }\">\n  <div\n    class=\"ma-modal-mask\"\n    ng-if=\"config.clickMaskClose\"\n    ng-click=\"$ctrl.close($event)\"\n  ></div>\n  <div\n    class=\"ma-modal-mask\"\n    ng-if=\"!config.clickMaskClose\"\n  ></div>\n  <div class=\"ma-modal-container\">\n    <div class=\"ma-modal-head\" ng-show=\"config.title || config.showClose != false\">\n      <span class=\"ma-modal-title\" ng-show=\"config.title\" ng-bind-html=\"config.title + '&nbsp;'\"></span>\n      <ma-icon ma-type=\"close\" ng-show=\"config.showClose != false\" ma-click=\"$ctrl.close($event)\"></ma-icon>\n    </div>\n    <div class=\"ma-modal-body\"></div>\n    <div class=\"ma-modal-footer\" ng-show=\"config.buttons.length\">\n      <ma-button\n        ng-repeat=\"button in config.buttons\"\n        ma-type=\"{{button.type || 'default'}}\"\n        ma-size=\"{{button.size || 'default'}}\"\n        ng-disabled=\"button.disabled\"\n        ma-click=\"$ctrl.buttonClick($event, button.callback)\"\n      >{{button.text}}</ma-button>\n    </div>\n  </div>\n</div>\n";

/***/ }),

/***/ "EI7D":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("wcTH");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).factory('$modal', modalFactroy);

modalFactroy.$inject = ['$rootScope', '$compile', '$timeout'];

function modalFactroy($rootScope, $compile, $timeout) {
  var defaultConfig = {
    scope: null, // 作用域 默认 $rootScope
    title: '', // 标题
    template: '', // 主体内容模板
    showClose: true, // 显示关闭按钮
    clickMaskClose: false, // 点击遮罩是否关闭对话框
    okCallback: undefined, // 如果使用默认按钮的保存回调
    cancelCallback: undefined, // 如果使用默认按钮的放弃回调
    buttons: [{
      text: '保存修改',
      type: 'primary',
      size: 'default',
      disabled: false,
      callback: function callback($ctrl, config) {
        // 点击回调
        if (typeof config.okCallback === 'function') {
          config.okCallback($ctrl, config);
        }
      }
    }, {
      text: '放弃',
      type: 'default',
      size: 'default',
      disabled: false,
      callback: function callback($ctrl, config) {
        // 点击回调
        if (typeof config.okCallback === 'function') {
          config.cancelCallback($ctrl, config);
        }
      }
    }] // 底部按钮
  };

  return {
    open: open,
    'delete': deleteFn,
    confirm: confirmFn,
    alert: alert
  };

  function alert(config) {
    var content = config.content;

    // 默认按钮
    if (!config.buttons) {
      config.buttons = [{
        text: '关闭',
        type: 'danger',
        size: 'default',
        disabled: false,
        callback: function callback($ctrl, config) {
          // 点击回调
          if (typeof config.okCallback === 'function') {
            config.okCallback($ctrl, config);
          }
        }
      }];
    }

    delete config.title;
    config.showClose = false;
    config.isAlert = true;
    config.template = '';

    if (content) {
      config.template += '<div class="ma-alert-content">' + content + '</div>';
    }

    open(config);
  }

  function deleteFn(config) {
    // 默认按钮
    if (!config.buttons) {
      config.buttons = [{
        text: '删除',
        type: 'danger',
        size: 'default',
        disabled: false,
        callback: function callback($ctrl, config) {
          // 点击回调
          if (typeof config.okCallback === 'function') {
            config.okCallback($ctrl, config);
          }
        }
      }, {
        text: '取消',
        type: 'default',
        size: 'default',
        disabled: false,
        callback: function callback($ctrl, config) {
          // 点击回调
          if (typeof config.okCallback === 'function') {
            config.cancelCallback($ctrl, config);
          }
        }
      }];
    }
    confirm(config);
  }

  function confirmFn(config) {
    // 默认按钮
    if (!config.buttons) {
      config.buttons = [{
        text: '确定',
        type: 'primary',
        size: 'default',
        disabled: false,
        callback: function callback($ctrl, config) {
          // 点击回调
          if (typeof config.okCallback === 'function') {
            config.okCallback($ctrl, config);
          }
        }
      }, {
        text: '取消',
        type: 'default',
        size: 'default',
        disabled: false,
        callback: function callback($ctrl, config) {
          // 点击回调
          if (typeof config.okCallback === 'function') {
            config.cancelCallback($ctrl, config);
          }
        }
      }];
    }
    confirm(config);
  }

  function confirm(config) {
    var title = config.title;
    var content = config.content;

    delete config.title;
    config.showClose = false;
    config.isConfirm = true;
    config.template = '';

    if (title) {
      config.template += '<div class="ma-confirm-title">' + title + '</div>';
    }
    if (content) {
      config.template += '<div class="ma-confirm-content">' + content + '</div>';
    }

    open(config);
  }

  function open(config) {
    var newConfig = _jquery2['default'].extend(true, {}, defaultConfig);
    var scope = config.scope;
    var uuid = 'modal_' + angular.uuid().split('-').join('');
    var maModalEl = (0, _jquery2['default'])('<ma-modal ma-config="modals.' + uuid + '" ma-uuid="' + uuid + '"></ma-modal>');

    delete config.scope;
    _jquery2['default'].extend(true, newConfig, config || {});

    if (config.buttons) {
      newConfig.buttons = _jquery2['default'].extend([], config.buttons);
    }

    newConfig.scope = scope || $rootScope;

    if (newConfig.scope && !newConfig.scope.modals) {
      newConfig.scope.modals = {};
    }
    newConfig.scope.modals[uuid] = newConfig;

    (0, _jquery2['default'])('body').append(maModalEl).addClass('has-ma-modal');
    $compile(maModalEl)(newConfig.scope);

    $timeout(function () {
      newConfig.show = true;
    }, 0);
  }
}

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

/***/ "UX8a":
/***/ (function(module, exports) {

module.exports = "<svg\n  class=\"ma-circle\"\n>\n  <circle\n    fill=\"none\"\n  ></circle>\n  <circle\n    fill=\"none\"\n  ></circle>\n</svg>\n";

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

/***/ "iaUq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("wcTH");

var _name2 = _interopRequireDefault(_name);

var _icons = __webpack_require__("/cD4");

var _icons2 = _interopRequireDefault(_icons);

var _button = __webpack_require__("lkey");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], [_icons2['default'], _button2['default']]).config(function () {}).run(function () {});

__webpack_require__("u4ZQ");
__webpack_require__("EI7D");

exports['default'] = _name2['default'];

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

/***/ "u4ZQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("wcTH");

var _name2 = _interopRequireDefault(_name);

var _maModalTpl = __webpack_require__("DafX");

var _maModalTpl2 = _interopRequireDefault(_maModalTpl);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var isIE9 = /msie 9\.0/g.test(window.navigator.userAgent.toLowerCase());

angular.module(_name2['default']).directive('maModal', maModal);

maModal.$inject = ['$timeout', '$compile'];

function maModal($timeout, $compile) {
  return {
    restrict: 'E',
    scope: {
      config: '=maConfig',
      uuid: '@maUuid'
    },
    replace: true,
    template: _maModalTpl2['default'],
    controllerAs: '$ctrl',
    controller: ['$scope', '$element', function ($scope, $element) {
      var config = $scope.config;
      this.close = close;
      this.buttonClick = buttonClick;

      // 渲染弹窗内容
      $timeout(function () {
        (0, _jquery2['default'])($element).find('.ma-modal-body').html(config.template);
        $compile((0, _jquery2['default'])($element).find('.ma-modal-body'))(config.scope);
      });

      function close($event) {
        config.show = false;

        $timeout(function () {
          (0, _jquery2['default'])($element).remove();
          if (!(0, _jquery2['default'])('.ma-modal.show').length) {
            (0, _jquery2['default'])('body').removeClass('has-ma-modal');
          }
        }, isIE9 ? 0 : 310);
      }

      function buttonClick($event, callback) {
        if (typeof callback === 'function') {
          callback(this, config, $event);
        }
      }
    }],
    link: function link(scope, element, attrs, ctrl) {}
  };
}

/***/ }),

/***/ "wcTH":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.modal';

/***/ })

},["iaUq"]);
//# sourceMappingURL=modal.js.map