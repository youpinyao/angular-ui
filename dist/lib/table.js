webpackJsonp([1,4,6,11,23,27,28],{

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

/***/ "0bzt":
/***/ (function(module, exports) {

module.exports = "<div class=\"ma-table\">\n  <div class=\"data-table\">\n    <!-- class=\"col-md-6\" -->\n    <div>\n      <!-- 左边漂浮 table -->\n      <div class=\"float-left-table\"\n        ng-style=\"{width: $tableCtrl.floatLeftBoxWidth + 'px', height:$tableCtrl.floatTableHeight + 'px'}\"\n        ng-if=\"$tableCtrl.floatLeftCols !== false\">\n        <div ng-style=\"{width: $tableCtrl.floatTableWidth + 'px'}\">\n          <table template-header='header1.html'\n            ng-table-dynamic=\"$tableCtrl.tableParams with $tableCtrl.cols\"\n            class=\"table table-condensed table-bordered table-striped\">\n            <colgroup ng-if=\"$tableCtrl.colsGroup && $tableCtrl.colsGroup.length == $tableCtrl.cols.length\">\n              <col ng-repeat=\"group in $tableCtrl.colsGroup\"\n                width=\"{{group.width}}\"\n                align=\"{{group.align}}\"\n                valign=\"{{group.valign}}\"\n                ng-style=\"{{group.styles}}\" />\n            </colgroup>\n            <!-- <tr ng-repeat=\"row in $tableCtrl.$data\"> -->\n            <tbody class=\"tr-content\"></tbody>\n            <tr ng-if=\"$data.length <= 0\">\n              <td colspan=\"{{$columns.length}}\"\n                style=\"text-align:center;\">暂无数据</td>\n            </tr>\n          </table>\n        </div>\n      </div>\n\n\n      <!-- 右边漂浮 table -->\n      <div class=\"float-right-table\"\n        ng-style=\"{width: $tableCtrl.floatRightBoxWidth + 'px', height:$tableCtrl.floatTableHeight + 'px'}\"\n        ng-if=\"$tableCtrl.floatRightCols !== false\">\n\n        <div ng-style=\"{width: $tableCtrl.floatTableWidth + 'px'}\">\n          <table template-header='header1.html'\n            ng-table-dynamic=\"$tableCtrl.tableParams with $tableCtrl.cols\"\n            class=\"table table-condensed table-bordered table-striped\">\n            <colgroup ng-if=\"$tableCtrl.colsGroup && $tableCtrl.colsGroup.length == $tableCtrl.cols.length\">\n              <col ng-repeat=\"group in $tableCtrl.colsGroup\"\n                width=\"{{group.width}}\"\n                align=\"{{group.align}}\"\n                valign=\"{{group.valign}}\"\n                ng-style=\"{{group.styles}}\" />\n            </colgroup>\n            <!-- <tr ng-repeat=\"row in $tableCtrl.$data\"> -->\n            <tbody class=\"tr-content\"></tbody>\n            <tr ng-if=\"$data.length <= 0\">\n              <td colspan=\"{{$columns.length}}\"\n                style=\"text-align:center;\">暂无数据</td>\n            </tr>\n          </table>\n        </div>\n      </div>\n\n      <div class=\"main-table-container\">\n        <table template-header='header1.html'\n          ng-table-dynamic=\"$tableCtrl.tableParams with $tableCtrl.cols\"\n          class=\"table table-condensed table-bordered table-striped main-table\"\n          ng-class=\"{'has-float-table': $tableCtrl.floatLeftCols.length || $tableCtrl.floatRightCols.length}\"\n\n          ng-style=\"{width: $tableCtrl.tableWidth && $tableCtrl.tableWidth > $tableCtrl.mainContainerWidth ? $tableCtrl.tableWidth + 'px' : '100%'}\">\n          <colgroup ng-if=\"$tableCtrl.colsGroup && $tableCtrl.colsGroup.length == $tableCtrl.cols.length\">\n            <col ng-repeat=\"group in $tableCtrl.colsGroup\"\n              width=\"{{group.width}}\"\n              align=\"{{group.align}}\"\n              valign=\"{{group.valign}}\"\n              ng-style=\"{{group.styles}}\" />\n          </colgroup>\n          <tbody class=\"tr-content\"></tbody>\n\n          <tr ng-if=\"$data.length <= 0\">\n            <td colspan=\"{{$columns.length}}\"\n              style=\"text-align:center;\">暂无数据</td>\n          </tr>\n        </table>\n      </div>\n      <!-- <script type=\"text/ng-template\" id=\"templatePagination.html\"> -->\n      <form class=\"form-inline\"\n        novalidate\n        ng-show=\"$tableCtrl.enablePagination\">\n        <div class=\"form-group\">\n          <span>跳至第</span>\n          <input class=\"form-control\"\n            id=\"page\"\n            min=\"1\"\n            placeholder=\"\"\n            ng-model=\"$tableCtrl.nextPageNum\"\n            ng-init=\"1\"\n            ng-enter=\"$tableCtrl.changePage($tableCtrl.nextPageNum)\">\n          <span>页</span>\n        </div>\n        <div class=\"form-group page-select-form-group\">\n          <!--         <select id=\"pageSizeBinding\" class=\"form-control\" ng-model=\"$tableCtrl.newPageSize\" ng-init=\"$tableCtrl.newPageSize=$tableCtrl.PageSize[0]\" ng-options=\"size + '条/页 ' for size in $tableCtrl.PageSize\" ng-change=\"$tableCtrl.changePageSize($tableCtrl.newPageSize)\"></select> -->\n\n          <ma-select id=\"pageSizeBinding\"\n            class=\"form-control\"\n            ng-model=\"$tableCtrl.newPageSize\"\n            ma-data=\"$tableCtrl._PageSize\"></ma-select>\n\n          <!-- <i class=\"page-select-arrow\"></i> -->\n        </div>\n      </form>\n      <!-- </script> -->\n    </div>\n\n    <div class=\"loading data-table-loading\"\n      ng-class=\"{show: $tableCtrl.isLoading}\">\n      <ma-spin ma-size=\"50\"></ma-spin>\n    </div>\n  </div>\n</div>\n";

/***/ }),

/***/ "2tft":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("DAut");

var _name2 = _interopRequireDefault(_name);

var _dropdown = __webpack_require__("zznV");

var _dropdown2 = _interopRequireDefault(_dropdown);

var _input = __webpack_require__("Cs5U");

var _input2 = _interopRequireDefault(_input);

var _button = __webpack_require__("lkey");

var _button2 = _interopRequireDefault(_button);

var _icons = __webpack_require__("/cD4");

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], [_dropdown2['default'], _input2['default'], _button2['default'], _icons2['default']]).config(function () {}).run(function () {});

__webpack_require__("PC0Z");

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

/***/ "DAut":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.select';

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
    template: '<label class="ma-checkbox">\n    <input type="checkbox"\n      value="{{value}}"\n      data-name="{{name}}"\n      ng-disabled="disabled"\n      ng-model="checked"\n    />\n    <i class="checkbox-appearance"></i>\n    <span ng-transclude></span>\n    </label>',
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
        scope.$applyAsync(function () {
          var checkboxs = (0, _jquery2['default'])(element).parent().find('input[type="checkbox"]');
          var values = [];

          if (scope.name) {
            checkboxs = (0, _jquery2['default'])('input[data-name="' + scope.name + '"][type="checkbox"]');
          }

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

/***/ "LEIh":
/***/ (function(module, exports) {

module.exports = "<div class=\"ma-select\"\n  ng-class=\"{\n    'show': $ctrl.showDropDown || static == 'true',\n    'is-multiple': multiple,\n    'top': $ctrl.direction == 'top',\n  }\"\n>\n  <ma-input\n    ng-class=\"{\n      'ma-input-arrow-down': !$ctrl.showDropDown,\n      'ma-input-arrow-up': $ctrl.showDropDown\n    }\"\n    type=\"text\"\n    ng-model=\"model[textKey]\"\n    placeholder=\"{{placeholder}}\"\n    ng-readonly=\"true\"\n    ng-disabled=\"disabled\"\n  >\n    <div\n      class=\"ma-select-multiple-result\"\n      ng-if=\"multiple\"\n      ng-class=\"{\n        'has-selected': model.length\n      }\"\n    >\n      <div\n        ng-if=\"model.length\"\n        ng-repeat=\"item in model\"\n        class=\"multiple-item\"\n        ma-click=\"$ctrl.stopPropagation($event)\"\n      >\n        <span ng-bind-html=\"item[textKey]\"></span>\n        <ma-icon\n          ma-type=\"closecircle\"\n          ma-click=\"$ctrl.removeItem($event, item)\"\n          ></ma-icon>\n      </div>\n    </div>\n\n  </ma-input>\n  <ma-dropdown\n    ma-selected-hide\n    ma-text-key=\"{{textKey}}\"\n    ma-value-key=\"{{valueKey}}\"\n    ma-data=\"dropdownItems\"\n    ma-item-click=\"$ctrl.dropdownItemClick($event, $item)\"\n    ma-show=\"$ctrl.showDropDown\"\n    ma-static=\"{{static}}\"\n    ng-model=\"model\"\n    ng-disabled=\"disabled\"\n\n    ma-null-text=\"true\"\n    ma-search=\"{{searchBar}}\"\n    ma-search-key=\"searchKey\"\n    ma-clear=\"{{clear}}\"\n    ma-multiple=\"{{multiple}}\"\n\n    ma-direction=\"$ctrl.direction\"\n  >\n  </ma-dropdown>\n\n</div>\n";

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

/***/ "NXSO":
/***/ (function(module, exports) {

module.exports = "<tr class=\"ng-table-sort-header\">\n  <th title=\"{{$column.headerTitle(this)}}\"\n    ng-repeat=\"$column in $columns\"\n    ng-class=\"{\n      'sortable': $column.sortable(this),\n      'sort-asc': params.sorting()[$column.sortable(this)]=='asc',\n      'sort-desc': params.sorting()[$column.sortable(this)]=='desc'\n    }\"\n    ng-click=\"sortBy($column, $event)\"\n    ng-if=\"$column.show(this)\"\n    ng-init=\"template = $column.headerTemplateURL(this)\"\n    class=\"header {{$column.class(this)}}\">\n    <div ng-if=\"!template\"\n      class=\"ng-table-header\"\n      ng-class=\"{'sort-indicator': params.settings().sortingIndicator == 'div'}\">\n      <span ng-if=\"$column.titleRender\"\n        ng-compile=\"$column.titleRender\"\n        ng-class=\"{'sort-indicator': params.settings().sortingIndicator == 'span'}\"></span>\n      <span ng-if=\"!$column.titleRender\"\n        ng-bind-html=\"$column.title()\"\n        ng-class=\"{'sort-indicator': params.settings().sortingIndicator == 'span'}\"></span>\n    </div>\n    <div ng-if=\"template\"\n      ng-include=\"template\"></div>\n  </th>\n</tr>\n";

/***/ }),

/***/ "NuF/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.table';

/***/ }),

/***/ "PC0Z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("DAut");

var _name2 = _interopRequireDefault(_name);

var _debounce = __webpack_require__("HhAh");

var _debounce2 = _interopRequireDefault(_debounce);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _maSelectTpl = __webpack_require__("LEIh");

var _maSelectTpl2 = _interopRequireDefault(_maSelectTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maSelect', maSelect);

maSelect.$inject = ['$timeout'];

function maSelect($timeout) {
  return {
    restrict: 'E',
    replace: true,
    template: _maSelectTpl2['default'],
    scope: {
      name: '@name',
      model: '=ngModel',
      placeholder: '@maPlaceholder',
      disabled: '=ngDisabled',

      valueKey: '@maValueKey',
      textKey: '@maTextKey',

      nullText: '@maNullText',
      searchBar: '@maSearch',
      clear: '@maClear',
      multiple: '@maMultiple',
      limit: '@maLimit',

      // 获取数据接口
      data: '=maData',
      getData: '&maGetData',

      'static': '@maStatic'

    },
    controllerAs: '$ctrl',
    controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
      var _this = this;

      $scope.dropdownItems = [];

      this.showDropDown = false;

      this.stopPropagation = stopPropagationFn;

      this.removeItem = removeItem;

      this.dropdownItemClick = dropdownItemClick;

      $scope.$watch('data', function (d) {
        $scope.dropdownItems = d;
      });

      $scope.$watch('$ctrl.showDropDown', function (d) {
        if (!d) {
          $scope.searchKey = '';
        } else {
          $rootScope.$broadcast('hide.select', $scope.selectId);
        }
      });

      function stopPropagationFn($event) {
        $event.stopPropagation();
      }

      function removeItem($event, item) {
        this.dropdownItemClick($event, item);
        $event.stopPropagation();
      }

      function dropdownItemClick($event, $item) {
        if ($scope.multiple == 'true') {
          if (!$scope.model) {
            $scope.model = [];
          }
          if (!$scope.model.push) {
            $scope.model = [$scope.model];
          }

          var newModel = [];
          var hasSame = false;
          angular.each($scope.model, function (d) {
            if (d[$scope.valueKey] != $item[$scope.valueKey]) {
              newModel.push(d);
            } else {
              hasSame = true;
            }
          });

          if (!hasSame && (!$scope.limit || $scope.limit && newModel.length < parseInt($scope.limit, 10))) {
            newModel.push($item);
          }

          $scope.model = newModel;
        } else {
          $scope.model = $item;
        }
      }
    }],
    link: function link(scope, element, attrs, ctrl) {
      var $ctrl = scope.$ctrl;

      var selectId = angular.uuid();

      scope.selectId = selectId;

      scope.$watch('dropdownItems', function (d) {
        if (d && d.length && (0, _jquery2['default'])(element).find('input:focus, textarea:focus').length) {
          $ctrl.showDropDown = true;
        } else if (!(0, _jquery2['default'])(element).find('.ma-dropdown-search-bar input:focus, .ma-dropdown-search-bar textarea:focus').length) {
          $ctrl.showDropDown = false;
        }
      });

      scope.$on('hide.select', function (e, d) {
        if (d !== selectId) {
          $ctrl.showDropDown = false;
        }
      });

      (0, _jquery2['default'])(element).find('> .ma-input').on('click', function (e) {
        if (scope.disabled) {
          return;
        }

        $ctrl.showDropDown = !$ctrl.showDropDown;
        $timeout();
        // e.stopPropagation();
      });

      (0, _jquery2['default'])('body').on('click', function (e) {
        if ((0, _jquery2['default'])(e.target).parents('.ma-select').get(0) !== element[0]) {
          $ctrl.showDropDown = false;
          $timeout();
        }
      });

      (0, _jquery2['default'])(element).find('.ma-dropdown-search-bar').on('click', function (e) {
        e.stopPropagation();
      });

      var searchFn = (0, _debounce2['default'])(function () {
        var promise = scope.getData({
          $searchKey: scope.searchKey
        });
        if (promise.then && promise['finally'] && promise['catch']) {
          promise.then(function (data) {
            scope.dropdownItems = data;
          });
        } else {
          scope.dropdownItems = promise;
        }
        $timeout();
      }, 300);

      scope.$watch('searchKey', function (d) {
        if (!(0, _jquery2['default'])(element).attr('ma-data')) {
          searchFn();
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
    }
  };
}

/***/ }),

/***/ "RCoB":
/***/ (function(module, exports) {

module.exports = "<tr ng-class=\"{\n    'selected-row': selector && $tableCtrl.checkboxes.items[row&&{index}[$tableCtrl.dataflagId]]\n  }\"\n  class=\"&&{rowCustomClass}\">\n\n</tr>\n";

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

/***/ "TDH+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _debounce = __webpack_require__("HhAh");

var _debounce2 = _interopRequireDefault(_debounce);

var _trTpl = __webpack_require__("RCoB");

var _trTpl2 = _interopRequireDefault(_trTpl);

var _tdTpl = __webpack_require__("dgAy");

var _tdTpl2 = _interopRequireDefault(_tdTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

maTableController.$inject = ['NgTableParams', '$scope', '$element', '$interpolate', '$sce', '$table', '$timeout', '$attrs', '$interval', '$compile'];

function maTableController(NgTableParams, $scope, $element, $interpolate, $sce, $table, $timeout, $attrs, $interval, $compile) {
  var self = this;

  // var dataset = [{ id: 1, name: 'christian', age: 21 }, { id: 2, name: 'anthony', age: 88 },
  //   { id: 3, name: 'christian', age: 21 }, { id: 4, name: 'anthony', age: 88 },
  //   { id: 5, name: 'christian', age: 21 }, { id: 6, name: 'anthony', age: 88 },
  //   { id: 7, name: 'christian', age: 21 }, { id: 8, name: 'anthony', age: 88 },
  //   { id: 3, name: 'christian', age: 21 }, { id: 4, name: 'anthony', age: 88 },
  //   { id: 5, name: 'christian', age: 21 }, { id: 6, name: 'anthony', age: 88 },
  //   { id: 7, name: 'christian', age: 21 }, { id: 8, name: 'anthony', age: 88 },
  //   { id: 3, name: 'christian', age: 21 }, { id: 4, name: 'anthony', age: 88 },
  //   { id: 5, name: 'christian', age: 21 }, { id: 6, name: 'anthony', age: 88 }];
  if (angular.isNull($scope.tableConfig)) {
    return;
  }
  self.cols = $scope.tableConfig.cols ? $scope.tableConfig.cols : [];
  self.evtAgent = $scope.tableConfig.evtAgent ? $scope.tableConfig.evtAgent : [];
  self.dataflagId = $scope.tableConfig.dataflagId ? $scope.tableConfig.dataflagId : 'id';
  self.count = $scope.tableConfig.count ? $scope.tableConfig.count : 10;
  self.sorting = $scope.tableConfig.sorting ? $scope.tableConfig.sorting : {};
  self.PageSize = $scope.tableConfig.counts ? $scope.tableConfig.counts : [10, 20, 30];
  self.enableCheckbox = angular.isNull($scope.tableConfig.enableCheckbox) ? false : $scope.tableConfig.enableCheckbox;
  self.enablePagination = angular.isNull($scope.tableConfig.enablePagination) ? true : $scope.tableConfig.enablePagination;
  self.dataset = $scope.tableConfig.dataset ? $scope.tableConfig.dataset : [];
  self.colsGroup = $scope.tableConfig.colsGroup ? $scope.tableConfig.colsGroup : [];

  self.totalText = $scope.tableConfig.totalText === undefined ? '<span>共{{params.total()}}条数据</span>' : $scope.tableConfig.totalText;

  self.page = $scope.tableConfig.page || 1;

  self.tableWidth = $scope.tableConfig.tableWidth || 0;

  self.isColsGroupFromCols = false;

  // 如果没配置 colsGroup，就去 cols 里面取
  if (!self.colsGroup.length) {
    self.isColsGroupFromCols = true;
    getColsGroupFromCols(self.cols);
  }

  if (self.isColsGroupFromCols) {
    $scope.$watch('tableConfig.cols', function (d) {
      getColsGroupFromCols(d);
    });
  }

  function getColsGroupFromCols(cols) {
    var colsGroup = [];
    angular.forEach(cols, function (d) {
      if (d.show !== false && !d.headerTemplateURL) {
        colsGroup.push({
          width: d.width || '100px'
        });
      }
    });
    self.colsGroup = colsGroup;
    $scope.tableConfig.colsGroup = self.colsGroup;
  }

  $scope.$watch('tableConfig.colsGroup', function (d) {
    self.colsGroup = d || [];
    if (self.enableCheckbox && self.colsGroup.length) {
      self.colsGroup.unshift({
        width: '0%'
      });
    }
  });

  // self.PageSize = self.counts;

  // 转换pageSize
  self._PageSize = [];
  angular.forEach(self.PageSize, function (d, k) {
    self._PageSize[k] = {
      text: d + ' 条 / 页',
      value: d
    };
  });

  self.tableId = $scope.tableConfig.tableId || +new Date();
  self.tableConfig = $scope.tableConfig;

  // 左右漂浮列
  self.floatLeftCols = [];
  self.floatRightCols = [];

  angular.forEach(self.cols, function (v, k) {
    if (v.fLeft) {
      self.floatLeftCols.push(v);
    }
    if (v.fRight) {
      self.floatRightCols.push(v);
    }
  });

  if (angular.isEmpty(self.floatLeftCols)) {
    self.floatLeftCols = false;
  }
  if (angular.isEmpty(self.floatRightCols)) {
    self.floatRightCols = false;
  }

  // 如果不存在左右漂浮
  // if (!self.floatLeftCols.length) {
  //   $($element).find('.float-left-table').addClass('none');
  // }
  // if (!self.floatRightCols.length) {
  //   $($element).find('.float-right-table').addClass('none');
  // }

  // 如果要checkbox
  if (self.enableCheckbox) {
    self.cols.unshift({
      field: 'selector',
      title: '',
      headerTemplateURL: 'headerCheckbox.html',
      show: true
    });

    if (self.floatLeftCols.length) {
      self.floatLeftCols.push(self.cols[0]);
    }
  }

  if (!self.enablePagination) {
    // 当不需要分页时提供一个无限大的值
    self.count = 10000000000000;
  } else {
    var changePage = function changePage(nextPage) {
      if (!nextPage) {
        return;
      }
      self.tableParams.page(nextPage);
    };
    var isFirstChangePageSize = true;
    var changePageSize = function changePageSize(newSize) {
      self.tableParams.count(newSize, !isFirstChangePageSize);
      isFirstChangePageSize = false;
    };
    self.changePage = changePage;
    self.changePageSize = changePageSize;

    $scope.$watch(function () {
      return self.newPageSize;
    }, function (d) {
      if (d) {
        changePageSize(d.value);
      }
    });

    $scope.$watch(function () {
      return self.tableParams.count();
    }, function (d) {
      angular.forEach(self._PageSize, function (data) {
        if (d === data.value) {
          self.newPageSize = data;
        }
      });
    });

    $scope.$watch(function () {
      return self.tableParams.page();
    }, function (d) {
      self.nextPageNum = d;
    });
  }
  self.nextPageNum = 1;

  var updateHtmlItems = (0, _debounce2['default'])(_updateHtmlItems, 0);

  self.tableParams = new NgTableParams({
    count: self.count,
    sorting: self.sorting,
    page: self.page,
    templateHeader: 'header1.html'
  }, {
    counts: [],
    totalText: self.totalText,
    templateHeader: 'header1.html',
    paginationMaxBlocks: 4,
    paginationMinBlocks: 1,
    getData: $scope.tableConfig && $scope.tableConfig.getData ? function (NgTableParams) {
      if (self.isLoading) {
        var newData = [];
        angular.forEach(NgTableParams.data, function (d, k) {
          newData.push(_jquery2['default'].extend(true, {}, d));
          delete newData[k].$$hashKey;
        });
        return NgTableParams.data;
      }

      self.isLoading = true;
      var deferred = $scope.tableConfig.getData.apply(this, arguments);

      if (deferred && deferred.then) {
        deferred.then(function (data) {
          self.isLoading = false;
          setFloatTable();
          updateHtmlItems(data);
        }, function () {
          self.isLoading = false;
          setFloatTable();
          updateHtmlItems();
        });
      } else {
        self.isLoading = false;
        updateHtmlItems(deferred);
      }

      return deferred;
    } : function () {
      return [];
      // return [];
    },
    dataset: self.dataset
  });

  self.checkboxes = {
    checked: false,
    items: {}
  };
  // self.test = 'test';
  // watch for check all checkbox
  $scope.$watch('$tableCtrl.checkboxes.checked', function (value, test, test1) {
    angular.forEach(self.tableParams.data, function (item) {
      self.checkboxes.items[item[self.dataflagId]] = value;
    });
  });
  // angular.element($element[0]).find('table').html('<div>test</div>');
  // .prop('indeterminate', (checked != 0 && unchecked != 0));
  // // watch for data checkboxes
  $scope.$watch(function () {
    return self.checkboxes.items;
  }, function (values) {
    var checked = 0;
    var unchecked = 0;
    var total = self.tableParams.data.length;
    angular.forEach(self.tableParams.data, function (item) {
      checked += self.checkboxes.items[item[self.dataflagId]] || 0;
      unchecked += !self.checkboxes.items[item[self.dataflagId]] || 0;
    });
    if (unchecked == 0 || checked == 0) {
      self.checkboxes.checked = checked == total && total != 0;
    }
    // grayed checkbox
    angular.element((0, _jquery2['default'])($element).find('.main-table').get(0).getElementsByClassName('select-all')).prop('indeterminate', checked != 0 && unchecked != 0);
  }, true);

  // 获取选中行数据
  self.tableParams.getSelected = function () {
    var selected = [];
    angular.forEach(self.tableParams.data, function (item, key) {
      if (self.checkboxes.items[item[self.dataflagId]]) {
        selected.push(item);
      }
    });
    return selected;
  };

  // 设置选中 ids 可以对应数据的Id string 或者array, 如果为布尔值则为全选和全不选
  // select 默认为true 如果要设置指定 不选中就为false
  self.tableParams.setSelect = function (ids, select) {
    if (angular.isNull(ids)) {
      console.error('请传需要选中的参数');
      return;
    }

    if (angular.isNull(select)) {
      select = true;
    } else {
      select = !!select;
    }

    if (typeof ids === 'boolean') {
      // self.checkboxes.checked = ids;
      angular.forEach(self.tableParams.data, function (item) {
        self.checkboxes.items[item[self.dataflagId]] = ids;
      });
      return;
    }

    if (typeof ids === 'string' || typeof ids === 'number') {
      ids = [ids];
    }

    var selectedCount = 0;
    angular.forEach(self.tableParams.data, function (item) {
      if (ids.indexOf(item[self.dataflagId]) !== -1) {
        self.checkboxes.items[item[self.dataflagId]] = select;
        selectedCount++;
      }
    });

    // if (select && self.tableParams.data && selectedCount >= self.tableParams.data.length) {
    //   self.checkboxes.checked = true;
    // } else {
    //   self.checkboxes.checked = false;
    // }
  };

  self.tableParams.setUnSelect = function (ids) {
    self.tableParams.setSelect(ids, false);
  };

  self.tableParams.selectAll = function () {
    self.tableParams.setSelect(true);
  };
  self.tableParams.unSelectAll = function () {
    self.tableParams.setSelect(false);
  };

  $scope.tableConfig.tableIns = self.tableParams;
  self.tableParams.tableId = self.tableId;

  $table.addTable(self.tableId, self.tableParams);

  $scope.$on('$destroy', function () {
    $table.removeTable(self.tableId, self.tableParams);
    (0, _jquery2['default'])(window).unbind('resize', setFloatTable);
    $interval.cancel($scope.setFloatTableTimer);
  });

  // 计算漂浮 table 的宽度
  (0, _jquery2['default'])(window).bind('resize', setFloatTable);

  $timeout(function () {
    setFloatTable();
  }, 50);
  $timeout(function () {
    setFloatTable();
  }, 100);
  // 加这个原因是因为：列表内的图片加载撑高了table高度
  $scope.setFloatTableTimer = $interval(function () {
    setFloatTable();
  }, 2000);

  function setFloatTable() {
    $timeout(function () {
      var floatLeftBoxWidth = 0;
      var floatRightBoxWidth = 0;
      self.floatTableWidth = (0, _jquery2['default'])($element).find('.main-table').outerWidth();
      self.floatTableHeight = (0, _jquery2['default'])($element).find('.main-table').outerHeight();
      self.mainContainerWidth = (0, _jquery2['default'])($element).find('.main-table-container').width();

      for (var i = 0; i < self.floatLeftCols.length; i++) {
        floatLeftBoxWidth += (0, _jquery2['default'])($element).find('.main-table tr th').eq(i).outerWidth();
      }

      for (var j = self.cols.length - 1; j >= self.cols.length - self.floatRightCols.length; j--) {
        floatRightBoxWidth += (0, _jquery2['default'])($element).find('.main-table tr th').eq(j).outerWidth();
      }

      self.floatLeftBoxWidth = floatLeftBoxWidth;
      self.floatRightBoxWidth = floatRightBoxWidth;
    });
  }

  function _updateHtmlItems(data) {
    var target = (0, _jquery2['default'])($element).find('.tr-content');

    var htmlItems = '';
    var tdItems = [];
    var index = -1;
    var colIndex = -1;

    target.html('');

    angular.each(self.tableConfig.cols, function (col) {
      if (col.show !== false) {
        colIndex++;
        var td = _tdTpl2['default'].replace(/col&&\{index\}/g, 'col' + colIndex);
        var hasCompile = col.render || col.customHtml || col.field == 'selector';

        tdItems.push([td.replace(/&&\{colClass\}/g, col.colClass || ''), hasCompile, col]);

        $scope['col' + colIndex] = col;
      }
    });

    angular.each(data, function (item) {
      index++;
      var trElement = _trTpl2['default'].replace(/&&\{index\}/g, index);

      trElement = (0, _jquery2['default'])(trElement.replace(/&&\{rowCustomClass\}/g, self.tableConfig.rowCustomClass));

      $scope['row' + index] = item;
      $compile(trElement)($scope);

      tdItems.forEach(function (d) {
        var el = (0, _jquery2['default'])(d[0].replace(/&&\{index\}/g, index));
        trElement.append(el);

        if (d[1]) {
          el.attr('has-compile', true);
          // $compile(el)($scope);
        } else {
          el.html('\n          <div>\n            <span>' + item[d[2].field] + '</span>\n          </div>');
        }
      });

      target.append(trElement);
    });

    if (angular.isEmpty(data)) {
      target.html('\n      <tr>\n        <td colspan="' + (colIndex + 1) + '" style="text-align:center;">\u6682\u65E0\u6570\u636E</td>\n      </tr>');
    }

    target.find('td[has-compile="true"]').each(function () {
      $compile(this)($scope);
    });
    $timeout();
  }
}

// angular.module('ui.component.custom.table').run(configureDefaults);
// configureDefaults.$inject = ['ngTableDefaults'];

// function configureDefaults(ngTableDefaults) {
//   ngTableDefaults.params.count = 5;
//   ngTableDefaults.settings.counts = [];
// }


exports['default'] = maTableController;

/***/ }),

/***/ "UX8a":
/***/ (function(module, exports) {

module.exports = "<svg\n  class=\"ma-circle\"\n>\n  <circle\n    fill=\"none\"\n  ></circle>\n  <circle\n    fill=\"none\"\n  ></circle>\n</svg>\n";

/***/ }),

/***/ "WMQu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("NuF/");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).service('$table', tableService);

tableService.$inject = [];

function tableService() {
  var tables = {};

  return {
    addTable: addTable,
    removeTable: removeTable,
    getTableById: getTableById
  };

  function addTable(key, value) {
    if (tables[key]) {
      console.error('table 指定的Id已存在');
    }

    tables[key] = value;
  }

  function removeTable(key) {
    delete tables[key];
  }
  // 获取指定tableId 的table
  function getTableById(id) {
    var table = tables[id];

    if (!table) {
      // console.error('table 不存在');
      return null;
    }
    return createTable(table);
  }

  function createTable(table) {
    return {
      table: table,
      getSelected: function getSelected() {
        return table.getSelected.apply(table, arguments);
      },
      setSelect: function setSelect() {
        return table.setSelect.apply(table, arguments);
      },
      setUnSelect: function setUnSelect() {
        return table.setUnSelect.apply(table, arguments);
      },
      selectAll: function selectAll() {
        return table.selectAll.apply(table, arguments);
      },
      unSelectAll: function unSelectAll() {
        return table.unSelectAll.apply(table, arguments);
      }
    };
  }
}

/***/ }),

/***/ "XVLJ":
/***/ (function(module, exports) {

module.exports = "<div class=\"ng-cloak ng-table-pager\"\n  ng-if=\"params.data.length\">\n  <div ng-if=\"params.settings().counts.length\"\n    class=\"ng-table-counts btn-group pull-right\">\n    <button ng-repeat=\"count in params.settings().counts\"\n      type=\"button\"\n      ng-class=\"{\n        'active':params.count()==count\n      }\"\n      ng-click=\"params.count(count)\"\n      class=\"btn btn-default\">\n      <span ng-bind=\"count\"></span>\n    </button>\n  </div>\n  <ul ng-if=\"pages.length\"\n    class=\"pagination ng-table-pagination\">\n    <li class=\"total-text\" ng-if=\"params.settings().totalText !== false\">\n      <span ng-compile=\"params.settings().totalText\"></span>\n    </li>\n    <li class=\"page-item\"\n      ng-class=\"{\n        'disabled': !page.active && !page.current,\n        'active': page.current\n      }\"\n      ng-repeat=\"page in pages\"\n      ng-switch=\"page.type\">\n      <a class=\"page-link\"\n        ng-switch-when=\"prev\"\n        ng-click=\"params.page(page.number)\"\n        href=\"\">&laquo;</a>\n      <a class=\"page-link\"\n        ng-switch-when=\"first\"\n        ng-click=\"params.page(page.number)\"\n        href=\"\">\n        <span ng-bind=\"page.number\"></span>\n      </a>\n      <a class=\"page-link\"\n        ng-switch-when=\"page\"\n        ng-click=\"params.page(page.number)\"\n        href=\"\">\n        <span ng-bind=\"page.number\"></span>\n      </a>\n      <a class=\"page-link\"\n        ng-switch-when=\"more\"\n        ng-click=\"params.page(page.number)\"\n        href=\"\">&#8230;</a>\n      <a class=\"page-link\"\n        ng-switch-when=\"last\"\n        ng-click=\"params.page(page.number)\"\n        href=\"\">\n        <span ng-bind=\"page.number\"></span>\n      </a>\n      <a class=\"page-link\"\n        ng-switch-when=\"next\"\n        ng-click=\"params.page(page.number)\"\n        href=\"\">&raquo;</a>\n    </li>\n  </ul>\n</div>\n";

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

/***/ "dgAy":
/***/ (function(module, exports) {

module.exports = "<td class=\"&&{colClass}\">\n  <div ng-cloak ng-if=\"col&&{index}.field == 'selector'\">\n    <ma-checkbox id=\"ck_{{row&&{index}.id}}\"\n      ng-model=\"$tableCtrl.checkboxes.items[row&&{index}[$tableCtrl.dataflagId]]\">\n    </ma-checkbox>\n  </div>\n  <div ng-cloak ng-if='col&&{index}.render'\n    common-table-col-render=\"col&&{index}.render(this, row&&{index}, row&&{index}[col&&{index}.field])\"></div>\n\n  <div ng-cloak ng-if='!col&&{index}.render && col&&{index}.customHtml'\n    ng-bind-html=\"col&&{index}.customHtml(this, row&&{index}, row&&{index}[col&&{index}.field])\"></div>\n</td>\n";

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

/***/ "kAur":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("NuF/");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _maTableTpl = __webpack_require__("0bzt");

var _maTableTpl2 = _interopRequireDefault(_maTableTpl);

var _sorterRow = __webpack_require__("NXSO");

var _sorterRow2 = _interopRequireDefault(_sorterRow);

var _pager = __webpack_require__("XVLJ");

var _pager2 = _interopRequireDefault(_pager);

var _headerCheckbox = __webpack_require__("xlo3");

var _headerCheckbox2 = _interopRequireDefault(_headerCheckbox);

var _header = __webpack_require__("r7GB");

var _header2 = _interopRequireDefault(_header);

var _maTableController = __webpack_require__("TDH+");

var _maTableController2 = _interopRequireDefault(_maTableController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var pagerPath = 'ng-table/pager.html';
var sorterPath = 'ng-table/sorterRow.html';

angular.module('ng').run(['$templateCache', function (c) {
  c.remove(pagerPath);
  c.remove(sorterPath);
  c.put(pagerPath, _pager2['default']);
  c.put(sorterPath, _sorterRow2['default']);

  c.put('headerCheckbox.html', _headerCheckbox2['default']);
  c.put('header1.html', _header2['default']);
}]);

angular.module(_name2['default']).directive('maTable', maTable).directive('commonTableColRender', commonTableColRender).directive('commonTableColFloatRender', commonTableColFloatRender).directive('ngEnter', ngEnter).directive('ngCompile', ngCompile);

/**
  数据表组件
  @param： {
    tableConfig : {
      cols: 表单头，形式数组，例子：[{
          field: 'selector',
          title: '',
          // headerTemplate: '<input type="checkbox" ng-model="$ctrl.checkboxes.checked" class="select-all" value="" />',
          headerTemplateURL: 'headerCheckbox.html',
          show: true
          fLeft: true,// 列漂浮在左边
          fRight: true // 列漂浮在右边
          render: Function($scope, row) // 渲染 带作用域
          customHtml: Function($scope, row) // 渲染
        }]
      count: 表单单页数量，类型int，例子：10
      counts：表单单页可选数量访问，类型数组，例子：[5, 10, 15]
      sorting: 初始排序规则
      dataflagId：表单单行数据的唯一标示(用于选框模式下)，默认值为“id”，类型为字符串，例子：“userId”
      enableCheckbox: 使能checkbox选框模式，类型boolean，默认false,
      enablePagination: 使能翻页，默认为true,
      tableWidth: Number // 设定这个值让 table 定宽，超出左右滚动
    }
  }
*/
maTable.$inject = [];

function maTable() {
  return {
    // can be used as attribute or element
    restrict: 'AE',
    replace: true,
    transclude: true,
    scope: {
      tableConfig: '=maConfig'
    },
    template: _maTableTpl2['default'],
    controller: _maTableController2['default'],
    controllerAs: '$tableCtrl',
    // require: '^ngModel',
    // require: '^outController',
    link: function link(scope, elem, attrs, controller) {
      var callback = function callback(evt) {
        var type = evt.type;
        scope[type](evt, controller);
        // controller.evtAgent.callback(evt, controller);
      };
      if (controller.evtAgent && angular.isArray(controller.evtAgent)) {
        for (var i = 0; i < controller.evtAgent.length; i++) {
          var evtAgent = controller.evtAgent[i];
          var event = evtAgent.event;
          scope[event] = evtAgent.callback;
          // var evtCallback = ;
          elem.bind(event, callback);
        }
      }
    }
  };
}

commonTableColRender.$inject = ['$compile'];

function commonTableColRender($compile) {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      var value = scope.$eval(attrs.commonTableColRender, scope);

      value += '';
      value = value.replace(/ng-click="/g, 'ng-click="$parent.$parent.');
      value = value.replace(/ma-click="/g, 'ma-click="$parent.$parent.');

      element.html(value);
      scope.row = scope.$parent[attrs.commonTableColRender.split(', ')[1]];

      $compile(element.contents())(scope);
    }
  };
}

commonTableColFloatRender.$inject = ['$compile'];

function commonTableColFloatRender($compile) {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      var value = scope.$eval(attrs.commonTableColFloatRender, scope);

      value += '';
      value = value.replace(/ng-click="/g, 'ng-click="$parent.$parent.');
      value = value.replace(/ma-click="/g, 'ma-click="$parent.$parent.');

      element.html(value);
      scope.row = scope.$parent[attrs.commonTableColFloatRender.split(', ')[1]];

      $compile(element.contents())(scope);
    }
  };
}

ngEnter.$inject = ['$timeout'];

function ngEnter($timeout) {
  return {
    restrict: 'A',
    link: function link(scope, elem, attrs, controller) {
      elem.bind('keyup', function (e) {
        if (e.keyCode === 13) {
          scope.$event = e;
          scope.$eval(attrs.ngEnter, scope);
          $timeout();
        }
      });
    }
  };
}

ngCompile.$inject = ['$timeout', '$compile'];

function ngCompile($timeout, $compile) {
  return {
    restrict: 'A',
    scope: {
      content: '=ngCompile'
    },
    link: function link(scope, elem, attrs, controller) {
      var compiled = false;

      scope.$watch('content', function (d, p) {
        if (d == p && compiled) {
          return;
        }
        compiled = true;
        elem.html(d);
        $compile(elem.contents())(scope.$parent);
      });
    }
  };
}

/***/ }),

/***/ "lQqW":
/***/ (function(module, exports) {

module.exports = "<div class=\"ma-dropdown\">\n  <div ng-transclude></div>\n  <div class=\"ma-dropdown-container\"\n    ng-class=\"{\n      show: show || static == 'true'\n    }\">\n    <div class=\"ma-dropdown-search-bar\"\n      ng-show=\"searchBar == 'true'\">\n      <ma-input ng-model=\"searchKey\"\n        ng-disabled=\"disabled\"\n        class=\"ma-input-search-normal\"></ma-input>\n    </div>\n    <div class=\"ma-dropdown-item null-text\"\n      ng-if=\"(nullText || nullText == 'true') && data.length <= 0\">{{nullText == 'true' ? '暂无数据' : nullText}}</div>\n\n    <div class=\"ma-dropdown-container-content\"\n      ng-disabled=\"disabled\">\n    </div>\n\n    <div class=\"ma-dropdown-buttons\"\n      ng-show=\"clear == 'true'\"\n      ma-click=\"$ctrl.clearValue()\">\n      <ma-button ma-size=\"mini\"\n        ma-type=\"primary\">清空</ma-button>\n    </div>\n  </div>\n</div>\n";

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

/***/ "m1Gx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("NuF/");

var _name2 = _interopRequireDefault(_name);

var _checkbox = __webpack_require__("qoUc");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _select = __webpack_require__("2tft");

var _select2 = _interopRequireDefault(_select);

__webpack_require__("m79q");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

__webpack_require__("dTNh");

angular.module(_name2['default'], ['ngTable', _checkbox2['default'], _select2['default']]).config(function () {}).run(function () {});

__webpack_require__("kAur");
__webpack_require__("WMQu");

exports['default'] = _name2['default'];

/***/ }),

/***/ "m79q":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory(__webpack_require__("/jXN"));else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("/jXN")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["ng-table"] = factory(require("angular"));else root["ng-table"] = factory(root["angular"]);
})(undefined, function (__WEBPACK_EXTERNAL_MODULE_0__) {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/
      var installedModules = {};
      /******/
      /******/ // The require function
      /******/
      function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/
        if (installedModules[moduleId])
          /******/
          return installedModules[moduleId].exports;
        /******/
        /******/ // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,
          /******/
          l: false,
          /******/
          exports: {}
          /******/
        };
        /******/
        /******/ // Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/
        module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/
        return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/
      __webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/
      __webpack_require__.c = installedModules;
      /******/
      /******/ // identity function for calling harmory imports with the correct context
      /******/
      __webpack_require__.i = function (value) {
        return value;
      };
      /******/
      /******/ // define getter function for harmory exports
      /******/
      __webpack_require__.d = function (exports, name, getter) {
        /******/
        Object.defineProperty(exports, name, {
          /******/
          configurable: false,
          /******/
          enumerable: true,
          /******/
          get: getter
          /******/
        });
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/
      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/
        __webpack_require__.d(getter, 'a', getter);
        /******/
        return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/
      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/
      __webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/
      return __webpack_require__(__webpack_require__.s = 33);
      /******/
    }(
    /************************************************************************/
    /******/
    [
    /* 0 */
    /* unknown exports provided */
    /* all exports used */
    /*!**************************!*\
      !*** external "angular" ***!
      \**************************/
    /***/
    function (module, exports) {

      module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

      /***/
    },
    /* 1 */
    /* unknown exports provided */
    /* all exports used */
    /*!******************************!*\
      !*** ./src/browser/index.ts ***!
      \******************************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      "use strict";

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      var angular = __webpack_require__( /*! angular */0);
      var ngTable_directive_1 = __webpack_require__( /*! ./ngTable.directive */4);
      var ngTableColumn_1 = __webpack_require__( /*! ./ngTableColumn */5);
      var ngTableColumnsBinding_directive_1 = __webpack_require__( /*! ./ngTableColumnsBinding.directive */6);
      var ngTableController_1 = __webpack_require__( /*! ./ngTableController */7);
      var ngTableDynamic_directive_1 = __webpack_require__( /*! ./ngTableDynamic.directive */8);
      var ngTableFilterConfig_1 = __webpack_require__( /*! ./ngTableFilterConfig */9);
      var ngTableFilterRow_directive_1 = __webpack_require__( /*! ./ngTableFilterRow.directive */10);
      var ngTableFilterRowController_1 = __webpack_require__( /*! ./ngTableFilterRowController */11);
      var ngTableGroupRow_directive_1 = __webpack_require__( /*! ./ngTableGroupRow.directive */12);
      var ngTableGroupRowController_1 = __webpack_require__( /*! ./ngTableGroupRowController */13);
      var ngTablePagination_directive_1 = __webpack_require__( /*! ./ngTablePagination.directive */14);
      var ngTableSelectFilterDs_directive_1 = __webpack_require__( /*! ./ngTableSelectFilterDs.directive */15);
      var ngTableSorterRow_directive_1 = __webpack_require__( /*! ./ngTableSorterRow.directive */16);
      var ngTableSorterRowController_1 = __webpack_require__( /*! ./ngTableSorterRowController */17);
      __webpack_require__( /*! ./filters/number.html */25);
      __webpack_require__( /*! ./filters/select.html */27);
      __webpack_require__( /*! ./filters/select-multiple.html */26);
      __webpack_require__( /*! ./filters/text.html */28);
      __webpack_require__( /*! ./pager.html */31);
      __webpack_require__( /*! ./header.html */30);
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports['default'] = angular.module('ngTable-browser', []).directive('ngTable', ngTable_directive_1.ngTable).factory('ngTableColumn', ngTableColumn_1.ngTableColumn).directive('ngTableColumnsBinding', ngTableColumnsBinding_directive_1.ngTableColumnsBinding).controller('ngTableController', ngTableController_1.ngTableController).directive('ngTableDynamic', ngTableDynamic_directive_1.ngTableDynamic).provider('ngTableFilterConfig', ngTableFilterConfig_1.ngTableFilterConfigProvider).directive('ngTableFilterRow', ngTableFilterRow_directive_1.ngTableFilterRow).controller('ngTableFilterRowController', ngTableFilterRowController_1.ngTableFilterRowController).directive('ngTableGroupRow', ngTableGroupRow_directive_1.ngTableGroupRow).controller('ngTableGroupRowController', ngTableGroupRowController_1.ngTableGroupRowController).directive('ngTablePagination', ngTablePagination_directive_1.ngTablePagination).directive('ngTableSelectFilterDs', ngTableSelectFilterDs_directive_1.ngTableSelectFilterDs).directive('ngTableSorterRow', ngTableSorterRow_directive_1.ngTableSorterRow).controller('ngTableSorterRowController', ngTableSorterRowController_1.ngTableSorterRowController);
      __export(__webpack_require__( /*! ./public-interfaces */18));

      /***/
    },
    /* 2 */
    /* unknown exports provided */
    /* all exports used */
    /*!***************************!*\
      !*** ./src/core/index.ts ***!
      \***************************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      "use strict";

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      var angular = __webpack_require__( /*! angular */0);
      var ngTableDefaultGetData_1 = __webpack_require__( /*! ./ngTableDefaultGetData */19);
      var ngTableDefaults_1 = __webpack_require__( /*! ./ngTableDefaults */20);
      var ngTableParams_1 = __webpack_require__( /*! ./ngTableParams */22);
      var ngTableEventsChannel_1 = __webpack_require__( /*! ./ngTableEventsChannel */21);
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports['default'] = angular.module('ngTable-core', []).provider('ngTableDefaultGetData', ngTableDefaultGetData_1.ngTableDefaultGetDataProvider).value('ngTableDefaults', ngTableDefaults_1.ngTableDefaults).factory('NgTableParams', ngTableParams_1.ngTableParamsFactory).factory('ngTableEventsChannel', ngTableEventsChannel_1.ngTableEventsChannel);
      __export(__webpack_require__( /*! ./public-interfaces */23));

      /***/
    },,
    /* 3 */

    /* 4 */
    /* unknown exports provided */
    /* all exports used */
    /*!******************************************!*\
      !*** ./src/browser/ngTable.directive.ts ***!
      \******************************************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      "use strict";

      var ng1 = __webpack_require__( /*! angular */0);
      ngTable.$inject = ['$q', '$parse'];
      /**
       * Directive that instantiates {@link ngTableController ngTableController}.
       * @ngdoc directive
       * @name ngTable
       * @example
       *
       * ```html
       * <table ng-table="$ctrl.tableParams" show-filter="true" class="table table-bordered">
       *  <tr ng-repeat="user in $data">
       *      <td data-title="'Name'" sortable="'name'" filter="{ 'name': 'text' }">
       *          {{user.name}}
       *      </td>
       *      <td data-title="'Age'" sortable="'age'" filter="{ 'age': 'text' }">
       *          {{user.age}}
       *      </td>
       *  </tr>
       * </table>
       * ```
       */
      function ngTable($q, $parse) {
        return {
          restrict: 'A',
          priority: 1001,
          scope: true,
          controller: 'ngTableController',
          compile: function compile(element) {
            var columns = [],
                i = 0,
                dataRow,
                groupRow,
                rows = [];
            ng1.forEach(element.find('tr'), function (tr) {
              rows.push(ng1.element(tr));
            });
            dataRow = rows.filter(function (tr) {
              return !tr.hasClass('ng-table-group');
            })[0];
            groupRow = rows.filter(function (tr) {
              return tr.hasClass('ng-table-group');
            })[0];
            if (!dataRow) {
              return undefined;
            }
            ng1.forEach(dataRow.find('td'), function (item) {
              var el = ng1.element(item);
              if (el.attr('ignore-cell') && 'true' === el.attr('ignore-cell')) {
                return;
              }
              var getAttrValue = function getAttrValue(attr) {
                return el.attr('x-data-' + attr) || el.attr('data-' + attr) || el.attr(attr);
              };
              var setAttrValue = function setAttrValue(attr, value) {
                if (el.attr('x-data-' + attr)) {
                  el.attr('x-data-' + attr, value);
                } else if (el.attr('data' + attr)) {
                  el.attr('data' + attr, value);
                } else {
                  el.attr(attr, value);
                }
              };
              var parsedAttribute = function parsedAttribute(attr) {
                var expr = getAttrValue(attr);
                if (!expr) {
                  return undefined;
                }
                var localValue;
                var getter = function getter(context) {
                  if (localValue !== undefined) {
                    return localValue;
                  }
                  return $parse(expr)(context);
                };
                getter.assign = function ($scope, value) {
                  var parsedExpr = $parse(expr);
                  if (parsedExpr.assign) {
                    // we should be writing back to the parent scope as this is where the expression
                    // came from
                    parsedExpr.assign($scope.$parent, value);
                  } else {
                    localValue = value;
                  }
                };
                return getter;
              };
              var titleExpr = getAttrValue('title-alt') || getAttrValue('title');
              if (titleExpr) {
                el.attr('data-title-text', '{{' + titleExpr + '}}'); // this used in responsive table
              }
              // NOTE TO MAINTAINERS: if you add extra fields to a $column be sure to extend ngTableColumn with
              // a corresponding "safe" default
              columns.push({
                id: i++,
                title: parsedAttribute('title'),
                titleAlt: parsedAttribute('title-alt'),
                headerTitle: parsedAttribute('header-title'),
                sortable: parsedAttribute('sortable'),
                'class': parsedAttribute('header-class'),
                filter: parsedAttribute('filter'),
                groupable: parsedAttribute('groupable'),
                headerTemplateURL: parsedAttribute('header'),
                filterData: parsedAttribute('filter-data'),
                show: el.attr("ng-if") ? parsedAttribute('ng-if') : undefined
              });
              if (groupRow || el.attr("ng-if")) {
                // change ng-if to bind to our column definition which we know will be writable
                // because this will potentially increase the $watch count, only do so if we already have an
                // ng-if or when we definitely need to change visibility of the columns.
                // currently only ngTableGroupRow directive needs to change visibility
                setAttrValue('ng-if', '$columns[' + (columns.length - 1) + '].show(this)');
              }
            });
            return function (scope, element, attrs, controller) {
              scope.$columns = columns = controller.buildColumns(columns);
              controller.setupBindingsToInternalScope(attrs.ngTable);
              controller.loadFilterData(columns);
              controller.compileDirectiveTemplates();
            };
          }
        };
      }
      exports.ngTable = ngTable;

      /***/
    },
    /* 5 */
    /* unknown exports provided */
    /* all exports used */
    /*!**************************************!*\
      !*** ./src/browser/ngTableColumn.ts ***!
      \**************************************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      var ng1 = __webpack_require__( /*! angular */0);
      ngTableColumn.$inject = [];
      /**
       * @private
       * Service to construct a $column definition used by {@link ngTable ngTable} directive
       */
      function ngTableColumn() {
        return {
          buildColumn: buildColumn
        };
        //////////////
        function buildColumn(column, defaultScope, columns) {
          // note: we're not modifying the original column object. This helps to avoid unintended side affects
          var extendedCol = Object.create(column);
          var defaults = createDefaults();
          for (var prop in defaults) {
            if (extendedCol[prop] === undefined) {
              extendedCol[prop] = defaults[prop];
            }
            if (!ng1.isFunction(extendedCol[prop])) {
              // wrap raw field values with "getter" functions
              // - this is to ensure consistency with how ngTable.compile builds columns
              // - note that the original column object is being "proxied"; this is important
              //   as it ensure that any changes to the original object will be returned by the "getter"
              (function (prop1) {
                var getterSetter = function getterSetter() {
                  if (arguments.length === 1 && !isScopeLike(arguments[0])) {
                    getterSetter.assign(null, arguments[0]);
                  } else {
                    return column[prop1];
                  }
                };
                getterSetter.assign = function ($scope, value) {
                  column[prop1] = value;
                };
                extendedCol[prop1] = getterSetter;
              })(prop);
            }
            (function (prop1) {
              // satisfy the arguments expected by the function returned by parsedAttribute in the ngTable directive
              var getterFn = extendedCol[prop1];

              extendedCol[prop1] = function () {
                if (arguments.length === 1 && !isScopeLike(arguments[0])) {
                  getterFn.assign(null, arguments[0]);
                } else {
                  var scope = arguments[0] || defaultScope;
                  var context = Object.create(scope);
                  ng1.extend(context, {
                    $column: extendedCol,
                    $columns: columns
                  });
                  return getterFn.call(column, context);
                }
              };
              if (getterFn.assign) {
                extendedCol[prop1].assign = getterFn.assign;
              }
            })(prop);
          }
          return extendedCol;
        }

        function createDefaults() {
          return {
            'class': createGetterSetter(''),
            filter: createGetterSetter(false),
            groupable: createGetterSetter(false),
            filterData: ng1.noop,
            headerTemplateURL: createGetterSetter(false),
            headerTitle: createGetterSetter(''),
            sortable: createGetterSetter(false),
            show: createGetterSetter(true),
            title: createGetterSetter(''),
            titleAlt: createGetterSetter('')
          };
        }

        function createGetterSetter(initialValue) {
          var value = initialValue;
          var getterSetter = function getterSetter() {
            if (arguments.length === 1 && !isScopeLike(arguments[0])) {
              getterSetter.assign(null, arguments[0]);
            } else {
              return value;
            }
          };
          getterSetter.assign = function ($scope, newValue) {
            value = newValue;
          };
          return getterSetter;
        }

        function isScopeLike(object) {
          return object != null && ng1.isFunction(object.$new);
        }
      }
      exports.ngTableColumn = ngTableColumn;

      /***/
    },
    /* 6 */
    /* unknown exports provided */
    /* all exports used */
    /*!********************************************************!*\
      !*** ./src/browser/ngTableColumnsBinding.directive.ts ***!
      \********************************************************/
    /***/
    function (module, exports) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      ngTableColumnsBinding.$inject = ["$parse"];
      /**
       * One-way data binds the $columns array generated by ngTable/ngTableDynamic to the specified
       * expression.
       * This allows the $columns array created for the table to be accessed outside of the html table
       * markup.
       *
       * @ngdoc directive
       *
       * @example
       * ```html
       * <table ng-table="$ctrl.tableParams" class="table" ng-table-columns-binding="$ctlr.tableColumns">
       * ```
       */
      function ngTableColumnsBinding($parse) {
        var directive = {
          restrict: 'A',
          require: 'ngTable',
          link: linkFn
        };
        return directive;

        function linkFn($scope, $element, $attrs) {
          var setter = $parse($attrs.ngTableColumnsBinding).assign;
          if (setter) {
            $scope.$watch('$columns', function (newColumns) {
              var shallowClone = (newColumns || []).slice(0);
              setter($scope, shallowClone);
            });
          }
        }
      }
      exports.ngTableColumnsBinding = ngTableColumnsBinding;

      /***/
    },
    /* 7 */
    /* unknown exports provided */
    /* all exports used */
    /*!******************************************!*\
      !*** ./src/browser/ngTableController.ts ***!
      \******************************************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      var ng1 = __webpack_require__( /*! angular */0);
      ngTableController.$inject = ['$scope', 'NgTableParams', '$timeout', '$parse', '$compile', '$attrs', '$element', '$document', 'ngTableColumn', 'ngTableEventsChannel'];
      /**
       * The controller for the {@link ngTable ngTable} and {@link ngTableDynamic ngTableDynamic} directives
       */
      function ngTableController($scope, NgTableParams, $timeout, $parse, $compile, $attrs, $element, $document, ngTableColumn, ngTableEventsChannel) {
        var isFirstTimeLoad = true;
        $scope.$filterRow = {
          disabled: false
        };
        $scope.$loading = false;
        // until such times as the directive uses an isolated scope, we need to ensure that the check for
        // the params field only consults the "own properties" of the $scope. This is to avoid seeing the params
        // field on a $scope higher up in the prototype chain
        if (!$scope.hasOwnProperty("params")) {
          $scope.params = new NgTableParams(true);
        }
        var delayFilter = function () {
          var timer;
          return function (callback, ms) {
            $timeout.cancel(timer);
            timer = $timeout(callback, ms);
          };
        }();

        function onDataReloadStatusChange(newStatus /*, oldStatus*/) {
          if (!newStatus || $scope.params.hasErrorState()) {
            return;
          }
          var currentParams = $scope.params;
          var filterOptions = currentParams.settings().filterOptions;
          if (currentParams.hasFilterChanges()) {
            var applyFilter = function applyFilter() {
              currentParams.page(1);
              currentParams.reload();
            };
            if (filterOptions.filterDelay) {
              delayFilter(applyFilter, filterOptions.filterDelay);
            } else {
              applyFilter();
            }
          } else {
            currentParams.reload();
          }
        }
        // watch for when a new NgTableParams is bound to the scope
        // CRITICAL: the watch must be for reference and NOT value equality; this is because NgTableParams maintains
        // the current data page as a field. Checking this for value equality would be terrible for performance
        // and potentially cause an error if the items in that array has circular references
        $scope.$watch('params', function (newParams, oldParams) {
          if (newParams === oldParams || !newParams) {
            return;
          }
          newParams.reload();
        }, false);
        $scope.$watch('params.isDataReloadRequired()', onDataReloadStatusChange);
        this.compileDirectiveTemplates = function () {
          if (!$element.hasClass('ng-table')) {
            $scope.templates = {
              header: $attrs.templateHeader ? $attrs.templateHeader : 'ng-table/header.html',
              pagination: $attrs.templatePagination ? $attrs.templatePagination : 'ng-table/pager.html'
            };
            $element.addClass('ng-table');
            var headerTemplate = null;
            // $element.find('> thead').length === 0 doesn't work on jqlite
            var theadFound = false;
            ng1.forEach($element.children(), function (e) {
              if (e.tagName === 'THEAD') {
                theadFound = true;
              }
            });
            if (!theadFound) {
              headerTemplate = ng1.element('<thead ng-include="templates.header">\n                    <ng-table-group-row></ng-table-group-row>\n                    <ng-table-sorter-row></ng-table-sorter-row>\n                    <ng-table-filter-row></ng-table-filter-row>\n                    </thead>', $document);
              $element.prepend(headerTemplate);
            }
            var paginationTemplate = ng1.element('<div ng-table-pagination="params" template-url="templates.pagination"></div>', $document);
            $element.after(paginationTemplate);
            if (headerTemplate) {
              $compile(headerTemplate)($scope);
            }
            $compile(paginationTemplate)($scope);
          }
        };
        this.loadFilterData = function ($columns) {
          ng1.forEach($columns, function ($column) {
            var result = $column.filterData($scope);
            if (!result) {
              delete $column.filterData;
              return undefined;
            }
            if (isPromiseLike(result)) {
              delete $column.filterData;
              return result.then(function (data) {
                // our deferred can eventually return arrays, functions and objects
                if (!ng1.isArray(data) && !ng1.isFunction(data) && !ng1.isObject(data)) {
                  // if none of the above was found - we just want an empty array
                  data = [];
                }
                $column.data = data;
              });
            } else {
              return $column.data = result;
            }
          });

          function isPromiseLike(val) {
            return val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && typeof val.then === 'function';
          }
        };
        this.buildColumns = function (columns) {
          var result = [];
          (columns || []).forEach(function (col) {
            result.push(ngTableColumn.buildColumn(col, $scope, result));
          });
          return result;
        };
        this.parseNgTableDynamicExpr = function (attr) {
          if (!attr || attr.indexOf(" with ") > -1) {
            var parts = attr.split(/\s+with\s+/);
            return {
              tableParams: parts[0],
              columns: parts[1]
            };
          } else {
            throw new Error('Parse error (expected example: ng-table-dynamic=\'tableParams with cols\')');
          }
        };
        this.setupBindingsToInternalScope = function (tableParamsExpr) {
          // note: this we're setting up watches to simulate angular's isolated scope bindings
          // note: is REALLY important to watch for a change to the ngTableParams *reference* rather than
          // $watch for value equivalence. This is because ngTableParams references the current page of data as
          // a field and it's important not to watch this
          $scope.$watch(tableParamsExpr, function (params) {
            if (params === undefined) {
              return;
            }
            $scope.params = params;
          }, false);
          setupFilterRowBindingsToInternalScope();
          setupGroupRowBindingsToInternalScope();
        };

        function setupFilterRowBindingsToInternalScope() {
          if ($attrs.showFilter) {
            $scope.$parent.$watch($attrs.showFilter, function (value) {
              $scope.show_filter = value;
            });
          } else {
            $scope.$watch(hasVisibleFilterColumn, function (value) {
              $scope.show_filter = value;
            });
          }
          if ($attrs.disableFilter) {
            $scope.$parent.$watch($attrs.disableFilter, function (value) {
              $scope.$filterRow.disabled = value;
            });
          }
        }

        function setupGroupRowBindingsToInternalScope() {
          $scope.$groupRow = {
            show: false
          };
          if ($attrs.showGroup) {
            var showGroupGetter = $parse($attrs.showGroup);
            $scope.$parent.$watch(showGroupGetter, function (value) {
              $scope.$groupRow.show = value;
            });
            if (showGroupGetter.assign) {
              // setup two-way databinding thus allowing ngTableGrowRow to assign to the showGroup expression
              $scope.$watch('$groupRow.show', function (value) {
                showGroupGetter.assign($scope.$parent, value);
              });
            }
          } else {
            $scope.$watch('params.hasGroup()', function (newValue) {
              $scope.$groupRow.show = newValue;
            });
          }
        }

        function getVisibleColumns() {
          return ($scope.$columns || []).filter(function (c) {
            return c.show($scope);
          });
        }

        function hasVisibleFilterColumn() {
          if (!$scope.$columns) return false;
          return some($scope.$columns, function ($column) {
            return $column.show($scope) && !!$column.filter($scope);
          });
        }

        function some(array, predicate) {
          var found = false;
          for (var i = 0; i < array.length; i++) {
            var obj = array[i];
            if (predicate(obj)) {
              found = true;
              break;
            }
          }
          return found;
        }

        function commonInit() {
          ngTableEventsChannel.onAfterReloadData(function (params, newDatapage) {
            var visibleColumns = getVisibleColumns();
            if (params.hasGroup()) {
              $scope.$groups = newDatapage || [];
              $scope.$groups.visibleColumnCount = visibleColumns.length;
            } else {
              $scope.$data = newDatapage || [];
              $scope.$data.visibleColumnCount = visibleColumns.length;
            }
          }, $scope, function (publisher) {
            return $scope.params === publisher;
          });
          ngTableEventsChannel.onPagesChanged(function (params, newPages) {
            $scope.pages = newPages;
          }, $scope, function (publisher) {
            return $scope.params === publisher;
          });
        }
        commonInit();
      }
      exports.ngTableController = ngTableController;

      /***/
    },
    /* 8 */
    /* unknown exports provided */
    /* all exports used */
    /*!*************************************************!*\
      !*** ./src/browser/ngTableDynamic.directive.ts ***!
      \*************************************************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      var ng1 = __webpack_require__( /*! angular */0);
      ngTableDynamic.$inject = [];
      /**
       * A dynamic version of the {@link ngTable ngTable} directive that accepts a dynamic list of columns
       * definitions to render
       * @ngdoc directive
       *
       * @example
       * ```html
       * <table ng-table-dynamic="$ctrl.tableParams with $ctrl.cols" class="table">
       *  <tr ng-repeat="row in $data">
       *    <td ng-repeat="col in $columns">{{row[col.field]}}</td>
       *  </tr>
       * </table>
       * ```
       */
      function ngTableDynamic() {
        return {
          restrict: 'A',
          priority: 1001,
          scope: true,
          controller: 'ngTableController',
          compile: function compile(tElement) {
            var row;
            // IE 8 fix :not(.ng-table-group) selector
            ng1.forEach(tElement.find('tr'), function (tr) {
              tr = ng1.element(tr);
              if (!tr.hasClass('ng-table-group') && !row) {
                row = tr;
              }
            });
            if (!row) {
              return undefined;
            }
            ng1.forEach(row.find('td'), function (item) {
              var el = ng1.element(item);
              var getAttrValue = function getAttrValue(attr) {
                return el.attr('x-data-' + attr) || el.attr('data-' + attr) || el.attr(attr);
              };
              // this used in responsive table
              var titleExpr = getAttrValue('title');
              if (!titleExpr) {
                el.attr('data-title-text', '{{$columns[$index].titleAlt(this) || $columns[$index].title(this)}}');
              }
              var showExpr = el.attr('ng-if');
              if (!showExpr) {
                el.attr('ng-if', '$columns[$index].show(this)');
              }
            });
            return function (scope, element, attrs, controller) {
              var expr = controller.parseNgTableDynamicExpr(attrs.ngTableDynamic);
              controller.setupBindingsToInternalScope(expr.tableParams);
              controller.compileDirectiveTemplates();
              scope.$watchCollection(expr.columns, function (newCols /*, oldCols*/) {
                scope.$columns = controller.buildColumns(newCols);
                controller.loadFilterData(scope.$columns);
              });
            };
          }
        };
      }
      exports.ngTableDynamic = ngTableDynamic;

      /***/
    },
    /* 9 */
    /* unknown exports provided */
    /* all exports used */
    /*!********************************************!*\
      !*** ./src/browser/ngTableFilterConfig.ts ***!
      \********************************************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      var ng1 = __webpack_require__( /*! angular */0);
      ngTableFilterConfigProvider.$inject = [];
      /**
       * The angular provider used to configure the behaviour of the `ngTableFilterConfig` service.
       *
       * Implements the {@link IFilterConfigProvider IFilterConfigProvider} interface
       */
      function ngTableFilterConfigProvider() {
        var config;
        var defaultConfig = {
          defaultBaseUrl: 'ng-table/filters/',
          defaultExt: '.html',
          aliasUrls: {}
        };
        this.$get = ngTableFilterConfig;
        this.resetConfigs = resetConfigs;
        this.setConfig = setConfig;
        init();
        /////////
        function init() {
          resetConfigs();
        }

        function resetConfigs() {
          config = defaultConfig;
        }

        function setConfig(customConfig) {
          var mergeConfig = ng1.extend({}, config, customConfig);
          mergeConfig.aliasUrls = ng1.extend({}, config.aliasUrls, customConfig.aliasUrls);
          config = mergeConfig;
        }
        /////////
        ngTableFilterConfig.$inject = [];

        function ngTableFilterConfig() {
          var publicConfig;
          var service = {
            config: publicConfig,
            getTemplateUrl: getTemplateUrl,
            getUrlForAlias: getUrlForAlias
          };
          Object.defineProperty(service, "config", {
            get: function get() {
              return publicConfig = publicConfig || ng1.copy(config);
            },
            enumerable: true
          });
          return service;
          /////////
          function getTemplateUrl(filterDef, filterKey) {
            var filterName;
            if (typeof filterDef !== 'string') {
              filterName = filterDef.id;
            } else {
              filterName = filterDef;
            }
            if (filterName.indexOf('/') !== -1) {
              return filterName;
            }
            return service.getUrlForAlias(filterName, filterKey);
          }

          function getUrlForAlias(aliasName, filterKey) {
            return config.aliasUrls[aliasName] || config.defaultBaseUrl + aliasName + config.defaultExt;
          }
        }
      }
      exports.ngTableFilterConfigProvider = ngTableFilterConfigProvider;

      /***/
    },
    /* 10 */
    /* unknown exports provided */
    /* all exports used */
    /*!***************************************************!*\
      !*** ./src/browser/ngTableFilterRow.directive.ts ***!
      \***************************************************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      var templateUrl = __webpack_require__( /*! ./filterRow.html */24);
      ngTableFilterRow.$inject = [];
      /**
       * directive that renders the filter header row for a table
       * @ngdoc directive
       * @example
       * ```html
       * <ng-table-filter-row></ng-table-filter-row>
       * ```
       */
      function ngTableFilterRow() {
        var directive = {
          restrict: 'E',
          replace: true,
          templateUrl: templateUrl,
          scope: true,
          controller: 'ngTableFilterRowController'
        };
        return directive;
      }
      exports.ngTableFilterRow = ngTableFilterRow;

      /***/
    },
    /* 11 */
    /* unknown exports provided */
    /* all exports used */
    /*!***************************************************!*\
      !*** ./src/browser/ngTableFilterRowController.ts ***!
      \***************************************************/
    /***/
    function (module, exports) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      ngTableFilterRowController.$inject = ['$scope', 'ngTableFilterConfig'];
      /**
       * Controller for the {@link ngTableFilterRow ngTableFilterRow} directive
       */
      function ngTableFilterRowController($scope, ngTableFilterConfig) {
        $scope.config = ngTableFilterConfig;
        $scope.getFilterCellCss = function (filter, layout) {
          if (layout !== 'horizontal') {
            return 's12';
          }
          var size = Object.keys(filter).length;
          var width = parseInt((12 / size).toString(), 10);
          return 's' + width;
        };
        $scope.getFilterPlaceholderValue = function (filterDef, filterKey) {
          if (typeof filterDef === 'string') {
            return '';
          } else {
            return filterDef.placeholder;
          }
        };
      }
      exports.ngTableFilterRowController = ngTableFilterRowController;

      /***/
    },
    /* 12 */
    /* unknown exports provided */
    /* all exports used */
    /*!**************************************************!*\
      !*** ./src/browser/ngTableGroupRow.directive.ts ***!
      \**************************************************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      var templateUrl = __webpack_require__( /*! ./groupRow.html */29);
      ngTableGroupRow.$inject = [];
      /**
       * directive that renders the group header row for a table
       * @ngdoc directive
       * @example
       * ```html
       * <ng-table-group-row></ng-table-group-row>
       * ```
       */
      function ngTableGroupRow() {
        var directive = {
          restrict: 'E',
          replace: true,
          templateUrl: templateUrl,
          scope: true,
          controller: 'ngTableGroupRowController',
          controllerAs: 'dctrl'
        };
        return directive;
      }
      exports.ngTableGroupRow = ngTableGroupRow;

      /***/
    },
    /* 13 */
    /* unknown exports provided */
    /* all exports used */
    /*!**************************************************!*\
      !*** ./src/browser/ngTableGroupRowController.ts ***!
      \**************************************************/
    /***/
    function (module, exports) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      ngTableGroupRowController.$inject = ['$scope'];
      /**
       * Controller for the {@link ngTableGroupRow ngTableGroupRow} directive
       */
      function ngTableGroupRowController($scope) {
        var groupFns = [];
        init();

        function init() {
          $scope.getGroupables = getGroupables;
          $scope.getGroupTitle = getGroupTitle;
          $scope.getVisibleColumns = getVisibleColumns;
          $scope.groupBy = groupBy;
          $scope.isSelectedGroup = isSelectedGroup;
          $scope.toggleDetail = toggleDetail;
          $scope.$watch('params.group()', setGroup, true);
        }

        function changeSortDirection() {
          var newDirection;
          if ($scope.params.hasGroup($scope.$selGroup, 'asc')) {
            newDirection = 'desc';
          } else if ($scope.params.hasGroup($scope.$selGroup, 'desc')) {
            newDirection = '';
          } else {
            newDirection = 'asc';
          }
          $scope.params.group($scope.$selGroup, newDirection);
        }

        function findGroupColumn(groupKey) {
          return $scope.$columns.filter(function ($column) {
            return $column.groupable($scope) === groupKey;
          })[0];
        }

        function getGroupTitle(group) {
          return isGroupingFunc(group) ? group.title : group.title($scope);
        }

        function getGroupables() {
          var groupableCols = $scope.$columns.filter(function ($column) {
            return !!$column.groupable($scope);
          });
          return groupFns.concat(groupableCols);
        }

        function getVisibleColumns() {
          return $scope.$columns.filter(function ($column) {
            return $column.show($scope);
          });
        }

        function groupBy(group) {
          if (isSelectedGroup(group)) {
            changeSortDirection();
          } else {
            if (isGroupingFunc(group)) {
              $scope.params.group(group);
            } else {
              // it's OK, we know that groupable will return a string
              // this is guaranteed by getGroupables returning only
              // columns that return (truthy) strings
              $scope.params.group(group.groupable($scope));
            }
          }
        }

        function isGroupingFunc(val) {
          return typeof val === 'function';
        }

        function isSelectedGroup(group) {
          if (isGroupingFunc(group)) {
            return group === $scope.$selGroup;
          } else {
            return group.groupable($scope) === $scope.$selGroup;
          }
        }

        function setGroup(grouping) {
          var existingGroupCol = findGroupColumn($scope.$selGroup);
          if (existingGroupCol && existingGroupCol.show.assign) {
            existingGroupCol.show.assign($scope, true);
          }
          if (isGroupingFunc(grouping)) {
            groupFns = [grouping];
            $scope.$selGroup = grouping;
            $scope.$selGroupTitle = grouping.title;
          } else {
            // note: currently only one group is implemented
            var groupKey = Object.keys(grouping || {})[0];
            var groupedColumn = findGroupColumn(groupKey);
            if (groupedColumn) {
              $scope.$selGroupTitle = groupedColumn.title($scope);
              $scope.$selGroup = groupKey;
              if (groupedColumn.show.assign) {
                groupedColumn.show.assign($scope, false);
              }
            }
          }
        }

        function toggleDetail() {
          $scope.params.settings().groupOptions.isExpanded = !$scope.params.settings().groupOptions.isExpanded;
          return $scope.params.reload();
        }
      }
      exports.ngTableGroupRowController = ngTableGroupRowController;

      /***/
    },
    /* 14 */
    /* unknown exports provided */
    /* all exports used */
    /*!****************************************************!*\
      !*** ./src/browser/ngTablePagination.directive.ts ***!
      \****************************************************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      var ng1 = __webpack_require__( /*! angular */0);
      ngTablePagination.$inject = ['$compile', '$document', 'ngTableEventsChannel'];
      /**
       * Directive that renders the table pagination controls
       * @ngdoc directive
       */
      function ngTablePagination($compile, $document, ngTableEventsChannel) {
        return {
          restrict: 'A',
          scope: {
            'params': '=ngTablePagination',
            'templateUrl': '='
          },
          replace: false,
          link: function link(scope, element /*, attrs*/) {
            ngTableEventsChannel.onAfterReloadData(function (pubParams) {
              scope.pages = pubParams.generatePagesArray();
            }, scope, function (pubParams) {
              return pubParams === scope.params;
            });
            scope.$watch('templateUrl', function (templateUrl) {
              if (templateUrl === undefined) {
                return;
              }
              var template = ng1.element('<div ng-include="templateUrl"></div>', $document);
              element.append(template);
              $compile(template)(scope);
            });
          }
        };
      }
      exports.ngTablePagination = ngTablePagination;

      /***/
    },
    /* 15 */
    /* unknown exports provided */
    /* all exports used */
    /*!********************************************************!*\
      !*** ./src/browser/ngTableSelectFilterDs.directive.ts ***!
      \********************************************************/
    /***/
    function (module, exports) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      ngTableSelectFilterDs.$inject = [];
      /**
       * Takes the array returned by $column.filterData and makes it available as `$selectData` on the `$scope`.
       *
       * The resulting `$selectData` array will contain an extra item that is suitable to represent the user
       * "deselecting" an item from a `<select>` tag
       *
       * This directive is is focused on providing a datasource to an `ngOptions` directive
       * @ngdoc directive
       * @private
       */
      function ngTableSelectFilterDs() {
        // note: not using isolated or child scope "by design"
        // this is to allow this directive to be combined with other directives that do
        var directive = {
          restrict: 'A',
          controller: ngTableSelectFilterDsController
        };
        return directive;
      }
      exports.ngTableSelectFilterDs = ngTableSelectFilterDs;
      ngTableSelectFilterDsController.$inject = ['$scope', '$parse', '$attrs', '$q'];

      function ngTableSelectFilterDsController($scope, $parse, $attrs, $q) {
        var $column;
        init();

        function init() {
          $column = $parse($attrs.ngTableSelectFilterDs)($scope);
          $scope.$watch(function () {
            return $column && $column.data;
          }, bindDataSource);
        }

        function bindDataSource() {
          getSelectListData($column).then(function (data) {
            if (data && !hasEmptyOption(data)) {
              data.unshift({
                id: '',
                title: ''
              });
            }
            data = data || [];
            $scope.$selectData = data;
          });
        }

        function hasEmptyOption(data) {
          var isMatch;
          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item && item.id === '') {
              isMatch = true;
              break;
            }
          }
          return isMatch;
        }

        function getSelectListData($column) {
          var dataInput = $column.data;
          if (dataInput instanceof Array) {
            return $q.when(dataInput);
          } else {
            return $q.when(dataInput && dataInput());
          }
        }
      }

      /***/
    },
    /* 16 */
    /* unknown exports provided */
    /* all exports used */
    /*!***************************************************!*\
      !*** ./src/browser/ngTableSorterRow.directive.ts ***!
      \***************************************************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      var templateUrl = __webpack_require__( /*! ./sorterRow.html */32);
      ngTableSorterRow.$inject = [];
      /**
       * directive that renders the sorting header row for a table
       * @ngdoc directive
       * @example
       * ```html
       * <ng-table-sorter-row></ng-table-sorter-row>
       * ```
       */
      function ngTableSorterRow() {
        var directive = {
          restrict: 'E',
          replace: true,
          templateUrl: templateUrl,
          scope: true,
          controller: 'ngTableSorterRowController'
        };
        return directive;
      }
      exports.ngTableSorterRow = ngTableSorterRow;

      /***/
    },
    /* 17 */
    /* unknown exports provided */
    /* all exports used */
    /*!***************************************************!*\
      !*** ./src/browser/ngTableSorterRowController.ts ***!
      \***************************************************/
    /***/
    function (module, exports) {

      "use strict";
      "use strict";

      ngTableSorterRowController.$inject = ['$scope'];
      /**
       * Controller for the {@link ngTableSorterRow ngTableSorterRow} directive
       */
      function ngTableSorterRowController($scope) {
        $scope.sortBy = sortBy;
        ///////////
        function sortBy($column, event) {
          var parsedSortable = $column.sortable && $column.sortable();
          if (!parsedSortable || typeof parsedSortable !== 'string') {
            return;
          } else {
            var defaultSort = $scope.params.settings().defaultSort;
            var inverseSort = defaultSort === 'asc' ? 'desc' : 'asc';
            var sorting = $scope.params.sorting() && $scope.params.sorting()[parsedSortable] && $scope.params.sorting()[parsedSortable] === defaultSort;
            var sortingParams = event.ctrlKey || event.metaKey ? $scope.params.sorting() : {};
            sortingParams[parsedSortable] = sorting ? inverseSort : defaultSort;
            $scope.params.parameters({
              sorting: sortingParams
            });
          }
        }
      }
      exports.ngTableSorterRowController = ngTableSorterRowController;

      /***/
    },
    /* 18 */
    /* unknown exports provided */
    /* all exports used */
    /*!******************************************!*\
      !*** ./src/browser/public-interfaces.ts ***!
      \******************************************/
    /***/
    function (module, exports) {

      "use strict";
      "use strict";

      /***/
    },
    /* 19 */
    /* unknown exports provided */
    /* all exports used */
    /*!*******************************************!*\
      !*** ./src/core/ngTableDefaultGetData.ts ***!
      \*******************************************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      var ng1 = __webpack_require__( /*! angular */0);
      /**
       * Allows for the configuration of the ngTableDefaultGetData service.
       *
       * Set filterFilterName to the name of a angular filter that knows how to apply the values returned by
       * `NgTableParams.filter()` to restrict an array of data.
       *
       * Set sortingFilterName to the name of a angular filter that knows how to apply the values returned by
       * `NgTableParams.orderBy()` to sort an array of data.
       *
       * Out of the box the `ngTableDefaultGetData` service will be configured to use the angular `filter` and `orderBy`
       * filters respectively
       *
       * @ngdoc provider
       */
      var ngTableDefaultGetDataProvider = function () {
        function ngTableDefaultGetDataProvider() {
          this.filterFilterName = 'filter';
          this.sortingFilterName = 'orderBy';
          var provider = this;
          this.$get = ngTableDefaultGetData;
          ngTableDefaultGetData.$inject = ['$filter', 'ngTableEventsChannel'];
          /**
           * Implementation of the {@link IDefaultGetData IDefaultGetData} interface
           *
           * @ngdoc service
           */
          function ngTableDefaultGetData($filter, ngTableEventsChannel) {
            var defaultDataOptions = {
              applyFilter: true,
              applySort: true,
              applyPaging: true
            };
            var self = this;
            getData.applyPaging = applyPaging;
            getData.getFilterFn = getFilterFn;
            getData.getOrderByFn = getOrderByFn;
            return getData;

            function getFilterFn(params) {
              var filterOptions = params.settings().filterOptions;
              if (ng1.isFunction(filterOptions.filterFn)) {
                return filterOptions.filterFn;
              } else {
                return $filter(filterOptions.filterFilterName || provider.filterFilterName);
              }
            }

            function getOrderByFn(params) {
              return $filter(provider.sortingFilterName);
            }

            function applyFilter(data, params) {
              if (!params.hasFilter()) {
                return data;
              }
              var filter = params.filter(true);
              var filterKeys = Object.keys(filter);
              var parsedFilter = filterKeys.reduce(function (result, key) {
                result = setPath(result, filter[key], key);
                return result;
              }, {});
              var filterFn = getFilterFn(params);
              return filterFn.call(params, data, parsedFilter, params.settings().filterOptions.filterComparator);
            }

            function applyPaging(data, params) {
              var pagedData = data.slice((params.page() - 1) * params.count(), params.page() * params.count());
              params.total(data.length); // set total for recalc pagination
              return pagedData;
            }

            function applySort(data, params) {
              var orderBy = params.orderBy();
              var orderByFn = getOrderByFn(params);
              return orderBy.length ? orderByFn(data, orderBy) : data;
            }

            function getData(data, params) {
              if (data == null) {
                return [];
              }
              var options = ng1.extend({}, defaultDataOptions, params.settings().dataOptions);
              var fData = options.applyFilter ? applyFilter(data, params) : data;
              ngTableEventsChannel.publishAfterDataFiltered(self, params, fData);
              var orderedData = options.applySort ? applySort(fData, params) : fData;
              ngTableEventsChannel.publishAfterDataSorted(self, params, orderedData);
              return options.applyPaging ? applyPaging(orderedData, params) : orderedData;
            }
            // Sets the value at any depth in a nested object based on the path
            // note: adapted from: underscore-contrib#setPath
            function setPath(obj, value, path) {
              var keys = path.split('.');
              var ret = obj;
              var lastKey = keys[keys.length - 1];
              var target = ret;
              var parentPathKeys = keys.slice(0, keys.length - 1);
              parentPathKeys.forEach(function (key) {
                if (!target.hasOwnProperty(key)) {
                  target[key] = {};
                }
                target = target[key];
              });
              target[lastKey] = value;
              return ret;
            }
          }
        }
        return ngTableDefaultGetDataProvider;
      }();
      exports.ngTableDefaultGetDataProvider = ngTableDefaultGetDataProvider;

      /***/
    },
    /* 20 */
    /* unknown exports provided */
    /* all exports used */
    /*!*************************************!*\
      !*** ./src/core/ngTableDefaults.ts ***!
      \*************************************/
    /***/
    function (module, exports) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";
      /**
       * Default values for ngTable
       * @ngdoc object
       */

      exports.ngTableDefaults = {
        params: {},
        settings: {}
      };

      /***/
    },
    /* 21 */
    /* unknown exports provided */
    /* all exports used */
    /*!******************************************!*\
      !*** ./src/core/ngTableEventsChannel.ts ***!
      \******************************************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      var ng1 = __webpack_require__( /*! angular */0);
      ngTableEventsChannel.$inject = ['$rootScope'];
      /**
       * Implementation of the {@link IEventsChannel IEventsChannel} interface
       * @ngdoc service
       */
      function ngTableEventsChannel($rootScope) {
        var events = {};
        events = addTableParamsEvent('afterCreated', events);
        events = addTableParamsEvent('afterReloadData', events);
        events = addTableParamsEvent('datasetChanged', events);
        events = addTableParamsEvent('pagesChanged', events);
        events = addTableParamsEvent('afterDataFiltered', events);
        events = addTableParamsEvent('afterDataSorted', events);
        return events;
        //////////
        function addTableParamsEvent(eventName, target) {
          var fnName = eventName.charAt(0).toUpperCase() + eventName.substring(1);
          var event = (_a = {}, _a['on' + fnName] = createEventSubscriptionFn(eventName), _a['publish' + fnName] = createPublishEventFn(eventName), _a);
          return ng1.extend(target, event);
          var _a;
        }

        function createEventSubscriptionFn(eventName) {
          return function subscription(handler, eventSelectorOrScope, eventSelector) {
            var actualEvtSelector;
            var scope = $rootScope;
            if (isScopeLike(eventSelectorOrScope)) {
              scope = eventSelectorOrScope;
              actualEvtSelector = createEventSelectorFn(eventSelector);
            } else {
              actualEvtSelector = createEventSelectorFn(eventSelectorOrScope);
            }
            return scope.$on('ngTable:' + eventName, function (event, params) {
              var eventArgs = [];
              for (var _i = 2; _i < arguments.length; _i++) {
                eventArgs[_i - 2] = arguments[_i];
              }
              // don't send events published by the internal NgTableParams created by ngTableController
              if (params.isNullInstance) return;
              var fnArgs = [params].concat(eventArgs);
              if (actualEvtSelector.apply(this, fnArgs)) {
                handler.apply(this, fnArgs);
              }
            });
          };

          function createEventSelectorFn(eventSelector) {
            if (!eventSelector) {
              return function (publisher) {
                return true;
              };
            } else if (isEventSelectorFunc(eventSelector)) {
              return eventSelector;
            } else {
              // shorthand for subscriber to only receive events from a specific publisher instance
              return function (publisher) {
                return publisher === eventSelector;
              };
            }
          }

          function isEventSelectorFunc(val) {
            return typeof val === 'function';
          }

          function isScopeLike(val) {
            return val && typeof val.$new === 'function';
          }
        }

        function createPublishEventFn(eventName) {
          return function publish() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i - 0] = arguments[_i];
            }
            $rootScope.$broadcast.apply($rootScope, ['ngTable:' + eventName].concat(args));
          };
        }
      }
      exports.ngTableEventsChannel = ngTableEventsChannel;

      /***/
    },
    /* 22 */
    /* unknown exports provided */
    /* all exports used */
    /*!***********************************!*\
      !*** ./src/core/ngTableParams.ts ***!
      \***********************************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      /**
       * ngTable: Table + Angular JS
       *
       * @author Vitalii Savchuk <esvit666@gmail.com>
       * @url https://github.com/esvit/ng-table/
       * @license New BSD License <http://creativecommons.org/licenses/BSD/>
       */
      "use strict";

      var ng1 = __webpack_require__( /*! angular */0);
      ngTableParamsFactory.$inject = ['$q', '$log', '$filter', 'ngTableDefaults', 'ngTableDefaultGetData', 'ngTableEventsChannel'];
      /**
       * Implmenentation of the {@link INgTableParams INgTableParams} interface
       * @ngdoc service
       */
      function ngTableParamsFactory($q, $log, $filter, ngTableDefaults, ngTableDefaultGetData, ngTableEventsChannel) {
        return NgTableParams;

        function NgTableParams(baseParameters, baseSettings) {
          function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
          }
          // the ngTableController "needs" to create a dummy/null instance and it's important to know whether an instance
          // is one of these
          if (typeof baseParameters === "boolean") {
            this.isNullInstance = true;
          }
          var self = this,
              prevParamsMemento,
              errParamsMemento,
              isCommittedDataset = false,
              initialEvents = [],
              log = function log() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i - 0] = arguments[_i];
            }
            if (_settings.debugMode && $log.debug) {
              $log.debug.apply($log, args);
            }
          },
              defaultFilterOptions = {
            filterComparator: undefined,
            filterDelay: 500,
            filterDelayThreshold: 10000,
            filterFilterName: undefined,
            filterFn: undefined,
            filterLayout: 'stack' // alternative: 'horizontal'
          },
              defaultGroupOptions = {
            defaultSort: 'asc',
            isExpanded: true
          },
              defaultSettingsFns = getDefaultSettingFns();
          this.data = [];
          this.parameters = function (newParameters, parseParamsFromUrl) {
            parseParamsFromUrl = parseParamsFromUrl || false;
            if ((typeof newParameters === 'undefined' ? 'undefined' : _typeof(newParameters)) !== undefined) {
              for (var key in newParameters) {
                var value = newParameters[key];
                if (parseParamsFromUrl && key.indexOf('[') >= 0) {
                  var keys = key.split(/\[(.*)\]/).reverse();
                  var lastKey = '';
                  for (var i = 0, len = keys.length; i < len; i++) {
                    var name = keys[i];
                    if (name !== '') {
                      var v = value;
                      value = {};
                      value[lastKey = name] = isNumber(v) ? parseFloat(v) : v;
                    }
                  }
                  if (lastKey === 'sorting') {
                    _params[lastKey] = {};
                  }
                  _params[lastKey] = ng1.extend(_params[lastKey] || {}, value[lastKey]);
                } else {
                  if (key === 'group') {
                    _params[key] = parseGroup(newParameters[key]);
                  } else {
                    _params[key] = isNumber(newParameters[key]) ? parseFloat(newParameters[key]) : newParameters[key];
                  }
                }
              }
              log('ngTable: set parameters', _params);
              return this;
            }
            return _params;
          };

          function parseGroup(group) {
            var defaultSort = _settings.groupOptions && _settings.groupOptions.defaultSort;
            if (!group) {
              return group;
            } else if (isGroupingFun(group)) {
              if (group.sortDirection == null) {
                group.sortDirection = defaultSort;
              }
              return group;
            } else if ((typeof group === 'undefined' ? 'undefined' : _typeof(group)) === 'object') {
              for (var key in group) {
                if (group[key] == null) {
                  group[key] = defaultSort;
                }
              }
              return group;
            } else {
              return _a = {}, _a[group] = defaultSort, _a;
            }
            var _a;
          }
          /**
           * @ngdoc method
           * @name NgTableParams#settings
           * @description Set new settings for table
           *
           * @param {string} newSettings New settings or undefined
           * @returns {Object} Current settings or `this`
           */
          this.settings = function (newSettings) {
            if (ng1.isDefined(newSettings)) {
              // todo: don't modify newSettings object: this introduces unexpected side effects;
              // instead take a copy of newSettings
              if (newSettings.filterOptions) {
                newSettings.filterOptions = ng1.extend({}, _settings.filterOptions, newSettings.filterOptions);
              }
              if (newSettings.groupOptions) {
                newSettings.groupOptions = ng1.extend({}, _settings.groupOptions, newSettings.groupOptions);
              }
              if (ng1.isArray(newSettings.dataset)) {
                //auto-set the total from passed in dataset
                newSettings.total = newSettings.dataset.length;
              }
              var originalDataset = _settings.dataset;
              _settings = ng1.extend(_settings, newSettings);
              if (ng1.isArray(newSettings.dataset)) {
                optimizeFilterDelay();
              }
              // note: using != as want null and undefined to be treated the same
              var hasDatasetChanged = newSettings.hasOwnProperty('dataset') && newSettings.dataset != originalDataset;
              if (hasDatasetChanged) {
                if (isCommittedDataset) {
                  this.page(1); // reset page as a new dataset has been supplied
                }
                isCommittedDataset = false;
                var fireEvent = function fireEvent() {
                  ngTableEventsChannel.publishDatasetChanged(self, newSettings.dataset, originalDataset);
                };
                if (initialEvents) {
                  initialEvents.push(fireEvent);
                } else {
                  fireEvent();
                }
              }
              log('ngTable: set settings', _settings);
              return this;
            }
            return _settings;
          };
          this.page = function (page) {
            return page !== undefined ? this.parameters({
              'page': page
            }) : _params.page;
          };
          this.total = function (total) {
            return total !== undefined ? this.settings({
              'total': total
            }) : _settings.total;
          };
          this.count = function (count, resetPage) {
            // reset to first page because can be blank page
            var params = {
              count: count,
              page: 1
            };

            if (resetPage === false) {
              delete params.page;
            }
            return count !== undefined ? this.parameters(params) : _params.count;
          };
          this.filter = function (filter) {
            if (filter != null && (typeof filter === 'undefined' ? 'undefined' : _typeof(filter)) === 'object') {
              return this.parameters({
                'filter': filter,
                'page': 1
              });
            } else if (filter === true) {
              var keys = Object.keys(_params.filter);
              var significantFilter = {};
              for (var i = 0; i < keys.length; i++) {
                var filterValue = _params.filter[keys[i]];
                if (filterValue != null && filterValue !== '') {
                  significantFilter[keys[i]] = filterValue;
                }
              }
              return significantFilter;
            } else {
              return _params.filter;
            }
          };
          this.group = function (group, sortDirection) {
            if (group === undefined) {
              return _params.group;
            }
            var newParameters = {
              page: 1
            };
            if (isGroupingFun(group) && sortDirection !== undefined) {
              group.sortDirection = sortDirection;
              newParameters.group = group;
            } else if (typeof group === 'string' && sortDirection !== undefined) {
              newParameters.group = (_a = {}, _a[group] = sortDirection, _a);
            } else {
              newParameters.group = group;
            }
            this.parameters(newParameters);
            return this;
            var _a;
          };
          /**
           * @ngdoc method
           * @name NgTableParams#sorting
           * @description If 'sorting' parameter is not set, return current sorting. Otherwise set current sorting.
           *
           * @param {string} sorting New sorting
           * @returns {Object} Current sorting or `this`
           */
          this.sorting = function (sorting, direction) {
            if (typeof sorting === 'string' && direction !== undefined) {
              this.parameters({
                'sorting': (_a = {}, _a[sorting] = direction, _a)
              });
              return this;
            }
            return sorting !== undefined ? this.parameters({
              'sorting': sorting
            }) : _params.sorting;
            var _a;
          };
          this.isSortBy = function (field, direction) {
            if (direction !== undefined) {
              return _params.sorting[field] !== undefined && _params.sorting[field] == direction;
            } else {
              return _params.sorting[field] !== undefined;
            }
          };
          /**
           * @ngdoc method
           * @name NgTableParams#orderBy
           * @description Return object of sorting parameters for angular filter
           *
           * @returns {Array} Array like: [ '-name', '+age' ]
           */
          this.orderBy = function () {
            return convertSortToOrderBy(_params.sorting);
          };

          function convertSortToOrderBy(sorting) {
            var result = [];
            for (var column in sorting) {
              result.push((sorting[column] === "asc" ? "+" : "-") + column);
            }
            return result;
          }
          /**
           * @ngdoc method
           * @name NgTableParams#generatePagesArray
           * @description Generate array of pages
           *
           * When no arguments supplied, the current parameter state of this `NgTableParams` instance will be used
           *
           * @param {boolean} currentPage which page must be active
           * @param {boolean} totalItems  Total quantity of items
           * @param {boolean} pageSize    Quantity of items on page
           * @param {number} maxBlocks    Quantity of blocks for pagination
           * @returns {Array} Array of pages
           */
          this.generatePagesArray = function (currentPage, totalItems, pageSize, maxBlocks) {
            if (!arguments.length) {
              currentPage = this.page();
              totalItems = this.total();
              pageSize = this.count();
            }
            var maxPage, maxPivotPages, minPage, numPages;
            maxBlocks = maxBlocks && maxBlocks < 6 ? 6 : maxBlocks;
            var pages = [];
            numPages = Math.ceil(totalItems / pageSize);
            if (numPages > 1) {
              pages.push({
                type: 'prev',
                number: Math.max(1, currentPage - 1),
                active: currentPage > 1
              });
              pages.push({
                type: 'first',
                number: 1,
                active: currentPage > 1,
                current: currentPage === 1
              });
              maxPivotPages = Math.round((_settings.paginationMaxBlocks - _settings.paginationMinBlocks) / 2);
              minPage = Math.max(2, currentPage - maxPivotPages);
              maxPage = Math.min(numPages - 1, currentPage + maxPivotPages * 2 - (currentPage - minPage));
              minPage = Math.max(2, minPage - (maxPivotPages * 2 - (maxPage - minPage)));
              var i = minPage;
              while (i <= maxPage) {
                if (i === minPage && i !== 2 || i === maxPage && i !== numPages - 1) {
                  pages.push({
                    type: 'more',
                    active: false
                  });
                } else {
                  pages.push({
                    type: 'page',
                    number: i,
                    active: currentPage !== i,
                    current: currentPage === i
                  });
                }
                i++;
              }
              pages.push({
                type: 'last',
                number: numPages,
                active: currentPage !== numPages,
                current: currentPage === numPages
              });
              pages.push({
                type: 'next',
                number: Math.min(numPages, currentPage + 1),
                active: currentPage < numPages
              });
            }
            return pages;
          };
          /**
           * @ngdoc method
           * @name NgTableParams#isDataReloadRequired
           * @description Return true when a change to this `NgTableParams` instance should require the reload method
           * to be run so as to ensure the data presented to the user reflects the `NgTableParams`
           *
           * Note that this method will return false when the reload method has run but fails. In this case
           * `hasErrorState` will return true.
           */
          this.isDataReloadRequired = function () {
            // note: using != as want to treat null and undefined the same
            return !isCommittedDataset || !ng1.equals(createComparableParams(), prevParamsMemento) || hasGlobalSearchFieldChanges();
          };

          function createComparableParams() {
            var group = _params.group;
            return {
              params: _params,
              groupSortDirection: isGroupingFun(group) ? group.sortDirection : undefined
            };
          }

          function isGroupingFun(val) {
            return typeof val === 'function';
          }
          /**
           * @ngdoc method
           * @name NgTableParams#hasFilter
           * @description Determines if NgTableParams#filter has significant filter value(s)
           * (any value except null, undefined, or empty string)
           * @returns {Boolean} true when NgTableParams#filter has at least one significant field value
           */
          this.hasFilter = function () {
            return Object.keys(this.filter(true)).length > 0;
          };
          this.hasGroup = function (group, sortDirection) {
            if (group == null) {
              return isGroupingFun(_params.group) || Object.keys(_params.group).length > 0;
            }
            if (isGroupingFun(group)) {
              if (sortDirection == null) {
                return _params.group === group;
              } else {
                return _params.group === group && group.sortDirection === sortDirection;
              }
            } else {
              if (sortDirection == null) {
                return Object.keys(_params.group).indexOf(group) !== -1;
              } else {
                return _params.group[group] === sortDirection;
              }
            }
          };
          this.hasFilterChanges = function () {
            var previousFilter = prevParamsMemento && prevParamsMemento.params.filter;
            return !ng1.equals(_params.filter, previousFilter) || hasGlobalSearchFieldChanges();
          };

          function hasGlobalSearchFieldChanges() {
            var currentVal = _params.filter && _params.filter['$'];
            var previousVal = prevParamsMemento && prevParamsMemento.params.filter && prevParamsMemento.params.filter['$'];
            return !ng1.equals(currentVal, previousVal);
          }
          this.url = function (asString) {
            // this function is an example of Typescript gone bad!!
            asString = asString || false;
            var pairs = asString ? [] : {};
            for (var key in _params) {
              if (_params.hasOwnProperty(key)) {
                var item = _params[key],
                    name = encodeURIComponent(key);
                if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === "object") {
                  for (var subkey in item) {
                    if (isSignificantValue(item[subkey], key)) {
                      var pname = name + "[" + encodeURIComponent(subkey) + "]";
                      collectValue(item[subkey], pname);
                    }
                  }
                } else if (!ng1.isFunction(item) && isSignificantValue(item, key)) {
                  collectValue(item, name);
                }
              }
            }
            return pairs;

            function collectValue(value, key) {
              if (isArray(pairs)) {
                pairs.push(key + "=" + encodeURIComponent(value));
              } else {
                pairs[key] = encodeURIComponent(value);
              }
            }

            function isArray(pairs) {
              return asString;
            }

            function isSignificantValue(value, key) {
              return key === "group" ? true : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined && value !== "";
            }
          };
          this.reload = function () {
            var self = this,
                pData = null;
            _settings.$loading = true;
            prevParamsMemento = ng1.copy(createComparableParams());
            isCommittedDataset = true;
            if (self.hasGroup()) {
              pData = runInterceptorPipeline($q.when(_settings.getGroups(self)));
            } else {
              var fn = _settings.getData;
              pData = runInterceptorPipeline($q.when(fn(self)));
            }
            log('ngTable: reload data');
            var oldData = self.data;
            return pData.then(function (data) {
              _settings.$loading = false;
              errParamsMemento = null;
              self.data = data;
              // note: I think it makes sense to publish this event even when data === oldData
              // subscribers can always set a filter to only receive the event when data !== oldData
              ngTableEventsChannel.publishAfterReloadData(self, data, oldData);
              self.reloadPages();
              return data;
            })['catch'](function (reason) {
              errParamsMemento = prevParamsMemento;
              // "rethrow"
              return $q.reject(reason);
            });
          };
          this.hasErrorState = function () {
            return !!(errParamsMemento && ng1.equals(errParamsMemento, createComparableParams()));
          };

          function optimizeFilterDelay() {
            // don't debounce by default filter input when working with small synchronous datasets
            if (_settings.filterOptions.filterDelay === defaultFilterOptions.filterDelay && _settings.total <= _settings.filterOptions.filterDelayThreshold && _settings.getData === defaultSettingsFns.getData) {
              _settings.filterOptions.filterDelay = 0;
            }
          }
          this.reloadPages = function () {
            var currentPages;
            return function () {
              var oldPages = currentPages;
              var newPages = self.generatePagesArray(self.page(), self.total(), self.count());
              if (!ng1.equals(oldPages, newPages)) {
                currentPages = newPages;
                ngTableEventsChannel.publishPagesChanged(this, newPages, oldPages);
              }
            };
          }();

          function runInterceptorPipeline(fetchedData) {
            var interceptors = _settings.interceptors || [];
            return interceptors.reduce(function (result, interceptor) {
              var thenFn = interceptor.response && interceptor.response.bind(interceptor) || $q.when;
              var rejectFn = interceptor.responseError && interceptor.responseError.bind(interceptor) || $q.reject;
              return result.then(function (data) {
                return thenFn(data, self);
              }, function (reason) {
                return rejectFn(reason, self);
              });
            }, fetchedData);
          }

          function getDefaultSettingFns() {
            return {
              getData: getData,
              getGroups: getGroups
            };
            /**
             * @ngdoc method
             * @name settings#getData
             * @description Returns the data to display in the table
             *
             * Called by `NgTableParams` whenever it considers new data is to be loaded
             *
             * @param {Object} params the `NgTableParams` requesting data
             */
            function getData(params) {
              return ngTableDefaultGetData(params.settings().dataset, params);
            }
            /**
             * @ngdoc method
             * @name settings#getGroups
             * @description Return groups of data to display in the table
             *
             * Called by `NgTableParams` whenever it considers new data is to be loaded
             * and when a `group` value has been assigned
             *
             * @param {Object} params the `NgTableParams` requesting data
             */
            function getGroups(params) {
              var group = params.group();
              var groupFn;
              var sortDirection = undefined;
              if (isGroupingFun(group)) {
                groupFn = group;
                sortDirection = group.sortDirection;
              } else {
                // currently support for only one group implemented
                var groupField = Object.keys(group)[0];
                sortDirection = group[groupField];
                groupFn = function groupFn(item) {
                  return getPath(item, groupField);
                };
              }
              var settings = params.settings();
              var originalDataOptions = settings.dataOptions;
              settings.dataOptions = {
                applyPaging: false
              };
              var getData = settings.getData;
              var gotData = $q.when(getData(params));
              return gotData.then(function (data) {
                var groups = {};
                ng1.forEach(data, function (item) {
                  var groupName = groupFn(item);
                  groups[groupName] = groups[groupName] || {
                    data: [],
                    $hideRows: !settings.groupOptions.isExpanded,
                    value: groupName
                  };
                  groups[groupName].data.push(item);
                });
                var result = [];
                for (var i in groups) {
                  result.push(groups[i]);
                }
                if (sortDirection) {
                  var orderByFn = ngTableDefaultGetData.getOrderByFn();
                  var orderBy = convertSortToOrderBy({
                    value: sortDirection
                  });
                  result = orderByFn(result, orderBy);
                }
                return ngTableDefaultGetData.applyPaging(result, params);
              })['finally'](function () {
                // restore the real options
                settings.dataOptions = originalDataOptions;
              });
            }

            function getPath(obj, ks) {
              // origianl source https://github.com/documentcloud/underscore-contrib
              var keys;
              if (typeof ks === "string") {
                keys = ks.split(".");
              } else {
                keys = ks;
              }
              // If we have reached an undefined property
              // then stop executing and return undefined
              if (obj === undefined) return void 0;
              // If the path array has no more elements, we've reached
              // the intended property and return its value
              if (keys.length === 0) return obj;
              // If we still have elements in the path array and the current
              // value is null, stop executing and return undefined
              if (obj === null) return void 0;
              return getPath(obj[keys[0]], keys.slice(1));
            }
          }
          var _params = {
            page: 1,
            count: 10,
            filter: {},
            sorting: {},
            group: {}
          };
          ng1.extend(_params, ngTableDefaults.params);
          /**
           * @ngdoc object
           * @name settings
           * @module ngTable
           * @description configuration settings for `NgTableParams`
           */
          var _settings = {
            $loading: false,
            dataset: null,
            total: 0,
            defaultSort: 'desc',
            filterOptions: ng1.copy(defaultFilterOptions),
            groupOptions: ng1.copy(defaultGroupOptions),
            counts: [10, 25, 50, 100],
            interceptors: [],
            paginationMaxBlocks: 11,
            paginationMinBlocks: 5,
            sortingIndicator: 'span'
          };
          this.settings(defaultSettingsFns);
          this.settings(ngTableDefaults.settings);
          this.settings(baseSettings);
          this.parameters(baseParameters, true);
          ngTableEventsChannel.publishAfterCreated(this);
          // run events during construction after the initial create event. That way a consumer
          // can subscribe to all events for a table without "dropping" an event
          ng1.forEach(initialEvents, function (event) {
            event();
          });
          initialEvents = null;
          return this;
        }
      }
      exports.ngTableParamsFactory = ngTableParamsFactory;

      /***/
    },
    /* 23 */
    /* unknown exports provided */
    /* all exports used */
    /*!***************************************!*\
      !*** ./src/core/public-interfaces.ts ***!
      \***************************************/
    /***/
    function (module, exports) {

      "use strict";
      "use strict";

      /***/
    },
    /* 24 */
    /* unknown exports provided */
    /* all exports used */
    /*!************************************!*\
      !*** ./src/browser/filterRow.html ***!
      \************************************/
    /***/
    function (module, exports, __webpack_require__) {

      var path = 'ng-table/filterRow.html';
      var html = "<tr ng-show=\"show_filter\" class=\"ng-table-filters\">\n    <th data-title-text=\"{{$column.titleAlt(this) || $column.title(this)}}\" ng-repeat=\"$column in $columns\" ng-if=\"$column.show(this)\" class=\"filter {{$column.class(this)}}\"\n        ng-class=\"params.settings().filterOptions.filterLayout === 'horizontal' ? 'filter-horizontal' : ''\">\n        <div ng-repeat=\"(name, filter) in $column.filter(this)\" ng-include=\"config.getTemplateUrl(filter)\" class=\"filter-cell\"\n             ng-class=\"[getFilterCellCss($column.filter(this), params.settings().filterOptions.filterLayout), $last ? 'last' : '']\">\n        </div>\n    </th>\n</tr>\n";
      var angular = __webpack_require__( /*! angular */0);
      angular.module('ng').run(['$templateCache', function (c) {
        c.put(path, html);
      }]);
      module.exports = path;

      /***/
    },
    /* 25 */
    /* unknown exports provided */
    /* all exports used */
    /*!*****************************************!*\
      !*** ./src/browser/filters/number.html ***!
      \*****************************************/
    /***/
    function (module, exports, __webpack_require__) {

      var path = 'ng-table/filters/number.html';
      var html = "<input type=\"number\" name=\"{{name}}\" ng-disabled=\"$filterRow.disabled\" ng-model=\"params.filter()[name]\" class=\"input-filter form-control\"\n       placeholder=\"{{getFilterPlaceholderValue(filter, name)}}\"/>\n";
      var angular = __webpack_require__( /*! angular */0);
      angular.module('ng').run(['$templateCache', function (c) {
        c.put(path, html);
      }]);
      module.exports = path;

      /***/
    },
    /* 26 */
    /* unknown exports provided */
    /* all exports used */
    /*!**************************************************!*\
      !*** ./src/browser/filters/select-multiple.html ***!
      \**************************************************/
    /***/
    function (module, exports, __webpack_require__) {

      var path = 'ng-table/filters/select-multiple.html';
      var html = "<select ng-options=\"data.id as data.title for data in $column.data\"\n        ng-disabled=\"$filterRow.disabled\"\n        multiple ng-multiple=\"true\"\n        ng-model=\"params.filter()[name]\"\n        class=\"filter filter-select-multiple form-control\" name=\"{{name}}\">\n</select>\n";
      var angular = __webpack_require__( /*! angular */0);
      angular.module('ng').run(['$templateCache', function (c) {
        c.put(path, html);
      }]);
      module.exports = path;

      /***/
    },
    /* 27 */
    /* unknown exports provided */
    /* all exports used */
    /*!*****************************************!*\
      !*** ./src/browser/filters/select.html ***!
      \*****************************************/
    /***/
    function (module, exports, __webpack_require__) {

      var path = 'ng-table/filters/select.html';
      var html = "<select ng-options=\"data.id as data.title for data in $selectData\"\n        ng-table-select-filter-ds=\"$column\"\n        ng-disabled=\"$filterRow.disabled\"\n        ng-model=\"params.filter()[name]\"\n        class=\"filter filter-select form-control\" name=\"{{name}}\">\n    <option style=\"display:none\" value=\"\"></option>\n</select>\n";
      var angular = __webpack_require__( /*! angular */0);
      angular.module('ng').run(['$templateCache', function (c) {
        c.put(path, html);
      }]);
      module.exports = path;

      /***/
    },
    /* 28 */
    /* unknown exports provided */
    /* all exports used */
    /*!***************************************!*\
      !*** ./src/browser/filters/text.html ***!
      \***************************************/
    /***/
    function (module, exports, __webpack_require__) {

      var path = 'ng-table/filters/text.html';
      var html = "<input type=\"text\" name=\"{{name}}\" ng-disabled=\"$filterRow.disabled\" ng-model=\"params.filter()[name]\" class=\"input-filter form-control\"\n       placeholder=\"{{getFilterPlaceholderValue(filter, name)}}\"/>\n";
      var angular = __webpack_require__( /*! angular */0);
      angular.module('ng').run(['$templateCache', function (c) {
        c.put(path, html);
      }]);
      module.exports = path;

      /***/
    },
    /* 29 */
    /* unknown exports provided */
    /* all exports used */
    /*!***********************************!*\
      !*** ./src/browser/groupRow.html ***!
      \***********************************/
    /***/
    function (module, exports, __webpack_require__) {

      var path = 'ng-table/groupRow.html';
      var html = "<tr ng-if=\"params.hasGroup()\" ng-show=\"$groupRow.show\" class=\"ng-table-group-header\">\n    <th colspan=\"{{getVisibleColumns().length}}\" class=\"sortable\" ng-class=\"{\n                    'sort-asc': params.hasGroup($selGroup, 'asc'),\n                    'sort-desc':params.hasGroup($selGroup, 'desc')\n                  }\">\n        <a href=\"\" ng-click=\"isSelectorOpen = !isSelectorOpen\" class=\"ng-table-group-selector\">\n            <strong class=\"sort-indicator\">{{$selGroupTitle}}</strong>\n            <button class=\"btn btn-default btn-xs ng-table-group-close\"\n                    ng-click=\"$groupRow.show = false; $event.preventDefault(); $event.stopPropagation();\">\n                <span class=\"glyphicon glyphicon-remove\"></span>\n            </button>\n            <button class=\"btn btn-default btn-xs ng-table-group-toggle\"\n                    ng-click=\"toggleDetail(); $event.preventDefault(); $event.stopPropagation();\">\n                <span class=\"glyphicon\" ng-class=\"{\n                    'glyphicon-resize-small': params.settings().groupOptions.isExpanded,\n                    'glyphicon-resize-full': !params.settings().groupOptions.isExpanded\n                }\"></span>\n            </button>\n        </a>\n        <div class=\"list-group\" ng-if=\"isSelectorOpen\">\n            <a href=\"\" class=\"list-group-item\" ng-repeat=\"group in getGroupables()\" ng-click=\"groupBy(group)\">\n                <strong>{{ getGroupTitle(group)}}</strong>\n                <strong ng-class=\"isSelectedGroup(group) && 'sort-indicator'\"></strong>\n            </a>\n        </div>\n    </th>\n</tr>\n";
      var angular = __webpack_require__( /*! angular */0);
      angular.module('ng').run(['$templateCache', function (c) {
        c.put(path, html);
      }]);
      module.exports = path;

      /***/
    },
    /* 30 */
    /* unknown exports provided */
    /* all exports used */
    /*!*********************************!*\
      !*** ./src/browser/header.html ***!
      \*********************************/
    /***/
    function (module, exports, __webpack_require__) {

      var path = 'ng-table/header.html';
      var html = "<ng-table-group-row></ng-table-group-row>\n<ng-table-sorter-row></ng-table-sorter-row>\n<ng-table-filter-row></ng-table-filter-row>\n";
      var angular = __webpack_require__( /*! angular */0);
      angular.module('ng').run(['$templateCache', function (c) {
        c.put(path, html);
      }]);
      module.exports = path;

      /***/
    },
    /* 31 */
    /* unknown exports provided */
    /* all exports used */
    /*!********************************!*\
      !*** ./src/browser/pager.html ***!
      \********************************/
    /***/
    function (module, exports, __webpack_require__) {

      var path = 'ng-table/pager.html';
      var html = "<div class=\"ng-cloak ng-table-pager\" ng-if=\"params.data.length\">\n    <div ng-if=\"params.settings().counts.length\" class=\"ng-table-counts btn-group pull-right\">\n        <button ng-repeat=\"count in params.settings().counts\" type=\"button\"\n                ng-class=\"{'active':params.count() == count}\"\n                ng-click=\"params.count(count)\" class=\"btn btn-default\">\n            <span ng-bind=\"count\"></span>\n        </button>\n    </div>\n    <ul ng-if=\"pages.length\" class=\"pagination ng-table-pagination\">\n        <li class=\"page-item\" ng-class=\"{'disabled': !page.active && !page.current, 'active': page.current}\" ng-repeat=\"page in pages\" ng-switch=\"page.type\">\n            <a class=\"page-link\" ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\" href=\"\">&laquo;</a>\n            <a class=\"page-link\" ng-switch-when=\"first\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a>\n            <a class=\"page-link\" ng-switch-when=\"page\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a>\n            <a class=\"page-link\" ng-switch-when=\"more\" ng-click=\"params.page(page.number)\" href=\"\">&#8230;</a>\n            <a class=\"page-link\" ng-switch-when=\"last\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a>\n            <a class=\"page-link\" ng-switch-when=\"next\" ng-click=\"params.page(page.number)\" href=\"\">&raquo;</a>\n        </li>\n    </ul>\n</div>\n";
      var angular = __webpack_require__( /*! angular */0);
      angular.module('ng').run(['$templateCache', function (c) {
        c.put(path, html);
      }]);
      module.exports = path;

      /***/
    },
    /* 32 */
    /* unknown exports provided */
    /* all exports used */
    /*!************************************!*\
      !*** ./src/browser/sorterRow.html ***!
      \************************************/
    /***/
    function (module, exports, __webpack_require__) {

      var path = 'ng-table/sorterRow.html';
      var html = "<tr class=\"ng-table-sort-header\">\n    <th title=\"{{$column.headerTitle(this)}}\"\n        ng-repeat=\"$column in $columns\"\n        ng-class=\"{\n                    'sortable': $column.sortable(this),\n                    'sort-asc': params.sorting()[$column.sortable(this)]=='asc',\n                    'sort-desc': params.sorting()[$column.sortable(this)]=='desc'\n                  }\"\n        ng-click=\"sortBy($column, $event)\"\n        ng-if=\"$column.show(this)\"\n        ng-init=\"template = $column.headerTemplateURL(this)\"\n        class=\"header {{$column.class(this)}}\">\n        <div ng-if=\"!template\" class=\"ng-table-header\" ng-class=\"{'sort-indicator': params.settings().sortingIndicator == 'div'}\">\n            <span ng-bind-html=\"$column.title\" ng-class=\"{'sort-indicator': params.settings().sortingIndicator == 'span'}\"></span>\n        </div>\n        <div ng-if=\"template\" ng-include=\"template\"></div>\n    </th>\n</tr>\n";
      var angular = __webpack_require__( /*! angular */0);
      angular.module('ng').run(['$templateCache', function (c) {
        c.put(path, html);
      }]);
      module.exports = path;

      /***/
    },
    /* 33 */
    /* unknown exports provided */
    /* all exports used */
    /*!******************!*\
      !*** ./index.ts ***!
      \******************/
    /***/
    function (module, exports, __webpack_require__) {

      "use strict";
      "use strict";

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      var ng1 = __webpack_require__( /*! angular */0);
      var core_1 = __webpack_require__( /*! ./src/core */2);
      var browser_1 = __webpack_require__( /*! ./src/browser */1);
      var ngTable = ng1.module('ngTable', [core_1['default'].name, browser_1['default'].name]);
      exports.ngTable = ngTable;
      __export(__webpack_require__( /*! ./src/core */2));
      __export(__webpack_require__( /*! ./src/browser */1));

      /***/
    }
    /******/
    ])
  );
});;
//# sourceMappingURL=ng-table.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("3IRH")(module)))

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

/***/ }),

/***/ "r7GB":
/***/ (function(module, exports) {

module.exports = "<ng-table-group-row>\n</ng-table-group-row>\n<ng-table-sorter-row>\n</ng-table-sorter-row>\n<ng-table-filter-row>\n</ng-table-filter-row>\n";

/***/ }),

/***/ "sebW":
/***/ (function(module, exports) {

module.exports = "<div class=\"ma-dropdown-item\">\n</div>\n";

/***/ }),

/***/ "xlo3":
/***/ (function(module, exports) {

module.exports = "<ma-checkbox type=\"checkbox\"\n  id=\"ck_all\"\n  ng-model=\"$tableCtrl.checkboxes.checked\"\n  class=\"select-all\"\n  ng-class=\"{\n  'has-sub' : $tableCtrl.tableParams.getSelected().length && $tableCtrl.tableParams.getSelected().length < $tableCtrl.tableParams.data.length\n}\"\n  value=\"\">\n</ma-checkbox>\n";

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

},["m1Gx"]);
//# sourceMappingURL=table.js.map