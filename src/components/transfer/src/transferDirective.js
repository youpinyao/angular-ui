import moduleName from './name.js';
import $ from 'jquery';
import maTransferTpl from './maTransferTpl.html';

angular.module(moduleName)
  .directive('maTransfer', maTransfer);

maTransfer.$inject = [];

function maTransfer() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      data: '=maData',
      model: '=ngModel',
      valueKey: '@maValueKey',
      textKey: '@maTextKey',
      disabled: '=ngDisabled',

      leftTitle: '@maLeftTitle',
      rightTitle: '@maRightTitle',
    },
    template: maTransferTpl,
    controllerAs: '$ctrl',
    controller: ['$scope', function($scope) {
      const $ctrl = this;

      this.leftData = [];
      this.rightData = [];

      this.leftButtonDisabled = true;
      this.rightButtonDisabled = true;
      this.toLeft = toLeft;
      this.toRight = toRight;

      $scope.$watch('$ctrl.leftCheckbox', d => {
        let canChange = true;

        if ($ctrl.prevLeftSelectedLength !== undefined && $ctrl.prevLeftSelectedLength ===
          $ctrl.leftData.length - 1) {
          canChange = false;
          $ctrl.prevLeftSelectedLength = undefined;
        }
        if (canChange) {
          if (d) {
            $ctrl.leftSelected = [];
            angular.each($ctrl.leftData, d => {
              if (d.hide === false) {
                $ctrl.leftSelected.push(d);
              }
            });
          } else {
            $ctrl.leftSelected = [];
          }
        }
      });

      $scope.$watch('$ctrl.leftSelected', d => {
        if (d.length && d.length === $ctrl.leftShowCount) {
          $ctrl.leftCheckbox = true;
        }

        if ($ctrl.prevLeftSelectedLength === $ctrl.leftShowCount && d.length !== $ctrl.leftShowCount) {
          $ctrl.leftCheckbox = false;
        }

        if (d && d.length) {
          $ctrl.leftButtonDisabled = false;
        } else {
          $ctrl.leftButtonDisabled = true;
        }

        $ctrl.prevLeftSelectedLength = d.length;
      });


      $scope.$watch('$ctrl.rightCheckbox', d => {
        let canChange = true;

        if ($ctrl.prevRightSelectedLength !== undefined && $ctrl.prevRightSelectedLength ===
          $ctrl.rightData.length - 1) {
          canChange = false;
          $ctrl.prevRightSelectedLength = undefined;
        }
        if (canChange) {
          if (d) {
            $ctrl.rightSelected = [];
            angular.each($ctrl.rightData, d => {
              if (d.hide === false) {
                $ctrl.rightSelected.push(d);
              }
            });
          } else {
            $ctrl.rightSelected = [];
          }
        }
      });

      $scope.$watch('$ctrl.rightSelected', d => {
        if (d.length && d.length === $ctrl.rightShowCount) {
          $ctrl.rightCheckbox = true;
        }

        if ($ctrl.prevRightSelectedLength === $ctrl.rightShowCount && d.length !== $ctrl.rightShowCount) {
          $ctrl.rightCheckbox = false;
        }

        if (d && d.length) {
          $ctrl.rightButtonDisabled = false;
        } else {
          $ctrl.rightButtonDisabled = true;
        }

        $ctrl.prevRightSelectedLength = d.length;
      });


      $scope.$watch('data', d => {
        $ctrl.leftData = $.extend(true, [], d);
        $ctrl.rightData = $.extend(true, [], d);

        updateLeftRight();
        reset();
      });

      $scope.$watch('model', d => {
        updateLeftRight();
      });

      function updateLeftRight() {
        const selectValues = [];

        angular.each($scope.model, data => {
          if (angular.isObject(data)) {
            selectValues.push(data[$scope.valueKey]);
          } else {
            selectValues.push(data);
          }
        });

        angular.each($scope.data, (data, k) => {
          if (selectValues.indexOf(data[$scope.valueKey]) !== -1) {
            $ctrl.leftData[k].hide = true;
            $ctrl.rightData[k].hide = false;
          } else {
            $ctrl.leftData[k].hide = false;
            $ctrl.rightData[k].hide = true;
          }
        });

        updateLeftRightShowCount();
      }

      function updateLeftRightShowCount() {
        let leftShowCount = 0;
        let rightShowCount = 0;

        angular.each($ctrl.leftData, d => {
          if (d.hide === false) {
            leftShowCount++;
          }
        });
        angular.each($ctrl.rightData, d => {
          if (d.hide === false) {
            rightShowCount++;
          }
        });

        $ctrl.leftShowCount = leftShowCount;
        $ctrl.rightShowCount = rightShowCount;
      }

      function toLeft($event) {
        _moveItem($ctrl.rightSelected, 'left');
      }

      function toRight($event) {
        _moveItem($ctrl.leftSelected, 'right');
      }

      function _moveItem(selected, direction) {
        const selectValues = [];
        const newModel = [];

        angular.each(selected, d => {
          selectValues.push(d[$scope.valueKey]);
        });

        angular.each($ctrl.leftData, (d, k) => {
          if (selectValues.indexOf(d[$scope.valueKey]) !== -1) {
            if (direction === 'right') {
              $ctrl.leftData[k].hide = true;
              $ctrl.rightData[k].hide = false;
            }
            if (direction === 'left') {
              $ctrl.leftData[k].hide = false;
              $ctrl.rightData[k].hide = true;
            }
          }
        });

        angular.each($ctrl.rightData, d => {
          if (d.hide === false) {
            newModel.push(d);
          }
        });

        $scope.model = newModel;

        reset();

        updateLeftRightShowCount();
      }

      function reset() {
        $ctrl.leftSelected = [];
        $ctrl.rightSelected = [];
        $ctrl.leftCheckbox = false;
        $ctrl.rightCheckbox = false;
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
