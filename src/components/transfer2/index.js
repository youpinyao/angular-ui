import moduleName from './src/name.js';

angular.module(moduleName, []).config(function () {}).run(function () {});

require('./src/treeDirective.js');
require('./src/treeTransfer2Directive.js');

export default moduleName;
