webpackJsonp([23],{

/***/ "/6x9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__("Gv2V");

var _name = __webpack_require__("w0m/");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("t4JU");

exports['default'] = _name2['default'];

/***/ }),

/***/ "Gv2V":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "QFx1":
/***/ (function(module, exports) {

module.exports = "<div class=\"ma-pagination\">\n  <div class=\"pagination-item\">\n    <div class=\"page-total\">共<strong>{{ conf.totalItems }}</strong>条数据</div>\n  </div>\n  <div class=\"pagination-item\" ng-show=\"conf.totalItems > 0\">\n    <ul class=\"pagination\" ng-show=\"conf.totalItems > 0\">\n        <li class=\"prev\" ng-class=\"{disabled: conf.currentPage == 1}\" ng-click=\"prevPage()\"><span>&laquo;</span></li>\n        <li ng-repeat=\"item in pageList track by $index\" ng-class=\"{active: item == conf.currentPage, separate: item == '...'}\" ng-click=\"changeCurrentPage(item)\"><span>{{ item }}</span></li>\n        <li class=\"next\" ng-class=\"{disabled: conf.currentPage == conf.numberOfPages}\" ng-click=\"nextPage()\"><span>&raquo;</span></li>\n      </ul>\n  </div>\n\n  <div class=\"pagination-item\" ng-show=\"conf.totalItems > 0\">\n    <div class=\"page-jump\">\n      跳转至第<input class=\"jump-page-input\"\n            id=\"page\"\n            min=\"1\"\n            placeholder=\"\"\n            ng-model=\"conf.jumpPageNum\"\n            ng-init=\"1\"\n            ng-keyup=\"jumpPageKeyUp($event)\">页\n    </div>\n  </div>\n  <div class=\"pagination-item\">\n    <div class=\"pagination-select\">\n      <ma-select ng-model=\"conf.selectItem\" ma-data=\"conf.perPageOptions\"></ma-select>\n    </div>\n  </div>\n</div>\n";

/***/ }),

/***/ "t4JU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("w0m/");

var _name2 = _interopRequireDefault(_name);

var _maPaginationTpl = __webpack_require__("QFx1");

var _maPaginationTpl2 = _interopRequireDefault(_maPaginationTpl);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maPagination', maPagination);

maPagination.$inject = ['$timeout', '$compile'];

function maPagination($timeout, $compile) {
  return {
    restrict: 'EA',
    replace: true,
    template: _maPaginationTpl2['default'],
    scope: {
      conf: '=maConfig'
    },
    link: function link(scope, element, attrs) {
      var conf = scope.conf;

      // 默认分页长度
      var defaultPagesLength = 5;

      // 默认分页选项可调整每页显示的条数
      var defaultPerPageOptions = [10, 15, 20, 30, 50];

      // 默认每页的个数
      var defaultPerPage = 10;

      // 获取分页长度
      if (conf.pagesLength) {
        // 判断一下分页长度
        conf.pagesLength = parseInt(conf.pagesLength, 10);

        if (!conf.pagesLength) {
          conf.pagesLength = defaultPagesLength;
        }

        // 分页长度必须为奇数，如果传偶数时，自动处理
        if (conf.pagesLength % 2 === 0) {
          conf.pagesLength += 1;
        }
      } else {
        conf.pagesLength = defaultPagesLength;
      }

      // 分页选项可调整每页显示的条数
      if (!conf.perPageOptions) {
        conf.perPageOptions = defaultPerPageOptions.map(function (item) {
          return {
            text: item + ' 条 / 页',
            value: item
          };
        });
      } else {
        conf.perPageOptions = conf.perPageOptions.map(function (item) {
          return {
            text: item + ' 条 / 页',
            value: item
          };
        });
      }

      // pageList数组
      function getPagination(newValue, oldValue) {
        // conf.currentPage
        if (conf.currentPage) {
          conf.currentPage = parseInt(scope.conf.currentPage, 10);
        }

        if (!conf.currentPage) {
          conf.currentPage = 1;
        }

        // conf.totalItems
        if (conf.totalItems) {
          conf.totalItems = parseInt(conf.totalItems, 10);
        }

        // conf.totalItems
        if (!conf.totalItems) {
          conf.totalItems = 0;
          return;
        }

        if (!conf.itemsPerPage) {
          conf.itemsPerPage = defaultPerPage;
        }
        // numberOfPages
        conf.numberOfPages = Math.ceil(conf.totalItems / parseInt(conf.itemsPerPage, 10));
        // 如果分页总数>0，并且当前页大于分页总数
        if (scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages) {
          scope.conf.currentPage = scope.conf.numberOfPages;
        }

        // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
        var perPageOptionsLength = scope.conf.perPageOptions.length;

        // 定义状态
        var perPageOptionsStatus;
        for (var i = 0; i < perPageOptionsLength; i++) {
          if (conf.perPageOptions[i].value == conf.itemsPerPage) {
            perPageOptionsStatus = true;
          }
        }
        // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
        if (!perPageOptionsStatus) {
          conf.perPageOptions.push({
            text: conf.itemsPerPage + ' 条 / 页',
            value: conf.itemsPerPage
          });
        }

        // 对选项进行sort
        conf.perPageOptions.sort(function (a, b) {
          return a - b;
        });
        if (!conf.selectItem) {
          conf.selectItem = conf.perPageOptions[0];
        }
        // 页码相关
        scope.pageList = [];
        if (conf.numberOfPages <= conf.pagesLength) {
          // 判断总页数如果小于等于分页的长度，若小于则直接显示
          for (var _i = 1; _i <= conf.numberOfPages; _i++) {
            scope.pageList.push(_i);
          }
        } else {
          // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
          // 计算中心偏移量

          var offset = (conf.pagesLength + 1) / 2;
          if (conf.currentPage <= offset) {
            // 左边没有...
            for (var _i2 = 1; _i2 <= offset + 1; _i2++) {
              scope.pageList.push(_i2);
            }
            scope.pageList.push('...');
            scope.pageList.push(conf.numberOfPages);
          } else if (conf.currentPage > conf.numberOfPages - offset) {
            scope.pageList.push(1);
            scope.pageList.push('...');
            for (var _i3 = offset; _i3 >= 1; _i3--) {
              scope.pageList.push(conf.numberOfPages - _i3);
            }
            scope.pageList.push(conf.numberOfPages);
          } else {
            // 最后一种情况，两边都有...
            scope.pageList.push(1);
            scope.pageList.push('...');
            for (var _i4 = Math.floor(offset / 2); _i4 >= 1; _i4--) {
              scope.pageList.push(conf.currentPage - _i4);
            }
            scope.pageList.push(conf.currentPage);
            for (var _i5 = 1; _i5 <= offset / 2; _i5++) {
              scope.pageList.push(conf.currentPage + _i5);
            }

            scope.pageList.push('...');
            scope.pageList.push(conf.numberOfPages);
          }
        }

        scope.$parent.conf = conf;
      }

      // prevPage
      scope.prevPage = function () {
        if (conf.currentPage > 1) {
          conf.currentPage -= 1;
          getPagination();
          if (conf.onChange) {
            conf.onChange(conf.currentPage, conf.itemsPerPage);
          }
        }
      };

      // nextPage
      scope.nextPage = function () {
        if (conf.currentPage < conf.numberOfPages) {
          conf.currentPage += 1;
          getPagination();
          if (conf.onChange) {
            conf.onChange(conf.currentPage, conf.itemsPerPage);
          }
        }
      };

      // 变更当前页
      scope.changeCurrentPage = function (item) {
        if (item !== '...' && item !== conf.currentPage) {
          conf.currentPage = item;
          conf.jumpPageNum = conf.currentPage;
          getPagination();
          // conf.onChange()函数
          if (conf.onChange) {
            conf.onChange(conf.currentPage, conf.itemsPerPage);
          }
        }
      };

      // 修改每页展示的条数
      scope.changeItemsPerPage = function () {
        // 一发展示条数变更，当前页将重置为1
        conf.currentPage = 1;
        conf.jumpPageNum = 1;
        getPagination();
        // conf.onChange()函数
        if (conf.onChange) {
          conf.onChange(conf.currentPage, conf.itemsPerPage);
        }
      };

      // 跳转页
      scope.jumpToPage = function () {
        var num = conf.jumpPageNum;
        if (num.match(/\d+/)) {
          num = parseInt(num, 10);
          if (num && num != conf.currentPage) {
            if (num > conf.numberOfPages) {
              num = conf.numberOfPages;
            }

            // 跳转
            conf.currentPage = num;
            getPagination();
            // conf.onChange()函数
            if (conf.onChange) {
              conf.onChange(conf.currentPage, conf.itemsPerPage);
            }
            scope.jumpPageNum = '';
          }
        }
      };

      scope.jumpPageKeyUp = function (e) {
        var keycode = window.event ? e.keyCode : e.which;

        if (keycode == 13) {
          scope.jumpToPage();
        }
      };
      scope.$watch('conf.totalItems', function (value, oldValue) {
        // if (!value || value == oldValue) {
        //   if (conf.onChange) {
        //     conf.onChange();
        //   }
        // }
        getPagination();
      });
      scope.$watch('conf.selectItem', function (value, oldValue) {
        if (value || value !== oldValue) {
          conf.itemsPerPage = value.value;
          scope.changeItemsPerPage();
        }
      });
      // scope.$watch('conf.currentPage', function(value, oldValue) {
      //   if (value || conf.currentPage !== conf.jumpPageNum) {
      //     // conf.jumpPageNum = value;
      //     scope.changeCurrentPage(value);
      //   }
      // });
    }
  };
}

/***/ }),

/***/ "w0m/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.pagination';

/***/ })

},["/6x9"]);
//# sourceMappingURL=pagination.js.map