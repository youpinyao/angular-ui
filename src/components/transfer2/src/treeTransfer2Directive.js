import moduleName from './name.js';
import $ from 'jquery';
import maTreeTransfer2Tpl from './maTreeTransfer2Tpl.html';

angular.module(moduleName)
  .directive('maTreeTransfer2', maTreeTransfer2);

maTreeTransfer2.$inject = [];

function maTreeTransfer2() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      data: '=maData',
      model: '=ngModel',
      valueKey: '@maValueKey',
      textKey: '@maTextKey',
      disabled: '=ngDisabled',

      leftTitle: '@maLeftTitle',
      rightTitle: '@maRightTitle',
    },
    template: maTreeTransfer2Tpl,
    controllerAs: '$ctrl',
    controller: ['$scope', function($scope) {
      const $ctrl = this;

      $ctrl.searchKey = '';

      $ctrl.leftSelectedCount = 0;
      $ctrl.leftShowCount = 0;
      $ctrl.leftCheckbox = false;

      $ctrl.leftButtonDisabled = true;
      $ctrl.rightButtonDisabled = true;

      $ctrl.rightSelectedCount = 0;
      $ctrl.rightShowCount = 0;
      $ctrl.rightCheckbox = false;

      $ctrl.toRight = toRight;
      $ctrl.toLeft = toLeft;

      $scope.$watch('data', (d) => {
        console.log('data', d);
      });

      $scope.$watch('model', (d) => {
        console.log('model', d);
      });

      function toRight() {

      }

      function toLeft() {

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
