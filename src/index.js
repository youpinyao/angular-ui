import './scss/app.scss';

import './utils/src/angular-locale_zh-ch.js';

const moduleName = require('./name.js');

import utils from './utils';
import components from './components/index.js';

angular.module(moduleName, [
  utils,
  components,
]).config(['$qProvider', '$compileProvider', function($qProvider, $compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
  if ($qProvider && typeof $qProvider.errorOnUnhandledRejections === 'function') {
    $qProvider.errorOnUnhandledRejections(false);
  }
}]).run(function() {});

export default moduleName;
