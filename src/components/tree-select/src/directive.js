import moduleName from './name.js';
import $ from 'jquery';
import selectTmpl from './selectTpl.html';
import multiSelectTpl from './multiSelectTpl.html';

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
        ng-model="newModel"
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
    controller: ['$scope', function($scope) {
      $scope.newItems = [];
      $scope.newModel = [];
      $scope.textKey = 'text';
      $scope.valueKey = 'value';
      $scope.subKey = 'sub';

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

      $scope.$watch('model', function() {
        if ($scope.isInnerWatch) {
          $scope.isInnerWatch = false;
          return;
        }
        $scope.newModel = $treeSelect.getDefaultSelectTreeData($scope.newItems,
          $scope.model);
      });

      $scope.$watch('newModel', function(d) {
        $scope.model = d;
        $scope.isInnerWatch = true;
      });
    }],
    link: function(scope, element, attrs, ctrl) {
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
      ngModel: '@ngModel',
      ngItems: '@ngItems',
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
    controller: ['$scope', '$timeout', function($scope, $timeout) {
      const _this = this;
      const $select = this;
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

      $scope.$parent.$watch($scope.ngModel, function(d) {
        $scope.$select.selectModel = d;
        $scope.$select.fixSelected();
      });

      $scope.$parent.$watch($scope.ngItems, function(d) {
        var items = $.extend(true, [], d);
        var newitems = [];

        function getSub(items, parentItem, treeLevel) {
          angular.forEach(items, function(item) {
            newitems.push(item);

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


        $scope.$select.selectItems = newitems;

        $scope.$select.fixSelected();
      });


      $scope.$watch('$select.selectModel', function(d) {
        let model = $parse($scope.ngModel);
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

        if (model && typeof model.assign === 'function') {
          model.assign($scope.$parent, d);
        }
      });

      this.fixSelected = () => {
        // 纠正选中值

        if (this.selectModel && this.selectModel.length && !this.selectModel[
            0].$$hashKey && !this.isTree) {
          $scope.$applyAsync(() => {
            let selectValues = [];

            angular.forEach(this.selectModel, d => {
              selectValues.push(typeof d !== 'object' ? d : d.value);
            });

            let selectModel = [];

            angular.forEach(this.selectItems, d => {
              if (selectValues.indexOf(d.value) !== -1) {
                selectModel.push(d);
              }
            });

            this.selectModel = selectModel;
          });
        }
      };

      this.clearSelect = () => {
        this.selectModel = undefined;
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
        angular.forEach(this.selectModel, (d, k) => {
          if (d !== item) {
            newSelected.push(d);
          }
        });

        this.selectModel = newSelected;
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


        angular.forEach(this.selectModel, (d, k) => {
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
            console.log('same all check');

            newSelected = this.sameAllCheck(item, newSelected);
          }
        }

        this.selectModel = newSelected;
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

        this.openedItems = $.extend(true, [], this.openedItems);
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
            if (this.selectModel && this.selectModel.length && this
              .selectModel.indexOf(d) !== -1) {
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
          if (item._parent && this.selectModel && this.selectModel.length &&
            this.selectModel.indexOf(item._parent) !== -1) {
            has = true;
          }

          if (item._parent && item._parent._parent) {
            parentSlected(item._parent);
          }
        };
        parentSlected(item);

        return has;
      };

      $scope.$watch('$select.search', d => {
        angular.forEach(this.selectItems, item => {
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
