import moduleName from './src/name.js';
import dropdown from '../dropdown';
import input from '../input';
import button from '../button';
import icons from '../icons';

angular.module(moduleName, [
  dropdown,
  input,
  button,
  icons,
]).config(function () {}).run(function () {});

require('./src/directive.js');

export default moduleName;
