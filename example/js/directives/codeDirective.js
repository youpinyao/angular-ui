const name = 'codeDirective';

angular.module(name, []).directive('maCode', codeDirective);

codeDirective.$inject = ['$rootScope', '$q', '$timeout'];

function codeDirective($rootScope, $q, $timeout) {
  return {
    replace: true,
    restrict: 'E',
    transclude: true,
    template: `
    <div class="ma-code">
      <div class="ma-code-bar" ng-click="show = !show">
        <ma-icon ng-show="!show" ma-type="codesquareo1">code</ma-icon>
        <ma-icon ng-show="show" ma-type="codesquare">code</ma-icon>
      </div>
      <div class="ma-code-more" ng-show="show">
        <div class="transclude" ng-transclude></div>
      </div>
    </div>`,
    scope: {

    },
    controllerAs: '$ctrl',
    controller: ['$scope', '$timeout', function($scope, $timeout) {
      $scope.show = false;
    }],
    link: function(scope, element, attrs, ctrl) {

    }
  };
}


export default name;
