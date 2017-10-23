import './index.scss';

const controller = 'paginationCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout', '$interval', '$message', '$q', '$table'];

function mainCtrl($scope, $timeout, $interval, $message, $q, $table) {
  $scope.paginationConf = {
    currentPage: 1,
    totalItems: 1000,
    itemsPerPageSize: 10,
    pagesLength: 5,
    // perPageOptions: [10, 20, 30, 40, 50],
    onChange: function(page, size) {
      console.log(page, size);
    }
  };
  $scope.codeText = '<ma-pagination ma-config="paginationConf"></ma-pagination>';
  $scope.configText = `$scope.paginationConf = {
    currentPage: 1,                        // 当前页码
    totalItems: 8000,                      // 数据总数
    itemsPerPageSize: 10,                  // 每页数据条数
    pagesLength: 5,                        // 分页显示个数
    perPageOptions: [10, 20, 30, 40, 50],  // 每页数据条数选择列表
    onChange: function(page, size) {                 // 页码变化后的回掉, page:页码, size: 每页数据量大小
    }
  }`;
  // $scope.jumpToPage = function() {
  //   $scope.jumpToPage(2);
  // };
}

export default {
  template: require('./index.html'),
  controller,
};
