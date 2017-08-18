import moduleName from './name.js';
import $ from 'jquery';
import maTableTpl from './maTableTpl.html';
import sorterRow from './sorterRow.html';
import pagerTpl from './pager.html';
import headerCheckbox from './headerCheckbox.html';
import header1 from './header1.html';
import maTableController from './maTableController.js';

const pagerPath = 'ng-table/pager.html';
const sorterPath = 'ng-table/sorterRow.html';

angular.module('ng').run(['$templateCache', function(c) {
  c.remove(pagerPath);
  c.remove(sorterPath);
  c.put(pagerPath, pagerTpl);
  c.put(sorterPath, sorterRow);

  c.put('headerCheckbox.html', headerCheckbox);
  c.put('header1.html', header1);
}]);

angular.module(moduleName)
  .directive('maTable', maTable)
  .directive('commonTableColRender', commonTableColRender)
  .directive('commonTableColFloatRender', commonTableColFloatRender)
  .directive('ngEnter', ngEnter)
  .directive('ngCompile', ngCompile);

/**
  数据表组件
  @param： {
    tableConfig : {
      cols: 表单头，形式数组，例子：[{
          field: 'selector',
          title: '',
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
    }
  }
*/
maTable.$inject = [];

function maTable() {
  return {
    // can be used as attribute or element
    restrict: 'AE',
    replace: true,
    transclude: true,
    scope: {
      tableConfig: '=maConfig'
    },
    template: maTableTpl,
    controller: maTableController,
    controllerAs: '$tableCtrl',
    // require: '^ngModel',
    // require: '^outController',
    link: function(scope, elem, attrs, controller) {
      var callback = function(evt) {
        var type = evt.type;
        scope[type](evt, controller);
        // controller.evtAgent.callback(evt, controller);
      };
      if (controller.evtAgent && angular.isArray(controller.evtAgent)) {
        for (var i = 0; i < controller.evtAgent.length; i++) {
          var evtAgent = controller.evtAgent[i];
          var event = evtAgent.event;
          scope[event] = evtAgent.callback;
          // var evtCallback = ;
          elem.bind(event, callback);
        }
      }
    }
  };
}

commonTableColRender.$inject = ['$compile'];

function commonTableColRender($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      let value = scope.$eval(attrs.commonTableColRender, scope);

      value += '';
      value = value.replace(/ng-click="/g,
        'ng-click="$parent.$parent.');
      value = value.replace(/ma-click="/g,
        'ma-click="$parent.$parent.');

      element.html(value);
      scope.row = scope.$parent[attrs.commonTableColRender.split(', ')[1]];

      $compile(element.contents())(scope);
    }
  };
}

commonTableColFloatRender.$inject = ['$compile'];

function commonTableColFloatRender($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      let value = scope.$eval(attrs.commonTableColFloatRender, scope);

      value += '';
      value = value.replace(/ng-click="/g,
        'ng-click="$parent.$parent.');
      value = value.replace(/ma-click="/g,
        'ma-click="$parent.$parent.');

      element.html(value);
      scope.row = scope.$parent[attrs.commonTableColFloatRender.split(', ')[1]];

      $compile(element.contents())(scope);
    }
  };
}


ngEnter.$inject = ['$timeout'];

function ngEnter($timeout) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs, controller) {
      elem.bind('keyup', e => {
        if (e.keyCode === 13) {
          scope.$event = e;
          scope.$eval(attrs.ngEnter, scope);
          $timeout();
        }
      });
    }
  };
}


ngCompile.$inject = ['$timeout', '$compile'];

function ngCompile($timeout, $compile) {
  return {
    restrict: 'A',
    scope: {
      content: '=ngCompile',
    },
    link: function(scope, elem, attrs, controller) {
      let compiled = false;

      scope.$watch('content', (d, p) => {
        if (d == p && compiled) {
          return;
        }
        compiled = true;
        elem.html(d);
        $compile(elem.contents())(scope.$parent);
      });
    }
  };
}
