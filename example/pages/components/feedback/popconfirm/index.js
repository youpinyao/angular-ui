import './index.scss';

import popconfirmTemplate from './popconfirmTemplate.html';

const controller = 'popconfirmCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout', '$interval', '$modal', '$message', '$injector',
  '$popconfirm'
];

function mainCtrl($scope, $timeout, $interval, $modal, $message, $injector, $popconfirm) {
  const $validationProvider = $injector.get('$validation');


  $scope.inputValue = '777';
  $scope.popconfirmTemplate = popconfirmTemplate;
  $scope.popconfirmTemplateText = '<div>这是一段说明的文字。这是一段说明的文字。这是一段说明的文字。</div>';
  $scope.cancel = cancel;
  $scope.save = save;
  $scope.changeCallback = changeCallback;

  function cancel() {
    $popconfirm.close();
  }

  function changeCallback(show) {
    console.log('status', show);
  }

  function save() {
    $validationProvider.validate($scope.PopconformForm)
      .success(() => {
        console.log('do submit success');
        $popconfirm.close();
      })
      .error(() => {
        console.log('do submit error');
      });
  }
}

export default {
  template: require('./index.html'),
  controller,
};
