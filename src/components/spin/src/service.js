import moduleName from './name.js';
import $ from 'jquery';

angular.module(moduleName)
  .service('$loading', loadingService);

loadingService.$inject = ['$rootScope', '$compile'];

function loadingService($rootScope, $compile) {
  const loadingEl = $(
    `<div class="ma-loading" ng-class="{show: $root.showGlobalLoading}">
  <ma-spin></ma-spin>
  </div>`
  );

  $('body').append(loadingEl);

  $compile(loadingEl)($rootScope);

  return {
    show,
    hide,
  };

  function show() {
    $rootScope.showGlobalLoading = true;
  }

  function hide() {
    $rootScope.showGlobalLoading = false;
  }
}
