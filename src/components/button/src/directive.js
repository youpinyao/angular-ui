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
          scope.$event = e;
          $parse(attrs.maClick)(scope);
        }

        $timeout();

        $timeout(function() {
          element.removeClass('ma-click-disabled');
        }, parseInt(attrs.delay, 10) || 50);
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
