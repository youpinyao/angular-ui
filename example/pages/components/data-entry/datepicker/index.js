import './index.scss';
import moment from 'moment';

const controller = 'datepickerCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout'];

function mainCtrl($scope, $timeout) {
  $scope.pickerDate = new Date();
  $scope.rangePickerDate = [new Date(), new Date()];

  $scope.maxDate = new Date();

  $timeout(() => {
    $scope.maxDate = null;
    $scope.pickerDate = new Date();
  }, 3000);
}

export default {
  template: require('./index.html'),
  controller,
};
