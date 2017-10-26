import './src/_alert.scss';
import moduleName from './src/name.js';
import icons from '../icons';
import button from '../button';

angular.module(moduleName, [
  icons,
  button,
]).config(function () {}).run(function () {});

require('./src/directive.js');

export default moduleName;
