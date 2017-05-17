import './scss/app.scss';

import utils from './utils';

import icons from './components/icons';
import menu from './components/menu';
import button from './components/button';
import crumb from './components/crumb';
import tabs from './components/tabs';
import steps from './components/steps';


const moduleName = require('./name.js');

angular.module(moduleName, [
  icons,
  menu,
  button,
  crumb,
  tabs,
  steps,
]).config(function () {}).run(function () {});

export default moduleName;
