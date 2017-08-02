import moduleName from './name.js';
import maAlertTpl from './maAlertTpl.html';

angular.module(moduleName)
  .directive('maAlert', maAlert);

maAlert.$inject = [];

function maAlert() {
  return {
    replace: true,
    restrict: 'E',
    template: maAlertTpl,
    scope: {
      items: '=maItems',
      cls: '@maClass',
    },
    controllerAs: '$ctrl',
    controller: ['$scope', '$timeout', function ($scope, $timeout) {
      if (!$scope.items) {
        $scope.items = [];
      }

      this.remove = remove;

      function remove(item, $index) {
        item.hide = true;
        $timeout(function () {
          $scope.items.splice($index, 1);
        }, 400);
      }
    }],
    link: function (scope, element, attrs, ctrl) {

    }
  };
}
