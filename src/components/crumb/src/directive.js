import moduleName from './name.js';
import $ from 'jquery';

angular.module(moduleName)
  .directive('maCrumb', maCrumb)
  .directive('maCrumbItem', maCrumbItem)
  .directive('maCrumbAuto', maCrumbAuto);

maCrumb.$inject = ['$state'];

function maCrumb($state) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: true,
    template: `<div class="crumb" ng-transclude>
    </div>`,
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;
    }],
    link: function (scope, element, attrs, controllers) {

    }
  };
}

maCrumbItem.$inject = ['$state'];

function maCrumbItem($state) {
  return {
    restrict: 'E',
    transclude: true,
    require: ['^maCrumb'],
    replace: true,
    scope: {
      href: '@maHref',
    },
    template: `
    <span class="crumb-item">
      <span>
        <a ng-if="href" href="{{href}}" ng-transclude></a>
        <span ng-if="!href" ng-transclude></span>
      </span>
      <span>/</span>
    </span>
    `,
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;
    }],
    link: function (scope, element, attrs, controllers) {

    }
  };
}

maCrumbAuto.$inject = ['$state', '$rootScope'];

function maCrumbAuto($state, $rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {

    },
    template: `<div class="crumb">
      <span class="crumb-item" ng-repeat="item in crumbItems" ng-if="!$last">
        <span>
          <a href="javascript:void(0)" ng-click="$state.go(item.state, item.params)">{{item.title}}</a>
        </span>
        <span>/</span>
      </span>
      <span class="crumb-item" ng-repeat="item in crumbItems" ng-if="$last && showCurrent === true">
        <span>{{item.title}}</span>
        <span>/</span>
      </span>
      <span class="crumb-item">
        <span ng-transclude></span>
        <span>/</span>
      </span>
    </div>`,
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;
    }],
    link: function (scope, element, attrs, controllers) {
      if (!$rootScope.routerConfig) {
        console.error('请在 $rootScope 下赋值 routerConfig');
      }

      element = $(element);

      if (!element.find('> span.crumb-item:last-child > span:nth-child(1)').last().html().trim()) {
        scope.showCurrent = true;
        element.find('> span.crumb-item:last-child').remove();
      }

      let crumbItems = [];
      const routerConfig = $rootScope.routerConfig;

      routerConfig.forEach(route => {
        if (route.state === $state.current.name) {
          crumbItems.unshift({
            title: route.title,
            state: route.state,
          });
          getParentRoute(route);
        }
      });

      scope.crumbItems = crumbItems;

      function getParentRoute(route) {
        if (route.parent) {
          const parentRoute = route.parent;
          crumbItems.unshift({
            title: parentRoute.title,
            state: parentRoute.state,
          });
          getParentRoute(parentRoute);
        }
      }
    }
  };
}
