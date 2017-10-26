import './src/_auto-complete.scss';
import moduleName from './src/name.js';
import dropdown from '../dropdown';
import input from '../input';

angular.module(moduleName, [
  dropdown,
  input,
]).config(function () {}).run(function () {});

require('./src/directive.js');

export default moduleName;
