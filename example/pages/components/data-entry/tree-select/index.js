import './index.scss';

const controller = 'treeSelectCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$q', '$timeout', '$treeSelect'];

function mainCtrl($scope, $q, $timeout, $treeSelect) {
  $scope.selectValue = ['6666'];
  $scope.disabled = false;

  $scope.data = [{
    text: '6666',
    value: '6666',
    sub: [{
      text: '7777',
      value: '7777',
    }, {
      text: '8888',
      value: '8888',
    }, {
      text: '9999',
      value: '9999',
    }]
  }, {
    text: '66661',
    value: '66661',
    sub: [{
      text: '77771',
      value: '77771',
    }, {
      text: '88881',
      value: '88881',
    }, {
      text: '99991',
      value: '99991',
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
