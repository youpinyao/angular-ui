import './index.scss';

const controller = 'inputCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
  $scope.testValue = '123';
  $scope.numberTestValue = 3.12;
  $scope.placeholder = '提示文本';

  $scope.codeText = require('./code.html');

  $scope.iconClick = function(e) {
    console.log('iconClick');
  };
}

export default {
  template: require('./index.html'),
  controller,
};
