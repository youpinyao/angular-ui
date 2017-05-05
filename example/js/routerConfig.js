import components from '../pages/components';
import global from '../pages/components/global';
import layout from '../pages/components/layout';

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
  }, {
    title: 'Layout 布局',
    state: 'components.layout',
    url: '/layout',
    ...layout,
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

function flatten(routers, level, parent) {
  let flattenRoutes = [];
  if (!level) {
    level = 1;
  } else {
    level++;
  }

  routers.forEach((route) => {
    flattenRoutes.push(route);
    route.level = level;
    route.parent = parent;
    if (route.routers && route.routers.length) {
      flattenRoutes = flattenRoutes.concat(flatten(route.routers, level, route));
    }
  });

  return flattenRoutes;
}

module.exports = flatten(routers);
