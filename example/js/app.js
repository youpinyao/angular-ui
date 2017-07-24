import './vendor.js';

import $ from 'jquery';
import meetyou from '../../src';

import '../scss/app.scss';

import loginService from './services/loginService.js';
import requestService from './services/requestService.js';

const app = angular.module('app', [
  meetyou,
  loginService,
  requestService,
  'ui.router',
  'ngSanitize',
]);
const routerConfig = require('./routerConfig.js');

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
run.$inject = ['$rootScope', 'loginService', '$request', '$loading'];

app.config(config).run(run);
angular.bootstrap(document, ['app']);

function run($rootScope, loginService, $request, $loading) {
  $rootScope.routerConfig = flattenRouter(routerConfig);
}

function config($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.rule(routerRule);

  angular.forEach(flattenRouter(routerConfig), function(value) {
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

  if (!path || path === '/') {
    angular.each(routerConfig, d => {
      if (d.hidden !== true && !toUrl) {
        toUrl = d.url;
      }
    });
    return toUrl;
  }

  eachRouter(routerConfig, '');

  function hasRouters(routers) {
    let count = 0;

    angular.each(routers, d => {
      if (d.hidden !== true) {
        count++;
      }
    });

    return count > 0;
  }

  function eachRouter(routers, pUrl) {
    routers.forEach(router => {
      let rUrl = pUrl + router.url;

      if (sameUrl(rUrl, path)) {
        toState = router;
        toUrl += pUrl + toState.url;
      }

      if (hasRouters(router.routers)) {
        eachRouter(router.routers, rUrl);
      }
    });
  }

  function sameUrl(url1, url2) {
    url1 = url1 ? url1.split('/') : [];
    url2 = url2 ? url2.split('/') : [];

    let count = 0;

    url1.forEach((d, i) => {
      if (d === url2[i] || (d.indexOf(':') !== -1 && url2[i])) {
        count++;
      }
    });

    return count >= url1.length && url1.length === url2.length;
  }

  while (toState && hasRouters(toState.routers)) {
    toState = toState.routers[0];
    toUrl += toState.url;
  }

  if (toUrl && toState && toUrl === path) {
    toUrl = setParams(toUrl, toState.params || {});
  }

  if (toUrl && !sameUrl(toUrl, path)) {
    return toUrl;
  }

  if (!toState) {
    window.location.href = '/404.html';
  }

  return undefined;
}

function setParams(url, params) {
  if (angular.isNull(url)) {
    return url;
  }

  url = url.split('/');

  angular.each(url, (d, i) => {
    if (/:/g.test(d)) {
      url[i] = params[d.split(':')[1]] || '';
    }
  });
  url = url.join('/');

  return url;
}

function flattenRouter(routers, level, parent) {
  let flattenRoutes = [];
  routers = $.extend(true, [], routers);

  if (!level) {
    level = 1;
  } else {
    level++;
  }

  routers.forEach((router) => {
    flattenRoutes.push(router);

    router.level = level;
    router.parent = parent;

    if (router.routers && router.routers.length) {
      flattenRoutes = flattenRoutes.concat(flattenRouter(router.routers, level, router));
    }

    delete router.routers;
  });

  return flattenRoutes;
}
