import './index.scss';

const controller = 'tooltipCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout', '$interval', '$message'];

function mainCtrl($scope, $timeout, $interval, $message) {
  $scope.tipText = '我是提示文本6666我是提示文本6666我是提示文本6666';
  $scope.codeText = require('./code.html');
}

export default {
  template: require('./index.html'),
  controller,
};
