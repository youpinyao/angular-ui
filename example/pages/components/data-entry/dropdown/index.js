import './index.scss';

const controller = 'dropdownCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
  $scope.showDropDown1 = false;
  $scope.showDropDown2 = false;

  $scope.dropdownItems = [{
    text: '我是下拉内容1',
    value: '1',
  }, {
    text: '我是下拉内容2',
    value: '2',
  }, {
    text: '我是下拉内容3',
    value: '3',
  }, {
    text: '我是下拉内容4',
    value: '4',
  }, {
    text: '我是下拉内容5',
    value: '5',
  }, {
    text: '我是下拉内容6',
    value: '6',
  }];

  $scope.dropdownActiveItems = [{
    value: '1'
  }];


  $scope.dropdownItemClick = function ($event, $item) {
    $scope.dropdownActiveItems = $item;
  };
}

export default {
  template: require('./index.html'),
  controller,
};
