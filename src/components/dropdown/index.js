import moduleName from './src/name.js';
import 'angular-sanitize';
import button from '../button';
import input from '../input';


angular.module(moduleName, [
  'ngSanitize',
  button,
  input,
]).config(function () {}).run(function () {});

require('./src/directive.js');

export default moduleName;
