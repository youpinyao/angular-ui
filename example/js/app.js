import './vendor.js';

import meetAngularUI from '../../src';

import '../scss/app.scss';

const app = angular.module('app', [
  meetAngularUI,
  'ui.router',
]);
const routerConfig = require('./routerConfig.js');

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
run.$inject = ['$rootScope'];

app.config(config).run(run);
angular.bootstrap(document, ['app']);

function run($rootScope) {
  $rootScope.routerConfig = angular.flattenRouter(routerConfig);
}

function config($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.rule(routerRule);

  angular.forEach(angular.flattenRouter(routerConfig), function (value) {
    $stateProvider
      .state(value.state, {
        url: value.url,
        template: value.template,
        templateUrl: value.templateUrl,
        controller: value.controller,
      });
  });
}

function routerRule($injector, $location) {
  let path = $location.path();
  let toState = null;
  let toUrl = '';

  if (!path) {
    return routerConfig[0].url;
  }

  eachRouter(routerConfig, '');

  function eachRouter(routers, pUrl) {
    routers.forEach(router => {
      let rUrl = pUrl + router.url;

      if (rUrl === path) {
        toState = router;
        toUrl += pUrl + toState.url;
      }

      if (router.routers) {
        eachRouter(router.routers, rUrl);
      }
    });
  }

  while (toState && toState.routers && toState.routers.length) {
    toState = toState.routers[0];
    toUrl += toState.url;
  }

  if (toUrl && toUrl !== path) {
    return toUrl;
  }

  return undefined;
}
