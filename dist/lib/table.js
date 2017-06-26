webpackJsonp([1,3,6,11,22,26,27],{

/***/ "+Ovo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

      clear: '=maClear'
    },
    template: _maInputTpl2['default'],
    controllerAs: '$ctrl',
    controller: ['$scope', function ($scope) {
      this.clearClick = function () {
        $scope.model = '';
      };
    }],
    link: function link(scope, element, attrs, ctrl) {}
  };
}

maNum.$inbject = ['$filter', '$timeout', '$parse'];

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

module.exports = "<div class=\"ma-table\">\n  <div class=\"data-table\">\n\n    <script type=\"text/ng-template\"\n      id=\"headerCheckbox.html\">\n      <ma-checkbox type=\"checkbox\"\n        id=\"ck_all\"\n        ng-model=\"$tableCtrl.checkboxes.checked\"\n        class=\"select-all\"\n        ng-class=\"{\n          'has-sub' : $tableCtrl.tableParams.getSelected().length && $tableCtrl.tableParams.getSelected().length < $tableCtrl.tableParams.data.length\n        }\"\n        value=\"\">\n      </ma-checkbox>\n    </script>\n    <script type=\"text/ng-template\"\n      id=\"header1.html\">\n      <ng-table-group-row>\n      </ng-table-group-row>\n      <ng-table-sorter-row>\n      </ng-table-sorter-row>\n      <ng-table-filter-row>\n      </ng-table-filter-row>\n    </script>\n    <!-- class=\"col-md-6\" -->\n    <div>\n\n      <!-- 左边漂浮 table -->\n      <div class=\"float-left-table\"\n        style=\"width: {{$tableCtrl.floatLeftBoxWidth}}px; height: {{$tableCtrl.floatTableHeight}}px;\"\n        ng-show=\"$tableCtrl.floatLeftCols.length\">\n        <div style=\"width: {{$tableCtrl.floatTableWidth}}px;\">\n          <table template-header='header1.html'\n            ng-table-dynamic=\"$tableCtrl.tableParams with $tableCtrl.cols\"\n            class=\"table table-condensed table-bordered table-striped\">\n            <colgroup ng-if=\"$tableCtrl.colsGroup && $tableCtrl.colsGroup.length == $tableCtrl.cols.length\">\n              <col ng-repeat=\"group in $tableCtrl.colsGroup\"\n                width=\"{{group.width}}\"\n                align=\"{{group.align}}\"\n                valign=\"{{group.valign}}\"\n                ng-style=\"{{group.styles}}\" />\n            </colgroup>\n            <!-- <tr ng-repeat=\"row in $tableCtrl.$data\"> -->\n            <tr ng-repeat=\"row in $data\"\n              ng-class='$tableCtrl.getClass(row)'>\n\n              <td ng-repeat=\"col in $columns\"\n                ng-switch=\"col.field\"\n                ng-class='col.colClass'>\n                <!-- <input ng-switch-when=\"selector\" type=\"checkbox\" ng-model=\"$tableCtrl.checkboxes.items[row[$tableCtrl.dataflagId]]\"/> -->\n                <div ng-switch-when=\"selector\">\n                  <ma-checkbox id=\"ck_{{row.id}}\"\n                    type=\"checkbox\"\n                    ng-model=\"$tableCtrl.checkboxes.items[row[$tableCtrl.dataflagId]]\">\n                  </ma-checkbox>\n                </div>\n\n\n                <div ng-if='col.render'\n                  common-table-col-render=\"col.render(this, row)\"></div>\n\n                <div ng-if='!col.render && col.customHtml'\n                  ng-bind-html=\"col.customHtml(this, row)\"></div>\n\n                <div ng-if='!col.render && !col.customHtml'>\n                  <span ng-switch-default>{{row[col.field]}}</span>\n                </div>\n              </td>\n\n            </tr>\n          </table>\n        </div>\n      </div>\n\n\n      <!-- 右边漂浮 table -->\n      <div class=\"float-right-table\"\n        style=\"width: {{$tableCtrl.floatRightBoxWidth}}px; height: {{$tableCtrl.floatTableHeight}}px;\"\n        ng-show=\"$tableCtrl.floatRightCols.length\">\n\n        <div style=\"width: {{$tableCtrl.floatTableWidth}}px;\">\n          <table template-header='header1.html'\n            ng-table-dynamic=\"$tableCtrl.tableParams with $tableCtrl.cols\"\n            class=\"table table-condensed table-bordered table-striped\">\n            <colgroup ng-if=\"$tableCtrl.colsGroup && $tableCtrl.colsGroup.length == $tableCtrl.cols.length\">\n              <col ng-repeat=\"group in $tableCtrl.colsGroup\"\n                width=\"{{group.width}}\"\n                align=\"{{group.align}}\"\n                valign=\"{{group.valign}}\"\n                ng-style=\"{{group.styles}}\" />\n            </colgroup>\n            <!-- <tr ng-repeat=\"row in $tableCtrl.$data\"> -->\n            <tr ng-repeat=\"row in $data\"\n              ng-class='$tableCtrl.getClass(row)'>\n\n              <td ng-repeat=\"col in $columns\"\n                ng-switch=\"col.field\"\n                ng-class='col.colClass'>\n                <!-- <input ng-switch-when=\"selector\" type=\"checkbox\" ng-model=\"$tableCtrl.checkboxes.items[row[$tableCtrl.dataflagId]]\"/> -->\n                <div ng-switch-when=\"selector\">\n                  <ma-checkbox id=\"ck_{{row.id}}\"\n                    ng-model=\"$tableCtrl.checkboxes.items[row[$tableCtrl.dataflagId]]\">\n                  </ma-checkbox>\n                </div>\n\n\n                <div ng-if='col.render'\n                  common-table-col-render=\"col.render(this, row)\"></div>\n\n                <div ng-if='!col.render && col.customHtml'\n                  ng-bind-html=\"col.customHtml(this, row)\"></div>\n\n                <div ng-if='!col.render && !col.customHtml'>\n                  <span ng-switch-default>{{row[col.field]}}</span>\n                </div>\n              </td>\n\n            </tr>\n          </table>\n        </div>\n      </div>\n\n      <div class=\"main-table-container\">\n        <table template-header='header1.html'\n          ng-table-dynamic=\"$tableCtrl.tableParams with $tableCtrl.cols\"\n          class=\"table table-condensed table-bordered table-striped main-table\"\n          ng-class=\"{'has-float-table': $tableCtrl.floatLeftCols.length || $tableCtrl.floatRightCols.length}\"\n          style=\"width: {{$tableCtrl.tableWidth && $tableCtrl.tableWidth > $tableCtrl.mainContainerWidth ? $tableCtrl.tableWidth + 'px' : '100%'}}\">\n          <colgroup ng-if=\"$tableCtrl.colsGroup && $tableCtrl.colsGroup.length == $tableCtrl.cols.length\">\n            <col ng-repeat=\"group in $tableCtrl.colsGroup\"\n              width=\"{{group.width}}\"\n              align=\"{{group.align}}\"\n              valign=\"{{group.valign}}\"\n              ng-style=\"{{group.styles}}\" />\n          </colgroup>\n          <!-- <tr ng-repeat=\"row in $tableCtrl.$data\"> -->\n          <tr ng-repeat=\"row in $data\"\n            ng-class='$tableCtrl.getClass(row)'>\n\n            <td ng-repeat=\"col in $columns\"\n              ng-switch=\"col.field\"\n              ng-class='col.colClass'>\n              <!-- <input ng-switch-when=\"selector\" type=\"checkbox\" ng-model=\"$tableCtrl.checkboxes.items[row[$tableCtrl.dataflagId]]\"/> -->\n              <div ng-switch-when=\"selector\">\n                <ma-checkbox id=\"ck_{{row.id}}\"\n                  ng-model=\"$tableCtrl.checkboxes.items[row[$tableCtrl.dataflagId]]\">\n                </ma-checkbox>\n              </div>\n\n\n              <div ng-if='col.render'\n                common-table-col-render=\"col.render(this, row)\"></div>\n\n              <div ng-if='!col.render && col.customHtml'\n                ng-bind-html=\"col.customHtml(this, row)\"></div>\n\n              <div ng-if='!col.render && !col.customHtml'>\n                <span ng-switch-default>{{row[col.field]}}</span>\n              </div>\n            </td>\n\n          </tr>\n\n          <tr ng-if=\"$data.length <= 0\">\n            <td colspan=\"{{$columns.length}}\"\n              style=\"text-align:center;\">暂无数据</td>\n          </tr>\n        </table>\n      </div>\n      <!-- <script type=\"text/ng-template\" id=\"templatePagination.html\"> -->\n      <form class=\"form-inline\"\n        novalidate\n        ng-show=\"$tableCtrl.enablePagination\">\n        <div class=\"form-group\">\n          <span>跳至第</span>\n          <input class=\"form-control\"\n            id=\"page\"\n            min=\"1\"\n            placeholder=\"\"\n            ng-model=\"$tableCtrl.nextPageNum\"\n            ng-init=\"1\"\n            ng-enter=\"$tableCtrl.changePage($tableCtrl.nextPageNum)\">\n          <span>页</span>\n        </div>\n        <div class=\"form-group page-select-form-group\">\n          <!--         <select id=\"pageSizeBinding\" class=\"form-control\" ng-model=\"$tableCtrl.newPageSize\" ng-init=\"$tableCtrl.newPageSize=$tableCtrl.PageSize[0]\" ng-options=\"size + '条/页 ' for size in $tableCtrl.PageSize\" ng-change=\"$tableCtrl.changePageSize($tableCtrl.newPageSize)\"></select> -->\n\n          <ma-select id=\"pageSizeBinding\"\n            class=\"form-control\"\n            ng-model=\"$tableCtrl.newPageSize\"\n            ma-data=\"$tableCtrl._PageSize\"></ma-select>\n\n          <!-- <i class=\"page-select-arrow\"></i> -->\n        </div>\n      </form>\n      <!-- </script> -->\n    </div>\n\n    <div class=\"loading data-table-loading\"\n      ng-class=\"{show: $tableCtrl.isLoading}\">\n      <ma-spin ma-size=\"50\"></ma-spin>\n    </div>\n  </div>\n</div>\n";

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

module.exports = "<div class=\"ma-input\">\n  <input\n    ng-show=\"type !== 'textarea'\"\n    type=\"{{type}}\"\n    ng-model=\"model\"\n    maxlength=\"{{maxlength}}\"\n    placeholder=\"{{placeholder}}\"\n    accept=\"{{accept}}\"\n    pattern=\"{{pattern}}\"\n    min=\"{{min}}\"\n    max=\"{{max}}\"\n    step=\"{{step}}\"\n    ng-readonly=\"readonly\"\n    ng-disabled=\"disabled\"\n  />\n\n  <textarea\n    ng-show=\"type === 'textarea'\"\n    type=\"{{type}}\"\n    ng-model=\"model\"\n    maxlength=\"{{maxlength}}\"\n    placeholder=\"{{placeholder}}\"\n    accept=\"{{accept}}\"\n    pattern=\"{{pattern}}\"\n    min=\"{{min}}\"\n    max=\"{{max}}\"\n    step=\"{{step}}\"\n    ng-readonly=\"readonly\"\n    ng-disabled=\"disabled\"\n  ></textarea>\n\n  <ma-icon\n    class=\"clear\"\n    ng-show=\"clear && model\"\n    ma-type=\"close\"\n    ma-click=\"$ctrl.clearClick($event)\"\n  ></ma-icon>\n\n  <div ng-transclude></div>\n</div>\n";

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

__webpack_require__("RFlv");

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

var _maDropdownTpl = __webpack_require__("lQqW");

var _maDropdownTpl2 = _interopRequireDefault(_maDropdownTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maDropdown', maDropdown);

maDropdown.$inject = ['$timeout'];

function maDropdown($timeout) {
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
        var container = (0, _jquery2['default'])(containerCls);
        var ww = (0, _jquery2['default'])(window).width();
        var wh = (0, _jquery2['default'])(window).height();
        var offset = (0, _jquery2['default'])(element).find(containerCls).offset();

        if (d) {
          $timeout.cancel(showTimeout);
          if (offset.left + container.width() > ww) {
            container.parent().addClass('right');
          }
          if (offset.top + container.height() > wh) {
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

      scope.textKey = 'text';
      scope.valueKey = 'value';
      attrs.$observe('maTextKey', function (d) {
        scope.textKey = d || 'text';
      });
      attrs.$observe('maValueKey', function (d) {
        scope.valueKey = d || 'value';
      });

      scope.$watch('data', function (d) {
        checkCheckbox();
      });
      scope.$watch('searchKey', function (d) {
        checkCheckbox();
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
          }
        }

        scope._activeItems = _activeItems;

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
          $timeout();
        }
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
    }
  };
}

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
        e.stopPropagation();
      });

      (0, _jquery2['default'])('body').on('click', function () {
        $ctrl.showDropDown = false;
        $timeout();
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

      scope.textKey = 'text';
      scope.valueKey = 'value';
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
          if (scope.$odd !== undefined || scope.$even !== undefined || scope.$last !== undefined || scope.$index !== undefined || scope.$middle !== undefined) {
            scope.$event = e;
            scope.$parent.$eval(attrs.maClick, scope);
          } else {
            scope.$event = e;
            scope.$eval(attrs.maClick, scope);
          }
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

/***/ "TDH+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

maTableController.$inject = ['NgTableParams', '$scope', '$element', '$interpolate', '$sce', '$table', '$timeout', '$attrs'];

function maTableController(NgTableParams, $scope, $element, $interpolate, $sce, $table, $timeout, $attrs) {
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
  self.getClass = function (row) {
    return (self.checkboxes.items[row[self.dataflagId]] ? 'selected-row' : '') + ' ' + ($scope.tableConfig.rowCustomClass ? $scope.tableConfig.rowCustomClass : '');
  };
  self.evtAgent = $scope.tableConfig.evtAgent ? $scope.tableConfig.evtAgent : [];
  self.dataflagId = $scope.tableConfig.dataflagId ? $scope.tableConfig.dataflagId : 'id';
  self.count = $scope.tableConfig.count ? $scope.tableConfig.count : 10;
  self.sorting = $scope.tableConfig.sorting ? $scope.tableConfig.sorting : {};
  self.PageSize = $scope.tableConfig.counts ? $scope.tableConfig.counts : [10, 20, 30];
  self.enableCheckbox = angular.isNull($scope.tableConfig.enablePagination) ? false : $scope.tableConfig.enableCheckbox;
  self.enablePagination = angular.isNull($scope.tableConfig.enablePagination) ? true : $scope.tableConfig.enablePagination;
  self.dataset = $scope.tableConfig.dataset ? $scope.tableConfig.dataset : [];
  self.colsGroup = $scope.tableConfig.colsGroup ? $scope.tableConfig.colsGroup : [];

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
  self.tableParams = new NgTableParams({
    count: self.count,
    sorting: self.sorting,
    page: self.page,
    templateHeader: 'header1.html'
  }, {
    counts: [],
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
        deferred.then(function () {
          self.isLoading = false;
          setFloatTable();
        }, function () {
          self.isLoading = false;
          setFloatTable();
        });
      } else {
        self.isLoading = false;
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
  });

  // 计算漂浮 table 的宽度
  (0, _jquery2['default'])(window).bind('resize', setFloatTable);

  $timeout(function () {
    setFloatTable();
  }, 50);
  $timeout(function () {
    setFloatTable();
  }, 100);

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
      console.error('table 不存在');
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

  angular.extend($validationProvider, {
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

var _maTableController = __webpack_require__("TDH+");

var _maTableController2 = _interopRequireDefault(_maTableController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maTable', maTable).directive('commonTableColRender', commonTableColRender).directive('ngEnter', ngEnter);

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
      scope.$watch(function (scope) {
        return scope.$eval(attrs.commonTableColRender, scope);
      }, function (value) {
        value += '';
        value = value.replace(/ng-click="/g, 'ng-click="$parent.$parent.$parent.$parent.$parent.$parent.');
        value = value.replace(/cm-click="/g, 'ng-click="$parent.$parent.$parent.$parent.$parent.$parent.');

        element.html(value);
        $compile(element.contents())(scope);
      });
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

/***/ }),

/***/ "lQqW":
/***/ (function(module, exports) {

module.exports = "<div class=\"ma-dropdown\">\n  <div ng-transclude></div>\n  <div class=\"ma-dropdown-container\"\n    ng-class=\"{\n      show: show || static == 'true'\n    }\"\n    >\n    <div\n      class=\"ma-dropdown-search-bar\"\n      ng-show=\"searchBar == 'true'\"\n    >\n      <ma-input\n        ng-model=\"searchKey\"\n        class=\"ma-input-search-normal\"\n      ></ma-input>\n    </div>\n    <div class=\"ma-dropdown-item null-text\" ng-if=\"(nullText || nullText == 'true') && data.length <= 0\">{{nullText == 'true' ? '暂无数据' : nullText}}</div>\n\n    <div class=\"ma-dropdown-container-content\">\n      <div\n        class=\"ma-dropdown-item\"\n        ng-repeat=\"item in data | filter : searchKey\"\n        ma-click=\"_itemClick($event, item)\"\n        ng-class=\"{\n          active: _activeItems.indexOf(item[valueKey]) !== -1,\n          'is-multiple': multiple == 'true',\n          hide: item.hide === true\n        }\"\n        >\n          <ma-checkbox\n            ng-disabled=\"disabled\"\n            ng-show=\"multiple == 'true'\"\n            ng-model=\"item.checked\"\n          >\n            <span ng-bind-html=\"item[textKey]\"></span>\n          </ma-checkbox>\n\n          <span\n            ng-show=\"multiple != 'true'\"\n            ng-bind-html=\"item[textKey]\"\n          ></span>\n\n      </div>\n    </div>\n\n    <div\n      class=\"ma-dropdown-buttons\"\n      ng-show=\"clear == 'true'\"\n      ma-click=\"$ctrl.clearValue()\"\n    >\n      <ma-button\n        ma-size=\"mini\"\n        ma-type=\"primary\"\n      >清空</ma-button>\n    </div>\n  </div>\n</div>\n";

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

__webpack_require__("NDM6");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], ['ngTable', _checkbox2['default'], _select2['default']]).config(function () {}).run(function () {});

__webpack_require__("kAur");
__webpack_require__("WMQu");

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