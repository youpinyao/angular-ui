import moduleName from './name.js';

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
    template: `<div class="ma-tabs"
      ng-class="{
        'ma-button-group': $ctrl.type === 'button',
        'default': $ctrl.type === 'default',
      }"
      ng-transclude>
    </div>`,
    scope: {
      model: '=ngModel',
    },
    controllerAs: '$ctrl',
    controller: ['$scope', function ($scope) {
      this.model = $scope.model;
      this.type = 'default';
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
    template: `<div class="ma-tab"
      ng-class="{active: parentScope.model == value}"
      ma-click="parentScope.model = value"
      ng-transclude>
    </div>`,
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
    template: `<div
      ng-class="{active: parentScope.model == value}"
    >
    <ma-button
      ma-active="{{parentScope.model == value}}"
      ma-click="parentScope.model = value"
      >
      <span ng-transclude></span>
    </ma-button>
    </div>`,
    scope: {
      value: '@maValue',
    },
    link: function (scope, element, attrs, ctrl) {
      scope.parentScope = ctrl[0];
      scope.parentScope.type = 'button';
    }
  };
}
