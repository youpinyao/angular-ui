import moduleName from './name.js';
import $ from 'jquery';
import maDropdownTpl from './maDropdownTpl.html';

angular.module(moduleName)
  .directive('maDropdown', maDropdown);

maDropdown.$inject = ['$timeout'];

function maDropdown($timeout) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: maDropdownTpl,
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
      static: '@maStatic',

      disabled: '=ngDisabled',
    },
    controllerAs: '$ctrl',
    controller: ['$scope', function($scope) {
      this.clearValue = () => {
        $scope.activeItems = undefined;
      };
    }],
    link: function(scope, element, attrs, ctrl) {
      const containerCls = '.ma-dropdown-container';
      let showTimeout = null;


      // item 点击事件
      scope._itemClick = _itemClick;

      // 鼠标覆盖显示
      if (scope.showHover !== undefined) {
        $(element).hover(() => {
          scope.show = true;
          $timeout();
        }, () => {
          scope.show = false;
          $timeout();
        });
      }

      // 鼠标点击显示
      if (scope.showClick !== undefined) {
        $(element).click((e) => {
          scope.show = true;
          $timeout();
          e.stopPropagation();
        });
        $('body').on('click', () => {
          scope.show = false;
          $timeout();
        });
      }

      // 监听show 变化
      scope.$watch('show', d => {
        const container = $(containerCls);
        const ww = $(window).width();
        const wh = $(window).height();
        const offset = $(element).find(containerCls).offset();

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
          showTimeout = $timeout(function() {
            container.parent().removeClass('right').removeClass('top');

            setDirection('');
          }, 600);
        }
      });

      scope.textKey = 'text';
      scope.valueKey = 'value';
      attrs.$observe('maTextKey', d => {
        scope.textKey = d || 'text';
      });
      attrs.$observe('maValueKey', d => {
        scope.valueKey = d || 'value';
      });

      scope.$watch('data', d => {
        checkCheckbox();
      });
      scope.$watch('searchKey', d => {
        checkCheckbox();
      });

      // 监听选中变化
      scope.$watch('activeItems', d => {
        const _activeItems = [];

        if (!angular.isNull(d)) {
          if (angular.isArray(d)) {
            angular.each(d, (v, k) => {
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

        checkCheckbox();
      });

      function _itemClick($event, item) {
        if (scope.disabled) {
          return;
        }

        scope.itemClick({
          $event,
          $item: item,
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
          angular.each(scope.data, d => {
            if (scope._activeItems && scope._activeItems.indexOf(d[scope.valueKey]) !==
              -1) {
              d.checked = true;
            } else {
              d.checked = false;
            }
          });
        }
      }

      function getActiveItem(value) {
        let data;

        angular.each(scope.data, d => {
          if (d[scope.valueKey] == value) {
            data = d;
          }
        });

        return data;
      }

      function setDirection(direction) {
        if ($(element).attr('ma-direction')) {
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
