import moduleName from './name.js';

angular.module(moduleName)
  .directive('maMessage', maMessage);

maMessage.$inject = [];

function maMessage() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs, ctrl) {

    }
  };
}
