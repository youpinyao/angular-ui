import moduleName from './name.js';
import $ from 'jquery';

angular.module(moduleName)
  .factory('$popconfirm', popconfirmService);

popconfirmService.$inject = ['$timeout', '$rootScope'];

function popconfirmService($timeout, $rootScope) {
  return {
    close,
  };

  function close() {
    $rootScope.$broadcast('tooltip.hide');
    // $('.ma-tooltip.ma-popconfirm-tooltip').removeClass('show');
    // $timeout(() => {
    //   $('.ma-tooltip.ma-popconfirm-tooltip .ma-tooltip-content').html('');
    // }, 300);
  }
}
