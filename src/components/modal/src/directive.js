import moduleName from './name.js';
import maModalTpl from './maModalTpl.html';
import $ from 'jquery';

const isIE9 = /msie 9\.0/g.test(window.navigator.userAgent.toLowerCase());

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
    controller: ['$scope', '$element', function($scope, $element) {
      const config = $scope.config;
      this.close = close;
      this.buttonClick = buttonClick;

      // 渲染弹窗内容
      $timeout(() => {
        $($element).find('.ma-modal-body').html(config.template);
        $compile($($element).find('.ma-modal-body'))(config.scope);
      });

      function close($event) {
        config.show = false;

        $timeout(() => {
          $($element).remove();
          let staticCount = 0;
          $('.ma-modal.show').each(function() {
            if ($(this).css('position') === 'static') {
              staticCount += 1;
            }
          });
          if (!($('.ma-modal.show').length - staticCount)) {
            $('body').removeClass('has-ma-modal');
          }
        }, isIE9 ? 0 : 310);
      }

      function buttonClick($event, callback) {
        if (typeof callback === 'function') {
          callback(this, config, $event);
        }
      }
    }],
    link: function(scope, element, attrs, ctrl) {

    }
  };
}
