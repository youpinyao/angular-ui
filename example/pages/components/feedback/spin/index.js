import './index.scss';

const controller = 'spinCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout', '$interval', '$message'];

function mainCtrl($scope, $timeout, $interval, $message) {
  $scope.numberTestValue = 120;
  $scope.codeText = `
  <ma-spin
    ma-size="120"
  ></ma-spin>
  `;
}

export default {
  template: require('./index.html'),
  controller,
};
