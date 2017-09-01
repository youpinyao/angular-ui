import './index.scss';
import cityData from './data.json';

const controller = 'transferCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$q', '$timeout', '$treeSelect'];

function mainCtrl($scope, $q, $timeout, $treeSelect) {
  $scope.selectValue = ['6666', '66666'];
  $scope.selectTreeValue = ['110000', '130200', '130100'];
  $scope.disabled = false;

  $scope.treeData = [];

  angular.each(cityData.provinces, d => {
    angular.each(d.provinces, dd => {
      const data = {
        text1: dd.province_name,
        value1: dd.province_id,
        sub1: [],
      };
      angular.each(cityData.citys[dd.province_id], ddd => {
        data.sub1.push({
          text1: ddd.city_name,
          value1: ddd.city_id,
        });
      });
      $scope.treeData.push(data);
    });
  });

  console.log($scope.treeData);


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


  // $timeout(function() {
  //   $scope.treeData = [{
  //     text1: '6666',
  //     value1: '6666',
  //     sub1: [{
  //       text1: '7777',
  //       value1: '7777',
  //     }, {
  //       text1: '8888',
  //       value1: '8888',
  //     }, {
  //       text1: '9999',
  //       value1: '9999',
  //     }]
  //   }, {
  //     text1: '66661',
  //     value1: '66661',
  //     sub1: [{
  //       text1: '77771',
  //       value1: '77771',
  //     }, {
  //       text1: '88881',
  //       value1: '88881',
  //     }, {
  //       text1: '99991',
  //       value1: '99991',
  //     }, {
  //       text1: '99992',
  //       value1: '99992',
  //     }]
  //   }];
  // }, 300);

  $scope.$watch('selectValue', d => {
    // console.log('normal', d);
  });

  $scope.$watch('selectTreeValue', d => {
    console.log('tree', d);
  });
  $scope.$watch('selectTreeParentValue', d => {
    console.log('tree parent', d);
  });
}

export default {
  template: require('./index.html'),
  controller,
};
