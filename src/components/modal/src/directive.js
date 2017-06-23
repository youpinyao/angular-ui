import moduleName from './name.js';
import maModalTpl from './maModalTpl.html';
import $ from 'jquery';

angular.module(moduleName)
  .directive('maModal', maModal);

maModal.$inject = ['$timeout', '$compile'];

function maModal($timeout, $compile) {
  return {
    restrict: 'E',
    scope: {
      config: '=maConfig',
      uuid: '@maUuid',
    },
    replace: true,
    template: maModalTpl,
    controllerAs: '$ctrl',
    controller: ['$scope', '$element', function ($scope, $element) {
      const config = $scope.config;
      this.close = close;
      this.buttonClick = buttonClick;

      // 渲染弹窗内容
      $($element).find('.ma-modal-body').html(config.template);
      $compile($($element).find('.ma-modal-body'))(config.scope);

      function close($event) {
        config.show = false;
        $timeout(() => {
          $($element).remove();
        }, 1000);
      }

      function buttonClick($event, callback) {
        if (typeof callback === 'function') {
          callback(this, config);
        }
      }
    }],
    link: function (scope, element, attrs, ctrl) {

    }
  };
}
