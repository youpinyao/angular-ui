import './index.scss';

const controller = 'alertCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout', '$interval', '$message'];

function mainCtrl($scope, $timeout, $interval, $message) {
  $scope.alertItems = [{
    type: 'success',
    text: '成功提示框，主要用来显示成功信息。',
    close: false,
  }, {
    type: 'danger',
    text: '危险提示框，主要用来显示错误信息。',
  }, {
    type: 'warning',
    text: '警告提示框，主要用来显示重要信息。',
  }];
}

export default {
  template: require('./index.html'),
  controller,
};
