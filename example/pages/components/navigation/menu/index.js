import './index.scss';

const controller = 'menuCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
  $scope.firstSecondMenu = `<ma-first-menu>
  <ma-second-menu></ma-second-menu>
</ma-first-menu>`;
  $scope.siderMenu = `<ma-sider-menu
  ma-title="我是菜单标题"
  ma-routers="routerConfig">

// routerConfig
// 这个配置和路由配置相仿，state参数，在路由上都要有对应的配置
</ma-sider-menu>
[{
  title: 'General 一般',
  state: 'components.general',
  hidden: false,
  params: {
    id: 666,
  },
  routers: [{
    title: 'Icon 图标',
    state: 'components.general.icon',
    hidden: false,
    params: {
      id: 666,
    },
  }]
}, {
  title: 'Global 全局',
  state: 'components.global',
  hidden: false,
  params: {
    id: 666,
  },
  routers: [{
    title: 'Font 文字',
    state: 'components.global.font',
    hidden: false,
    params: {
      id: 666,
    },
  }, {
    title: 'Color 颜色',
    state: 'components.global.color',
    hidden: false,
    params: {
      id: 666,
    },
  }]
}].......`;
}

export default {
  template: require('./index.html'),
  controller,
};
