import moduleName from './name.js';
import $ from 'jquery';
import debounce from 'debounce';
import maTreeTransferTpl from './maTreeTransferTpl.html';

angular.module(moduleName)
  .directive('maTreeTransfer', maTreeTransfer);


maTreeTransfer.$inject = ['$treeSelect', '$timeout'];

function maTreeTransfer($treeSelect, $timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      data: '=maData',
      model: '=ngModel',
      maModel: '=maModel',
      valueKey: '@maValueKey',
      textKey: '@maTextKey',
      subKey: '@maSubKey',
      disabled: '=ngDisabled',

      leftTitle: '@maLeftTitle',
      rightTitle: '@maRightTitle',
    },
    template: maTreeTransferTpl,
    controllerAs: '$ctrl',
    controller: ['$scope', '$element', function($scope, $element) {
      const $ctrl = this;
      const backData = {};

      this.leftData = [];
      this.rightData = [];

      this.leftButtonDisabled = true;
      this.rightButtonDisabled = true;

      this.toLeft = toLeft;
      this.toRight = toRight;

      function getData(data) {
        if (!angular.isEmpty(backData.treeData) && $scope.textKey === backData.textKey &&
          $scope.valueKey ===
          backData.valueKey &&
          $scope.subKey === backData.subKey) {
          return $.extend(true, [], backData.treeData);
        }

        const treeData = $treeSelect.getSelectTreeData({
          data,
          text: $scope.textKey,
          value: $scope.valueKey,
          sub: $scope.subKey,
        });

        backData.treeData = treeData;
        backData.textKey = $scope.textKey;
        backData.valueKey = $scope.valueKey;
        backData.subKey = $scope.subKey;

        return $.extend(true, [], treeData);
      }

      $scope.$watch('data', watchData);
      $scope.$watch('model', watchModel);
      $scope.$watch('rightData', setMaModel);


      $scope.$watch('$ctrl.leftSelected', function(d, p) {
        $ctrl.leftButtonDisabled = !(d && d.length);

        updateSelectedCount();

        if (angular.isNull(d) || angular.isNull(p)) {
          return;
        }

        if ($scope.disabledWatch1 || angular.isNull(d) || d.length == p.length) {
          return;
        }
        if (d) {
          if (d.length && $ctrl.leftSelectedCount == $ctrl.leftShowCount) {
            $ctrl.leftCheckbox = true;
          } else {
            $ctrl.leftCheckbox = false;
          }
          $scope.disabledWatch1 = true;
          $timeout(function() {
            $scope.disabledWatch1 = false;
          }, 100);
        }
      });


      $scope.$watch('$ctrl.leftCheckbox', function(d, p) {
        if ($scope.disabledWatch1 || d == p) {
          return;
        }
        if (d) {
          $ctrl.leftSelected = $ctrl.leftData;
        } else {
          $ctrl.leftSelected = [];
        }
        $scope.disabledWatch1 = true;
        $timeout(function() {
          $scope.disabledWatch1 = false;
        }, 100);
      });


      $scope.$watch('$ctrl.rightSelected', function(d, p) {
        $ctrl.rightButtonDisabled = !(d && d.length);

        updateSelectedCount();

        if (angular.isNull(d) || angular.isNull(p)) {
          return;
        }

        if ($scope.disabledWatch2 || d.length == p.length) {
          return;
        }
        if (d) {
          if (d.length && $ctrl.rightSelectedCount == $ctrl.rightShowCount) {
            $ctrl.rightCheckbox = true;
          } else {
            $ctrl.rightCheckbox = false;
          }
          $scope.disabledWatch2 = true;
          $timeout(function() {
            $scope.disabledWatch2 = false;
          }, 100);
        }
      });

      $scope.$watch('$ctrl.rightCheckbox', function(d, p) {
        if ($scope.disabledWatch2 || d == p) {
          return;
        }
        if (d) {
          $ctrl.rightSelected = $ctrl.rightData;
        } else {
          $ctrl.rightSelected = [];
        }
        $scope.disabledWatch2 = true;
        $timeout(function() {
          $scope.disabledWatch2 = false;
        }, 100);
      });

      function watchData() {
        if ($scope.watchModeled) {
          updateData(true);
        }
      }

      function watchModel(d, p) {
        $scope.watchModeled = true;
        if (angular.isEmpty($scope.data)) {
          return;
        }
        if (angular.isNull(d)) {
          d = [];
        }
        if (angular.isNull(p)) {
          p = [];
        }

        setMaModel();
        if (isObjectArray(d)) {
          if ($scope.disabledWatch1 && d.length === p.length) {
            return;
          }
          if ($scope.disabledWatch2) {
            return;
          }
        }

        let selectedModel = [];
        let leftSelected = [];
        let isValueArray = false;
        let valueArrayLength = 0;

        angular.each(d, d => {
          if (!angular.isObject(d)) {
            valueArrayLength++;
          }
        });

        if (valueArrayLength >= d.length) {
          d = $treeSelect.filterSelectTreeData(getData($scope.data), d);
        }

        angular.each(d, d => {
          if (angular.isObject(d)) {
            selectedModel.push(d[$scope.valueKey] || d.value);
          } else {
            selectedModel.push(d);
          }
        });

        function getInitSelected(data) {
          angular.each(data, d => {
            if (selectedModel.indexOf(d.value) !== -1) {
              leftSelected.push(d);
            }
            if (d.sub && d.sub.length) {
              getInitSelected(d.sub);
            }
          });
        }
        getInitSelected(getData($scope.data));
        $ctrl.leftSelected = leftSelected;
        $scope.model = [];

        updateData();
      }

      function updateData(isInit) {
        $ctrl.leftData = getData($scope.data);
        $ctrl.rightData = getData($scope.data);

        $treeSelect.setParents($ctrl.leftData);
        $treeSelect.setParents($ctrl.rightData);

        toRight(isInit);
      }

      function toRight(isInit) {
        const pushedValues = [];

        if (!$scope.model) {
          $scope.model = [];
        }
        getSelectedValues($ctrl.leftSelected);

        $ctrl.leftData = $treeSelect.hiddenSelectTreeData($ctrl.leftData, $scope.model);
        $ctrl.rightData = [].concat($treeSelect.hiddenSelectTreeData($ctrl.rightData, $scope.model,
          true));

        $ctrl.leftSelected = [];
        $ctrl.rightSelected = [];

        $scope.model = [].concat($scope.model);

        updateShowCount();

        $ctrl.rightCheckbox = false;
        $ctrl.leftCheckbox = false;

        if (isInit !== true) {
          $scope.disabledWatch1 = true;
          $timeout(function() {
            $scope.disabledWatch1 = false;
          }, 100);
        }

        function getSelectedValues(items) {
          angular.forEach(items, function(d) {
            if (d.isHidden !== true && pushedValues.indexOf(d.value) === -1) {
              $scope.model.push({
                value: d.value,
                text: d.text,
              });
              pushedValues.push(d.value);

              if (d.sub && d.sub.length) {
                getSelectedValues(d.sub);
              }
            }
          });
        }
      }

      function toLeft() {
        var newModel = [];
        var rightSelectedValues = [];

        getSelectedValues($ctrl.rightSelected);

        angular.forEach($scope.model, function(d) {
          if (rightSelectedValues.indexOf(d.value) === -1) {
            newModel.push(d);
          }
        });

        $scope.model = newModel;

        $ctrl.leftData = [].concat($treeSelect.hiddenSelectTreeData($ctrl.leftData, $scope.model));
        $ctrl.rightData = $treeSelect.hiddenSelectTreeData($ctrl.rightData, $scope.model, true);

        $ctrl.leftSelected = [];
        $ctrl.rightSelected = [];

        $scope.model = [].concat($scope.model);

        updateShowCount();

        $ctrl.rightCheckbox = false;
        $ctrl.leftCheckbox = false;

        $scope.disabledWatch2 = true;
        $timeout(function() {
          $scope.disabledWatch2 = false;
        }, 100);


        function getSelectedValues(items) {
          angular.forEach(items, function(d) {
            rightSelectedValues.push(d.value);

            if (d.sub && d.sub.length) {
              getSelectedValues(d.sub);
            }
            if (d._parent) {
              getParent(d._parent);
            }
          });
        }

        function getParent(parent) {
          rightSelectedValues.push(parent.value);
          if (parent._parent) {
            getParent(parent._parent);
          }
        }
      }

      function updateSelectedCount() {
        $ctrl.leftSelectedCount = 0;
        $ctrl.rightSelectedCount = 0;

        function eachData(data, callback) {
          angular.each(data, d => {
            if (d.isHidden !== true) {
              callback();
            }
            if (d.sub && d.sub.length) {
              eachData(d.sub, callback);
            }
          });
        }

        eachData($ctrl.leftSelected, () => {
          $ctrl.leftSelectedCount++;
        });
        eachData($ctrl.rightSelected, () => {
          $ctrl.rightSelectedCount++;
        });
      }

      function updateShowCount() {
        $ctrl.leftShowCount = 0;
        $ctrl.rightShowCount = 0;

        function eachData(data, callback) {
          angular.each(data, d => {
            if (d.isHidden !== true) {
              callback();
            }
            if (d.sub && d.sub.length) {
              eachData(d.sub, callback);
            }
          });
        }

        eachData($ctrl.leftData, () => {
          $ctrl.leftShowCount++;
        });
        eachData($ctrl.rightData, () => {
          $ctrl.rightShowCount++;
        });
      }

      function isObjectArray(arr) {
        if (angular.isNull(arr)) {
          return false;
        }
        if (arr && !isNaN(arr.length) && (angular.isObject(arr[0]) || angular.isNull(arr[0]))) {
          return true;
        }
        return false;
      }

      function setMaModel() {
        const d = $ctrl.rightData;
        const selected = [];
        const selectedIds = [];

        // 设置带父级的model数据
        if ($($element).attr('ma-model')) {
          if (d && d.length) {
            getNotHidden(d);
          }
          $timeout(() => {
            $scope.maModel = getWithParent(selected);
          });
        }

        function getNotHidden(data) {
          angular.each(data, dd => {
            if (selectedIds.indexOf(dd.value) === -1 && dd.isHidden !== true) {
              selected.push(dd);
            }
            if (dd.sub && dd.sub.length) {
              getNotHidden(dd.sub);
            }
          });
        }
      }

      function getWithParent(data) {
        const selected = [];
        const selectedIds = [];

        if (data && data.length) {
          angular.each(data, d => {
            if (selectedIds.indexOf(d.value) === -1) {
              selected.push(d);
              selectedIds.push(d.value);
            }
            setParent(d);
          });
        }

        return selected;

        function setParent(d) {
          if (d._parent) {
            if (selectedIds.indexOf(d._parent.value) === -1) {
              selected.push(d._parent);
              selectedIds.push(d._parent.value);
            }
            setParent(d._parent);
          }
        }
      }
    }],
    link: function(scope, element, attrs, ctrl) {
      scope.textKey = attrs.maTextKey || 'text';
      scope.valueKey = attrs.maValueKey || 'value';
      scope.subKey = attrs.maSubKey || 'sub';

      attrs.$observe('maTextKey', d => {
        scope.textKey = d || 'text';
      });
      attrs.$observe('maValueKey', d => {
        scope.valueKey = d || 'value';
      });
      attrs.$observe('maSubKey', d => {
        scope.subKey = d || 'sub';
      });
    }
  };
}
