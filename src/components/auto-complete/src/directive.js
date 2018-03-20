import moduleName from './name.js';
import debounce from 'debounce';
import $ from 'jquery';

import maAutoCompleteTpl from './maAutoCompleteTpl.html';

angular.module(moduleName)
  .directive('maAutoComplete', maAutoComplete);

maAutoComplete.$inject = ['$timeout'];

function maAutoComplete($timeout) {
  return {
    restrict: 'E',
    replace: true,
    template: maAutoCompleteTpl,
    scope: {
      name: '@name',
      type: '@type',
      model: '=ngModel',

      maxlength: '@maxlength',
      placeholder: '@placeholder',
      accept: '@accept',
      min: '@min',
      max: '@max',
      step: '@step',
      readonly: '=ngReadonly',
      disabled: '=ngDisabled',
      clear: '=maClear',

      valueKey: '@maValueKey',
      textKey: '@maTextKey',

      // 获取数据接口
      data: '=maData',
      getData: '&maGetData',

    },
    controllerAs: '$ctrl',
    controller: ['$scope', function($scope) {
      const _this = this;

      this.showDropDown = false;

      $scope.dropdownItems = [];

      this.dropdownItemClick = dropdownItemClick;

      const searchFn = debounce(() => {
        const promise = $scope.getData({
          $searchKey: $scope.model
        });
        if (promise.then && promise.finally && promise.catch) {
          promise.then(data => {
            $scope.dropdownItems = data;
          });
        } else {
          $scope.dropdownItems = promise;
        }
        $timeout();
      }, 300);

      $scope.$watch('model', d => {
        if (!$scope.data) {
          searchFn();
        }
      });

      $scope.$watch('data', d => {
        $scope.dropdownItems = d;
      });

      function dropdownItemClick($event, $item) {
        $scope.model = $item[$scope.textKey];
      }
    }],
    link: function(scope, element, attrs, ctrl) {
      const $ctrl = scope.$ctrl;

      scope.$watch('dropdownItems', d => {
        if (d && d.length && $(element).find('input:focus, textarea:focus').length) {
          $ctrl.showDropDown = true;
        } else {
          $ctrl.showDropDown = false;
        }
      });

      $(element).find('input, textarea')
        .on('focus', function() {
          if (scope.dropdownItems && scope.dropdownItems.length) {
            $ctrl.showDropDown = true;
            $timeout();
          }
        })
        .on('click', e => {
          e.stopPropagation();
        })
        .on('blur', e => {
          $timeout(() => {
            $ctrl.showDropDown = false;
          }, 100);
        });

      $('body').on('click', () => {
        $ctrl.showDropDown = false;
        $timeout();
      });

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
