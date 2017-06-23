import moduleName from './name.js';
import maProgressTpl from './maProgressTpl.html';
import $ from 'jquery';

angular.module(moduleName)
  .directive('maProgress', maProgress);

maProgress.$inject = [];

function maProgress() {
  return {
    restrict: 'E',
    scope: {
      size: '@maSize',
      type: '@maType',
      status: '@maStatus',
      percent: '@maPercent',
      strokeWidth: '@maStrokeWidth',
    },
    replace: true,
    transclude: true,
    template: maProgressTpl,
    link: function (scope, element, attrs, ctrl) {
      scope.size = 120;
      scope.type = 'line';
      scope.status = 'success';
      scope.percent = 0;
      scope.strokeWidth = 6;

      updateProgress();

      attrs.$observe('maPercent', d => {
        scope.percent = d ? parseInt(d, 10) : 0;
        updateProgress();
      });
      attrs.$observe('maSize', d => {
        scope.size = d ? parseInt(d, 10) : 120;
        updateProgress();
      });

      function updateProgress() {
        const svg = $(element).find('.ma-progress-circle');

        svg.attr('width', scope.size);
        svg.attr('height', scope.size);
      }
    }
  };
}
