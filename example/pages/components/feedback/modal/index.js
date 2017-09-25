import './index.scss';

const controller = 'modalCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout', '$interval', '$modal', '$message'];

function mainCtrl($scope, $timeout, $interval, $modal, $message) {
  $scope.codeText = require('./code.html');
  const cb = {
    okCallback($ctrl) {
      $ctrl.close();
      $message.success('okCallback');
    },
    cancelCallback($ctrl) {
      $ctrl.close();
      $message.danger('cancelCallback');
    },
  };

  $scope.openModal = function() {
    $modal.open({
      title: '我是标题',
      scope: $scope,
      showClose: true,
      template: '<div ng-bind="modalText"></div>',
      ...cb,
    });
  };

  $scope.openAlert = function() {
    $modal.alert({
      scope: $scope,
      content: '我是弹窗信息',
      ...cb,
    });
  };

  $scope.openConfirm = function() {
    $modal.confirm({
      scope: $scope,
      title: '这是标题或者一个问句？',
      content: '这是一段说明的文字。这是一段说明的文字。这是一段说明的文字。这是一段说明的文字。这是一段说明的文字。',
      ...cb,
    });
  };
  $scope.openDelete = function() {
    $modal.delete({
      scope: $scope,
      title: '这是标题或者一个问句？',
      content: '这是一段说明的文字。这是一段说明的文字。这是一段说明的文字。这是一段说明的文字。这是一段说明的文字。',
      ...cb,
    });
  };

  $scope.modalText = '我是弹窗内容';
}

export default {
  template: require('./index.html'),
  controller,
};
