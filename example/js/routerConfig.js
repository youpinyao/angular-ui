import components from '../pages/components';

import global from '../pages/components/global';
import font from '../pages/components/global/font';
import color from '../pages/components/global/color';

import layout from '../pages/components/layout';
import general from '../pages/components/general';
import feedback from '../pages/components/feedback';
import navigation from '../pages/components/navigation';
import dataEntry from '../pages/components/data-entry';
import dataDisplay from '../pages/components/data-display';

import services from '../pages/services';
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
  }, {
    title: 'General 一般',
    state: 'components.general',
    url: '/general',
    ...general,
  }, {
    title: 'Feedback 反馈',
    state: 'components.feedback',
    url: '/feedback',
    ...general,
  }, {
    title: 'Navigation 导航',
    state: 'components.navigation',
    url: '/navigation',
    ...general,
  }, {
    title: 'Data Entry 数据输入',
    state: 'components.dataEntry',
    url: '/data-enpty',
    ...general,
  }, {
    title: 'Data Display 数据显示',
    state: 'components.dataDisplay',
    url: '/data-display',
    ...general,
  }]
}, {
  title: 'Services 服务',
  state: 'services',
  url: '/services',
  ...services,
}, {
  title: 'Utils 工具',
  state: 'utils',
  url: '/utils',
  ...utils,
}];

module.exports = routers;
export default routers;
