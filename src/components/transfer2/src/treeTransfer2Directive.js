import moduleName from './name.js';
import $ from 'jquery';

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
    template: '',
    controllerAs: '$ctrl',
    controller: ['$scope', function($scope) {

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
