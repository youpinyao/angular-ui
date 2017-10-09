import './index.scss';

const controller = 'menuCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
  $scope.code1Text = require('./code1.html');
  $scope.code2Text = require('./code2.html');
  $scope.code3Text = require('./code3.html');
  $scope.code3Js = require('./code3.js');

  $scope.siderMenuConfig = [{
    title: 'General 一般',
    state: 'components.general',
    hidden: false,
    childState: ['components.general.icon'], // secondMenu 使用，子路由的state，可以是数组或者字符串，配在这里在这些路由下secondMenu 也会active
    params: {
      id: 666,
    },
    activeParams: [{
      id: 777,
    }], // 只在siderMenu 使用, 也要active 状态的路由
    childs: [{
      state: '',
      params: {

      }
    }], // 只在siderMenu 使用 当前页面状态，和配置中的state params 相同，就active
    routers: [{
      title: 'Icon 图标',
      state: 'components.general.icon',
      hidden: false,
      hiddenSecond: false, // 是否在二级菜单隐藏
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
  }];
}

export default {
  template: require('./index.html'),
  controller,
};
