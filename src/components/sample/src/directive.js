import moduleName from './name.js';

angular.module(moduleName)
  .directive('maSample', maSample);

maSample.$inject = [];

function maSample() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs, ctrl) {

    }
  };
}
