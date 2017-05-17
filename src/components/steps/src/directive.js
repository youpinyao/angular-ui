import moduleName from './name.js';

angular.module(moduleName)
  .directive('maSteps', maSteps)
  .directive('maStep', maStep);

maSteps.$inject = [];

function maSteps() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `<div class="ma-steps"
      ng-transclude>
    </div>`,
    scope: {
      index: '@maIndex',
    },
    controllerAs: '$ctrl',
    controller: ['$scope', function ($scope) {
      $scope._index = -1;
    }],
    link: function (scope, element, attrs, ctrl) {

    }
  };
}

maStep.$inject = [];

function maStep() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    require: ['^maSteps'],
    template: `<div
      class="ma-step"
      ng-class="{
        active: index > _index,
        current: index == _index,
      }"
      >
      <i></i>
      <span ng-transclude></span>
    </div>`,
    scope: true,
    link: function (scope, element, attrs, ctrl) {
      const parentScope = scope.$parent.$parent;

      parentScope._index++;
      scope._index = parentScope._index;

      parentScope.$watch('index', d => {
        scope.index = d;
      });
    }
  };
}
