webpackJsonp([17],{

/***/ "7fJ5":
/***/ (function(module, exports) {

module.exports = "<div class=\"ma-tree-select transition-none\"\n  ng-disabled=\"disabled\">\n  <div class=\"custom-multi-select form-control ui-select-container ui-select-multiple select2 select2-container select2-container-multi ng-isolate-scope ng-not-empty ng-valid custom-tree-select custom-static-select\">\n\n    <div class=\"ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active select2-display-none\">\n      <div class=\"search-container select2-search\">\n        <div class=\"ma-input ma-input-search-normal\"\n          ng-disabled=\"disabled\">\n          <input type=\"text\"\n            autocomplete=\"off\"\n            autocorrect=\"off\"\n            autocapitalize=\"off\"\n            spellcheck=\"false\"\n            role=\"combobox\"\n            aria-expanded=\"true\"\n            aria-owns=\"ui-select-choices-0\"\n            aria-label=\"Select box\"\n            class=\"select2-input ui-select-search ng-pristine ng-valid ng-empty ng-touched\"\n            ng-model=\"$ctrl.searchKey\"\n            ng-disabled=\"disabled\"\n            ondrop=\"return false;\">\n        </div>\n      </div>\n      <ul tabindex=\"-1\"\n        ng-class=\"{'has-search': $ctrl.searchKey}\"\n        class=\"ui-select-choices ui-select-choices-content select2-results ng-scope\">\n\n      </ul>\n    </div>\n  </div>\n</div>\n";

/***/ }),

/***/ "BWKA":
/***/ (function(module, exports) {

module.exports = "<div class=\"ma-transfer\">\n  <div class=\"fl\">\n    <div class=\"ma-transfer-left-result\">\n      <ma-checkbox ng-disabled=\"disabled\"\n        ng-class=\"{\n          'has-sub': $ctrl.leftSub,\n        }\"\n        ng-model=\"$ctrl.leftCheckbox\">\n      </ma-checkbox>\n\n      <span class=\"ma-transfer-title\">{{leftTitle || '所有'}}</span>\n    </div>\n    <ma-tree ng-disabled=\"disabled\"\n      class=\"ma-transfer-left-tree\"\n      ng-model=\"$ctrl.leftSelected\"\n      ma-data=\"$ctrl.leftData\"\n      ma-value-key=\"{{valueKey}}\"\n      ma-sub-key=\"{{subKey}}\"\n      ma-text-key=\"{{textKey}}\"\n      ma-hide-items=\"$ctrl.leftHideItems\"></ma-tree>\n  </div>\n  <div class=\"fl ma-transfer-center\">\n    <div class=\"mb-20\">\n      <ma-button ng-disabled=\"$ctrl.leftButtonDisabled\"\n        ma-click=\"$ctrl.toRight($event)\">\n        <span>添加</span>\n        <ma-icon ma-type=\"arrowright\"></ma-icon>\n      </ma-button>\n    </div>\n    <div>\n      <ma-button ng-disabled=\"$ctrl.rightButtonDisabled\"\n        ma-click=\"$ctrl.toLeft($event)\">\n        <ma-icon ma-type=\"arrowleft\"></ma-icon>\n        <span>删除</span>\n      </ma-button>\n    </div>\n  </div>\n  <div class=\"fl\">\n    <div class=\"ma-transfer-right-result\">\n      <ma-checkbox ng-disabled=\"disabled\"\n        ng-class=\"{\n          'has-sub': $ctrl.rightSub,\n        }\"\n        ng-model=\"$ctrl.rightCheckbox\">\n      </ma-checkbox>\n\n      <span class=\"ma-transfer-title\">{{rightTitle || '选中'}}</span>\n    </div>\n    <ma-tree ng-disabled=\"disabled\"\n      class=\"ma-transfer-right-tree\"\n      ng-model=\"$ctrl.rightSelected\"\n      ma-data=\"$ctrl.rightData\"\n      ma-value-key=\"{{valueKey}}\"\n      ma-sub-key=\"{{subKey}}\"\n      ma-text-key=\"{{textKey}}\"\n      ma-show-items=\"$ctrl.rightShowItems\"></ma-tree>\n  </div>\n</div>\n";

/***/ }),

/***/ "e2Tx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("pL48");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("xEAJ");
__webpack_require__("s87f");

exports['default'] = _name2['default'];

/***/ }),

/***/ "oXUz":
/***/ (function(module, exports) {

module.exports = " {{each data}}\n {{if !$value._parent || renderSub}}\n<li class=\"ui-select-choices-row tree-level-{{$value._level}} {{$value._sub ? 'has-sub': ''}}\"\n  data-value=\"{{$value[valueKey]}}\"\n  data-from=\"{{$value._from}}\"\n  data-to=\"{{$value._to}}\">\n  <div class=\"select2-result-label ui-select-choices-row-inner\">\n    <div>\n      {{if $value._sub}}\n      <i class=\"tree-arrow-click\">\n        <i class=\"tree-arrow\"></i>\n      </i>\n      {{/if}}\n      <!-- <div class=\"click-mask\"></div> -->\n      <label class=\"ma-checkbox\">\n        <input type=\"checkbox\" />\n        <i class=\"ma-checkbox-appearance\"></i>\n        <span>{{$value[textKey]}}</span>\n      </label>\n    </div>\n  </div>\n</li>\n{{/if}}\n{{/each}}\n";

/***/ }),

/***/ "pL48":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.transfer2';

/***/ }),

/***/ "s87f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("pL48");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _maTreeTransfer2Tpl = __webpack_require__("BWKA");

var _maTreeTransfer2Tpl2 = _interopRequireDefault(_maTreeTransfer2Tpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maTreeTransfer2', maTreeTransfer2);

maTreeTransfer2.$inject = [];

function maTreeTransfer2() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      data: '=maData',
      model: '=ngModel',
      maModel: '=maModel',
      valueKey: '@maValueKey',
      textKey: '@maTextKey',
      subKey: '@maSubKey',
      disabled: '=ngDisabled',

      leftTitle: '@maLeftTitle',
      rightTitle: '@maRightTitle'
    },
    template: _maTreeTransfer2Tpl2['default'],
    controllerAs: '$ctrl',
    controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
      var $ctrl = this;

      $ctrl.searchKey = '';

      $ctrl.leftSub = false;
      $ctrl.leftCheckbox = false;

      $ctrl.leftButtonDisabled = true;
      $ctrl.rightButtonDisabled = true;

      $ctrl.rightSub = false;
      $ctrl.rightCheckbox = false;

      $ctrl.toRight = toRight;
      $ctrl.toLeft = toLeft;

      $ctrl.leftSelected = [];
      $ctrl.rightSelected = [];

      $ctrl.leftData = [];
      $ctrl.rightData = [];

      $ctrl.leftHideItems = [];
      $ctrl.rightShowItems = [];

      $scope.$watch('data', function (d) {
        // console.log('transfer2 data', d);
        updateLeftRigthData();
      });

      $scope.$watch('model', function (d) {
        console.log('transfer2 model', d);

        // 过滤掉父子同在
        var newModel = filterChild();

        if (newModel) {
          $scope.model = newModel;
          return;
        }

        $ctrl.leftHideItems = d || [];
        $ctrl.rightShowItems = d || [];

        if ($attrs.maModel) {
          $scope.maModel = getParentAndChild(d);
        }
      });

      $scope.$watch('$ctrl.leftCheckbox', function (d) {
        if ($scope.isSelectedChangeCheckbox) {
          $scope.isSelectedChangeCheckbox = false;
          return;
        }

        if (d === true) {
          $ctrl.leftSelected = 'all';
        }
        if (d === false) {
          $ctrl.leftSelected = [];
        }
      });

      $scope.$watch('$ctrl.rightCheckbox', function (d) {
        if ($scope.isSelectedChangeCheckbox) {
          $scope.isSelectedChangeCheckbox = false;
          return;
        }

        if (d === true) {
          $ctrl.rightSelected = 'all';
        }
        if (d === false) {
          $ctrl.rightSelected = [];
        }
      });

      $scope.$watch('$ctrl.leftSelected', function (d) {
        $ctrl.leftButtonDisabled = !(d && d.length);
        updateLeftSub();
      });

      $scope.$watch('$ctrl.rightSelected', function (d) {
        $ctrl.rightButtonDisabled = !(d && d.length);
        updateRightSub();
      });

      function updateLeftSub() {
        updateSub('left');
      }

      function updateRightSub() {
        updateSub('right');
      }

      function updateSub(direction) {
        var level0Items = (0, _jquery2['default'])($element).find('.ma-transfer-' + direction + '-tree.ma-tree-select .tree-level-0');
        var level0Values = [];
        var selected = $ctrl[direction + 'Selected'] || [];
        var count = 0;
        var len = 0;

        level0Items.each(function () {
          if (!(0, _jquery2['default'])(this).hasClass('hidden')) {
            level0Values.push((0, _jquery2['default'])(this).attr('data-value'));
          }
        });

        level0Values.forEach(function (d) {
          if (selected.indexOf(d) !== -1) {
            count++;
          }
          len++;
        });

        if (len > 0) {
          if (count > 0 && count < len) {
            $ctrl[direction + 'Sub'] = true;
          } else {
            $ctrl[direction + 'Sub'] = false;
          }
          if (count === len) {
            if ($ctrl[direction + 'Checkbox'] === false) {
              $ctrl[direction + 'Checkbox'] = true;
              $scope.isSelectedChangeCheckbox = true;
            }
          } else if ($ctrl[direction + 'Checkbox'] === true) {
            $ctrl[direction + 'Checkbox'] = false;
            $scope.isSelectedChangeCheckbox = true;
          }
        }
      }

      function toRight() {
        $scope.$broadcast('search.clear');
        if (angular.isNull($scope.model)) {
          $scope.model = [];
        }
        $scope.model = $scope.model.concat($ctrl.leftSelected);
        $ctrl.leftSelected = [];
        $ctrl.rightSelected = [];
        $ctrl.leftCheckbox = false;
        $ctrl.rightCheckbox = false;
      }

      function toLeft() {
        $scope.$broadcast('search.clear');
        if (angular.isNull($scope.model)) {
          $scope.model = [];
        }
        var oldModel = getModelWidthChild();
        var newModel = [];
        var selectWithChild = getSelectedWithChild();

        angular.each(oldModel, function (d) {
          if (selectWithChild.indexOf(d) === -1) {
            newModel.push(d);
          }
        });

        $scope.model = newModel;
        $ctrl.leftSelected = [];
        $ctrl.rightSelected = [];
        $ctrl.leftCheckbox = false;
        $ctrl.rightCheckbox = false;
      }

      function getModelWidthChild() {
        var model = $scope.model || [];
        var newModel = [];

        function getSub(items) {
          angular.each(items, function (d) {
            if (model.indexOf(d[$scope.valueKey] + '') !== -1) {
              if (d[$scope.subKey] && d[$scope.subKey].length) {
                pushSub(d[$scope.subKey]);
              } else {
                newModel.push(d[$scope.valueKey] + '');
              }
            } else {
              getSub(d[$scope.subKey]);
            }
          });
        }

        function pushSub(items) {
          angular.each(items, function (d) {
            if (d[$scope.subKey] && d[$scope.subKey].length) {
              pushSub(d[$scope.subKey]);
            } else {
              newModel.push(d[$scope.valueKey] + '');
            }
          });
        }

        getSub($scope.data);

        return newModel;
      }

      function getSelectedWithChild() {
        var newSelected = [];
        var selected = $ctrl.rightSelected || [];

        function checkSub(items) {
          angular.each(items, function (d) {
            var sub = d[$scope.subKey];
            if (selected.indexOf(d[$scope.valueKey] + '') !== -1 && sub && sub.length) {
              pushSub(sub);
            } else if (sub && sub.length) {
              checkSub(sub);
            }
          });
        }

        function pushSub(sub) {
          angular.each(sub, function (dd) {
            newSelected.push(dd[$scope.valueKey] + '');
            if (dd[$scope.subKey] && dd[$scope.subKey].length) {
              pushSub(dd[$scope.subKey]);
            }
          });
        }

        checkSub($scope.data);

        return selected.concat(newSelected);
      }

      function filterChild() {
        var selected = $scope.model || [];
        var newModel = [];
        var splicedArray = [];
        var sameCount = 0;

        function checkSub(items) {
          var subInLen = 0;
          angular.forEach(items, function (d) {
            if (selected.indexOf(d[$scope.valueKey] + '') !== -1) {
              newModel.push(d[$scope.valueKey] + '');
              subInLen++;
            } else {
              var sub = d[$scope.subKey];
              if (sub && sub.length) {
                var _subInLen = checkSub(sub);
                // 如果子全部在，就只存在父级
                if (_subInLen >= sub.length) {
                  newModel.push(d[$scope.valueKey] + '');
                  angular.each(sub, function (s) {
                    if (newModel.indexOf(s[$scope.valueKey] + '') !== -1) {
                      newModel.splice(newModel.indexOf(s[$scope.valueKey] + ''), 1);
                    }
                  });
                }
              }
            }
          });
          return subInLen;
        }

        checkSub($scope.data);

        newModel.forEach(function (d) {
          if (selected.indexOf(d) !== -1) {
            sameCount++;
          }
        });

        return sameCount < selected.length ? newModel : false;
      }

      function updateLeftRigthData() {
        var leftData = _jquery2['default'].extend(true, [], $scope.data);
        var rightData = _jquery2['default'].extend(true, [], $scope.data);

        $ctrl.leftData = leftData;
        $ctrl.rightData = rightData;
      }

      function getParentAndChild(selected) {
        var newSelected = [];

        function get(items) {
          angular.each(items, function (item) {
            if (selected.indexOf(item[$scope.valueKey] + '') !== -1) {
              var cItem = item;

              newSelected.push(item[$scope.valueKey] + '');

              while (cItem._parent) {
                if (newSelected.indexOf(cItem._parent[$scope.valueKey] + '') === -1) {
                  newSelected.push(cItem._parent[$scope.valueKey] + '');
                }
                cItem = cItem._parent;
              }

              getSub(item[$scope.subKey]);
            }

            if (item[$scope.subKey] && item[$scope.subKey].length) {
              get(item[$scope.subKey]);
            }
          });
        }

        function getSub(sub) {
          if (sub && sub.length) {
            angular.each(sub, function (item) {
              newSelected.push(item[$scope.valueKey] + '');
              getSub(item[$scope.subKey]);
            });
          }
        }

        get($ctrl.leftData);

        return newSelected;
      }
    }],
    link: function link(scope, element, attrs, ctrl) {
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

/***/ "xEAJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("pL48");

var _name2 = _interopRequireDefault(_name);

var _templateWeb = __webpack_require__("H+C6");

var _templateWeb2 = _interopRequireDefault(_templateWeb);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _maTreeTpl = __webpack_require__("7fJ5");

var _maTreeTpl2 = _interopRequireDefault(_maTreeTpl);

var _itemTpl = __webpack_require__("oXUz");

var _itemTpl2 = _interopRequireDefault(_itemTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maTree', maTree);

maTree.$inject = [];

function maTree() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      data: '=maData',
      model: '=ngModel',
      valueKey: '@maValueKey',
      textKey: '@maTextKey',
      subKey: '@maSubKey',
      disabled: '=ngDisabled',

      showItems: '=maShowItems',
      hideItems: '=maHideItems'
    },
    template: _maTreeTpl2['default'],
    controllerAs: '$ctrl',
    controller: ['$scope', '$element', function ($scope, $element) {
      var $ctrl = this;
      var contentTarget = (0, _jquery2['default'])($element).find('.ui-select-choices-content');
      var itemCls = '.ui-select-choices-row';
      var subStore = {};

      $ctrl.searchKey = '';

      $scope.$on('search.clear', function () {
        $ctrl.searchKey = '';
      });

      $scope.$watch('$ctrl.searchKey', function (d) {
        expandMatch(d);
      });
      $scope.$watch('disabled', updateDisabled);

      $scope.$watch('data', function (d) {
        var items = updateTree(d);

        $scope.newItems = items;
        renderContent(items);
      });

      $scope.$watch('showItems', function (d) {
        // console.log('show items', d);
        if (d) {
          updateHideShow();
        }
      });
      $scope.$watch('hideItems', function (d) {
        // console.log('hide items', d);
        if (d) {
          updateHideShow();
        }
      });

      $scope.$watch('model', function (d) {
        // console.log('tree model', d);

        // 全不选
        if (angular.isEmpty(d)) {
          contentTarget.find(itemCls).each(function () {
            // if (!$(this).hasClass('hidden')) {
            (0, _jquery2['default'])(this).find('input').prop('checked', false);
            // }
          });
          contentTarget.find('.ma-checkbox').removeClass('has-sub');
        }

        // 全选
        if (d === 'all') {
          var newModel = [];
          contentTarget.find(itemCls).each(function () {
            if (!(0, _jquery2['default'])(this).hasClass('hidden')) {
              (0, _jquery2['default'])(this).find('input').prop('checked', true);
              newModel.push((0, _jquery2['default'])(this).attr('data-value'));
            }
          });
          contentTarget.find('.ma-checkbox').removeClass('has-sub');

          $scope.model = newModel;
        }
      });

      function expandMatch(searchKey) {
        contentTarget.find('.search-match').removeClass('search-match');
        if (angular.isNull(searchKey)) {
          return;
        }

        var expands = [];
        var unexpand = [];

        $scope.newItems.forEach(function (d) {
          var item = d;

          if ((item[$scope.textKey] + '').indexOf(searchKey) !== -1 && item._from) {
            expands.push(item._from);
            while (item._parent && item._parent._from) {
              expands.push(item._parent._from);
              item = item._parent;
            }
          }
        });

        function doExpand() {
          expands.forEach(function (d) {
            var arrow = contentTarget.find(itemCls + '[data-to="' + d + '"] .tree-arrow-click');

            if (arrow.length) {
              if (!arrow.parent().hasClass('tree-open')) {
                arrow.trigger('click');
              }
            } else {
              unexpand.push(d);
            }
          });
          expands = unexpand;
          unexpand = [];
          if (expands.length) {
            doExpand();
          }
        }

        doExpand();

        // 设置match class
        $scope.newItems.forEach(function (d) {
          if ((d[$scope.textKey] + '').indexOf(searchKey) !== -1) {
            contentTarget.find(itemCls + '[data-value="' + (d[$scope.valueKey] + '') + '"]').addClass('search-match');
          }
        });
      }

      function updateDisabled() {
        if ($scope.disabled) {
          contentTarget.find('input, .ma-checkbox').attr('disabled', true);
        } else {
          contentTarget.find('input, .ma-checkbox').attr('disabled', false);
        }
      }

      function renderContent(data) {
        var items = (0, _jquery2['default'])(_templateWeb2['default'].render(_itemTpl2['default'], {
          data: data,
          textKey: $scope.textKey,
          valueKey: $scope.valueKey
        }));

        bindEvent(items);

        contentTarget.html(items);

        updateHideShow();
      }

      function updateHideShow() {
        // 如果有要隐藏的隐藏
        if ($scope.hideItems) {
          var parents = getParents($scope.hideItems);
          var childs = getChilds($scope.hideItems);

          contentTarget.find(itemCls).removeClass('hidden');
          $scope.hideItems.forEach(function (d) {
            var value = angular.isObject(d) ? d[$scope.valueKey] + '' : d;
            var item = contentTarget.find(itemCls + '[data-value="' + value + '"]');
            item.addClass('hidden');
          });
          childs.forEach(function (d) {
            contentTarget.find(itemCls + '[data-value="' + d + '"]').addClass('hidden');
          });
          parents.forEach(function (d) {
            contentTarget.find(itemCls + '[data-value="' + d + '"]').removeClass('hidden');
          });
        }

        // 如果有要现实的显示
        if ($scope.showItems) {
          var _parents = getParents($scope.showItems);
          var _childs = getChilds($scope.showItems);

          contentTarget.find(itemCls).addClass('hidden');

          $scope.showItems.forEach(function (d) {
            var value = angular.isObject(d) ? d[$scope.valueKey] + '' : d;
            var item = contentTarget.find(itemCls + '[data-value="' + value + '"]');

            item.removeClass('hidden');
          });

          _parents.concat(_childs).forEach(function (d) {
            contentTarget.find(itemCls + '[data-value="' + d + '"]').removeClass('hidden');
          });
        }
      }

      function getChilds(itemValues) {
        var childs = [];
        angular.each($scope.newItems, function (d) {
          if (itemValues.indexOf(d[$scope.valueKey] + '') !== -1) {
            getChild(d);
          }
        });

        function getChild(item) {
          var sub = item[$scope.subKey];
          if (sub && sub.length) {
            sub.forEach(function (d) {
              childs.push(d[$scope.valueKey] + '');
              getChild(d);
            });
          }
        }
        return childs;
      }

      function getParents(itemValues) {
        var parents = [];
        angular.each($scope.newItems, function (d) {
          if (itemValues.indexOf(d[$scope.valueKey] + '') !== -1) {
            var item = d;
            while (item._parent) {
              parents.push(item._parent[$scope.valueKey] + '');
              item = item._parent;
            }
          }
        });
        return parents;
      }

      function toggleTree(e) {
        if ($scope.disabled) {
          return;
        }

        var target = (0, _jquery2['default'])(e.target);
        var item = target.parents(itemCls);
        var to = item.attr('data-to');
        var froms = contentTarget.find(itemCls + '[data-from="' + to + '"]');
        var fromChilds = contentTarget.find(itemCls + '[data-from*="' + to + '_"]');

        if (!froms.length) {
          froms = (0, _jquery2['default'])(_templateWeb2['default'].render(_itemTpl2['default'], {
            data: subStore[to],
            textKey: $scope.textKey,
            valueKey: $scope.valueKey,
            renderSub: true
          }));
          froms.insertAfter(item);
          bindEvent(froms, item);
          updateHideShow();
        } else {
          froms.toggleClass('hide');
          fromChilds.toggleClass('child-hide');
        }
        target.parent().toggleClass('tree-open');
      }

      function bindEvent(items, parent) {
        items.find('.tree-arrow-click').on('click', toggleTree);
        items.find('input[type="checkbox"]').on('change', function (e) {
          checkedSub((0, _jquery2['default'])(e.target).parents(itemCls).attr('data-to'), e.target.checked);
          checkedParent((0, _jquery2['default'])(e.target).parents(itemCls).attr('data-from'), e.target.checked);
          updateModel();
        });
        if (parent) {
          checkedSub(parent.attr('data-to'), parent.find('input').prop('checked'));
        }
        updateDisabled();
      }

      function updateModel() {
        // console.log('update model');
        var newModel = [];
        var selectedes = contentTarget.find('input:checked');

        selectedes.each(function () {
          var item = (0, _jquery2['default'])(this).parents(itemCls);
          var from = item.attr('data-from');
          var parent = contentTarget.find(itemCls + '[data-to="' + from + '"]');
          var parentValue = parent.attr('data-value');

          if (hasParentSelected(item)) {
            return true;
          }
          newModel.push(item.attr('data-value'));
          return true;
        });

        $scope.$applyAsync(function () {
          $scope.model = newModel;
        });
      }

      function hasParentSelected(item) {
        var from = item.attr('data-from');
        var parent = contentTarget.find(itemCls + '[data-to="' + from + '"]');
        var ret = false;

        ret = !!(from && parent.length && parent.find('input').prop('checked'));

        if (ret === false && from && parent.attr('data-from')) {
          ret = hasParentSelected(parent);
        }

        return ret;
      }

      function checkedSub(to, checked) {
        if (to) {
          var items = contentTarget.find(itemCls + '[data-from="' + to + '"]');
          var item = contentTarget.find(itemCls + '[data-to="' + to + '"]');

          items.each(function () {
            if (!(0, _jquery2['default'])(this).hasClass('hidden')) {
              (0, _jquery2['default'])(this).find('input').prop('checked', checked);
              checkedSub((0, _jquery2['default'])(this).attr('data-to'), checked);
            }
          });
          item.find('.ma-checkbox').removeClass('has-sub');
        }
      }

      function checkedParent(from) {
        if (from) {
          var items = contentTarget.find(itemCls + '[data-to="' + from + '"]');
          var maCheckbox = items.find('.ma-checkbox');
          var data = getSubCheckedCount(from);

          maCheckbox.removeClass('has-sub');
          if (data.count <= 0) {
            items.find('input').prop('checked', false);
            if (data.sub) {
              maCheckbox.addClass('has-sub');
            }
          } else if (data.count >= data.total) {
            items.find('input').prop('checked', true);
          } else {
            items.find('input').prop('checked', false);
            maCheckbox.addClass('has-sub');
          }

          checkedParent(items.attr('data-from'));
        }
      }

      function getSubCheckedCount(from) {
        var items = contentTarget.find(itemCls + '[data-from="' + from + '"]');
        var count = 0;
        var total = 0;
        var sub = 0;

        items.each(function () {
          if (!(0, _jquery2['default'])(this).hasClass('hidden')) {
            if ((0, _jquery2['default'])(this).find('input').prop('checked')) {
              count++;
            }
            if ((0, _jquery2['default'])(this).find('.ma-checkbox').hasClass('has-sub')) {
              sub++;
            }
            total++;
          }
        });
        return {
          total: total,
          count: count,
          sub: sub
        };
      }

      function updateTree(items) {
        var newItems = [];
        var subKey = $scope.subKey;

        subStore = {};

        function getSub(items, parentItem, treeLevel) {
          angular.each(items, function (d) {
            var item = d;

            newItems.push(item);

            item._level = treeLevel;

            if (item[subKey] && item[subKey].length) {
              item.tagId = parentItem ? parentItem.tagId + '_' + angular.uuid() : 'tag_' + angular.uuid();
              item._to = item.tagId;
              item._sub = true;
              subStore[item.tagId] = item[subKey];
              angular.forEach(item[subKey], function (it) {
                it._parent = item;
                it._from = item.tagId;
              });
              getSub(item[subKey], item, treeLevel + 1);
            }
          });
        }
        getSub(items, null, 0);
        return newItems;
      }
    }],
    link: function link(scope, element, attrs, ctrl) {
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

/***/ })

},["e2Tx"]);
//# sourceMappingURL=transfer2.js.map