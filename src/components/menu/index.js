import './src/style.scss';

import moduleName from './src/name.js';
import button from '../button';
import icons from '../icons';

angular.module(moduleName, [
  button,
  icons,
]).config(function () {}).run(function () {});

require('./src/directive.js');

export default moduleName;
