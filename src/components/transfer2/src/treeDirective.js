import moduleName from './name.js';
import template from 'art-template/lib/template-web.js';
import $ from 'jquery';
import maTreeTpl from './maTreeTpl.html';
import itemTpl from './itemTpl.html';

angular.module(moduleName)
  .directive('maTree', maTree);

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
      hideItems: '=maHideItems',
    },
    template: maTreeTpl,
    controllerAs: '$ctrl',
    controller: ['$scope', '$element', function($scope, $element) {
      const contentTarget = $($element).find('.ui-select-choices-content');
      const itemCls = '.ui-select-choices-row';
      let subStore = {};

      $scope.$watch('data', d => {
        const items = updateTree(d);

        $scope.newItems = items;
        renderContent(items);
      });

      $scope.$watch('showItems', d => {
        console.log('show items', d);
        if (d) {
          updateHideShow();
        }
      });
      $scope.$watch('hideItems', d => {
        console.log('hide items', d);
        if (d) {
          updateHideShow();
        }
      });

      $scope.$watch('model', d => {
        console.log('tree model', d);

        if (angular.isEmpty(d)) {
          contentTarget.find(itemCls).each(function() {
            // if (!$(this).hasClass('hidden')) {
            $(this).find('input').prop('checked', false);
            // }
          });
          contentTarget.find('.ma-checkbox').removeClass('has-sub');
        }
        if (d === 'all') {
          const newModel = [];
          contentTarget.find(itemCls).each(function() {
            if (!$(this).hasClass('hidden')) {
              $(this).find('input').prop('checked', true);
              newModel.push($(this).attr('data-value'));
            }
          });
          contentTarget.find('.ma-checkbox').removeClass('has-sub');

          $scope.model = newModel;
        }
      });

      function renderContent(data) {
        const items = $(template.render(itemTpl, {
          data,
          textKey: $scope.textKey,
          valueKey: $scope.valueKey,
        }));

        bindEvent(items);

        contentTarget.html(items);

        updateHideShow();
      }

      function updateHideShow() {
        // 如果有要隐藏的隐藏
        if ($scope.hideItems) {
          const parents = getParents($scope.hideItems);
          const childs = getChilds($scope.hideItems);

          contentTarget.find(itemCls).removeClass('hidden');
          $scope.hideItems.forEach(d => {
            const value = angular.isObject(d) ? d[$scope.valueKey] : d;
            const item = contentTarget.find(`${itemCls}[data-value="${value}"]`);
            item.addClass('hidden');
          });
          childs.forEach(d => {
            contentTarget.find(`${itemCls}[data-value="${d}"]`).addClass(
              'hidden');
          });
          parents.forEach(d => {
            contentTarget.find(`${itemCls}[data-value="${d}"]`).removeClass(
              'hidden');
          });
        }

        // 如果有要现实的显示
        if ($scope.showItems) {
          const parents = getParents($scope.showItems);
          const childs = getChilds($scope.showItems);

          contentTarget.find(itemCls).addClass('hidden');

          $scope.showItems.forEach(d => {
            const value = angular.isObject(d) ? d[$scope.valueKey] : d;
            const item = contentTarget.find(`${itemCls}[data-value="${value}"]`);

            item.removeClass('hidden');
          });

          (parents.concat(childs)).forEach(d => {
            contentTarget.find(`${itemCls}[data-value="${d}"]`).removeClass(
              'hidden');
          });
        }
      }

      function getChilds(itemValues) {
        const childs = [];
        angular.each($scope.newItems, d => {
          if (itemValues.indexOf(d[$scope.valueKey]) !== -1) {
            getChild(d);
          }
        });

        function getChild(item) {
          let sub = item[$scope.subKey];
          if (sub && sub.length) {
            sub.forEach(d => {
              childs.push(d[$scope.valueKey]);
              getChild(d);
            });
          }
        }
        return childs;
      }

      function getParents(itemValues) {
        const parents = [];
        angular.each($scope.newItems, d => {
          if (itemValues.indexOf(d[$scope.valueKey]) !== -1) {
            let item = d;
            while (item._parent) {
              parents.push(item._parent[$scope.valueKey]);
              item = item._parent;
            }
          }
        });
        return parents;
      }

      function toggleTree(e) {
        const target = $(e.target);
        const item = target.parents(itemCls);
        const to = item.attr('data-to');
        let froms = contentTarget.find(`${itemCls}[data-from="${to}"]`);

        if (!froms.length) {
          froms = $(template.render(itemTpl, {
            data: subStore[to],
            textKey: $scope.textKey,
            valueKey: $scope.valueKey,
            renderSub: true,
          }));
          froms.insertAfter(item);
          bindEvent(froms, item);
          updateHideShow();
        } else {
          froms.toggleClass('hide');
        }
        target.parent().toggleClass('tree-open');
      }

      function bindEvent(items, parent) {
        items.find('.tree-arrow-click').on('click', toggleTree);
        items.find('input[type="checkbox"]').on('change', e => {
          checkedSub($(e.target).parents(itemCls).attr('data-to'), e.target.checked);
          checkedParent($(e.target).parents(itemCls).attr('data-from'), e.target.checked);
          updateModel();
        });
        if (parent) {
          checkedSub(parent.attr('data-to'), parent.find('input').prop('checked'));
        }
      }

      function updateModel() {
        console.log('update model');
        const newModel = [];
        const selectedes = contentTarget.find('input:checked');

        selectedes.each(function() {
          const item = $(this).parents(itemCls);
          const from = item.attr('data-from');
          const parent = contentTarget.find(`${itemCls}[data-to="${from}"]`);
          const parentValue = parent.attr('data-value');

          if (hasParentSelected(item)) {
            return true;
          }
          newModel.push(item.attr('data-value'));
          return true;
        });

        $scope.$applyAsync(() => {
          $scope.model = newModel;
        });
      }

      function hasParentSelected(item) {
        const from = item.attr('data-from');
        const parent = contentTarget.find(`${itemCls}[data-to="${from}"]`);
        let ret = false;

        ret = !!(from && parent.length && parent.find('input').prop('checked'));

        if (ret === false && from && parent.attr('data-from')) {
          ret = hasParentSelected(parent);
        }

        return ret;
      }

      function checkedSub(to, checked) {
        if (to) {
          const items = contentTarget.find(`${itemCls}[data-from="${to}"]`);
          const item = contentTarget.find(`${itemCls}[data-to="${to}"]`);

          items.each(function() {
            if (!$(this).hasClass('hidden')) {
              $(this).find('input').prop('checked', checked);
              checkedSub($(this).attr('data-to'), checked);
            }
          });
          item.find('.ma-checkbox').removeClass('has-sub');
        }
      }

      function checkedParent(from) {
        if (from) {
          const items = contentTarget.find(`${itemCls}[data-to="${from}"]`);
          const maCheckbox = items.find('.ma-checkbox');
          const data = getSubCheckedCount(from);

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
        const items = contentTarget.find(`${itemCls}[data-from="${from}"]`);
        let count = 0;
        let total = 0;
        let sub = 0;

        items.each(function() {
          if (!$(this).hasClass('hidden')) {
            if ($(this).find('input').prop('checked')) {
              count++;
            }
            if ($(this).find('.ma-checkbox').hasClass('has-sub')) {
              sub++;
            }
            total++;
          }
        });
        return {
          total,
          count,
          sub,
        };
      }

      function updateTree(items) {
        const newItems = [];
        const subKey = $scope.subKey;

        subStore = {};

        function getSub(items, parentItem, treeLevel) {
          angular.each(items, function(d) {
            const item = d;

            newItems.push(item);

            item._level = treeLevel;

            if (item[subKey] && item[subKey].length) {
              item.tagId = parentItem ? parentItem.tagId + '_' +
                angular.uuid() : 'tag_' + angular.uuid();
              item._to = item.tagId;
              item._sub = true;
              subStore[item.tagId] = item[subKey];
              angular.forEach(item[subKey], function(it) {
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
    link: function(scope, element, attrs, ctrl) {
      scope.textKey = attrs.maTextKey || 'text';
      scope.valueKey = attrs.maValueKey || 'value';

      attrs.$observe('maTextKey', d => {
        scope.textKey = d || 'text';
      });
      attrs.$observe('maValueKey', d => {
        scope.valueKey = d || 'value';
      });
    }
  };
}
