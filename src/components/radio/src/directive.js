import moduleName from './name.js';

angular.module(moduleName)
  .directive('maRadio', maRadio);

maRadio.$inject = [];

function maRadio() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: `<label class="ma-radio">
    <input type="radio"
      ng-model="model"
      value="{{value}}"
      ng-disabled="disabled"
    />
    <i class="radio-appearance"></i>
    <span ng-transclude></span>
    </label>`,
    scope: {
      name: '@name',
      value: '@value',
      model: '=ngModel',
      disabled: '=ngDisabled',
    },
    link: function(scope, element, attrs, ctrl) {
      scope.$watch('model', d => {
        if (d !== undefined && d !== null && typeof d !== 'string') {
          scope.model = String(d);
        }
      });
    }
  };
}
