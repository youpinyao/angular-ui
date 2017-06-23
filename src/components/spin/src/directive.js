import moduleName from './name.js';
import maSpinTpl from './maSpinTpl.html';
import $ from 'jquery';

angular.module(moduleName)
  .directive('maSpin', maSpin);

maSpin.$inject = [];

function maSpin() {
  return {
    restrict: 'E',
    template: maSpinTpl,
    replace: true,
    scope: {
      size: '@maSize',
    },
    link: function (scope, element, attrs, ctrl) {
      scope.size = 120;
      updateSpin();

      attrs.$observe('maSize', d => {
        scope.size = d ? parseInt(d, 10) : 120;
        updateSpin();
      });

      function updateSpin() {
        const svg = $(element).find('svg');
        svg.attr('width', scope.size);
        svg.attr('height', scope.size);
      }
    }
  };
}
