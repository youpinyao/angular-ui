import './index.scss';

const controller = 'tabsCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
  $scope.selectTab = 0;
  $scope.defaultTabs = `<ma-tabs ng-model="selectTab">
  <ma-tab ma-value="0">选项卡1</ma-tab>
  <ma-tab ma-value="1">选项卡2</ma-tab>
  <ma-tab ma-value="2">选项卡3</ma-tab>
</ma-tabs>`;
  $scope.buttonTabs = `<ma-tabs ng-model="selectTab">
  <ma-tab-button ma-value="0">选项卡1</ma-tab-button>
  <ma-tab-button ma-value="1">选项卡2</ma-tab-button>
  <ma-tab-button ma-value="2">选项卡3</ma-tab-button>
</ma-tabs>`;
}

export default {
  template: require('./index.html'),
  controller,
};
