import moduleName from './name.js';
import maTabsTpl from './maTabsTpl.html';
import maTabTpl from './maTabTpl.html';
import maTabButtonTpl from './maTabButtonTpl.html';

angular.module(moduleName)
  .directive('maTabs', maTabs)
  .directive('maTab', maTab)
  .directive('maTabButton', maTabButton);

maTabs.$inject = [];

function maTabs() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: maTabsTpl,
    scope: {
      model: '=ngModel',
    },
    controllerAs: '$ctrl',
    controller: ['$scope', function ($scope) {
      this.model = $scope.model;
      this.type = 'default';

      $scope.$watch('$ctrl.model', d => {
        $scope.model = d;
      });
    }],
    link: function (scope, element, attrs, ctrl) {

    }
  };
}

maTab.$inject = [];

function maTab() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    require: ['^maTabs'],
    template: maTabTpl,
    scope: {
      value: '@maValue',
    },
    link: function (scope, element, attrs, ctrl) {
      scope.parentScope = ctrl[0];
      scope.parentScope.type = 'default';
    }
  };
}

maTabButton.$inject = [];

function maTabButton() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    require: ['^maTabs'],
    template: maTabButtonTpl,
    scope: {
      value: '@maValue',
      size: '@maSize',
    },
    link: function (scope, element, attrs, ctrl) {
      scope.parentScope = ctrl[0];
      scope.parentScope.type = 'button';
    }
  };
}
