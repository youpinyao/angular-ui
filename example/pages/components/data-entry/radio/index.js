import './index.scss';

const controller = 'radioCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
  $scope.selectRadio = '1';
  $scope.codeText = require('./code.html');

  $scope.radioChange = function() {
    console.log(arguments);
  };
}

export default {
  template: require('./index.html'),
  controller,
};
