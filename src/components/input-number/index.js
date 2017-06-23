import moduleName from './src/name.js';

import icons from '../icons';
import input from '../input';

angular.module(moduleName, [
  icons,
  input,
]).config(function () {}).run(function () {});

require('./src/directive.js');

export default moduleName;
