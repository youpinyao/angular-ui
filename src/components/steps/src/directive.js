import moduleName from './name.js';
import maStepTpls from './maStepsTpl.html';
import maStepTpl from './maStepTpl.html';

angular.module(moduleName)
  .directive('maSteps', maSteps)
  .directive('maStep', maStep);

maSteps.$inject = [];

function maSteps() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: maStepTpls,
    scope: {
      index: '@maIndex',
      type: '@maType',
    },
    controllerAs: '$ctrl',
    controller: ['$scope', function ($scope) {
      $scope._index = -1;

      if (!$scope.type) {
        $scope.type = 'default';
      }
    }],
    link: function (scope, element, attrs, ctrl) {

    }
  };
}

maStep.$inject = ['$timeout'];

function maStep($timeout) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    require: ['^maSteps'],
    template: maStepTpl,
    scope: true,
    link: function (scope, element, attrs, ctrl) {
      const parentScope = scope.$parent.$parent;

      parentScope._index++;
      scope._index = parentScope._index;

      parentScope.$watch('index', d => {
        scope.index = d;
      });
      parentScope.$watch('type', d => {
        scope.type = d;
      });
    }
  };
}
