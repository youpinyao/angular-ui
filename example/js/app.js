require('./vendor.js');
require('../../src/index.js');

const routerConfig = require('./routerConfig.js');
const app = angular.module('app', [
  'meetyou-angular-ui',
  'ui.router',
]);

app.run(run).config(config);

angular.bootstrap(document, ['app']);

function run() {

}

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

function config($stateProvider, $urlRouterProvider, $httpProvider) {
  angular.forEach(routerConfig, function (value) {
    $stateProvider
      .state(value.state, {
        url: value.url,
        template: value.template,
        templateUrl: value.templateUrl,
        controller: value.controller
      });
  });
}
