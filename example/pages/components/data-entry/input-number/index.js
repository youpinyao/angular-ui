import './index.scss';

const controller = 'inputNumberCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
  $scope.numberTestValue1 = 4;
  $scope.numberTestValue2 = 4;
  $scope.placeholder = '提示文本';
  $scope.codeText = require('./code.html');

  $scope.inputChange = function() {
    console.log(arguments, $scope.numberTestValue1);
  };
}

export default {
  template: require('./index.html'),
  controller,
};
