webpackJsonp([20],{

/***/ "/Las":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("HDDE");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _maMessageTpl = __webpack_require__("F7JF");

var _maMessageTpl2 = _interopRequireDefault(_maMessageTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).factory('$message', messageFactory);

messageFactory.$inject = ['$rootScope', '$q', '$http', '$timeout', '$compile'];

function messageFactory($rootScope, $q, $http, $timeout, $compile) {
  $rootScope.weakTipList = [];

  var messageBox = (0, _jquery2['default'])('.weak-tip');

  if (!messageBox.length) {
    messageBox = (0, _jquery2['default'])(_maMessageTpl2['default']);
    (0, _jquery2['default'])('body').append(messageBox);
    $compile(messageBox)($rootScope);
    $rootScope.$hideMessage = hideMessage;
  }

  function hideMessage(index) {
    var msg = $rootScope.weakTipList[index];

    msg.hide = true;
    $timeout();
    setTimeout(function (msg) {
      msg.remove = true;
      $timeout();
    }, 800, msg);
  }

  return {
    danger: function danger(text) {
      this.show('danger', text);
    },
    success: function success(text) {
      this.show('success', text);
    },
    warning: function warning(text) {
      this.show('warning', text);
    },
    show: function show(type, text) {
      this.clearList();
      if (this.hasSame(type, text)) {
        return;
      }

      var msg = {
        type: type,
        text: text || '空'
      };
      $rootScope.weakTipList.push(msg);

      setTimeout(function (msg) {
        msg.hide = false;
        $timeout();
      }, 50, msg);

      setTimeout(function (msg) {
        msg.hide = true;
        $timeout();
        setTimeout(function (msg) {
          msg.remove = true;
          $timeout();
        }, 350, msg);
      }, 2000, msg);
    },
    clearList: function clearList() {
      var list = [];
      angular.forEach($rootScope.weakTipList, function (d) {
        if (d.remove !== true) {
          list.push(d);
        }
      });
      $rootScope.weakTipList = list;
    },
    hasSame: function hasSame(type, text) {
      var has = false;
      angular.forEach($rootScope.weakTipList, function (d) {
        if (d.text === text && d.type === type) {
          has = true;
        }
      });

      return has;
    }
  };
}

/***/ }),

/***/ "AkYH":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "F7JF":
/***/ (function(module, exports) {

module.exports = "<div class=\"weak-tip\" ng-show=\"$root.weakTipList.length\">\n  <div ng-repeat=\"tip in $root.weakTipList\" ng-if=\"tip.remove !== true\">\n    <div\n    ng-click=\"$root.$hideMessage($index)\"\n    ng-class=\"{'show-in': tip.hide === false, 'weak-tip-success': tip.type == 'success', 'weak-tip-danger': tip.type == 'danger', 'weak-tip-warning': tip.type == 'warning'}\" ng-bind=\"tip.text\"\n    ng-cloak></div>\n  </div>\n</div>\n";

/***/ }),

/***/ "HDDE":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.message';

/***/ }),

/***/ "WB2H":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__("AkYH");

var _name = __webpack_require__("HDDE");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("fbZV");
__webpack_require__("/Las");

exports['default'] = _name2['default'];

/***/ }),

/***/ "fbZV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("HDDE");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maMessage', maMessage);

maMessage.$inject = [];

function maMessage() {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs, ctrl) {}
  };
}

/***/ })

},["WB2H"]);
//# sourceMappingURL=message.js.map