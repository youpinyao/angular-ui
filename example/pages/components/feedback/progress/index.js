import './index.scss';

const controller = 'progressCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout', '$interval', '$message'];

function mainCtrl($scope, $timeout, $interval, $message) {
  $scope.codeText = require('./code.html');
  $scope.percent = 0;
}

export default {
  template: require('./index.html'),
  controller,
};
