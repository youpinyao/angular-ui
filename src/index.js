import './scss/app.scss';

import utils from './utils';

import icons from './components/icons';
import menu from './components/menu';
import button from './components/button';
import crumb from './components/crumb';

const moduleName = require('./name.js');

angular.module(moduleName, [
  icons,
  menu,
  button,
  crumb,
]).config(function () {}).run(function () {});

export default moduleName;
export {
  icons,
  menu,
  button,
  crumb,
};
