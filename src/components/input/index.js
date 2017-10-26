import './src/_input.scss';
import moduleName from './src/name.js';

import icons from '../icons';
import button from '../button';
import 'angular-validation-custom';
import '../../utils/src/angular-validation-rule.js';


angular.module(moduleName, [
  icons,
  button,
  'validation',
  'validation.rule',
]).config(function() {}).run(function() {});

require('./src/directive.js');

export default moduleName;
