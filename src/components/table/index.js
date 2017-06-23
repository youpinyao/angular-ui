import moduleName from './src/name.js';
import checkbox from '../checkbox';
import select from '../select';
import 'ng-table/bundles/ng-table.min.js';

angular.module(moduleName, [
  'ngTable',
  checkbox,
  select,
]).config(function() {}).run(function() {});

require('./src/directive.js');
require('./src/service.js');

export default moduleName;
