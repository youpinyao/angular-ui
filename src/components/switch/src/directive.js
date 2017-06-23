import moduleName from './name.js';

angular.module(moduleName)
  .directive('maSwitch', maSwitch);

maSwitch.$inject = [];

function maSwitch() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `<label class="ma-switch">
      <input
      type="checkbox"
      ng-model="model"
      ng-disabled="disabled" />
      <i class="switch-appearance"></i>
      <span ng-transclude></span>
    </label>`,
    scope: {
      model: '=ngModel',
      disabled: '=ngDisabled',
    },
    link: function (scope, element, attrs, ctrl) {

    }
  };
}
