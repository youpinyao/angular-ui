import moduleName from './src/name.js';

angular.module(moduleName, []).config(function () {}).run(function () {});

require('./src/service.js');

export default moduleName;
