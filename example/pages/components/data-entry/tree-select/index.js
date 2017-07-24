import './index.scss';

const controller = 'treeSelectCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$q', '$timeout', '$treeSelect'];

function mainCtrl($scope, $q, $timeout, $treeSelect) {
  $scope.selectValue = ['6666'];
  $scope.disabled = false;

  $scope.data = [{
    text1: '6666',
    value1: '6666',
    sub1: [{
      text1: '7777',
      value1: '7777',
    }, {
      text1: '8888',
      value1: '8888',
    }, {
      text1: '9999',
      value1: '9999',
    }]
  }, {
    text1: '66661',
    value1: '66661',
    sub1: [{
      text1: '77771',
      value1: '77771',
    }, {
      text1: '88881',
      value1: '88881',
    }, {
      text1: '99991',
      value1: '99991',
    }]
  }];

  $scope.$watch('selectValue', d => {
    console.log(d, $treeSelect);
  });
}

export default {
  template: require('./index.html'),
  controller,
};
