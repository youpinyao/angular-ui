import './index.scss';

const controller = 'transferCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$q', '$timeout', '$treeSelect'];

function mainCtrl($scope, $q, $timeout, $treeSelect) {
  $scope.selectValue = ['6666', '66666'];
  $scope.selectTreeValue = ['6666', '7777', '8888', '9999'];
  $scope.disabled = false;

  $scope.data = [{
    text: '6666',
    value: '6666',
  }, {
    text: '66661',
    value: '66661',
  }, {
    text: '66662',
    value: '66662',
  }, {
    text: '66663',
    value: '66663',
  }, {
    text: '66664',
    value: '66664',
  }, {
    text: '66665',
    value: '66665',
  }, {
    text: '66666',
    value: '66666',
  }];


  $scope.treeData = [{
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
    }, {
      text: '99992',
      value: '99992',
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
