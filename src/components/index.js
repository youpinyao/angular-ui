import icons from './icons';
import menu from './menu';
import button from './button';
import crumb from './crumb';
import tabs from './tabs';
import steps from './steps';
import input from './input';
import inputNumber from './input-number';
import radio from './radio';
import checkbox from './checkbox';
import switchs from './switch';
import dropdown from './dropdown';
import autoComplete from './auto-complete';
import select from './select';
import treeSelect from './tree-select';
import transfer from './transfer';
import upload from './upload';
import lightgallery from './lightgallery';
import message from './message';
import alert from './alert';
import spin from './spin';
import progress from './progress';
import tooltip from './tooltip';
import modal from './modal';
import popconfirm from './popconfirm';
import datepicker from './datepicker';
import table from './table';

import moduleName from './name.js';

angular.module(moduleName, [
  icons,
  menu,
  button,
  crumb,
  tabs,
  steps,
  input,
  inputNumber,
  radio,
  checkbox,
  switchs,
  dropdown,
  autoComplete,
  select,
  treeSelect,
  transfer,
  upload,
  lightgallery,
  message,
  alert,
  spin,
  progress,
  tooltip,
  modal,
  popconfirm,
  datepicker,
  table,
]).config(function() {}).run(function() {});

export default moduleName;
