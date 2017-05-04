import moduleName from './name.js';

angular.module(moduleName).directive('maState', maState);

maState.$inject = [];

function maState() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs, ctrl) {
      console.log('menu directive of maState');
    }
  };
}
