import moduleName from './name.js';
import $ from 'jquery';

angular.module(moduleName)
  .factory('$popconfirm', popconfirmService);

popconfirmService.$inject = [];

function popconfirmService() {
  return {
    close,
  };

  function close() {
    $('.ma-tooltip.ma-popconfirm-tooltip').removeClass('show');
  }
}
