import moduleName from './name.js';

angular.module(moduleName)
  .directive('maIcon', maIcon);

maIcon.$inject = [];

function maIcon() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      type: '@type',
    },
    template: '<i class="iconfont icon-{{type}}"></i>',
    link: function (scope, element, attrs, controllers) {

    }
  };
}
