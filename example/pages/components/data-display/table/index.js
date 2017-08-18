import './index.scss';

const controller = 'tableCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout', '$interval', '$message', '$q', '$table'];

function mainCtrl($scope, $timeout, $interval, $message, $q, $table) {
  $scope.selectAll = selectAll;
  $scope.unSelectAll = unSelectAll;
  $scope.setSelect = setSelect;
  $scope.setUnSelect = setUnSelect;

  function selectAll() {
    $table.getTableById('table1').selectAll();
    $table.getTableById('table2').selectAll();
  }

  function unSelectAll() {
    $table.getTableById('table1').unSelectAll();
    $table.getTableById('table2').unSelectAll();
  }

  function setSelect() {
    $table.getTableById('table1').setSelect([1, 2]);
    $table.getTableById('table2').setSelect([1, 2]);
  }

  function setUnSelect() {
    $table.getTableById('table1').setUnSelect([1, 2]);
    $table.getTableById('table2').setUnSelect([1, 2]);
  }

  // 表格配置
  $scope.tableConfig1 = {
    tableId: 'table1',
    // 是否使能checkbox框，默认为false
    enableCheckbox: true,
    // 是否使能分页，默认为true
    enablePagination: true,
    colsGroup: [{
      width: '20%'
    }, {
      width: '20%'
    }, {
      width: '20%'
    }, {
      width: '20%'
    }, {
      width: '20%'
    }],
    cols: [{
      field: 'real_name',
      title: '代理姓名/公司名',
      render() {
        return 6666;
      },
      show: true
    }, {
      field: 'shows1',
      title: '曝光数1',
      render() {
        return 6666;
      },
      show: true
    }, {
      field: 'shows2',
      title: '曝光数2',
      render() {
        return 6666;
      },
      show: true
    }, {
      field: 'shows3',
      title: '曝光数3',
      render() {
        return 6666;
      },
      show: true
    }, {
      field: 'shows4',
      title: '曝光数4',
      render() {
        return 6666;
      },
      show: true
    }],
    dataflagId: 'user_id',
    // 初始化表格数值
    dataset: [],
    getData,
  };
  $scope.tableConfig2 = {
    tableId: 'table2',
    isCheckBox: false,
    tableWidth: 1300,
    // count: 10,
    // counts: [10, 15, 20],
    // 默认排序规则
    sorting: {
      shows: 'desc'
    },
    // 是否使能checkbox框，默认为false
    enableCheckbox: true,
    // 是否使能分页，默认为true
    enablePagination: true,
    // 行自定义样式
    // rowCustomClass: 'rowCustomClass',
    colsGroup: [{
      width: '20%'
    }, {
      width: '20%'
    }, {
      width: '20%'
    }, {
      width: '20%'
    }, {
      width: '20%'
    }],
    cols: [{
      field: 'real_name',
      title: '代理姓名/公司名',
      fLeft: true,
      render($scope, row, cell) {
        return Math.random();
      },
      show: true
    }, {
      field: 'shows1',
      title: '曝光数1',
      sortable: 'shows1',
      class: 'table-number-col',
      colClass: 'table-number-col',
      render() {
        return 6666;
      },
      show: true
    }, {
      field: 'shows2',
      title: '曝光数2',
      sortable: 'shows2',
      class: 'table-number-col',
      colClass: 'table-number-col',
      render() {
        return 6666;
      },
      show: true
    }, {
      field: 'shows3',
      title: '曝光数3',
      sortable: 'shows3',
      class: 'table-number-col',
      colClass: 'table-number-col',
      render() {
        return 6666;
      },
      show: true
    }, {
      field: 'shows4',
      title: '曝光数4',
      fRight: true,
      sortable: 'shows4',
      class: 'table-number-col',
      colClass: 'table-number-col',
      render() {
        return 6666;
      },
      show: true
    }],
    dataflagId: 'user_id',
    // 初始化表格数值
    dataset: [],
    getData,
  };

  function getData(params) {
    params.total(20);
    // console.log('load data', params.page(), params.count())

    return [{
      user_id: 1,
      real_name: 'dsfd',
      shows: 103,
      remain_amount: 101
    }, {
      user_id: 2,
      real_name: 'dsfd',
      shows: 102,
      remain_amount: 102
    }, {
      user_id: 3,
      real_name: 'dsfd',
      shows: 101,
      remain_amount: 103
    }, {
      user_id: 4,
      real_name: 'dsfd',
      shows: 10,
      remain_amount: 104
    }, {
      user_id: 4,
      real_name: 'dsfd',
      shows: 10,
      remain_amount: 104
    }, {
      user_id: 4,
      real_name: 'dsfd',
      shows: 10,
      remain_amount: 104
    }, {
      user_id: 4,
      real_name: 'dsfd',
      shows: 10,
      remain_amount: 104
    }, {
      user_id: 4,
      real_name: 'dsfd',
      shows: 10,
      remain_amount: 104
    }, {
      user_id: 4,
      real_name: 'dsfd',
      shows: 10,
      remain_amount: 104
    }, {
      user_id: 4,
      real_name: 'dsfd',
      shows: 10,
      remain_amount: 104
    }];
  }

  $scope.configText = `
<ma-table ma-config="tableConfig"></ma-table>
/**
  数据表组件
  @param： {
    tableConfig : {
      tableId: 'table1',
      totalText: '共{{params.total()}}条数据',
      colsGroup: [{
        width: '20%'
      }, {
        width: '20%'
      }, {
        width: '20%'
      }, {
        width: '20%'
      }, {
        width: '20%'
      }],
      cols: 表单头，形式数组，例子：[{
          field: 'selector',
          title: '',
          titleRender: '', // 带compile 功能的title
          // headerTemplate: '<input type="checkbox" ng-model="$ctrl.checkboxes.checked" class="select-all" value="" />',
          headerTemplateURL: 'headerCheckbox.html',
          show: true
          fLeft: true,// 列漂浮在左边
          fRight: true // 列漂浮在右边
          render: Function($scope, row) // 渲染 带作用域
          customHtml: Function($scope, row) // 渲染
        }]
      count: 表单单页数量，类型int，例子：10
      counts：表单单页可选数量访问，类型数组，例子：[5, 10, 15]
      sorting: 初始排序规则
      dataflagId：表单单行数据的唯一标示(用于选框模式下)，默认值为“id”，类型为字符串，例子：“userId”
      enableCheckbox: 使能checkbox选框模式，类型boolean，默认false,
      enablePagination: 使能翻页，默认为true,
      tableWidth: Number // 设定这个值让 table 定宽，超出左右滚动
      getData: function (params) { // @return Array or Promise
        params.total(20);
        // console.log('load data', params.page(), params.count())

        return [{
          user_id: 1,
          real_name: 'dsfd',
          shows: 103,
          remain_amount: 101
        }, {
          user_id: 2,
          real_name: 'dsfd',
          shows: 102,
          remain_amount: 102
        }, {
          user_id: 3,
          real_name: 'dsfd',
          shows: 101,
          remain_amount: 103
        }, {
          user_id: 4,
          real_name: 'dsfd',
          shows: 10,
          remain_amount: 104
        }];
      }
    }
  }
*/`;
}

export default {
  template: require('./index.html'),
  controller,
};
