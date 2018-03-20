import moduleName from './name.js';
import debounce from 'debounce';

angular.module(moduleName)
  .directive('maInputNumber', maInputNumber);

maInputNumber.$inject = [];

function maInputNumber() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      name: '@name',
      type: '@type',
      numberValue: '=ngModel',

      maxlength: '@maxlength',
      placeholder: '@placeholder',
      accept: '@accept',
      min: '@min',
      max: '@max',
      step: '@step',
      readonly: '=ngReadonly',
      disabled: '=ngDisabled',

      decimal: '@maDecimal',

      ngChange: '&ngChange',
    },
    template: `<div class="ma-input-number-box">
      <ma-input
        ma-num
        ma-decimal="{{decimal}}"
        class="ma-input-number"
        type="{{type}}"
        ng-model="numberValue"
        maxlength="{{maxlength}}"
        placeholder="{{placeholder}}"
        accept="{{accept}}"
        min="{{min}}"
        max="{{max}}"
        step="{{step}}"
        ng-readonly="readonly"
        ng-disabled="disabled"
      >
        <div class="control" ng-disabled="disabled" >
          <div ng-click="$ctrl.plusNumber($event)"></div>
          <div ng-click="$ctrl.minusNumber($event)"></div>
        </div>
      </ma-input>
    </div>`,
    controllerAs: '$ctrl',
    controller: ['$scope', '$interval', function($scope) {
      const doChange = debounce(_doChange, 50);
      let isFirst = true;

      var min = parseFloat($scope.min);
      var max = parseFloat($scope.max);
      var step = parseFloat($scope.step) || 1;
      var intervalSt = null;

      var decimal = $scope.decimal !== undefined;

      if (!isNaN(parseInt(decimal, 10))) {
        decimal = parseInt(decimal, 10);
      }

      if (decimal === 0 || decimal === '') {
        decimal = false;
      }

      if (decimal === true) {
        decimal = 2;
      }

      var fix = () => {
        let numberValue = $scope.numberValue;
        if (numberValue) {
          numberValue += '';
        }
        if (decimal && numberValue && (numberValue.indexOf('.') === -1 || numberValue.indexOf(
            '.') !== numberValue.length - 1)) {
          numberValue = parseFloat(numberValue);
          $scope.numberValue = parseFloat(numberValue.toFixed(2));
        }
      };

      $scope.$watch('numberValue', d => {
        if (($scope.numberValue || $scope.numberValue === 0) && !isNaN(min) && $scope.numberValue <
          min) {
          $scope.numberValue = min;
        }
        if (($scope.numberValue || $scope.numberValue === 0) && !isNaN(max) && $scope.numberValue >
          max) {
          $scope.numberValue = max;
        }
        fix();

        if (!isFirst) {
          doChange();
        }
        isFirst = false;
      });

      this.plusNumber = () => {
        $scope.numberValue = (parseFloat($scope.numberValue) || 0) + step;
      };
      this.minusNumber = () => {
        $scope.numberValue = (parseFloat($scope.numberValue) || 0) - step;
      };

      function _doChange() {
        $scope.ngChange({
          $model: $scope.numberValue,
        });
      }
    }],
    link: function(scope, element, attrs, ctrl) {

    }
  };
}
