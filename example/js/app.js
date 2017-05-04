import '../../src/scss/app.scss';
import './vendor.js';
import meetAngularUI from '../../src';

const app = angular.module('app', [
  meetAngularUI,
  'ui.router',
]);
const routerConfig = require('./routerConfig.js');

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

angular.bootstrap(document, ['app']);
app.run(run).config(config);

function run() {

}

function config($stateProvider, $urlRouterProvider, $httpProvider) {
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

