webpackJsonp([2,11,22,26,27],{

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
    controller: ['$scope', function ($scope) {
      this.clearClick = function () {
        $scope.model = '';
      };
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

module.exports = "<div class=\"ma-input\">\n  <input\n    ng-show=\"type !== 'textarea'\"\n    type=\"{{type}}\"\n    ng-model=\"model\"\n    maxlength=\"{{maxlength}}\"\n    placeholder=\"{{placeholder}}\"\n    accept=\"{{accept}}\"\n    pattern=\"{{pattern}}\"\n    min=\"{{min}}\"\n    max=\"{{max}}\"\n    step=\"{{step}}\"\n    ng-readonly=\"readonly\"\n    ng-disabled=\"disabled\"\n  />\n\n  <textarea\n    ng-show=\"type === 'textarea'\"\n    type=\"{{type}}\"\n    ng-model=\"model\"\n    maxlength=\"{{maxlength}}\"\n    placeholder=\"{{placeholder}}\"\n    accept=\"{{accept}}\"\n    pattern=\"{{pattern}}\"\n    min=\"{{min}}\"\n    max=\"{{max}}\"\n    step=\"{{step}}\"\n    ng-readonly=\"readonly\"\n    ng-disabled=\"disabled\"\n  ></textarea>\n\n  <ma-icon\n    class=\"clear\"\n    ng-show=\"clear && model\"\n    ma-type=\"close\"\n    ma-click=\"$ctrl.clearClick($event)\"\n  ></ma-icon>\n\n  <div ng-transclude></div>\n</div>\n";

/***/ }),

/***/ "76nD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.treeSelect';

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

/***/ "FR6Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("HuZX");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maCheckbox', maCheckbox);

maCheckbox.$inject = ['$timeout'];

function maCheckbox($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: '<label class="ma-checkbox">\n    <input type="checkbox"\n      value="{{value}}"\n      ng-disabled="disabled"\n      ng-model="checked"\n    />\n    <i class="checkbox-appearance"></i>\n    <span ng-transclude></span>\n    </label>',
    scope: {
      name: '@name',
      value: '@value',
      model: '=ngModel',
      disabled: '=ngDisabled'
    },
    link: function link(scope, element, attrs, ctrl) {
      scope.$watch('model', function (d) {
        if (angular.isArray(d)) {
          angular.each(d, function (v, k) {
            if (String(v) === element.find('input').val() || v === true) {
              scope.checked = true;
            }
          });
        } else if (String(d) === element.find('input').val() || d === true) {
          scope.checked = true;
        } else {
          scope.checked = false;
        }
      });

      attrs.$observe('unclick', function () {
        element.bind('click', function (e) {
          e.preventDefault();
        }).find('input').bind('click', function (e) {
          e.preventDefault();
        });
      });

      scope.$watch('checked', function (d) {
        $timeout(function () {
          var checkboxs = (0, _jquery2['default'])(element).parent().find('input[type="checkbox"]');
          var values = [];

          if (!checkboxs.length) {
            checkboxs = (0, _jquery2['default'])(element).find('input');
          }

          checkboxs.each(function () {
            if (this.checked) {
              values.push(this.value || true);
            }
          });
          if (checkboxs.length === 1) {
            scope.model = values[0] || false;
          } else {
            scope.model = values;
          }
        });
      });
    }
  };
}

/***/ }),

/***/ "HuZX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.checkbox';

/***/ }),

/***/ "K4Cz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("76nD");

var _name2 = _interopRequireDefault(_name);

var _util = __webpack_require__("akj6");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).factory('$treeSelect', treeSelect);

treeSelect.$inject = [];

function treeSelect() {
  return _util2['default'];
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

/***/ "VPel":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _name = __webpack_require__("76nD");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _selectTpl = __webpack_require__("h4Fq");

var _selectTpl2 = _interopRequireDefault(_selectTpl);

var _multiSelectTpl = __webpack_require__("Vm7e");

var _multiSelectTpl2 = _interopRequireDefault(_multiSelectTpl);

__webpack_require__("x+N3");

__webpack_require__("akj6");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maTreeSelect', maTreeSelect).directive('cmultiselect', cmultiselect);

maTreeSelect.$inject = ['$treeSelect'];

function maTreeSelect($treeSelect) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="ma-tree-select">\n      <cmultiselect\n        tree\n        ng-model="newModel"\n        ng-items="newItems"\n        search-enabled="search"\n        limit="{{limit}}"\n        ng-disabled="disabled"\n        placeholder="{{placeholder}}"\n        clear="{{clear}}"\n        static="{{static}}"\n      >\n      </cmultiselect>\n    </div>',
    scope: {
      model: '=ngModel',
      maModel: '=maModel',
      name: '@name',
      search: '@maSearch',
      items: '=maData',
      limit: '@maLimit',
      disabled: '=ngDisabled',
      placeholder: '@maPlaceholder',
      textKey: '@maTextKey',
      valueKey: '@maValueKey',
      subKey: '@maSubKey',
      clear: '@maClear',
      'static': '@maStatic'
    },
    controller: ['$scope', '$element', function ($scope, $element) {
      $scope.newItems = [];
      $scope.newModel = [];
      $scope.textKey = 'text';
      $scope.valueKey = 'value';
      $scope.subKey = 'sub';

      $scope.$watch('items', function (data) {
        var newItems = [];

        angular.each(data, function (d) {
          newItems.push(d);
          setContent(newItems[newItems.length - 1]);
        });

        $scope.newItems = newItems;

        function setContent(item) {
          item.text = item[$scope.textKey];
          item.value = item[$scope.valueKey];
          item.sub = item[$scope.subKey];

          if (item.sub && item.sub.length) {
            angular.each(item.sub, function (dd) {
              setContent(dd);
            });
          }
        }
      });

      $scope.$watch('model', function (d) {
        // 设置带父级的model数据
        if ((0, _jquery2['default'])($element).attr('ma-model')) {
          $scope.maModel = getWithParent(d);
        }

        if ($scope.isInnerWatch) {
          $scope.isInnerWatch = false;
          return;
        }

        $scope.newModel = $treeSelect.getDefaultSelectTreeData($scope.newItems, $scope.model);
      });

      $scope.$watch('newModel', function (d) {
        $scope.model = d;
        $scope.isInnerWatch = true;
      });

      function getWithParent(data) {
        var selected = [];
        var selectedIds = [];

        if (data && data.length) {
          angular.each(data, function (d) {
            if (selectedIds.indexOf(d.value) === -1) {
              selected.push(d);
              selectedIds.push(d.value);
            }
            setParent(d);
          });
        }

        return selected;

        function setParent(d) {
          if (d._parent) {
            if (selectedIds.indexOf(d._parent.value) === -1) {
              selected.push(d._parent);
              selectedIds.push(d._parent.value);
            }
            setParent(d._parent);
          }
        }
      }
    }],
    link: function link(scope, element, attrs, ctrl) {
      attrs.$observe('maTextKey', function (d) {
        scope.textKey = d || 'text';
      });
      attrs.$observe('maValueKey', function (d) {
        scope.valueKey = d || 'value';
      });
      attrs.$observe('maSubKey', function (d) {
        scope.subKey = d || 'sub';
      });
    }
  };
}

cmultiselect.$inject = ['$parse', '$window', '$document', '$timeout'];

function cmultiselect($parse, $window, $document, $timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      selectDisabled: '=ngDisabled',
      'static': '@static',
      ngModel: '@ngModel',
      ngItems: '@ngItems'
    },
    replace: true,
    template: _multiSelectTpl2['default'],
    controllerAs: '$select',
    link: function link(scope, element, attrs, controller) {
      var $select = scope.$select;

      $select._multiselectId = angular.uuid();
      element.attr('data-id', $select._multiselectId);

      element.bind('click', function (e) {
        // e.stopPropagation();
      });

      attrs.$observe('tree', function (d) {
        scope.$select.isTree = true;
      });

      attrs.$observe('clear', function (d) {
        scope.$select.clear = d;
      });

      attrs.$observe('static', function (d) {
        scope.$select.isStatic = d == 'true';
      });

      // attrs.$observe('ngItems', function(d) {
      //   scope.$select.selectItems = $parse(d)(scope.$parent);
      // })
      attrs.$observe('searchEnabled', function (d) {
        scope.$select.searchEnabled = $parse(d)(scope.$parent);
      });

      attrs.$observe('limit', function (d) {
        scope.$select.limit = parseInt($parse(d)(scope.$parent), 10);
      });

      attrs.$observe('placeholder', function (d) {
        scope.$select.placeholder = d;
      });

      // 计算位置
      var dropdown = null;
      var directionUpClassName = 'direction-up';

      var setDropdownPosUp = function setDropdownPosUp(offset, offsetDropdown) {
        offset = offset || uisOffset(element);
        offsetDropdown = offsetDropdown || uisOffset(dropdown);

        dropdown[0].style.position = 'absolute';
        dropdown[0].style.top = offsetDropdown.height * -1 + 'px';
        element.addClass(directionUpClassName);
      };

      var uisOffset = function uisOffset(element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
        };
      };

      var setDropdownPosDown = function setDropdownPosDown(offset, offsetDropdown) {
        element.removeClass(directionUpClassName);

        offset = offset || uisOffset(element);
        offsetDropdown = offsetDropdown || uisOffset(dropdown);

        dropdown[0].style.position = '';
        dropdown[0].style.top = '';
      };

      var calculateDropdownPosAfterAnimation = function calculateDropdownPosAfterAnimation() {
        // Delay positioning the dropdown until all choices have been added so its height is correct.
        $timeout(function () {
          if ($select.dropdownPosition === 'up') {
            // Go UP
            setDropdownPosUp();
          } else {
            // AUTO
            element.removeClass(directionUpClassName);

            var offset = uisOffset(element);
            var offsetDropdown = uisOffset(dropdown);

            // https://code.google.com/p/chromium/issues/detail?id=342307#c4
            var scrollTop = $document[0].documentElement.scrollTop || $document[0].body.scrollTop; // To make it cross browser (blink, webkit, IE, Firefox).

            // Determine if the direction of the dropdown needs to be changed.
            if (offset.top + offset.height + offsetDropdown.height > scrollTop + $document[0].documentElement.clientHeight) {
              // Go UP
              setDropdownPosUp(offset, offsetDropdown);
            } else {
              // Go DOWN
              setDropdownPosDown(offset, offsetDropdown);
            }
          }

          // Display the dropdown once it has been positioned.
          dropdown[0].style.opacity = 1;
        });
      };

      // var opened = false;

      scope.calculateDropdownPos = function () {
        // if ($select.open) {
        dropdown = angular.element(element).querySelectorAll('.ui-select-dropdown');

        if (dropdown.length === 0) {
          return;
        }

        // Hide the dropdown so there is no flicker until $timeout is done executing.
        // if ($select.search === '' && !opened) {
        //   dropdown[0].style.opacity = 0;
        //   opened = true;
        // }

        if (!uisOffset(dropdown).height && $select.$animate && $select.$animate.on && $select.$animate.enabled(dropdown)) {
          var needsCalculated = true;

          $select.$animate.on('enter', dropdown, function (elem, phase) {
            if (phase === 'close' && needsCalculated) {
              calculateDropdownPosAfterAnimation();
              needsCalculated = false;
            }
          });
        } else {
          calculateDropdownPosAfterAnimation();
        }
        // } else {
        //   if (dropdown === null || dropdown.length === 0) {
        //     return;
        //   }

        //   // Reset the position of the dropdown.
        //   dropdown[0].style.opacity = 0;
        //   dropdown[0].style.position = '';
        //   dropdown[0].style.top = '';
        //   element.removeClass(directionUpClassName);
        // }
      };
    },
    controller: ['$scope', '$timeout', function ($scope, $timeout) {
      var _this2 = this;

      var _this = this;
      var $select = this;
      this.searchEnabled = false;

      this.open = false;

      this.disabled = false;

      this.search = '';

      this.openedItems = [];

      function bodyClick(e) {
        if (_this._multiselectId != (0, _jquery2['default'])(e.target).parents('.custom-multi-select').attr('data-id') || (0, _jquery2['default'])(e.target).hasClass('select2-choices')) {
          $scope.$applyAsync(function () {
            _this.open = false;
          });
        }
      }

      $scope.$on('$destroy', function () {
        (0, _jquery2['default'])('body').unbind('click', bodyClick);
      });

      (0, _jquery2['default'])('body').bind('click', bodyClick);

      $scope.$watch('selectDisabled', function (d) {
        $scope.$select.selectDisabled = d;
      });

      $scope.$parent.$watch($scope.ngModel, function (d) {
        $scope.$select.selectModel = d;
        $scope.$select.fixSelected();
      });

      $scope.$parent.$watch($scope.ngItems, function (d) {
        var items = _jquery2['default'].extend([], d);
        var newitems = [];

        function getSub(items, parentItem, treeLevel) {
          angular.forEach(items, function (item) {
            newitems.push(item);

            item._treeLevel = treeLevel;

            if (item.sub && item.sub.length) {
              item.tagId = parentItem ? parentItem.tagId + '_' + angular.uuid() : 'treeTag_' + angular.uuid();
              item._treeLinkTo = item.tagId;
              angular.forEach(item.sub, function (it) {
                it._parent = item;
                it._treeLinkFrom = item.tagId;
              });
              getSub(item.sub, item, treeLevel + 1);
            }
          });
        }
        getSub(items, null, 0);

        $scope.$select.selectItems = newitems;

        $scope.$select.fixSelected();
      });

      $scope.$watch('$select.selectModel', function (d) {
        var model = $parse($scope.ngModel);
        var hasOther = false;

        function setSelectedFalse(items) {
          angular.forEach(items, function (d) {
            d._selected = false;
            if (d.sub && d.sub.length) {
              setSelectedFalse(d.sub);
            }
          });
        }

        setSelectedFalse($scope.$select.selectItems);

        angular.forEach(d, function (dd) {
          if (angular.isObject(dd)) {
            dd._selected = true;
          } else {
            hasOther = true;
          }
        });

        if (hasOther) {
          return;
        }

        if (model && typeof model.assign === 'function') {
          model.assign($scope.$parent, d);
        }
      });

      this.fixSelected = function () {
        // 纠正选中值

        if (_this2.selectModel && _this2.selectModel.length && !_this2.selectModel[0].$$hashKey && !_this2.isTree) {
          $scope.$applyAsync(function () {
            var selectValues = [];

            angular.forEach(_this2.selectModel, function (d) {
              selectValues.push((typeof d === 'undefined' ? 'undefined' : _typeof(d)) !== 'object' ? d : d.value);
            });

            var selectModel = [];

            angular.forEach(_this2.selectItems, function (d) {
              if (selectValues.indexOf(d.value) !== -1) {
                selectModel.push(d);
              }
            });

            _this2.selectModel = selectModel;
          });
        }
      };

      this.clearSelect = function () {
        _this2.selectModel = undefined;
        _this2.open = false;
      };

      this.showSelect = function () {
        if ($scope.selectDisabled) {
          return;
        }

        if (_this2.open) {
          return;
        }
        if (_this2.isStatic) {
          return;
        }

        _this2.search = '';

        $scope.calculateDropdownPos();
        $timeout(function () {
          _this2.open = true;
        }, 50);
      };

      this.removeChoice = function (item, $event) {
        $event.stopPropagation();

        var newSelected = [];
        angular.forEach(_this2.selectModel, function (d, k) {
          if (d !== item) {
            newSelected.push(d);
          }
        });

        _this2.selectModel = newSelected;
      };

      this.getParents = function (item) {
        var parents = [];

        function getParent(p) {
          if (p) {
            parents.push(p);
            getParent(p._parent);
          }
        }

        getParent(item._parent);

        return parents;
      };

      this.doSelect = function ($event, item) {
        if ($select.selectDisabled) {
          return;
        }

        if (item.hiddenCheck) {
          _this2.toggleTree($event, item);
          return;
        }

        var isIn = false;
        var newSelected = [];

        angular.forEach(_this2.selectModel, function (d, k) {
          if (d === item) {
            isIn = true;
          } else {
            newSelected.push(d);
          }
        });

        if (_this2.limit == 1) {
          newSelected = [];
        }
        if (!_this2.limit || _this2.limit && _this2.limit > newSelected.length) {
          // remove sub
          if (item.sub && item.sub.length) {
            newSelected = _this2.removeSub(item, newSelected);
          }

          if (!isIn && !_this2.hasParentSelect(item)) {
            newSelected.push(item);
          }

          if (_this2.hasParentSelect(item)) {
            newSelected = _this2.addOtherItem(item, newSelected);
            newSelected = _this2.removeParent(item, newSelected);
          }

          if (item._parent && !isIn) {
            console.log('same all check');

            newSelected = _this2.sameAllCheck(item, newSelected);
          }
        }

        _this2.selectModel = newSelected;
      };

      this.sameAllCheck = function (item, newSelected) {
        var count = 0;
        var doAdd = false;
        var showSubCount = 0;

        if (item._parent && newSelected.indexOf(item._parent) == -1) {
          angular.forEach(item._parent.sub, function (d) {
            if (newSelected.indexOf(d) !== -1) {
              count++;
            }
            if (d.isHidden !== true) {
              showSubCount++;
            }
          });

          if (showSubCount && count >= showSubCount && !item._parent.hiddenCheck) {
            newSelected.push(item._parent);
            newSelected = _this2.removeSub(item._parent, newSelected);
            doAdd = true;
          }
        }

        if (doAdd && item._parent._parent) {
          newSelected = _this2.sameAllCheck(item._parent, newSelected);
        }

        return newSelected;
      };

      this.addOtherItem = function (item, newSelected) {
        var parents = _this2.getParents(item);
        var parent = null;

        angular.forEach(parents, function (d) {
          if (newSelected.indexOf(d) !== -1) {
            parent = d;
          }
        });

        function selectSub(parent) {
          angular.forEach(parent.sub, function (d) {
            if (d !== item && parent !== item && parent._parent !== item._parent && d.isHidden !== true) {
              newSelected.push(d);
            }
            if (d.sub && d !== item) {
              selectSub(d);
            }
          });
        }

        selectSub(parent);

        return newSelected;
      };

      this.removeSub = function (item, newSelected) {
        var subs = [];

        function getSub(sub) {
          angular.forEach(sub, function (d) {
            subs.push(d);
            if (d.sub && d.sub.length) {
              getSub(d.sub);
            }
          });
        }

        getSub(item.sub);

        var nnList = [];

        angular.forEach(newSelected, function (d, k) {
          if (subs.indexOf(d) == -1) {
            nnList.push(d);
          }
        });

        return nnList;
      };

      this.removeParent = function (item, newSelected) {
        var nList = [];
        var parents = _this2.getParents(item);

        angular.forEach(newSelected, function (d, k) {
          if (parents.indexOf(d) == -1) {
            nList.push(d);
          }
        });

        return nList;
      };

      this.stopp = function (e) {
        e.stopPropagation();
      };

      this.toggleTree = function ($event, item) {
        _this2.stopp($event);

        if (_this2.openedItems.indexOf(item._treeLinkTo) != -1) {
          _this2.openedItems.splice(_this2.openedItems.indexOf(item._treeLinkTo), 1);
        } else {
          _this2.openedItems.push(item._treeLinkTo);
        }

        _this2.openedItems = angular.extend([], _this2.openedItems);
      };

      this.hasSubNotHidden = function (item) {
        var subHidden = function subHidden(sub) {
          var ret = false;
          angular.forEach(sub, function (d) {
            if (d.isHidden !== true) {
              ret = true;
            } else if (d.sub && d.sub.length) {
              ret = subHidden(d.sub) === true ? true : ret;
            }
          });
          return ret;
        };

        if (item && item.sub && item.sub.length) {
          return subHidden(item.sub);
        }
        return false;
      };

      this.treeIsOpen = function (tagId) {
        if (!tagId) {
          return false;
        }

        tagId = tagId.split('_');
        var count = 0;
        var tagStart = tagId[0];
        for (var i = 1; i < tagId.length; i++) {
          tagStart += '_' + tagId[i];
          if (_this2.openedItems.indexOf(tagStart) != -1) {
            count++;
          }
        }

        return count >= tagId.length - 1;
      };

      this.hasSubSelected = function (item) {
        var has = false;

        var subSlected = function subSlected(item) {
          angular.forEach(item.sub, function (d) {
            if (_this2.selectModel && _this2.selectModel.length && _this2.selectModel.indexOf(d) !== -1) {
              has = true;
            }

            if (d.sub) {
              subSlected(d);
            }
          });
        };

        subSlected(item);

        return has;
      };

      this.hasParentSelect = function (item) {
        var has = false;
        var parentSlected = function parentSlected(item) {
          if (item._parent && _this2.selectModel && _this2.selectModel.length && _this2.selectModel.indexOf(item._parent) !== -1) {
            has = true;
          }

          if (item._parent && item._parent._parent) {
            parentSlected(item._parent);
          }
        };
        parentSlected(item);

        return has;
      };

      $scope.$watch('$select.search', function (d) {
        angular.forEach(_this2.selectItems, function (item) {
          if (d && (item.text + '').indexOf(d) === -1) {
            item.searchHidden = true;
          } else {
            item.searchHidden = false;
          }
        });
      });
    }]
  };
}

// cselect.$inject = ['$parse'];

// function cselect($parse) {
//   return {
//     restrict: 'E',
//     transclude: true,
//     replace: true,
//     scope: {
//       // getData: '&',
//       // cols: '@',
//       // ngDisabled: '@ngDisabled'
//       showLoading: '=showLoading'
//     },
//     template: selectTmpl,
//     controllerAs: 'ctrl',
//     link: function (scope, elem, attrs, controller) {
//       scope.ctrl._uuid = attrs.selectUuid || '';

//       scope.clearButton = attrs.clearButton !== undefined;

//       attrs.$observe('ngDisabled', function (d) {
//         scope.ctrl.selectDisabled = $parse(d)(scope.$parent);
//       });

//       attrs.$observe('searchEnabled', function (d) {
//         scope.ctrl.searchEnabled = $parse(d)(scope.$parent);
//       });

//       // attrs.$observe('multiple', function(d) {
//       //   scope.ctrl.multiple = true;
//       // })

//       attrs.$observe('ngSortable', function (d) {
//         scope.ctrl.sortable = $parse(d)(scope.$parent);
//       });

//       attrs.$observe('limit', function (d) {
//         scope.ctrl.limit = $parse(d)(scope.$parent);
//       });

//       attrs.$observe('placeholder', function (d) {
//         scope.ctrl.placeholder = $parse(d)(scope.$parent);
//       });

//       scope.$parent.$watch(attrs.ngModel, function (d) {
//         scope.ctrl.selectModel = d;

//         scope.ctrl.fixSelected();
//       });

//       scope.$parent.$watch(attrs.ngItems, function (d) {
//         scope.ctrl.selectItems = d;

//         scope.ctrl.fixSelected();
//       });


//       scope.$watch('ctrl.selectModel', function (d) {
//         var model = $parse(attrs.ngModel);

//         // if (scope.ctrl.multiple) {
//         //   angular.forEach(scope.ctrl.selectItems, function(d) {
//         //     d.selected = false;
//         //   })
//         //   angular.forEach(d, function(dd) {
//         //     dd.selected = true;
//         //   })
//         // }
//         if (model && typeof model.assign === 'function') {
//           model.assign(scope.$parent, d);
//         }
//       });

//       // 添加搜索字段变动监听
//       scope.$watch('ctrl.search', d => {
//         if (attrs.searchChange) {
//           scope.$parent.$eval(attrs.searchChange, scope.ctrl);
//         }
//       });
//     },
//     controller: ['$scope', '$interval', '$timeout', '$filter', function ($scope, $interval, $timeout, $filter) {
//       $scope.ctrl.selectModel = null;
//       $scope.ctrl.selectItems = null;
//       $scope.ctrl.selectDisabled = false;
//       $scope.ctrl.searchEnabled = false;
//       // $scope.ctrl.sortable = false;
//       // $scope.ctrl.multiple = false;
//       $scope.ctrl.limit = undefined;
//       $scope.ctrl.placeholder = '';


//       $scope.ctrl.fixSelected = () => {
//         // 纠正选中值
//         if (!angular.isUndefinedOrNull($scope.ctrl.selectModel)) {
//           angular.forEach($scope.ctrl.selectItems, d => {
//             if (typeof $scope.ctrl.selectModel === 'object' && d.value == $scope.ctrl.selectModel.value && !$scope.ctrl.selectModel.$$hashKey) {
//               $scope.ctrl.selectModel = d;
//             }
//             if (typeof $scope.ctrl.selectModel !== 'object' && d.value == $scope.ctrl.selectModel) {
//               $scope.ctrl.selectModel = d;
//             }
//           });
//         }
//       };


//       $scope.ctrl.showItem = function (item, searchKey) {
//         var ret = false;

//         if ((item.text + '').indexOf(searchKey) !== -1) {
//           ret = true;
//         }
//         return ret;
//       };


//       // $scope.ctrl.multipleClick = function($event, item) {
//       //   $event.stopPropagation();

//       //   var newitems = [];
//       //   var hasItem = false;

//       //   angular.forEach($scope.ctrl.selectModel, function(data) {
//       //     if (data === item) {
//       //       hasItem = true;
//       //     } else {
//       //       newitems.push(data);
//       //     }
//       //   })

//       //   if (!hasItem) {
//       //     newitems.push(item);
//       //   }

//       //   $scope.ctrl.selectModel = newitems;
//       // }
//     }]
//   };
// }

// dropdownInput.$inject = ['$parse', '$timeout', '$compile', '$rootScope'];

// function dropdownInput($parse, $timeout, $compile, $rootScope) {
//   return {
//     restrict: 'A',
//     link: function (scope, element, attrs) {
//       var box = $('<div class="select-dropdown-input"></div>');
//       var uuid = angular.uuid();
//       var key = 'selectValue' + uuid.split('-').join('');
//       var changeing = false;


//       $(element).replaceWith(box);
//       box.append(element);
//       box.attr('ng-model', attrs.ngModel);
//       element.removeAttr('dropdown-input');
//       element.removeAttr('ng-model');


//       scope[key] = $parse(attrs.ngModel)(scope) || undefined;


//       scope.$watch(attrs.ngModel, function (d) {
//         if (d) {
//           element.val(d.text);
//         }
//       });

//       // scope.$on('$destroy', function (d) {});

//       scope.$watch(key, function (d) {
//         // console.log('watch key', d)
//         if (!d) {
//           return;
//         }
//         // if (changeing || !d) {
//         //   return;
//         // }
//         // changeing = true;


//         var model = $parse(attrs.ngModel);
//         if (model && typeof model.assign === 'function') {
//           model.assign(scope, d);
//         }

//         // $timeout(function() {
//         //   changeing = false;
//         // }, 100);
//       });

//       box.append('<cselect ng-model="' + key + '" select-uuid="' + uuid + '" ng-items="' + attrs.dropdownInput + '"></cselect>');

//       $compile(box.contents())(scope);

//       element.bind('mouseup', function () {
//         scope.$broadcast('show.select.' + uuid);
//       });
//     }
//   };
// }

/***/ }),

/***/ "Vm7e":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"custom-multi-select form-control ui-select-container ui-select-multiple select2 select2-container select2-container-multi\"\nng-class=\"{\n  'hide-search': !$select.searchEnabled,\n  'select2-container-active select2-dropdown-open open': $select.open,\n  'select2-container-disabled': $select.selectDisabled,\n  'custom-tree-select': $select.isTree,\n  'custom-static-select': $select.isStatic\n}\">\n    <ma-input\n      placeholder=\"{{$select.selectModel.length ? '' : $select.placeholder}}\"\n      ng-class=\"{\n        'ma-input-arrow-down': !$select.open,\n        'ma-input-arrow-up': $select.open\n      }\"\n      ng-disabled=\"selectDisabled\"\n    ></ma-input>\n    <ul class=\"select2-choices\" ma-click=\"$select.showSelect()\"\n      ng-class=\"{\n        'has-selected': $select.selectModel.length\n      }\"\n    >\n        <li class=\"ui-select-match-item select2-search-choice ng-scope\" ng-repeat=\"$item in $select.selectModel track by $index\">\n            <span><span class=\"ng-binding ng-scope\">{{$item.displayText || $item.text}}</span></span>\n            <ma-icon\n            class=\"ui-select-match-close select2-search-choice-close\"\n            ma-type=\"closecircle\"\n            ma-click=\"$select.removeChoice($item, $event)\"\n            ></ma-icon>\n        </li>\n    </ul>\n    <div class=\"ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active\" ng-class=\"{'select2-display-none': !$select.open}\">\n        <div class=\"search-container select2-search\" ng-class=\"{'ui-select-search-hidden':!$select.searchEnabled, 'select2-search':$select.searchEnabled}\">\n            <div class=\"ma-input ma-input-search-normal\">\n              <input\n                type=\"text\"\n                autocomplete=\"off\"\n                autocorrect=\"off\"\n                autocapitalize=\"off\"\n                spellcheck=\"false\"\n                role=\"combobox\"\n                aria-expanded=\"true\"\n                aria-owns=\"ui-select-choices-0\"\n                aria-label=\"Select box\"\n                class=\"select2-input ui-select-search ng-pristine ng-valid ng-empty ng-touched\"\n                ng-model=\"$select.search\"\n                ondrop=\"return false;\"\n              >\n            </div>\n        </div>\n        <ul tabindex=\"-1\" class=\"ui-select-choices ui-select-choices-content select2-results ng-scope\" ng-class=\"{'has-scrollbar' : $select.selectItems.length > 5, 'has-search': $select.search}\">\n            <li class=\"ui-select-choices-row {{'tree-level-' +item._treeLevel}}\" ng-class=\"{'has-sub' : item.sub.length}\" data-tag-to=\"{{item._treeLinkTo}}\" ng-show=\"(!item._treeLinkFrom || $select.search || (item._treeLinkFrom && $select.treeIsOpen(item._treeLinkFrom))) && (item.isHidden !== true || $select.hasSubNotHidden(item)) && item.searchHidden !== true\" data-tag-from=\"{{item._treeLinkFrom}}\" ng-repeat=\"item in $select.selectItems\">\n              <div class=\"select2-result-label ui-select-choices-row-inner\" ma-click=\"$select.doSelect($event, item)\">\n                <div ng-class=\"{'tree-open': $select.treeIsOpen(item._treeLinkTo)}\">\n\n                        <i class=\"tree-arrow-click\" ng-if=\"item.sub.length\" ma-click=\"$select.toggleTree($event, item)\">\n                            <i class=\"tree-arrow\" ng-if=\"item.sub.length\"></i>\n                        </i>\n                        <!-- <div class=\"click-mask\"></div> -->\n                    <ma-checkbox\n                    unclick\n                    ng-model=\"item._selected\"\n                    style=\"pointer-events:none;\"\n                    ng-disabled=\"$select.selectDisabled\"\n                    ng-class=\"{\n                      'has-sub' : $select.hasSubSelected(item),\n                      'has-parent' : $select.hasParentSelect(item),\n                      'custom-multi-select-checkbox-hidden': item.hiddenCheck\n                    }\">\n                            <span ng-bind-html=\"item.text\"></span>\n                        </ma-checkbox>\n                  </div>\n                </div>\n            </li>\n        </ul>\n        <div\n          class=\"ma-dropdown-buttons\"\n          ng-show=\"$select.clear == 'true'\"\n          ma-click=\"$select.clearSelect()\"\n        >\n          <ma-button\n            ma-size=\"mini\"\n            ma-type=\"primary\"\n          >清空</ma-button>\n        </div>\n    </div>\n</div>\n\n";

/***/ }),

/***/ "YJOS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("76nD");

var _name2 = _interopRequireDefault(_name);

var _button = __webpack_require__("lkey");

var _button2 = _interopRequireDefault(_button);

var _checkbox = __webpack_require__("qoUc");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _icons = __webpack_require__("/cD4");

var _icons2 = _interopRequireDefault(_icons);

var _input = __webpack_require__("Cs5U");

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], [_button2['default'], _checkbox2['default'], _icons2['default'], _input2['default']]).config(function () {}).run(function () {});

__webpack_require__("VPel");
__webpack_require__("K4Cz");

exports['default'] = _name2['default'];

/***/ }),

/***/ "akj6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var util = {
  getNotHiddenValues: function getNotHiddenValues(data) {
    var values = [];

    function getValue(items) {
      angular.forEach(items, function (d) {
        if (!d.isHidden) {
          values.push(d.value);
        }
        if (d.sub && d.sub.length) {
          getValue(d.sub);
        }
      });
    }

    getValue(data);

    return values;
  },
  getDefaultSelectTreeData: function getDefaultSelectTreeData(data, selectedIds) {
    var selected = [];
    var newSelectedIds = [];

    angular.each(selectedIds, function (d) {
      if (angular.isObject(d)) {
        newSelectedIds.push(d.value);
      } else {
        newSelectedIds.push(d);
      }
    });

    function checkSub(items) {
      angular.forEach(items, function (d) {
        if (newSelectedIds.indexOf(d.value) !== -1 && !d.hiddenCheck) {
          selected.push(d);
        }
        if (d.sub && d.sub.length) {
          checkSub(d.sub);
        }
      });
    }
    checkSub(data);

    return selected;
  },
  filterSelectTreeData: function filterSelectTreeData(data, selectedIds) {
    angular.forEach(data, function (d) {
      if (selectedIds.indexOf(d.value) !== -1 && d.sub && d.sub.length) {
        setParents(d.sub, d);
        checkSub(d.sub);
      }
    });

    function setParents(sub, parent) {
      angular.each(sub, function (dd) {
        dd._parent = parent;
        if (dd.sub && dd.sub.length) {
          setParents(dd.sub, dd);
        }
      });
    }

    function checkSub(items) {
      var count = 0;
      angular.forEach(items, function (d) {
        if (selectedIds.indexOf(d.value) !== -1) {
          count++;

          if (d.sub && d.sub.length) {
            checkSub(d.sub);
          }
        }
      });

      if (count && count < items.length && selectedIds.indexOf(items[0]._parent.value) !== -1) {
        selectedIds.splice(selectedIds.indexOf(items[0]._parent.value), 1);
        if (items[0]._parent._parent) {
          checkSub(items[0]._parent._parent.sub);
        }
      }
    }

    return selectedIds;
  },
  getSelectTreeData: function getSelectTreeData(config) {
    var data = config.data;
    var text = config.text;
    var displayText = config.displayText;
    var value = config.value;
    var sub = config.sub;

    var tree = [];

    function pushData(items, tree) {
      angular.forEach(items, function (d) {
        tree.push({
          text: d[text],
          value: d[value],
          displayText: d[displayText],
          sub: []
        });
        if (d[sub] && d[sub].length) {
          pushData(d[sub], tree[tree.length - 1].sub);
        }
      });
    }

    pushData(data, tree);

    return tree;
  },
  hiddenSelectTreeDataReverse: function hiddenSelectTreeDataReverse(data) {
    function reverse(items) {
      angular.forEach(items, function (d) {
        d.isHidden = !d.isHidden;

        if (!d.isHidden && d._parent) {
          showParent(d._parent);
        }

        if (d.sub && d.sub.length) {
          reverse(d.sub);
        }
      });
    }

    function showParent(item) {
      item.isHidden = false;
      if (item._parent) {
        showParent(item._parent);
      }
    }

    reverse(data);

    return data;
  },
  hiddenSelectTreeData: function hiddenSelectTreeData(data, hiddenItem) {
    var hiddenValues = [];
    var hide = true;
    angular.forEach(hiddenItem, function (d) {
      hiddenValues.push(d.value);
    });

    function hideItem(items) {
      angular.forEach(items, function (d) {
        if (!hiddenItem) {
          d.isHidden = hide;
          if (d.sub && d.sub.length) {
            hideSub(d.sub);
          }
          if (d._parent) {
            hideParent(d._parent);
          }
        } else if (hiddenValues.indexOf(d.value) !== -1) {
          d.isHidden = hide;
          if (d.sub && d.sub.length) {
            hideSub(d.sub);
          }
          if (d._parent) {
            hideParent(d._parent);
          }
        } else {
          d.isHidden = !hide;

          if (d.sub && d.sub.length) {
            hideItem(d.sub);
          }
        }
      });
    }

    function hideSub(items) {
      angular.forEach(items, function (d) {
        if (!hiddenItem || hiddenValues.indexOf(d.value) !== -1) {
          d.isHidden = hide;
        }

        if (d.sub && d.sub.length) {
          hideSub(d.sub);
        }
      });
    }

    function hideParent(item) {
      var hideCount = 0;
      angular.forEach(item.sub, function (d) {
        if (d.isHidden) {
          hideCount++;
        }
      });
      if (hideCount >= item.sub.length) {
        item.isHidden = true;
        if (item._parent) {
          hideParent(item._parent);
        }
      }
    }

    hideItem(data);

    return data;
  }
};

exports["default"] = util;

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
        return errorMsgTemplate(element, attrs, param, '太长了');
      },
      success: 'OK'
    },
    maxlength: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '太短了');
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

/***/ "h4Fq":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"custom-select\">\n  <!-- 多选 -->\n<!--  <ui-select ng-if=\"ctrl.multiple\" limit=\"{{ctrl.limit}}\" close-on-select=\"false\" search-enabled=\"ctrl.searchEnabled\" multiple theme=\"select2\" ng-disabled=\"ctrl.selectDisabled\" sortable=\"ctrl.sortable\" class=\"form-control\" ng-model=\"ctrl.selectModel\" ng-class=\"{'hide-search': !ctrl.searchEnabled}\">\n\n    <ui-select-match placeholder=\"{{ctrl.placeholder}}\">{{$item.text}}</ui-select-match>\n        <ui-select-choices repeat=\"item in ctrl.selectItems | filter: $select.search : item.text\">\n\n          <div  ng-show=\"ctrl.showItem(item, $select.search)\" ng-click=\"ctrl.multipleClick($event, item)\"><common-checkbox model=\"item.selected\" style=\"pointer-events:none;\"><span ng-bind-html=\"item.text\"></span></common-checkbox></div>\n\n        </ui-select-choices>\n  </ui-select> -->\n\n  <!-- 单选 -->\n  <ui-select ng-if=\"!ctrl.multiple\" ng-class=\"{'has-scrollbar' : ctrl.selectItems.length > 5}\" search-enabled=\"ctrl.searchEnabled\" theme=\"select2\" ng-disabled=\"ctrl.selectDisabled\" show-loading=\"showLoading\" sortable=\"ctrl.sortable\" class=\"form-control\" ng-model=\"ctrl.selectModel\" select-uuid=\"{{ctrl._uuid}}\">\n\n    <ui-select-match placeholder=\"{{ctrl.placeholder}}\">{{$select.selected.text}}</ui-select-match>\n        <ui-select-choices repeat=\"item in ctrl.selectItems | filter: $select.search : item.text\">\n          <div ng-bind-html=\"item.text\"></div>\n        </ui-select-choices>\n  </ui-select>\n</div>\n";

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

/***/ "qoUc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("HuZX");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("FR6Y");

exports['default'] = _name2['default'];

/***/ })

},["YJOS"]);
//# sourceMappingURL=treeSelect.js.map