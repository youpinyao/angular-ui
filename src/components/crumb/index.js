import moduleName from './src/name.js';

import button from '../button';

angular.module(moduleName, [
  button,
]).config(function () {}).run(function () {});

require('./src/directive.js');

export default moduleName;
