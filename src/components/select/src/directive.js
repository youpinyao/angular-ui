import moduleName from './name.js';
import debounce from 'debounce';
import $ from 'jquery';

import maSelectTpl from './maSelectTpl.html';

angular.module(moduleName)
  .directive('maSelect', maSelect);

maSelect.$inject = ['$timeout'];

function maSelect($timeout) {
  return {
    restrict: 'E',
    replace: true,
    template: maSelectTpl,
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

      static: '@maStatic',

    },
    controllerAs: '$ctrl',
    controller: ['$scope', '$rootScope', function($scope, $rootScope) {
      const _this = this;

      $scope.dropdownItems = [];

      this.showDropDown = false;

      this.stopPropagation = stopPropagationFn;

      this.removeItem = removeItem;

      this.dropdownItemClick = dropdownItemClick;

      $scope.$watch('data', d => {
        $scope.dropdownItems = d;
      });

      $scope.$watch('$ctrl.showDropDown', d => {
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

          let newModel = [];
          let hasSame = false;
          angular.each($scope.model, d => {
            if (d[$scope.valueKey] != $item[$scope.valueKey]) {
              newModel.push(d);
            } else {
              hasSame = true;
            }
          });

          if (!hasSame && (!$scope.limit || ($scope.limit && newModel.length < parseInt($scope.limit,
              10)))) {
            newModel.push($item);
          }

          $scope.model = newModel;
        } else {
          $scope.model = $item;
        }
      }
    }],
    link: function(scope, element, attrs, ctrl) {
      const $ctrl = scope.$ctrl;

      const selectId = angular.uuid();

      scope.selectId = selectId;

      scope.$watch('dropdownItems', d => {
        if (d && d.length && $(element).find('input:focus, textarea:focus').length) {
          $ctrl.showDropDown = true;
        } else if (!$(element).find(
            '.ma-dropdown-search-bar input:focus, .ma-dropdown-search-bar textarea:focus').length) {
          $ctrl.showDropDown = false;
        }
      });

      scope.$on('hide.select', (e, d) => {
        if (d !== selectId) {
          $ctrl.showDropDown = false;
        }
      });

      $(element).find('> .ma-input')
        .on('click', function(e) {
          if (scope.disabled) {
            return;
          }

          $ctrl.showDropDown = !$ctrl.showDropDown;
          $timeout();
          // e.stopPropagation();
        });

      $('body').on('click', (e) => {
        if ($(e.target).parents('.ma-select').get(0) !== element[0]) {
          $ctrl.showDropDown = false;
          $timeout();
        }
      });

      $(element).find('.ma-dropdown-search-bar').on('click', e => {
        e.stopPropagation();
      });


      const searchFn = debounce(() => {
        const promise = scope.getData({
          $searchKey: scope.searchKey
        });
        if (promise.then && promise.finally && promise.catch) {
          promise.then(data => {
            scope.dropdownItems = data;
          });
        } else {
          scope.dropdownItems = promise;
        }
        $timeout();
      }, 300);

      scope.$watch('searchKey', d => {
        if (!$(element).attr('ma-data')) {
          searchFn();
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
    }
  };
}
