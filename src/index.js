import './scss/app.scss';

import menu from './components/menu';
import button from './components/button';

const moduleName = 'meetyou.angular.ui';

angular.module(moduleName, [
  menu,
  button,
]).config(function () {}).run(function () {});

export default moduleName;

export {
  menu,
  button,
};
