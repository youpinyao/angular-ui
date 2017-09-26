import './index.scss';

const controller = 'stepsCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout'];

function mainCtrl($scope, $timeout) {
  $scope.stepIndex = 1;

  $scope.setStepIndex = index => {
    $scope.stepIndex = index;
  };

  $scope.codeText = require('./code.html');
}

export default {
  template: require('./index.html'),
  controller,
};
