import './index.scss';

const controller = 'noticationCtrl';

angular.module('app').controller(controller, mainCtrl);
mainCtrl.$inject = ['$scope', '$timeout', '$interval', '$notification'];

function mainCtrl($scope, $timeout, $interval, $notification) {
  $scope.showNotification1 = function() {
    $notification({
      title: 'Notification Title',
      message: 'I will never close automatically. I will be close automatically. I will never close automatically.',
      onClose: function() {
        $scope.test = '可自动关闭回掉成功';
      },
    });
  };
  $scope.showNotification2 = function() {
    $notification({
      title: 'Notification Title',
      delay: null,
      message: 'I will never close automatically. I will be close automatically. I will never close automatically.',
      onClose: function() {
        $scope.test = '不能自动关闭回掉成功';
      },
    });
  };
}

export default {
  template: require('./index.html'),
  controller,
};
