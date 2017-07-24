import './index.scss';

const controller = 'transferCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$q', '$timeout', '$treeSelect'];

function mainCtrl($scope, $q, $timeout, $treeSelect) {
  $scope.selectValue = ['6666', '66666'];
  $scope.selectTreeValue = ['6666', '7777', '8888', '9999'];
  $scope.disabled = false;

  $scope.data = [{
    text1: '6666',
    value1: '6666',
  }, {
    text1: '66661',
    value1: '66661',
  }, {
    text1: '66662',
    value1: '66662',
  }, {
    text1: '66663',
    value1: '66663',
  }, {
    text1: '66664',
    value1: '66664',
  }, {
    text1: '66665',
    value1: '66665',
  }, {
    text1: '66666',
    value1: '66666',
  }];


  $scope.treeData = [{
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
    }, {
      text1: '99992',
      value1: '99992',
    }]
  }];

  $scope.$watch('selectValue', d => {
    console.log('normal', d);
  });

  $scope.$watch('selectTreeValue', d => {
    console.log('tree', d);
  });
}

export default {
  template: require('./index.html'),
  controller,
};
