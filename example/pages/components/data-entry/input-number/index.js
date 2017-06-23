import './index.scss';

const controller = 'inputNumberCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
  $scope.numberTestValue = 4;
  $scope.placeholder = '提示文本';
}

export default {
  template: require('./index.html'),
  controller,
};
