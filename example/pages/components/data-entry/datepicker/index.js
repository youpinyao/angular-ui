import './index.scss';

const controller = 'datepickerCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
  $scope.pickerDate = new Date();
  $scope.rangePickerDate = [new Date(), new Date()];
}

export default {
  template: require('./index.html'),
  controller,
};
