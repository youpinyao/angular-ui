import './index.scss';

const controller = 'datepickerCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout'];

function mainCtrl($scope, $timeout) {
  $scope.pickerDate = new Date();
  $scope.rangePickerDate = [new Date(), new Date()];

  $timeout(() => {
    $scope.rangePickerDate = null;
  }, 3000);
}

export default {
  template: require('./index.html'),
  controller,
};
