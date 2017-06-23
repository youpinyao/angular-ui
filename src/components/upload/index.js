import moduleName from './src/name.js';
import button from '../button';
import icons from '../icons';
import progress from '../progress';
import 'angular-file-upload';


angular.module(moduleName, [
  'angularFileUpload',
  button,
  icons,
  progress,
]).config(function () {}).run(function () {});

require('./src/directive.js');

export default moduleName;
