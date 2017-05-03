require('./vendor.js');
require('../../src/index.js');

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
  // $stateProvider.state('state', {
  //   url
  // });
}
