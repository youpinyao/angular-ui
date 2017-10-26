import './src/_spin.scss';
import moduleName from './src/name.js';

angular.module(moduleName, []).config(function () {}).run(function () {});

require('./src/directive.js');
require('./src/service.js');

export default moduleName;
