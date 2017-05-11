import moduleName from './name.js';
import $ from 'jquery';

import maFirstMenuTpl from './maFirstMenuTpl.js';
import maSecondMenuTpl from './maSecondMenuTpl.js';
import maSiderMenuTpl from './maSiderMenuTpl.js';
import maSiderMenuContentTpl from './maSiderMenuContentTpl.js';

angular.module(moduleName)
  .directive('maFirstMenu', maFirstMenu)
  .directive('maSecondMenu', maSecondMenu)
  .directive('maSiderMenu', maSiderMenu)
  .directive('maSiderMenuContent', maSiderMenuContent)
  .directive('maFullContainer', maFullContainer);

maFirstMenu.$inject = ['$state', '$rootScope'];

function maFirstMenu($state, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      routers: '=maRouters',
    },
    template: maFirstMenuTpl,
    controller: ['$scope', function ($scope) {
      $scope.$state = $state;
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
    scope: {
      routers: '=maRouters',
    },
    template: maSecondMenuTpl,
    controller: ['$scope', function ($scope) {
      $rootScope.$on('$stateChangeSuccess', function () {
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

      $scope.$state = $state;
    }],
    link(scope, element, attrs, controllers) {


    }
  };
}

maSiderMenu.$inject = ['$state'];

function maSiderMenu($state) {
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

maSiderMenuContent.$inject = ['$state', '$timeout'];

function maSiderMenuContent($state, $timeout) {
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
      expandCurrentMenu();

      function expandCurrentMenu() {
        const cState = $state.current.name;
        const cUrl = $state.href(cState, $state.params);

        if ($scope.routers) {
          angular.each($scope.routers, router => {
            const rUrl = $state.href(router.state, router.params);

            if (cState.indexOf(router.state + '.') !== -1) {
              router.expand = true;
            }
          });
        }
      }

      function itemClick(router, $event) {
        if (router.routers && router.routers.length) {
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
