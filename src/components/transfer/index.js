import moduleName from './src/name.js';
import select from '../select';
import treeSelect from '../tree-select';

angular.module(moduleName, [
  select,
  treeSelect,
]).config(function () {}).run(function () {});

require('./src/directive.js');

export default moduleName;
