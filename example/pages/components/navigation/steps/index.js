import './index.scss';

const controller = 'stepsCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout'];

function mainCtrl($scope, $timeout) {
  $scope.stepIndex = 1;

  $scope.setStepIndex = index => {
    $scope.stepIndex = index;
  };

  $scope.stepType1Code = `<ma-steps ma-index="{{stepIndex}}">
  <ma-step>步骤一</ma-step>
  <ma-step>步骤二</ma-step>
  <ma-step>步骤三</ma-step>
  <ma-step>步骤四</ma-step>
  <ma-step>步骤五</ma-step>
</ma-steps>`;

  $scope.stepType2Code = `<ma-steps ma-index="{{stepIndex}}" ma-type="default">
  <ma-step ma-click="setStepIndex(0)">步骤一<span>说明说明说明说明说明说明说明说明</span></ma-step>
  <ma-step ma-click="setStepIndex(1)">步骤二<span>说明说明说明说明</span></ma-step>
  <ma-step ma-click="setStepIndex(2)">步骤三<span>说明说明说明说明</span></ma-step>
  <ma-step ma-click="setStepIndex(3)">步骤四</ma-step>
</ma-steps>`;
}

export default {
  template: require('./index.html'),
  controller,
};
