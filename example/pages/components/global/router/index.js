import './index.scss';

import routerConfig from '../../../../js/routerConfig.js';

const controller = 'routerCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
  $scope.routerConfigDemo = `{
    title: '全局',
    state: 'global',
    url: '/global',
    controller: 'globalCtrl',
    controllerAs: '$ctrl',
    templateUrl: './index.html',
    template: '<div>我是 html 内容</div>',
    params: {
      id: 0,
    },
    routers: [
    ...........
    ]
  }`;
}

export default {
  template: require('./index.html'),
  controller,
};
