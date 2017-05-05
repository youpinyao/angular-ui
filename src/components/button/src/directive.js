import moduleName from './name.js';

angular.module(moduleName)
  .directive('maClick', maClick);

maClick.$inject = ['$parse', '$timeout'];

function maClick($parse, $timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs, ctrl) {
      element.bind('click', function (e) {
        if (element.hasClass('ma-click-disabled')) {
          return;
        }
        element.addClass('ma-click-disabled');

        scope.$event = e;
        scope.$parent.$eval(attrs.cmClick, scope);

        $timeout(function () {});

        $timeout(function () {
          element.removeClass('ma-click-disabled');
        }, attrs.delay || 50);
      });
    }
  };
}
