import moduleName from './src/name.js';
import button from '../button';

import 'moment';
require('../../utils/src/moment-zh-cn.js');
require('angular-datepicker-custom');
require('jquery-date-range-picker');

require('angular-datepicker-custom/dist/angular-datepicker.css');


angular.module(moduleName, [
  'datePicker',
  button,
]).config(function() {}).run(function() {});

require('./src/directive.js');

export default moduleName;
