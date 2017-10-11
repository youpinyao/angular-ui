import moduleName from './name.js';
import $ from 'jquery';

angular.module(moduleName)
  .directive('maCheckbox', maCheckbox);

maCheckbox.$inject = ['$timeout'];

function maCheckbox($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: `<label class="ma-checkbox">
    <input type="checkbox"
      value="{{value}}"
      data-name="{{name}}"
      ng-disabled="disabled"
      ng-change="change()"
      ng-model="checked"
    />
    <i class="ma-checkbox-appearance"></i>
    <span ng-transclude></span>
    </label>`,
    scope: {
      name: '@name',
      value: '@value',
      model: '=ngModel',
      ngChange: '&ngChange',
      disabled: '=ngDisabled',
    },
    link: function(scope, element, attrs, ctrl) {
      scope.$watch('model', d => {
        if (angular.isArray(d)) {
          angular.each(d, (v, k) => {
            if (String(v) === element.find('input').val() || v === true) {
              scope.checked = true;
            }
          });
        } else if (String(d) === element.find('input').val() || d === true) {
          scope.checked = true;
        } else {
          scope.checked = false;
        }
      });

      scope.change = function() {
        scope.ngChange({
          $model: scope.model,
          $checked: scope.checked,
        });
      };

      attrs.$observe('unclick', function() {
        element.bind('click', function(e) {
          e.preventDefault();
        }).find('input').bind('click', function(e) {
          e.preventDefault();
        });
      });

      scope.$watch('checked', d => {
        scope.$applyAsync(function() {
          var checkboxs = $(element).parent().find(
            '> .ma-checkbox input[type="checkbox"]');
          var values = [];

          if (scope.name) {
            checkboxs = $(`input[data-name="${scope.name}"][type="checkbox"]`);
          }

          if (!checkboxs.length) {
            checkboxs = $(element).find('input');
          }

          checkboxs.each(function() {
            if (this.checked) {
              values.push(this.value || true);
            }
          });
          if (checkboxs.length === 1) {
            scope.model = values[0] || false;
          } else {
            scope.model = values;
          }
        });
      });
    }
  };
}
