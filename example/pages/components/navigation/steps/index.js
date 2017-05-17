import './index.scss';

const controller = 'stepsCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout'];

function mainCtrl($scope, $timeout) {
  $scope.stepIndex = 1;

  $scope.stepType1Code = `<ma-steps ma-index="{{stepIndex}}">
  <ma-step>步骤一</ma-step>
  <ma-step>步骤二</ma-step>
  <ma-step>步骤三</ma-step>
  <ma-step>步骤四</ma-step>
  <ma-step>步骤五</ma-step>
</ma-steps>`;
}

export default {
  template: require('./index.html'),
  controller,
};
