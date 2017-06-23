import components from '../pages/components';

import global from '../pages/components/global';
import font from '../pages/components/global/font';
import color from '../pages/components/global/color';

import layout from '../pages/components/layout';
import grid from '../pages/components/layout/grid';
import layoutLayout from '../pages/components/layout/layout';
import cls from '../pages/components/layout/cls';

import general from '../pages/components/general';
import icon from '../pages/components/general/icon';
import button from '../pages/components/general/button';

import feedback from '../pages/components/feedback';
import message from '../pages/components/feedback/message';
import alert from '../pages/components/feedback/alert';
import spin from '../pages/components/feedback/spin';
import progress from '../pages/components/feedback/progress';
import modal from '../pages/components/feedback/modal';
import popconfirm from '../pages/components/feedback/popconfirm';

import navigation from '../pages/components/navigation';
import crumb from '../pages/components/navigation/crumb';
import menu from '../pages/components/navigation/menu';
import tabs from '../pages/components/navigation/tabs';
import steps from '../pages/components/navigation/steps';

import dataEntry from '../pages/components/data-entry';
import input from '../pages/components/data-entry/input';
import inputNumber from '../pages/components/data-entry/input-number';
import radio from '../pages/components/data-entry/radio';
import checkbox from '../pages/components/data-entry/checkbox';
import switchs from '../pages/components/data-entry/switch';
import dropdown from '../pages/components/data-entry/dropdown';
import autoComplete from '../pages/components/data-entry/auto-complete';
import select from '../pages/components/data-entry/select';
import treeSelect from '../pages/components/data-entry/tree-select';
import transfer from '../pages/components/data-entry/transfer';
import upload from '../pages/components/data-entry/upload';
import form from '../pages/components/data-entry/form';
import datepicker from '../pages/components/data-entry/datepicker';

import dataDisplay from '../pages/components/data-display';
import tooltip from '../pages/components/data-display/tooltip';
import table from '../pages/components/data-display/table';

import utils from '../pages/utils';

const routers = [{
  title: 'Components 组件',
  state: 'components',
  url: '/components',
  ...components,
  routers: [{
    title: 'Global 全局',
    state: 'components.global',
    url: '/global',
    ...global,
    routers: [{
      title: 'Font 文字',
      state: 'components.global.font',
      url: '/font',
      ...font,
    }, {
      title: 'Color 颜色',
      state: 'components.global.color',
      url: '/color',
      ...color,
    }]
  }, {
    title: 'Layout 布局',
    state: 'components.layout',
    url: '/layout',
    ...layout,
    routers: [{
      title: 'Grid 栅格',
      state: 'components.layout.grid',
      url: '/grid',
      ...grid,
    }, {
      title: 'Layout 布局',
      state: 'components.layout.layout',
      url: '/layout',
      ...layoutLayout,
    }, {
      title: 'Class 预设样式',
      state: 'components.layout.cls',
      url: '/cls',
      ...cls,
    }],
  }, {
    title: 'General 一般',
    state: 'components.general',
    url: '/general',
    ...general,
    routers: [{
      title: 'Icon 图标',
      state: 'components.general.icon',
      url: '/icon',
      ...icon,
    }, {
      title: 'Button 按钮',
      state: 'components.general.button',
      url: '/button',
      ...button,
    }]
  }, {
    title: 'Feedback 反馈',
    state: 'components.feedback',
    url: '/feedback',
    ...feedback,
    routers: [{
      title: 'Message 全局提示',
      state: 'components.feedback.message',
      url: '/message',
      ...message,
    }, {
      title: 'Alert 警告提示',
      state: 'components.feedback.alert',
      url: '/alert',
      ...alert,
    }, {
      title: 'Spin 加载中',
      state: 'components.feedback.spin',
      url: '/spin',
      ...spin,
    }, {
      title: 'Progress 进度条',
      state: 'components.feedback.progress',
      url: '/progress',
      ...progress,
    }, {
      title: 'Modal 对话框',
      state: 'components.feedback.modal',
      url: '/modal',
      ...modal,
    }, {
      title: 'Popconfirm 气泡确认框',
      state: 'components.feedback.popconfirm',
      url: '/popconfirm',
      ...popconfirm,
    }],
  }, {
    title: 'Navigation 导航',
    state: 'components.navigation',
    url: '/navigation',
    ...navigation,
    routers: [{
      title: 'Breadcrumb 面包屑',
      state: 'components.navigation.crumb',
      url: '/crumb',
      ...crumb,
    }, {
      title: 'Menu 菜单',
      state: 'components.navigation.menu',
      url: '/menu',
      ...menu,
    }, {
      title: 'Tabs 标签页',
      state: 'components.navigation.tabs',
      url: '/tabs',
      ...tabs,
    }, {
      title: 'Steps 步骤条',
      state: 'components.navigation.steps',
      url: '/steps',
      ...steps,
    }]
  }, {
    title: 'Data Entry 数据输入',
    state: 'components.dataEntry',
    url: '/data-enpty',
    ...dataEntry,
    routers: [{
      title: 'Input 输入框',
      state: 'components.dataEntry.input',
      url: '/input',
      ...input,
    }, {
      title: 'InputNumber 数字输入框',
      state: 'components.dataEntry.inputNumber',
      url: '/input-number',
      ...inputNumber,
    }, {
      title: 'Radio 单选框',
      state: 'components.dataEntry.radio',
      url: '/radio',
      ...radio,
    }, {
      title: 'Checkbox 多选框',
      state: 'components.dataEntry.checkbox',
      url: '/checkbox',
      ...checkbox,
    }, {
      title: 'Switch 开关',
      state: 'components.dataEntry.switch',
      url: '/switch',
      ...switchs,
    }, {
      title: 'Dropdown 下拉菜单',
      state: 'components.dataEntry.dropdown',
      url: '/dropdown',
      ...dropdown,
    }, {
      title: 'AutoComplete 自动完成',
      state: 'components.dataEntry.autoComplete',
      url: '/autoComplete',
      ...autoComplete,
    }, {
      title: 'Select 选择器',
      state: 'components.dataEntry.select',
      url: '/select',
      ...select,
    }, {
      title: 'TreeSelect 树形选择器',
      state: 'components.dataEntry.treeSelect',
      url: '/treeSelect',
      ...treeSelect,
    }, {
      title: 'Transfer 穿梭框',
      state: 'components.dataEntry.transfer',
      url: '/transfer',
      ...transfer,
    }, {
      title: 'Upload 上传',
      state: 'components.dataEntry.upload',
      url: '/upload',
      ...upload,
    }, {
      title: 'DatePicker 日期选择框',
      state: 'components.dataEntry.datepicker',
      url: '/datepicker',
      ...datepicker,
    }, {
      title: 'Form 表单',
      state: 'components.dataEntry.form',
      url: '/form',
      ...form,
    }],
  }, {
    title: 'Data Display 数据显示',
    state: 'components.dataDisplay',
    url: '/data-display',
    ...dataDisplay,
    routers: [{
      title: 'Tooltip 文字提示',
      state: 'components.dataDisplay.tooltip',
      url: '/tooltip',
      ...tooltip,
    }, {
      title: 'Table 表格',
      state: 'components.dataDisplay.table',
      url: '/table',
      ...table,
    }]
  }]
}, {
  title: 'Utils 工具',
  state: 'utils',
  url: '/utils',
  ...utils,
}];

module.exports = routers;
export default routers;
