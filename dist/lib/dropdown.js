webpackJsonp([6,11,22,27],{

/***/ "+Ovo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _name = __webpack_require__("g5ku");

var _name2 = _interopRequireDefault(_name);

var _maInputTpl = __webpack_require__("6vUj");

var _maInputTpl2 = _interopRequireDefault(_maInputTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maInput', maInput).directive('maNum', maNum);

maInput.$inject = [];

function maInput() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      name: '@name',
      type: '@type',
      model: '=ngModel',

      maxlength: '@maxlength',
      placeholder: '@placeholder',
      accept: '@accept',
      pattern: '@pattern',
      min: '@min',
      max: '@max',
      step: '@step',
      readonly: '=ngReadonly',
      disabled: '=ngDisabled',

      iconClick: '&maIconClick',

      clear: '=maClear'
    },
    template: _maInputTpl2['default'],
    controllerAs: '$ctrl',
    controller: ['$scope', '$element', function ($scope, $element) {
      this.clearClick = function () {
        $scope.model = '';
      };
      $scope.$watch('placeholder', function (d) {
        $element.find('textarea').attr('placeholder', d || '');
      });
    }],
    link: function link(scope, element, attrs, ctrl) {
      (0, _jquery2['default'])(element).bind('click', function (e) {
        if (e.eventPhase === 2) {
          scope.iconClick({
            $event: e
          });
        }
      });
    }
  };
}

maNum.$inject = ['$filter', '$timeout', '$parse'];

function maNum($filter, $timeout, $parse) {
  return {
    restrict: 'A',
    link: function link(scope, elem, attrs, controller) {
      var decimal = attrs.maDecimal !== undefined;
      var ngModel = $parse(attrs.ngModel);
      var min = parseFloat(attrs.min);
      var max = parseFloat(attrs.max);

      attrs.$observe('min', function (d) {
        min = d || undefined;
      });
      attrs.$observe('max', function (d) {
        max = d || undefined;
      });

      if (!isNaN(parseInt(attrs.maDecimal, 10))) {
        decimal = parseInt(attrs.maDecimal, 10);
      }

      if (decimal === 0 || attrs.maDecimal === '') {
        decimal = false;
      }

      if (decimal === true) {
        decimal = 2;
      }

      if (elem[0].tagName.toLowerCase() !== 'input') {
        elem.find('input').bind('keyup', keyup);
      } else {
        elem.bind('keyup', keyup);
      }

      function keyup(e) {
        var _this = this;

        var v = this.value + '';

        v = v.split('');

        var str = [];
        var decimalCount = 0;

        if (v[0] === '-' && v.length === 1) {
          // 为一个负号时不处理
          str = v;
        } else {
          angular.forEach(v, function (d, k) {
            if (decimal && d == '。') {
              d = '.';
            }

            if (decimal && k !== 0 && d == '.' && decimalCount === 0) {
              str.push(d);
              decimalCount++;
            }

            if (!isNaN(parseInt(d, 10))) {
              str.push(d);
            }

            if (k === 0 && d === '-') {
              str.push(d);
            }
          });

          if (str[str.length - 1] !== '.' && (!isNaN(min) || !isNaN(max))) {
            str = parseFloat(str.join(''));

            if (isNaN(str)) {
              str = '';
            }

            if ((str || str === 0) && !isNaN(min) && str < min) {
              str = min;
            }
            if ((str || str === 0) && !isNaN(max) && str > max) {
              str = max;
            }

            str = (str + '').split('');
          }
        }

        $timeout(function () {
          _this.value = str.join('') || '';

          if (!isNaN(decimal) && _this.value && _this.value.split('.')[1] && _this.value.split('.')[1].length > decimal) {
            _this.value = parseFloat(_this.value).toFixed(decimal);
          }
          if (ngModel && typeof ngModel.assign === 'function') {
            ngModel.assign(scope, _this.value);
          }
        });
      }
    }
  };
}

/***/ }),

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

/***/ "6vUj":
/***/ (function(module, exports) {

module.exports = "<div class=\"ma-input\">\n  <input\n    ng-show=\"type !== 'textarea'\"\n    type=\"{{type}}\"\n    ng-model=\"model\"\n    maxlength=\"{{maxlength}}\"\n    placeholder=\"{{placeholder}}\"\n    accept=\"{{accept}}\"\n    pattern=\"{{pattern}}\"\n    min=\"{{min}}\"\n    max=\"{{max}}\"\n    step=\"{{step}}\"\n    ng-readonly=\"readonly\"\n    ng-disabled=\"disabled\"\n  />\n\n  <textarea\n    ng-show=\"type === 'textarea'\"\n    type=\"{{type}}\"\n    ng-model=\"model\"\n    maxlength=\"{{maxlength}}\"\n    accept=\"{{accept}}\"\n    pattern=\"{{pattern}}\"\n    min=\"{{min}}\"\n    max=\"{{max}}\"\n    step=\"{{step}}\"\n    ng-readonly=\"readonly\"\n    ng-disabled=\"disabled\"\n  ></textarea>\n\n  <ma-icon\n    class=\"clear\"\n    ng-show=\"clear && model\"\n    ma-type=\"close\"\n    ma-click=\"$ctrl.clearClick($event)\"\n  ></ma-icon>\n\n  <div ng-transclude></div>\n</div>\n";

/***/ }),

/***/ "Cs5U":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("g5ku");

var _name2 = _interopRequireDefault(_name);

var _icons = __webpack_require__("/cD4");

var _icons2 = _interopRequireDefault(_icons);

var _button = __webpack_require__("lkey");

var _button2 = _interopRequireDefault(_button);

__webpack_require__("MHen");

__webpack_require__("gU1X");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], [_icons2['default'], _button2['default'], 'validation', 'validation.rule']).config(function () {}).run(function () {});

__webpack_require__("+Ovo");

exports['default'] = _name2['default'];

/***/ }),

/***/ "LJOD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("YO30");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _v = __webpack_require__("DtRx");

var _v2 = _interopRequireDefault(_v);

var _debounce = __webpack_require__("HhAh");

var _debounce2 = _interopRequireDefault(_debounce);

var _maDropdownTpl = __webpack_require__("lQqW");

var _maDropdownTpl2 = _interopRequireDefault(_maDropdownTpl);

var _itemTpl = __webpack_require__("sebW");

var _itemTpl2 = _interopRequireDefault(_itemTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maDropdown', maDropdown);

maDropdown.$inject = ['$timeout', '$compile'];

function maDropdown($timeout, $compile) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: _maDropdownTpl2['default'],
    scope: {
      show: '=maShow',
      showHover: '@maShowHover',
      showClick: '@maShowClick',
      data: '=maData',
      itemClick: '&maItemClick',
      valueKey: '@maValueKey',
      textKey: '@maTextKey',
      selectedHide: '@maSelectedHide',

      activeItems: '=ngModel',

      nullText: '@maNullText',
      searchBar: '@maSearch',
      searchKey: '=maSearchKey',
      multiple: '@maMultiple',
      clear: '@maClear',

      direction: '=maDirection',
      'static': '@maStatic',

      disabled: '=ngDisabled'
    },
    controllerAs: '$ctrl',
    controller: ['$scope', function ($scope) {
      this.clearValue = function () {
        $scope.activeItems = undefined;
      };
    }],
    link: function link(scope, element, attrs, ctrl) {
      var containerCls = '.ma-dropdown-container';
      var updateHtmlItem = (0, _debounce2['default'])(_updateHtmlItem, 100);
      var showTimeout = null;

      // item 点击事件
      scope._itemClick = _itemClick;

      // 鼠标覆盖显示
      if (scope.showHover !== undefined) {
        (0, _jquery2['default'])(element).hover(function () {
          scope.show = true;
          $timeout();
        }, function () {
          scope.show = false;
          $timeout();
        });
      }

      // 鼠标点击显示
      if (scope.showClick !== undefined) {
        (0, _jquery2['default'])(element).click(function (e) {
          scope.show = true;
          $timeout();
          e.stopPropagation();
        });
        (0, _jquery2['default'])('body').on('click', function () {
          scope.show = false;
          $timeout();
        });
      }

      // 监听show 变化
      scope.$watch('show', function (d) {
        var container = (0, _jquery2['default'])(element).find(containerCls);
        var ww = (0, _jquery2['default'])(window).width();
        var wh = (0, _jquery2['default'])(window).height();
        var offset = (0, _jquery2['default'])(element).find(containerCls).offset();

        if (d) {
          $timeout.cancel(showTimeout);
          if (offset.left + container.width() - (0, _jquery2['default'])(window).scrollLeft() > ww) {
            container.parent().addClass('right');
          }
          if (offset.top + container.height() - (0, _jquery2['default'])(window).scrollTop() > wh) {
            container.parent().addClass('top');
            setDirection('top');
          }
        } else {
          showTimeout = $timeout(function () {
            container.parent().removeClass('right').removeClass('top');
            setDirection('');
          }, 600);
        }
      });

      scope.textKey = attrs.maTextKey || 'text';
      scope.valueKey = attrs.maValueKey || 'value';

      attrs.$observe('maTextKey', function (d) {
        scope.textKey = d || 'text';
      });
      attrs.$observe('maValueKey', function (d) {
        scope.valueKey = d || 'value';
      });

      scope.$watch('data', function (d, p) {
        checkCheckbox();
        updateHtmlItem();
      });
      scope.$watch('searchKey', function (d) {
        checkCheckbox();
        updateHtmlItem();
      });

      // 监听选中变化
      scope.$watch('activeItems', function (d) {
        var _activeItems = [];

        if (!angular.isNull(d)) {
          if (angular.isArray(d)) {
            angular.each(d, function (v, k) {
              if (!angular.isNull(v)) {
                if (angular.isObject(v)) {
                  _activeItems.push(v[scope.valueKey]);
                } else {
                  _activeItems.push(v);
                  scope.activeItems[k] = getActiveItem(v);
                }
              }
            });
          } else if (angular.isObject(d)) {
            _activeItems.push(d[scope.valueKey]);
          } else {
            _activeItems.push(d);
            scope.activeItems = getActiveItem(d);
          }
        }

        scope._activeItems = _activeItems;

        if (!scope.multiple) {
          (0, _jquery2['default'])(scope.data).each(function () {
            if (_activeItems.indexOf(this[scope.valueKey]) !== -1) {
              (0, _jquery2['default'])(element).find('.ma-dropdown-item[data-uuid="' + this._uuid + '"]').addClass('active').siblings().removeClass('active');
              return false;
            }
            return true;
          });
        }

        checkCheckbox();
      });

      function _itemClick($event, item) {
        if (scope.disabled) {
          return;
        }

        scope.itemClick({
          $event: $event,
          $item: item
        });

        $event.stopPropagation();
        if (scope.selectedHide !== undefined && scope.multiple != 'true') {
          scope.show = false;
        }

        $timeout();
      }

      function checkCheckbox() {
        // 所有 checked 为 false
        if (scope.multiple) {
          angular.each(scope.data, function (d) {
            if (scope._activeItems && scope._activeItems.indexOf(d[scope.valueKey]) !== -1) {
              d.checked = true;
            } else {
              d.checked = false;
            }
          });
        }
      }

      function getActiveItem(value) {
        var data = void 0;

        angular.each(scope.data, function (d) {
          if (d[scope.valueKey] == value) {
            data = d;
          }
        });

        return data;
      }

      function setDirection(direction) {
        if ((0, _jquery2['default'])(element).attr('ma-direction')) {
          try {
            scope.direction = direction || '';
          } catch (e) {
            //
          }
        }
      }

      function _updateHtmlItem() {
        var target = (0, _jquery2['default'])(element).find('.ma-dropdown-container-content');
        var items = scope.data;
        var searchKey = scope.searchKey;
        var valueKey = scope.valueKey;
        var textKey = scope.textKey;
        var index = -1;

        target.html('');

        angular.each(items, function (item) {
          if (angular.isNull(item._uuid)) {
            item._uuid = (0, _v2['default'])();
          }

          var text = item[textKey] + '';
          var value = item[valueKey];

          if (angular.isNull(searchKey) || text.indexOf(searchKey) !== -1) {
            index++;
            var itemElement = (0, _jquery2['default'])(_itemTpl2['default'].replace(/&&\{index\}/g, index));

            itemElement.attr('data-uuid', item._uuid);

            if (item.hide) {
              itemElement.addClass('hide');
            }
            if (scope.multiple) {
              itemElement.attr('ng-class', '{\'hide\' :item' + index + '.hide}');
            }

            if (scope._activeItems.indexOf(item[scope.valueKey]) !== -1) {
              itemElement.addClass('active');
            }

            if (!scope.multiple) {
              itemElement.append('<span>' + item[scope.textKey] + '</span>');
            } else {
              itemElement.append('<ma-checkbox ng-cloak ng-disabled="disabled"\n                  ng-model="item' + index + '.checked">\n                  <span>' + item[scope.textKey] + '</span>\n                </ma-checkbox>');
              itemElement.addClass('is-multiple');
              $compile(itemElement)(scope);
            }

            itemElement.on('click', function (e) {
              scope._itemClick(e, item);
            });

            target.append(itemElement);

            scope['item' + index] = item;
          }
        });
        if (scope.multiple) {
          $timeout();
        }
      }
    }
  };
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

/***/ "YO30":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.dropdown';

/***/ }),

/***/ "brJl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.icons';

/***/ }),

/***/ "g5ku":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.input';

/***/ }),

/***/ "g66R":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.button';

/***/ }),

/***/ "gU1X":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module('validation.rule', []).config(['$validationProvider', function ($validationProvider) {
  var expression = {
    'null': function _null() {
      return true;
    },
    required: function required(value) {
      if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.length === 0) {
        return false;
      }
      if (value === 0) {
        return true;
      }
      return !!value;
    },
    url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
    email: /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    number: /^\d+$/,
    minlength: function minlength(value, scope, element, attrs, param) {
      return value.length >= param;
    },
    maxlength: function maxlength(value, scope, element, attrs, param) {
      return value.length <= param;
    },
    cellphone: function cellphone(value, scope, element, attrs, param) {
      value += '';
      if (!value) {
        return false;
      }
      if (isNaN(value)) {
        return false;
      }
      if (value.length !== 11) {
        return false;
      }

      return true;
    },
    phone: function phone(value, scope, element, attrs, param) {
      value += '';
      if (!value) {
        return false;
      }
      if (isNaN(value)) {
        return false;
      }
      // 固话 位数
      // 3 + 7
      // 3 + 8
      // 4 + 7
      // 4 + 8
      // 手机 位数
      // 11
      if (value.length !== 10 && value.length !== 11 && value.length !== 12) {
        return false;
      }

      return true;
    },
    zipcode: function zipcode(value, scope, element, attrs, param) {
      return (/^[1-9]\d{5}$/g.test(value)
      );
    },
    bankcard: function bankcard(value, scope, element, attrs, param) {
      return (/^([1-9]{1})(\d{11}|\d{14}|\d{15}|\d{17}|\d{18}|\d{19})$/g.test(value)
      );
    },
    // 比例
    ratio: function ratio(value, scope, element, attrs, param) {
      return !value || value >= 0 && /^[1-9]\d*$/.test(String(value));
    },
    // 计数
    count: function count(value, scope, element, attrs, param) {
      return !value || String(value) === '0' || /^[1-9]\d*$/.test(String(value));
    },
    // 金额
    currency: function currency(value, scope, element, attrs, param) {
      return !value || String(value) === '0' || /^[0-9]+(.[0-9]{1,2})?$/.test(String(value));
    },
    // 百分比
    percentage: function percentage(value, scope, element, attrs, param) {
      return !value || String(value) === '0' || /^[0-9]+(.[0-9]{1,2})?$/.test(String(value));
    },
    // 自定义验证，param 是正则表达式
    custom: function custom(value, scope, element, attrs, param) {
      var regExp = new RegExp(param);
      return !value || regExp.test(String(value));
    },
    password: function password(value) {
      if (value) {
        var pwdReg = /^[a-zA-Z0-9_!@#$%^&*]{6,16}$/;
        var num = /^[0-9]{1,9}$/;
        return pwdReg.test(value) && !num.test(value);
      }
      return false;
    },
    same: function same(value, scope, element, attrs, param) {
      return value == scope.$eval(param);
    }
  };

  var errorMsgTemplate = function errorMsgTemplate(element, attrs, param, msg) {
    if (attrs.invalidMessage) {
      return attrs.invalidMessage;
    }
    return msg;
  };

  var defaultMsg = {
    'null': {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, 'OK');
      },
      success: 'OK'
    },
    cellphone: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入正确的手机号码');
      },
      success: 'OK'
    },
    phone: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入正确的电话号码');
      },
      success: 'OK'
    },
    required: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '不能为空');
      },
      success: 'OK'
    },
    url: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入URL链接');
      },
      success: 'OK'
    },
    email: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入正确的邮箱地址');
      },
      success: 'OK'
    },
    number: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入数字');
      },
      success: 'OK'
    },
    minlength: {
      error: function error(element, attrs, param) {
        var len = parseInt(param, 10);
        return errorMsgTemplate(element, attrs, param, '\u6700\u77ED\u4E3A' + len + '\u4E2A\u5B57\u7B26');
      },
      success: 'OK'
    },
    maxlength: {
      error: function error(element, attrs, param) {
        var len = parseInt(param, 10);
        return errorMsgTemplate(element, attrs, param, '\u6700\u957F\u4E3A' + len + '\u4E2A\u5B57\u7B26');
      },
      success: 'OK'
    },
    zipcode: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入正确的邮编');
      },
      success: 'OK'
    },
    bankcard: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入正确的银行卡号');
      },
      success: 'OK'
    },
    ratio: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入有效的比例数值');
      },
      success: 'OK'
    },
    count: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入有效的计数数值');
      },
      success: 'OK'
    },
    currency: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入有效的金额数值');
      },
      success: 'OK'
    },
    percentage: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入有效的百分比数值');
      },
      success: 'OK'
    },
    custom: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '验证未通过');
      },
      success: 'OK'
    },
    password: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '长度为6-16个字符，不能包含空格，不能是9位以下纯数字');
      },
      success: 'OK'
    },
    same: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '内容不一致');
      },
      success: 'OK'
    }
  };
  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);

  $validationProvider.showSuccessMessage = true; // or true(default)
  $validationProvider.showErrorMessage = true; // or true(default)

  $validationProvider.setErrorHTML(function (msg) {
    return '<b class="form-error-text">' + msg + '</b>';
  });
  $validationProvider.setSuccessHTML(function (msg) {
    return '<i></i>';
  });

  _jquery2['default'].extend(true, $validationProvider, {
    validCallback: function validCallback(element) {
      // console.log(element, 'validCallback');
      element.addClass('ma-input-success').removeClass('ma-input-error');
    },
    invalidCallback: function invalidCallback(element) {
      // console.log(element, 'invalidCallback');
      element.removeClass('ma-input-success').addClass('ma-input-error');
    },
    resetCallback: function resetCallback(element) {
      // console.log(element, 'resetCallback');
      element.removeClass('ma-input-success').removeClass('ma-input-error');
    }
  });
}]);

/***/ }),

/***/ "lQqW":
/***/ (function(module, exports) {

module.exports = "<div class=\"ma-dropdown\">\n  <div ng-transclude></div>\n  <div class=\"ma-dropdown-container\"\n    ng-class=\"{\n      show: show || static == 'true'\n    }\">\n    <div class=\"ma-dropdown-search-bar\"\n      ng-if=\"searchBar == 'true'\">\n      <ma-input ng-model=\"searchKey\"\n        class=\"ma-input-search-normal\"></ma-input>\n    </div>\n    <div class=\"ma-dropdown-item null-text\"\n      ng-if=\"(nullText || nullText == 'true') && data.length <= 0\">{{nullText == 'true' ? '暂无数据' : nullText}}</div>\n\n    <div class=\"ma-dropdown-container-content\">\n    </div>\n\n    <div class=\"ma-dropdown-buttons\"\n      ng-show=\"clear == 'true'\"\n      ma-click=\"$ctrl.clearValue()\">\n      <ma-button ma-size=\"mini\"\n        ma-type=\"primary\">清空</ma-button>\n    </div>\n  </div>\n</div>\n";

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

/***/ "sebW":
/***/ (function(module, exports) {

module.exports = "<div class=\"ma-dropdown-item\">\n</div>\n";

/***/ }),

/***/ "zznV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("YO30");

var _name2 = _interopRequireDefault(_name);

__webpack_require__("AFu3");

var _button = __webpack_require__("lkey");

var _button2 = _interopRequireDefault(_button);

var _input = __webpack_require__("Cs5U");

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], ['ngSanitize', _button2['default'], _input2['default']]).config(function () {}).run(function () {});

__webpack_require__("LJOD");

exports['default'] = _name2['default'];

/***/ })

},["zznV"]);
//# sourceMappingURL=dropdown.js.map