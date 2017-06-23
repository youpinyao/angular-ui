import moduleName from './name.js';
import maPopconfirmTpl from './maPopconfirmTpl.html';

angular.module(moduleName)
  .directive('maPopconfirm', maPopconfirm);

maPopconfirm.$inject = [];

function maPopconfirm() {
  return {
    restrict: 'E',
    scope: {
      template: '=maTemplate',
      direction: '@maDirection',
    },
    transclude: true,
    template: maPopconfirmTpl,
    link: function(scope, element, attrs, ctrl) {

    }
  };
}
