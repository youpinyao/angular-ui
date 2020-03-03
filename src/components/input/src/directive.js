import $ from 'jquery';
import moduleName from './name.js';
import maInputTpl from './maInputTpl.html';

angular.module(moduleName)
  .directive('maInput', maInput)
  .directive('maNum', maNum);

maInput.$inject = [];

function maInput() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
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

      iconClick: '&maIconClick',

      clear: '=maClear',

      ngChange: '&ngChange',
      ngBlur: '&ngBlur',
    },
    template: maInputTpl,
    controllerAs: '$ctrl',
    controller: ['$scope', '$element', function($scope, $element) {
      this.clearClick = function() {
        $scope.model = '';
      };
      $scope.$watch('placeholder', d => {
        $element.find('textarea').attr('placeholder', d || '');
      });

      $scope.change = function() {
        $scope.ngChange({
          $model: $scope.model,
        });
      };

      $scope.blur = function() {
        const evObj = document.createEvent('MouseEvents');

        evObj.initEvent('blur', true, false);
        $element[0].dispatchEvent(evObj);

        $scope.ngBlur({
          $model: $scope.model,
        });
      };
    }],
    link: function(scope, element, attrs, ctrl) {
      $(element).bind('click', e => {
        if (e.eventPhase === 2) {
          scope.iconClick({
            $event: e,
          });
        }
      });
    }
  };
}


maNum.$inject = ['$filter', '$timeout', '$parse'];

function maNum($filter, $timeout, $parse) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs, controller) {
      var decimal;
      var ngModel = $parse(attrs.ngModel);
      var min = parseFloat(attrs.min);
      var max = parseFloat(attrs.max);

      attrs.$observe('min', function(d) {
        min = d || undefined;
      });
      attrs.$observe('max', function(d) {
        max = d || undefined;
      });
      attrs.$observe('maDecimal', function(d) {
        getDecimal(d);
      });

      getDecimal(attrs.maDecimal);

      function getDecimal (maDecimal) {
        decimal = maDecimal !== undefined;

        if (!isNaN(parseInt(maDecimal, 10))) {
          decimal = parseInt(maDecimal, 10);
        }

        if (decimal === 0 || maDecimal === '') {
          decimal = false;
        }

        if (decimal === true) {
          decimal = 2;
        }
      }

      if (elem[0].tagName.toLowerCase() !== 'input') {
        elem.find('input').bind('keyup', keyup);
      } else {
        elem.bind('keyup', keyup);
      }

      function keyup(e) {
        var v = this.value + '';

        v = v.split('');

        var str = [];
        var decimalCount = 0;

        if (v[0] === '-' && v.length === 1) {
          // 为一个负号时不处理
          str = v;
        } else {
          angular.forEach(v, function(d, k) {
            if (decimal && d == '。') {
              d = '.';
            }

            if (k !== 0 && d == '.' && decimalCount === 0) {
              str.push(d);
              decimalCount++;
            }

            if (!isNaN(parseInt(d, 10))) {
              str.push(d);
            }

            if (k === 0 && d === '-') {
              str.push(d);
            }
          });


          if (str[str.length - 1] !== '.' && (!isNaN(min) || !isNaN(max))) {
            str = parseFloat(str.join(''));

            if (isNaN(str)) {
              str = '';
            }

            if ((str || str === 0) && !isNaN(min) && str < min) {
              str = min;
            }
            if ((str || str === 0) && !isNaN(max) && str > max) {
              str = max;
            }

            str = (str + '').split('');
          }
        }

        $timeout(() => {
          this.value = str.join('') || '';

          if (!isNaN(decimal) && this.value && this.value.split('.')[1] && this.value.split(
              '.')[1].length > decimal) {
            this.value = parseFloat(this.value).toFixed(decimal);
          }

          if (ngModel && typeof ngModel.assign === 'function') {
            ngModel.assign(scope, this.value);
          }
        });
      }
    }
  };
}
