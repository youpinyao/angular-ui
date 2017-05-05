import moduleName from './name.js';
import $ from 'jquery';

import maMenuTpl from './maMenuTpl.js';
import maSecondMenuTpl from './maSecondMenuTpl.js';

angular.module(moduleName)
  .directive('maMenu', maMenu)
  .directive('maSecondMenu', maSecondMenu);

maMenu.$inject = ['$state'];

function maMenu($state) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      routers: '=maRouters',
    },
    template: maMenuTpl,
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;
    }],
    link: function (scope, element, attrs, controllers) {

    }
  };
}

maSecondMenu.$inject = ['$state', '$rootScope'];

function maSecondMenu($state, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      routers: '=maRouters',
    },
    template: maSecondMenuTpl,
    controller: ['$scope', function ($scope) {
      $rootScope.$on('$stateChangeSuccess', function () {
        let hasSecondNav = false;
        $scope.routers.forEach(router => {
          if (router.parent && router.state.indexOf(router.parent.state + '.') !== -1 && $state.current.name.indexOf(router.parent.state + '.') !== -1) {
            hasSecondNav = true;
          }
        });

        if (hasSecondNav) {
          $('body').addClass('has-second-nav');
        } else {
          $('body').removeClass('has-second-nav');
        }

        $scope.hasSecondNav = hasSecondNav;
      });

      $scope.$state = $state;
    }],
    link: function (scope, element, attrs, controllers) {


    }
  };
}
