import moduleName from './name.js';
import $ from 'jquery';
import utils from '../../../utils';

import maFirstMenuTpl from './maFirstMenuTpl.js';
import maSecondMenuTpl from './maSecondMenuTpl.js';
import maSiderMenuTpl from './maSiderMenuTpl.js';
import maSiderMenuContentTpl from './maSiderMenuContentTpl.js';

angular.module(moduleName)
  .directive('maUiTransition', maUiTransition)
  .directive('maFirstMenu', maFirstMenu)
  .directive('maSecondMenu', maSecondMenu)
  .directive('maSiderMenu', maSiderMenu)
  .directive('maSiderMenuContent', maSiderMenuContent)
  .directive('maFullContainer', maFullContainer);

maUiTransition.$inject = ['$state', '$rootScope', '$timeout'];

function maUiTransition($state, $rootScope, $timeout) {
  return {
    restrict: 'A',
    link(scope, element, attrs, controllers) {
      scope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
        element.removeClass('fade-in');
      });
      scope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
        $timeout(() => {
          element.addClass('fade-in');
        });
      });
    }
  };
}

maFirstMenu.$inject = ['$state', '$rootScope'];

function maFirstMenu($state, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: maFirstMenuTpl,
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;

      if (!$rootScope.routerConfig) {
        console.error('请在 $rootScope 下赋值 routerConfig');
      }
      $scope.routers = $rootScope.routerConfig;
    }],
    link(scope, element, attrs, controllers) {

    }
  };
}

maSecondMenu.$inject = ['$state', '$rootScope'];

function maSecondMenu($state, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    require: ['^maFirstMenu'],
    template: maSecondMenuTpl,
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;

      if (!$rootScope.routerConfig) {
        console.error('请在 $rootScope 下赋值 routerConfig');
      }
      $scope.routers = $rootScope.routerConfig;

      $scope.$on('$stateChangeSuccess', function () {
        const cls = 'has-second-nav';
        let hasSecondNav = false;

        $scope.routers.forEach(router => {
          if (router.parent && router.state.indexOf(router.parent.state + '.') !== -1 && $state.current.name.indexOf(router.parent.state + '.') !== -1) {
            hasSecondNav = true;
          }
        });

        if (hasSecondNav) {
          $('body').addClass(cls);
        } else {
          $('body').removeClass(cls);
        }

        $scope.$on('$destroy', e => {
          $('body').removeClass(cls);
        });

        $scope.hasSecondNav = hasSecondNav;
      });
    }],
    link(scope, element, attrs, controllers) {


    }
  };
}

maSiderMenu.$inject = ['$state', '$rootScope'];

function maSiderMenu($state, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      routers: '=maRouters',
      title: '@maTitle',
    },
    template: maSiderMenuTpl,
    controller: ['$scope', function ($scope) {
      const cls = 'has-sider-menu';

      $scope.$state = $state;

      $('body').addClass(cls);

      $scope.$on('$destroy', e => {
        $('body').removeClass(cls);
      });
    }],
    link(scope, element, attrs, controllers) {

    }
  };
}

maSiderMenuContent.$inject = ['$state', '$timeout', '$rootScope'];

function maSiderMenuContent($state, $timeout, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    require: ['^maSiderMenu'],
    scope: {
      routers: '=maRouters',
    },
    template: maSiderMenuContentTpl,
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;
      $scope.itemClick = itemClick;
      $scope.hasRouters = hasRouters;
      expandCurrentMenu();
      bindStateChangeSuccess();


      function bindStateChangeSuccess() {
        $scope.$on('$stateChangeSuccess', expandCurrentMenu);
      }

      function expandCurrentMenu() {
        const cState = $state.current.name;
        const cUrl = $state.href(cState, $state.params);

        if ($scope.routers) {
          angular.each($scope.routers, router => {
            if (cState.indexOf(router.state + '.') !== -1) {
              router.expand = true;
            }
          });
        }
      }

      function hasRouters(routers) {
        let count = 0;

        utils.each(routers, d => {
          if (d.hidden !== true) {
            count++;
          }
        });

        return count > 0;
      }

      function itemClick(router, $event) {
        if (hasRouters(router.routers)) {
          toggleMenu(router, $event);
        } else {
          $state.go(router.state, router.params);
        }
      }

      function toggleMenu(router, $event) {
        let el = $($event.target);
        let content = null;
        let height = 0;

        if (el.get(0).tagName.toLowerCase() !== 'a') {
          el = el.parents('a');
        }

        content = el.next('.sider-menu-content');

        content.find('> *').each(function () {
          height += $(this).outerHeight();
        });

        content.height(height);
        $timeout(function () {
          router.expand = !router.expand;
        });
      }
    }],
    link(scope, element, attrs, controllers) {

    }
  };
}

maFullContainer.$inject = ['$state', '$timeout'];

function maFullContainer($state, $timeout) {
  return {
    restrict: 'A',
    replace: true,
    link(scope, element, attrs, controllers) {
      element = $(element);
      scope.$applyAsync(updateMinHeight);

      function updateMinHeight() {
        element.css({
          minHeight: $(window).height() - element.offset().top,
        });
      }
    }
  };
}
