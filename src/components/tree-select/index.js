import moduleName from './src/name.js';
import button from '../button';
import checkbox from '../checkbox';
import icons from '../icons';
import input from '../input';

angular.module(moduleName, [
  button,
  checkbox,
  icons,
  input,
]).config(function () {}).run(function () {});

require('./src/directive.js');
require('./src/service.js');

export default moduleName;
