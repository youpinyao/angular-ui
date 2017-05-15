import './index.scss';

const controller = 'crumbCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
  $scope.normalCrumb = `<ma-crumb>
  <ma-crumb-item ma-href="#!/components">Components 组件</ma-crumb-item>
  <ma-crumb-item ma-href="#!/components/global">Global 全局</ma-crumb-item>
  <ma-crumb-item>Font 文字</ma-crumb-item>
</ma-crumb>`;

  $scope.autoCrumb = '<ma-crumb-auto></ma-crumb-auto>';
}

export default {
  template: require('./index.html'),
  controller,
};
