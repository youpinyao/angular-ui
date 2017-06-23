import moduleName from './name.js';
import util from './util.js';

angular.module(moduleName)
  .factory('$treeSelect', treeSelect);

treeSelect.$inject = [];

function treeSelect() {
  return util;
}
