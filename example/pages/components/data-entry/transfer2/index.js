import './index.scss';
import cityData from './data.json';

const controller = 'transfer2Ctrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$q', '$timeout', '$treeSelect'];

function mainCtrl($scope, $q, $timeout, $treeSelect) {
  $scope.selectTreeValue = ['110000', '130200', '130100'];
  $scope.selectTreeParentValue = null;
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
          sub1: [{
            text1: ddd.city_name,
            value1: ddd.city_id + '11',
          }, {
            text1: ddd.city_name,
            value1: ddd.city_id + '22',
          }]
        });
      });
      $scope.treeData.push(data);
    });
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
