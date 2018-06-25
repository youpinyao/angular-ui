import moduleName from './src/name.js';
import button from '../button';
import icons from '../icons';
import progress from '../progress';
import message from '../message';
import './src/lib/angular-file-upload';


angular.module(moduleName, [
  'angularFileUpload',
  button,
  icons,
  progress,
  message,
]).config(function () {}).run(function () {});

require('./src/directive.js');

export default moduleName;
