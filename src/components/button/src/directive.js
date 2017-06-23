import moduleName from './name.js';

angular.module(moduleName)
  .directive('maClick', maClick)
  .directive('maButton', maButton);

maClick.$inject = ['$parse', '$timeout'];

function maClick($parse, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs, ctrl) {
      element.bind('click', function(e) {
        if (element.hasClass('ma-click-disabled') || element.hasClass(
            'disabled')) {
          return;
        }
        element.addClass('ma-click-disabled');

        if (attrs.maClick) {
          if (scope.$odd !== undefined || scope.$even !== undefined ||
            scope.$last !== undefined || scope.$index !== undefined ||
            scope.$middle !== undefined) {
            scope.$event = e;
            scope.$parent.$eval(attrs.maClick, scope);
          } else {
            scope.$event = e;
            scope.$eval(attrs.maClick, scope);
          }
        }

        $timeout();

        $timeout(function() {
          element.removeClass('ma-click-disabled');
        }, parseInt(attrs.delay, 10) || 50);
      });

      function hasFn(fn, sc) {
        let _hasFn = false;
        angular.each(fn, d => {
          if (sc[d]) {
            _hasFn = true;
          } else {
            _hasFn = false;
          }
          sc = sc[d];
        });
        return _hasFn;
      }
    }
  };
}

maButton.$inject = [];

function maButton() {
  return {
    restrict: 'E',
    transclude: true,
    template: `<div
    class="ma-button {{size}} {{type}}"
    ng-class="{
      disabled: disabled,
      flat: flat === 'true',
      active: active === 'true',
    }"
    ng-transclude></div>`,
    scope: {
      size: '@maSize',
      type: '@maType',
      flat: '@maFlat',
      active: '@maActive',
      disabled: '=ngDisabled',
    },
    replace: true,
    link: function(scope, element, attrs, ctrl) {

    }
  };
}
