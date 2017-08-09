import moduleName from './name.js';
import $ from 'jquery';
angular.module(moduleName)
  .service('$table', tableService);

tableService.$inject = [];

function tableService() {
  var tables = {};

  return {
    addTable,
    removeTable,
    getTableById,
  };

  function addTable(key, value) {
    if (tables[key]) {
      console.error('table 指定的Id已存在');
    }

    tables[key] = value;
  }

  function removeTable(key) {
    delete tables[key];
  }
  // 获取指定tableId 的table
  function getTableById(id) {
    var table = tables[id];

    if (!table) {
      // console.error('table 不存在');
      return null;
    }
    return createTable(table);
  }

  function createTable(table) {
    return {
      table: table,
      getSelected: function() {
        return table.getSelected.apply(table, arguments);
      },
      setSelect: function() {
        return table.setSelect.apply(table, arguments);
      },
      setUnSelect: function() {
        return table.setUnSelect.apply(table, arguments);
      },
      selectAll: function() {
        return table.selectAll.apply(table, arguments);
      },
      unSelectAll: function() {
        return table.unSelectAll.apply(table, arguments);
      }
    };
  }
}
