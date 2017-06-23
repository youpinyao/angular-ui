import './index.scss';

const controller = 'messageCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout', '$interval', '$message'];

function mainCtrl($scope, $timeout, $interval, $message) {
  $scope.showMessage = function (type) {
    switch (type) {
      case 'success':
        $message.success('成功提示框，主要用来显示成功信息。');
        break;
      case 'danger':
        $message.danger('警告提示框，主要用来显示重要信息。');
        break;
      case 'warning':
        $message.warning('危险提示框，主要用来显示错误信息。');
        break;
    }
  };
}

export default {
  template: require('./index.html'),
  controller,
};
