import './index.scss';

const controller = 'tabsCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout'];

function mainCtrl($scope, $timeout) {
  $scope.selectTab = 0;
  $scope.selectTab2 = 'default';

  $scope.codeText = require('./code.html');

  $timeout(() => {
    $scope.selectTab = 1;
  }, 1000);
}

export default {
  template: require('./index.html'),
  controller,
};
