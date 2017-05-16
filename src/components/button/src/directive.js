import moduleName from './name.js';

angular.module(moduleName)
  .directive('maClick', maClick)
  .directive('maButton', maButton);

maClick.$inject = ['$parse', '$timeout'];

function maClick($parse, $timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs, ctrl) {
      element.bind('click', function (e) {
        if (element.hasClass('ma-click-disabled') || element.hasClass('disabled')) {
          return;
        }
        element.addClass('ma-click-disabled');

        scope.$event = e;
        scope.$parent.$eval(attrs.maClick, scope);

        $timeout(function () {});

        $timeout(function () {
          element.removeClass('ma-click-disabled');
        }, attrs.delay || 50);
      });
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
      disabled: disabled === 'true',
      flat: flat === 'true',
      active: active === 'true',
    }"
    ng-transclude></div>`,
    scope: {
      size: '@maSize',
      type: '@maType',
      flat: '@maFlat',
      active: '@maActive',
      disabled: '@maDisabled',
    },
    replace: true,
    link: function (scope, element, attrs, ctrl) {

    }
  };
}
