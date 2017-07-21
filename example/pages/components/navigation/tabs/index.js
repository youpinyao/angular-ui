import './index.scss';

const controller = 'tabsCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout'];

function mainCtrl($scope, $timeout) {
  $scope.selectTab = 0;
  $scope.selectTab2 = 'default';
  $scope.defaultTabs =
    `<ma-tabs ng-model="selectTab">
  <ma-tab ma-value="0">选项卡1</ma-tab>
  <ma-tab ma-value="1">选项卡2</ma-tab>
  <ma-tab ma-value="2">选项卡3</ma-tab>
</ma-tabs>`;
  $scope.buttonTabs =
    `<ma-tabs ng-model="selectTab">
  <ma-tab-button ma-size="{{selectTab}}" ma-value="large">选项卡 大</ma-tab-button>
  <ma-tab-button ma-size="{{selectTab}}" ma-value="default">选项卡 中</ma-tab-button>
  <ma-tab-button ma-size="{{selectTab}}" ma-value="small">选项卡 小</ma-tab-button>
</ma-tabs>`;
  $timeout(() => {
    $scope.selectTab = 1;
  }, 1000);
}

export default {
  template: require('./index.html'),
  controller,
};
