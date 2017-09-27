import moduleName from './name.js';
import $ from 'jquery';
import uuid from 'uuid/v4';
import debounce from 'debounce';
import maDropdownTpl from './maDropdownTpl.html';
import itemTpl from './itemTpl.html';

angular.module(moduleName)
  .directive('maDropdown', maDropdown);

maDropdown.$inject = ['$timeout', '$compile'];

function maDropdown($timeout, $compile) {
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
        $scope.show = false;
      };
    }],
    link: function(scope, element, attrs, ctrl) {
      const containerCls = '.ma-dropdown-container';
      const updateHtmlItem = debounce(_updateHtmlItem, 100);
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
        const container = $(element).find(containerCls);
        const ww = $(window).width();
        const wh = $(window).height();
        const offset = $(element).find(containerCls).offset();

        if (d) {
          $timeout.cancel(showTimeout);
          if ((offset.left + container.width()) - $(window).scrollLeft() > ww) {
            container.parent().addClass('right');
          }
          if ((offset.top + container.height()) - $(window).scrollTop() > wh) {
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

      scope.textKey = attrs.maTextKey || 'text';
      scope.valueKey = attrs.maValueKey || 'value';

      attrs.$observe('maTextKey', d => {
        scope.textKey = d || 'text';
      });
      attrs.$observe('maValueKey', d => {
        scope.valueKey = d || 'value';
      });

      scope.$watch('data', (d, p) => {
        checkCheckbox();
        updateHtmlItem();
      });
      scope.$watch('searchKey', d => {
        checkCheckbox();
        updateHtmlItem();
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

        if (!scope.multiple) {
          $(scope.data).each(function() {
            if (_activeItems.indexOf(this[scope.valueKey]) !== -1) {
              $(element).find(`.ma-dropdown-item[data-uuid="${this._uuid}"]`).addClass(
                  'active').siblings()
                .removeClass('active');
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
          $event,
          $item: item,
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

      function _updateHtmlItem() {
        const target = $(element).find('.ma-dropdown-container-content');
        const items = scope.data;
        const searchKey = scope.searchKey;
        const valueKey = scope.valueKey;
        const textKey = scope.textKey;
        let index = -1;

        target.html('');

        angular.each(items, item => {
          if (angular.isNull(item._uuid)) {
            item._uuid = uuid();
          }

          const text = item[textKey] + '';
          const value = item[valueKey];

          if (angular.isNull(searchKey) || text.indexOf(searchKey) !== -1) {
            index++;
            const itemElement = $(itemTpl.replace(/&&\{index\}/g, index));

            itemElement.attr('data-uuid', item._uuid);

            if (item.hide) {
              itemElement.addClass('hide');
            }
            if (scope.multiple) {
              itemElement.attr('ng-class', `{'hide' :item${index}.hide}`);
            }

            if (scope._activeItems.indexOf(item[scope.valueKey]) !== -1) {
              itemElement.addClass('active');
            }

            if (!scope.multiple) {
              itemElement.append(`<span>${item[scope.textKey]}</span>`);
            } else {
              itemElement.append(
                `<ma-checkbox ng-cloak ng-disabled="disabled"
                  ng-model="item${index}.checked">
                  <span>${item[scope.textKey]}</span>
                </ma-checkbox>`
              );
              itemElement.addClass('is-multiple');
              $compile(itemElement)(scope);
            }

            itemElement.on('click', e => {
              scope._itemClick(e, item);
            });

            target.append(itemElement);

            scope[`item${index}`] = item;
          }
        });
        if (scope.multiple) {
          $timeout();
        }
      }
    }
  };
}
