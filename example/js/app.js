import './vendor.js';
import meetAngularUI from '../../src';

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
  $rootScope.routerConfig = routerConfig;
}

function config($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.rule(routerRule);

  angular.forEach(routerConfig, function (value) {
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

  if (!path) {
    return routerConfig[0].url;
  }

  routerConfig.forEach(router => {
    if (router.url === path) {
      toState = router;
    }
  });

  if (toState && toState.routers && toState.routers.length) {
    return toState.url + toState.routers[0].url;
  }

  return undefined;
}
