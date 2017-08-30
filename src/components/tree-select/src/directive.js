import moduleName from './name.js';
import $ from 'jquery';
import debounce from 'debounce';
import multiSelectTpl from './multiSelectTpl.html';
import itemTpl from './itemTpl.html';

import 'ui-select';
import './util.js';

angular.module(moduleName)
  .directive('maTreeSelect', maTreeSelect)
  .directive('cmultiselect', cmultiselect);

maTreeSelect.$inject = ['$treeSelect'];

function maTreeSelect($treeSelect) {
  return {
    restrict: 'E',
    replace: true,
    template: `<div class="ma-tree-select">
      <cmultiselect
        tree
        ng-model="model"
        ng-items="newItems"
        search-enabled="search"
        limit="{{limit}}"
        ng-disabled="disabled"
        placeholder="{{placeholder}}"
        clear="{{clear}}"
        static="{{static}}"
      >
      </cmultiselect>
    </div>`,
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
      static: '@maStatic',
    },
    controller: ['$scope', '$element', function($scope, $element) {
      $scope.newItems = [];

      $scope.$watch('items', data => {
        const newItems = [];

        angular.each(data, d => {
          newItems.push(d);
          setContent(newItems[newItems.length - 1]);
        });

        $scope.newItems = newItems;

        function setContent(item) {
          item.text = item[$scope.textKey];
          item.value = item[$scope.valueKey];
          item.sub = item[$scope.subKey];

          if (item.sub && item.sub.length) {
            angular.each(item.sub, (dd) => {
              setContent(dd);
            });
          }
        }
      });

      $scope.$watch('model', function(d) {
        // 设置带父级的model数据
        if ($($element).attr('ma-model')) {
          $scope.maModel = getWithParent(d);
        }
      });

      function getWithParent(data) {
        const selected = [];
        const selectedIds = [];

        if (data && data.length) {
          angular.each(data, d => {
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
    link: function(scope, element, attrs, ctrl) {
      scope.textKey = attrs.maTextKey || 'text';
      scope.valueKey = attrs.maValueKey || 'value';
      scope.subKey = attrs.maSubKey || 'sub';

      attrs.$observe('maTextKey', d => {
        scope.textKey = d || 'text';
      });
      attrs.$observe('maValueKey', d => {
        scope.valueKey = d || 'value';
      });
      attrs.$observe('maSubKey', d => {
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
      static: '@static',
      ngModel: '=ngModel',
      ngItems: '=ngItems',
    },
    replace: true,
    template: multiSelectTpl,
    controllerAs: '$select',
    link: function(scope, element, attrs, controller) {
      var $select = scope.$select;

      $select._multiselectId = angular.uuid();
      element.attr('data-id', $select._multiselectId);

      element.bind('click', (e) => {
        // e.stopPropagation();
      });


      attrs.$observe('tree', function(d) {
        scope.$select.isTree = true;
      });

      attrs.$observe('clear', function(d) {
        scope.$select.clear = d;
      });

      attrs.$observe('static', function(d) {
        scope.$select.isStatic = d == 'true';
      });

      // attrs.$observe('ngItems', function(d) {
      //   scope.$select.selectItems = $parse(d)(scope.$parent);
      // })
      attrs.$observe('searchEnabled', function(d) {
        scope.$select.searchEnabled = $parse(d)(scope.$parent);
      });

      attrs.$observe('limit', function(d) {
        scope.$select.limit = parseInt($parse(d)(scope.$parent), 10);
      });

      attrs.$observe('placeholder', function(d) {
        scope.$select.placeholder = d;
      });

      // 计算位置
      var dropdown = null;
      var directionUpClassName = 'direction-up';

      var setDropdownPosUp = function(offset, offsetDropdown) {
        offset = offset || uisOffset(element);
        offsetDropdown = offsetDropdown || uisOffset(dropdown);

        dropdown[0].style.position = 'absolute';
        dropdown[0].style.top = (offsetDropdown.height * -1) + 'px';
        element.addClass(directionUpClassName);
      };

      var uisOffset = function(element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0]
            .documentElement.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[
            0].documentElement.scrollLeft)
        };
      };

      var setDropdownPosDown = function(offset, offsetDropdown) {
        element.removeClass(directionUpClassName);

        offset = offset || uisOffset(element);
        offsetDropdown = offsetDropdown || uisOffset(dropdown);

        dropdown[0].style.position = '';
        dropdown[0].style.top = '';
      };

      var calculateDropdownPosAfterAnimation = function() {
        // Delay positioning the dropdown until all choices have been added so its height is correct.
        $timeout(function() {
          if ($select.dropdownPosition === 'up') {
            // Go UP
            setDropdownPosUp();
          } else {
            // AUTO
            element.removeClass(directionUpClassName);

            var offset = uisOffset(element);
            var offsetDropdown = uisOffset(dropdown);

            // https://code.google.com/p/chromium/issues/detail?id=342307#c4
            var scrollTop = $document[0].documentElement.scrollTop ||
              $document[0].body.scrollTop; // To make it cross browser (blink, webkit, IE, Firefox).

            // Determine if the direction of the dropdown needs to be changed.
            if (offset.top + offset.height + offsetDropdown.height >
              scrollTop + $document[0].documentElement.clientHeight) {
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

      scope.calculateDropdownPos = function() {
        // if ($select.open) {
        dropdown = angular.element(element).querySelectorAll(
          '.ui-select-dropdown');

        if (dropdown.length === 0) {
          return;
        }

        // Hide the dropdown so there is no flicker until $timeout is done executing.
        // if ($select.search === '' && !opened) {
        //   dropdown[0].style.opacity = 0;
        //   opened = true;
        // }

        if (!uisOffset(dropdown).height && $select.$animate && $select.$animate
          .on && $select.$animate.enabled(dropdown)) {
          var needsCalculated = true;

          $select.$animate.on('enter', dropdown, function(elem, phase) {
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
    controller: ['$scope', '$timeout', '$compile', '$element', function($scope, $timeout, $compile,
      $element) {
      const _this = this;
      const $select = this;
      const updateStatus = debounce(_updateStatus, 0);
      const updateHtmlItems = debounce(_updateHtmlItems, 0);

      this.searchEnabled = false;

      this.open = false;

      this.disabled = false;

      this.search = '';

      this.openedItems = [];


      function bodyClick(e) {
        if (_this._multiselectId != $(e.target).parents(
            '.custom-multi-select').attr('data-id') || $(e.target).hasClass(
            'select2-choices')) {
          $scope.$applyAsync(() => {
            _this.open = false;
          });
        }
      }

      $scope.$on('$destroy', function() {
        $('body').unbind('click', bodyClick);
      });

      $('body').bind('click', bodyClick);

      $scope.$watch('selectDisabled', function(d) {
        $scope.$select.selectDisabled = d;
      });

      $scope.$watch('ngItems', function(d, p) {
        var items = $.extend([], d);
        var newItems = [];

        function getSub(items, parentItem, treeLevel) {
          angular.forEach(items, function(item) {
            newItems.push(item);

            item._treeLevel = treeLevel;

            if (item.sub && item.sub.length) {
              item.tagId = parentItem ? parentItem.tagId + '_' +
                angular.uuid() : 'treeTag_' + angular.uuid();
              item._treeLinkTo = item.tagId;
              angular.forEach(item.sub, function(it) {
                it._parent = item;
                it._treeLinkFrom = item.tagId;
              });
              getSub(item.sub, item, treeLevel + 1);
            }
          });
        }
        getSub(items, null, 0);

        $scope.$select.selectItems = newItems;

        $scope.$select.fixSelected();
        updateHtmlItems();
      });


      $scope.$watch('ngModel', function(d, p) {
        if ($scope.isFixSelected) {
          return;
        }

        $scope.$select.fixSelected();

        let hasOther = false;

        function setSelectedFalse(items) {
          angular.forEach(items, function(d) {
            d._selected = false;
            if (d.sub && d.sub.length) {
              setSelectedFalse(d.sub);
            }
          });
        }

        setSelectedFalse($scope.$select.selectItems);

        angular.forEach(d, function(dd) {
          if (angular.isObject(dd)) {
            dd._selected = true;
          } else {
            hasOther = true;
          }
        });

        if (hasOther) {
          return;
        }

        updateStatus();
      });

      this.fixSelected = () => {
        // 纠正选中值
        if ($scope.ngModel && $scope.ngModel.length && !$scope.ngModel[
            0].$$hashKey) {
          $scope.$applyAsync(() => {
            let selectValues = [];

            angular.forEach($scope.ngModel, d => {
              selectValues.push(typeof d !== 'object' ? d : d.value);
            });

            let ngModel = [];

            angular.forEach(this.selectItems, d => {
              if (selectValues.indexOf(d.value) !== -1) {
                ngModel.push(d);
                d._selected = true;
              }
            });

            $scope.ngModel = ngModel;
          });
          $scope.isFixSelected = true;
          $timeout(() => {
            $scope.isFixSelected = false;
          });
        }

        updateStatus();
      };

      this.clearSelect = () => {
        $scope.ngModel = undefined;
        this.open = false;
      };

      this.showSelect = () => {
        if ($scope.selectDisabled) {
          return;
        }

        if (this.open) {
          return;
        }
        if (this.isStatic) {
          return;
        }

        this.search = '';


        $scope.calculateDropdownPos();
        $timeout(() => {
          this.open = true;
        }, 50);
      };

      this.removeChoice = (item, $event) => {
        $event.stopPropagation();

        let newSelected = [];
        angular.forEach($scope.ngModel, (d, k) => {
          if (d !== item) {
            newSelected.push(d);
          }
        });

        $scope.ngModel = newSelected;
      };

      this.getParents = function(item) {
        let parents = [];

        function getParent(p) {
          if (p) {
            parents.push(p);
            getParent(p._parent);
          }
        }

        getParent(item._parent);


        return parents;
      };

      this.doSelect = ($event, item) => {
        if ($select.selectDisabled) {
          return;
        }

        if (item.hiddenCheck) {
          this.toggleTree($event, item);
          return;
        }

        let isIn = false;
        let newSelected = [];


        angular.forEach($scope.ngModel, (d, k) => {
          if (d === item) {
            isIn = true;
          } else {
            newSelected.push(d);
          }
        });

        if (this.limit == 1) {
          newSelected = [];
        }
        if (!this.limit || (this.limit && this.limit > newSelected.length)) {
          // remove sub
          if (item.sub && item.sub.length) {
            newSelected = this.removeSub(item, newSelected);
          }

          if (!isIn && !this.hasParentSelect(item)) {
            newSelected.push(item);
          }

          if (this.hasParentSelect(item)) {
            newSelected = this.addOtherItem(item, newSelected);
            newSelected = this.removeParent(item, newSelected);
          }

          if (item._parent && !isIn) {
            // console.log('same all check');

            newSelected = this.sameAllCheck(item, newSelected);
          }
        }

        $scope.ngModel = newSelected;
      };

      this.sameAllCheck = (item, newSelected) => {
        var count = 0;
        var doAdd = false;
        var showSubCount = 0;

        if (item._parent && newSelected.indexOf(item._parent) == -1) {
          angular.forEach(item._parent.sub, (d) => {
            if (newSelected.indexOf(d) !== -1) {
              count++;
            }
            if (d.isHidden !== true) {
              showSubCount++;
            }
          });

          if (showSubCount && count >= showSubCount && !item._parent.hiddenCheck) {
            newSelected.push(item._parent);
            newSelected = this.removeSub(item._parent, newSelected);
            doAdd = true;
          }
        }

        if (doAdd && item._parent._parent) {
          newSelected = this.sameAllCheck(item._parent, newSelected);
        }

        return newSelected;
      };

      this.addOtherItem = (item, newSelected) => {
        var parents = this.getParents(item);
        var parent = null;


        angular.forEach(parents, (d) => {
          if (newSelected.indexOf(d) !== -1) {
            parent = d;
          }
        });

        function selectSub(parent) {
          angular.forEach(parent.sub, (d) => {
            if (d !== item && parent !== item && parent._parent !==
              item._parent && d.isHidden !== true) {
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

      this.removeSub = (item, newSelected) => {
        let subs = [];

        function getSub(sub) {
          angular.forEach(sub, d => {
            subs.push(d);
            if (d.sub && d.sub.length) {
              getSub(d.sub);
            }
          });
        }

        getSub(item.sub);

        let nnList = [];

        angular.forEach(newSelected, (d, k) => {
          if (subs.indexOf(d) == -1) {
            nnList.push(d);
          }
        });

        return nnList;
      };

      this.removeParent = (item, newSelected) => {
        let nList = [];
        let parents = this.getParents(item);

        angular.forEach(newSelected, (d, k) => {
          if (parents.indexOf(d) == -1) {
            nList.push(d);
          }
        });

        return nList;
      };


      this.stopp = (e) => {
        e.stopPropagation();
      };

      this.toggleTree = ($event, item) => {
        this.stopp($event);

        if (this.openedItems.indexOf(item._treeLinkTo) != -1) {
          this.openedItems.splice(this.openedItems.indexOf(item._treeLinkTo),
            1);
        } else {
          this.openedItems.push(item._treeLinkTo);
        }

        this.openedItems = angular.extend([], this.openedItems);

        updateStatus();
      };


      this.hasSubNotHidden = item => {
        let subHidden = function(sub) {
          let ret = false;
          angular.forEach(sub, function(d) {
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

      this.treeIsOpen = (tagId) => {
        if (!tagId) {
          return false;
        }

        tagId = tagId.split('_');
        var count = 0;
        var tagStart = tagId[0];
        for (var i = 1; i < tagId.length; i++) {
          tagStart += '_' + tagId[i];
          if (this.openedItems.indexOf(tagStart) != -1) {
            count++;
          }
        }

        return count >= tagId.length - 1;
      };

      this.hasSubSelected = (item) => {
        var has = false;

        var subSlected = (item) => {
          angular.forEach(item.sub, (d) => {
            if ($scope.ngModel && $scope.ngModel.length && $scope
              .ngModel.indexOf(d) !== -1) {
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

      this.hasParentSelect = (item) => {
        var has = false;
        var parentSlected = (item) => {
          if (item._parent && $scope.ngModel && $scope.ngModel.length &&
            $scope.ngModel.indexOf(item._parent) !== -1) {
            has = true;
          }

          if (item._parent && item._parent._parent) {
            parentSlected(item._parent);
          }
        };
        parentSlected(item);

        return has;
      };

      $scope.$watch('$select.search', (d, p) => {
        if (d === p) {
          return;
        }
        angular.forEach(this.selectItems, item => {
          if (d && (item.text + '').indexOf(d) === -1) {
            item.searchHidden = true;
          } else {
            item.searchHidden = false;
          }
        });
        updateStatus();
      });

      function _updateHtmlItems() {
        let htmlItems = '';
        const target = $($element).find('.ui-select-choices-content');
        let index = -1;

        target.html('');

        angular.each($select.selectItems, item => {
          updateItem(item);

          if (item.isHidden !== true || $select.hasSubNotHidden(item)) {
            index++;
            const itemElement = $(itemTpl.replace(/&&\{index\}/g, index));

            $scope[`item${index}`] = item;
            target.append(itemElement);
          }
        });

        $compile(target.contents())($scope);

        $timeout(() => {
          $scope.inited = true;
        });
      }

      function updateItem(item) {
        item.__item_is_show = (!item._treeLinkFrom || $select.search || (item._treeLinkFrom &&
            $select.treeIsOpen(item._treeLinkFrom))) &&
          (item.isHidden !== true || $select.hasSubNotHidden(item)) &&
          item.searchHidden !== true;

        item.__search_match = item.searchHidden !== true;
        item.__tree_is_open = $select.treeIsOpen(item._treeLinkTo);
        item.__checkbox_has_sub = $select.hasSubSelected(item);
        item.__checkbox_has_parent = $select.hasParentSelect(item);
      }

      function _updateStatus() {
        if ($scope.inited === true) {
          angular.each($select.selectItems, item => {
            updateItem(item);
          });
          $timeout();
        }
      }
    }]
  };
}
