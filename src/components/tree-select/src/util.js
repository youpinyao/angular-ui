const util = {
  getNotHiddenValues: function (data) {
    var values = [];

    function getValue(items) {
      angular.forEach(items, function (d) {
        if (!d.isHidden) {
          values.push(d.value);
        }
        if (d.sub && d.sub.length) {
          getValue(d.sub);
        }
      });
    }

    getValue(data);

    return values;
  },
  getDefaultSelectTreeData: function (data, selectedIds) {
    const selected = [];
    const newSelectedIds = [];

    angular.each(selectedIds, d => {
      if (angular.isObject(d)) {
        newSelectedIds.push(d.value);
      } else {
        newSelectedIds.push(d);
      }
    });

    function checkSub(items) {
      angular.forEach(items, function (d) {
        if (newSelectedIds.indexOf(d.value) !== -1 && !d.hiddenCheck) {
          selected.push(d);
        }
        if (d.sub && d.sub.length) {
          checkSub(d.sub);
        }
      });
    }
    checkSub(data);

    return selected;
  },
  filterSelectTreeData: function (data, selectedIds) {
    angular.forEach(data, function (d) {
      if (selectedIds.indexOf(d.value) !== -1 && d.sub && d.sub.length) {
        angular.each(d.sub, dd => {
          dd._parent = d;
        });
        checkSub(d.sub);
      }
    });

    function checkSub(items) {
      var count = 0;
      angular.forEach(items, function (d) {
        if (selectedIds.indexOf(d.value) !== -1) {
          count++;

          if (d.sub && d.sub.length) {
            checkSub(d.sub);
          }
        }
      });

      if (count && count < items.length && selectedIds.indexOf(items[0]._parent.value) !== -1) {
        selectedIds.splice(selectedIds.indexOf(items[0]._parent.value), 1);
        if (items[0]._parent._parent) {
          checkSub(items[0]._parent._parent.sub);
        }
      }
    }

    return selectedIds;
  },
  getSelectTreeData: function (config) {
    const data = config.data;
    const text = config.text;
    const displayText = config.displayText;
    const value = config.value;
    const sub = config.sub;

    const tree = [];

    function pushData(items, tree) {
      angular.forEach(items, function (d) {
        tree.push({
          text: d[text],
          value: d[value],
          displayText: d[displayText],
          sub: []
        });
        if (d[sub] && d[sub].length) {
          pushData(d[sub], tree[tree.length - 1].sub);
        }
      });
    }

    pushData(data, tree);

    return tree;
  },
  hiddenSelectTreeDataReverse: function (data) {
    function reverse(items) {
      angular.forEach(items, function (d) {
        d.isHidden = !d.isHidden;

        if (!d.isHidden && d._parent) {
          showParent(d._parent);
        }

        if (d.sub && d.sub.length) {
          reverse(d.sub);
        }
      });
    }

    function showParent(item) {
      item.isHidden = false;
      if (item._parent) {
        showParent(item._parent);
      }
    }

    reverse(data);

    return data;
  },
  hiddenSelectTreeData: function (data, hiddenItem) {
    var hiddenValues = [];
    var hide = true;
    angular.forEach(hiddenItem, function (d) {
      hiddenValues.push(d.value);
    });


    // console.log(hiddenValues)


    function hideItem(items) {
      angular.forEach(items, function (d) {
        if (!hiddenItem) {
          d.isHidden = hide;
          if (d.sub && d.sub.length) {
            hideSub(d.sub);
          }
          if (d._parent) {
            hideParent(d._parent);
          }
        } else if (hiddenValues.indexOf(d.value) !== -1) {
          d.isHidden = hide;
          if (d.sub && d.sub.length) {
            hideSub(d.sub);
          }
          if (d._parent) {
            hideParent(d._parent);
          }
        } else {
          d.isHidden = !hide;

          if (d.sub && d.sub.length) {
            hideItem(d.sub);
          }
        }
      });
    }

    function hideSub(items) {
      angular.forEach(items, function (d) {
        if (!hiddenItem || hiddenValues.indexOf(d.value) !== -1) {
          d.isHidden = hide;
        }

        if (d.sub && d.sub.length) {
          hideSub(d.sub);
        }
      });
    }

    function hideParent(item) {
      var hideCount = 0;
      angular.forEach(item.sub, function (d) {
        if (d.isHidden) {
          hideCount++;
        }
      });
      if (hideCount >= item.sub.length) {
        item.isHidden = true;
        if (item._parent) {
          hideParent(item._parent);
        }
      }
    }


    hideItem(data);

    return data;
  }
};

export default util;
