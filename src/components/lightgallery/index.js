import moduleName from './src/name.js';
require('lightgallery.js/dist/css/lightgallery.css');

angular.module(moduleName, []).config(function () {}).run(function () {});

require('./src/directive.js');
require('./src/service.js');

export default moduleName;
