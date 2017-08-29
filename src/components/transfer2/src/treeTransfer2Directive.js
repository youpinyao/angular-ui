import moduleName from './name.js';
import $ from 'jquery';
import maTreeTransfer2Tpl from './maTreeTransfer2Tpl.html';

angular.module(moduleName)
  .directive('maTreeTransfer2', maTreeTransfer2);

maTreeTransfer2.$inject = [];

function maTreeTransfer2() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      data: '=maData',
      model: '=ngModel',
      valueKey: '@maValueKey',
      textKey: '@maTextKey',
      subKey: '@maSubKey',
      disabled: '=ngDisabled',

      leftTitle: '@maLeftTitle',
      rightTitle: '@maRightTitle',
    },
    template: maTreeTransfer2Tpl,
    controllerAs: '$ctrl',
    controller: ['$scope', '$element', function($scope, $element) {
      const $ctrl = this;

      $ctrl.searchKey = '';

      $ctrl.leftSub = false;
      $ctrl.leftCheckbox = false;

      $ctrl.leftButtonDisabled = true;
      $ctrl.rightButtonDisabled = true;

      $ctrl.rightSub = false;
      $ctrl.rightCheckbox = false;

      $ctrl.toRight = toRight;
      $ctrl.toLeft = toLeft;

      $ctrl.leftSelected = [];
      $ctrl.rightSelected = [];

      $ctrl.leftData = [];
      $ctrl.rightData = [];

      $ctrl.leftHideItems = [];
      $ctrl.rightShowItems = [];

      $scope.$watch('data', (d) => {
        // console.log('transfer2 data', d);
        updateLeftRigthData();
      });

      $scope.$watch('model', (d) => {
        // console.log('transfer2 model', d);

        // 过滤掉父子同在
        const newModel = filterChild();

        if (newModel) {
          $scope.model = newModel;
          return;
        }

        $ctrl.leftHideItems = d || [];
        $ctrl.rightShowItems = d || [];
      });

      $scope.$watch('$ctrl.leftCheckbox', d => {
        if ($scope.isSelectedChangeCheckbox) {
          $scope.isSelectedChangeCheckbox = false;
          return;
        }

        if (d === true) {
          $ctrl.leftSelected = 'all';
        }
        if (d === false) {
          $ctrl.leftSelected = [];
        }
      });

      $scope.$watch('$ctrl.rightCheckbox', d => {
        if ($scope.isSelectedChangeCheckbox) {
          $scope.isSelectedChangeCheckbox = false;
          return;
        }

        if (d === true) {
          $ctrl.rightSelected = 'all';
        }
        if (d === false) {
          $ctrl.rightSelected = [];
        }
      });

      $scope.$watch('$ctrl.leftSelected', d => {
        $ctrl.leftButtonDisabled = !(d && d.length);
        updateLeftSub();
      });

      $scope.$watch('$ctrl.rightSelected', d => {
        $ctrl.rightButtonDisabled = !(d && d.length);
        updateRightSub();
      });

      function updateLeftSub() {
        updateSub('left');
      }

      function updateRightSub() {
        updateSub('right');
      }

      function updateSub(direction) {
        const level0Items = $($element).find(
          `.ma-transfer-${direction}-tree.ma-tree-select .tree-level-0`);
        const level0Values = [];
        const selected = $ctrl[`${direction}Selected`] || [];
        let count = 0;
        let len = 0;

        level0Items.each(function() {
          if (!$(this).hasClass('hidden')) {
            level0Values.push($(this).attr('data-value'));
          }
        });

        level0Values.forEach(d => {
          if (selected.indexOf(d) !== -1) {
            count++;
          }
          len++;
        });

        if (len > 0) {
          if (count > 0 && count < len) {
            $ctrl[`${direction}Sub`] = true;
          } else {
            $ctrl[`${direction}Sub`] = false;
          }
          if (count === len) {
            if ($ctrl[`${direction}Checkbox`] === false) {
              $ctrl[`${direction}Checkbox`] = true;
              $scope.isSelectedChangeCheckbox = true;
            }
          } else if ($ctrl[`${direction}Checkbox`] === true) {
            $ctrl[`${direction}Checkbox`] = false;
            $scope.isSelectedChangeCheckbox = true;
          }
        }
      }

      function toRight() {
        if (angular.isNull($scope.model)) {
          $scope.model = [];
        }
        $scope.model = $scope.model.concat($ctrl.leftSelected);
        $ctrl.leftSelected = [];
        $ctrl.rightSelected = [];
        $ctrl.leftCheckbox = false;
        $ctrl.rightCheckbox = false;
      }

      function toLeft() {
        if (angular.isNull($scope.model)) {
          $scope.model = [];
        }
        const oldModel = getModelWidthChild();
        const newModel = [];
        const selectWithChild = getSelectedWithChild();

        angular.each(oldModel, d => {
          if (selectWithChild.indexOf(d) === -1) {
            newModel.push(d);
          }
        });

        $scope.model = newModel;
        $ctrl.leftSelected = [];
        $ctrl.rightSelected = [];
        $ctrl.leftCheckbox = false;
        $ctrl.rightCheckbox = false;
      }

      function getModelWidthChild() {
        const model = $scope.model || [];
        const newModel = [];

        function getSub(items) {
          angular.each(items, d => {
            if (model.indexOf(d[$scope.valueKey]) !== -1) {
              if (d[$scope.subKey] && d[$scope.subKey].length) {
                pushSub(d[$scope.subKey]);
              } else {
                newModel.push(d[$scope.valueKey]);
              }
            } else {
              getSub(d[$scope.subKey]);
            }
          });
        }

        function pushSub(items) {
          angular.each(items, d => {
            if (d[$scope.subKey] && d[$scope.subKey].length) {
              pushSub(d[$scope.subKey]);
            } else {
              newModel.push(d[$scope.valueKey]);
            }
          });
        }

        getSub($scope.data);

        return newModel;
      }

      function getSelectedWithChild() {
        const newSelected = [];
        const selected = $ctrl.rightSelected || [];

        function checkSub(items) {
          angular.each(items, d => {
            const sub = d[$scope.subKey];
            if (selected.indexOf(d[$scope.valueKey]) !== -1 && sub && sub.length) {
              pushSub(sub);
            } else if (sub && sub.length) {
              checkSub(sub);
            }
          });
        }

        function pushSub(sub) {
          angular.each(sub, dd => {
            newSelected.push(dd[$scope.valueKey]);
            if (dd[$scope.subKey] && dd[$scope.subKey].length) {
              pushSub(dd[$scope.subKey]);
            }
          });
        }

        checkSub($scope.data);

        return selected.concat(newSelected);
      }

      function filterChild() {
        const selected = $scope.model || [];
        const newModel = [];
        const splicedArray = [];
        let sameCount = 0;

        function checkSub(items) {
          let subInLen = 0;
          angular.forEach(items, d => {
            if (selected.indexOf(d[$scope.valueKey]) !== -1) {
              newModel.push(d[$scope.valueKey]);
              subInLen++;
            } else {
              const sub = d[$scope.subKey];
              if (sub && sub.length) {
                const subInLen = checkSub(sub);
                // 如果子全部在，就只存在父级
                if (subInLen >= sub.length) {
                  newModel.push(d[$scope.valueKey]);
                  angular.each(sub, s => {
                    if (newModel.indexOf(s[$scope.valueKey]) !== -1) {
                      newModel.splice(newModel.indexOf(s[$scope.valueKey]), 1);
                    }
                  });
                }
              }
            }
          });
          return subInLen;
        }

        checkSub($scope.data);

        newModel.forEach(d => {
          if (selected.indexOf(d) !== -1) {
            sameCount++;
          }
        });

        return sameCount < selected.length ? newModel : false;
      }

      function updateLeftRigthData() {
        const leftData = $.extend(true, [], $scope.data);
        const rightData = $.extend(true, [], $scope.data);

        $ctrl.leftData = leftData;
        $ctrl.rightData = rightData;
      }
    }],
    link: function(scope, element, attrs, ctrl) {
      scope.textKey = attrs.maTextKey || 'text';
      scope.valueKey = attrs.maValueKey || 'value';

      attrs.$observe('maTextKey', d => {
        scope.textKey = d || 'text';
      });
      attrs.$observe('maValueKey', d => {
        scope.valueKey = d || 'value';
      });
    }
  };
}
