import './index.scss';

const controller = 'buttonCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
  $scope.sizeModel = 'default';
  $scope.codeText = require('./code.html');
}

export default {
  template: require('./index.html'),
  controller,
};
