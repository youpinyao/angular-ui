import './index.scss';

const controller = 'checkboxCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout', '$interval'];

function mainCtrl($scope, $timeout, $interval) {
  $scope.selectCheckbox = '1';
  $scope.codeText = require('./code.html');

  $scope.checkboxChange = function() {
    console.log(arguments);
  };
}

export default {
  template: require('./index.html'),
  controller,
};
