import moduleName from './name.js';
import $ from 'jquery';

import maFirstMenuTpl from './maFirstMenuTpl.html';
import maSecondMenuTpl from './maSecondMenuTpl.html';
import maSiderMenuTpl from './maSiderMenuTpl.html';
import maSiderMenuContentTpl from './maSiderMenuContentTpl.html';
import maSiderMenuContentItemTpl from './maSiderMenuContentItemTpl.html';

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
    controller: ['$scope', function($scope) {
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

maSecondMenu.$inject = ['$state', '$rootScope', '$timeout'];

function maSecondMenu($state, $rootScope, $timeout) {
  return {
    restrict: 'EA',
    replace: true,
    template: function(element, attrs) {
      if (attrs.maSecondMenu !== undefined) {
        element.removeAttr('ma-second-menu');
        return element[0].outerHTML;
      }
      return maSecondMenuTpl;
    },
    controller: ['$scope', '$attrs', '$element', function($scope, $attrs, $element) {
      const cls = 'has-second-nav';

      // 如果是通过元素标签初始化 E
      if ($attrs.maSecondMenu === undefined) {
        $scope.$state = $state;

        if (!$rootScope.routerConfig) {
          console.error('请在 $rootScope 下赋值 routerConfig');
        }
        $scope.routers = $rootScope.routerConfig;

        $scope.$on('$stateChangeSuccess', function() {
          let hasSecondNav = false;

          $scope.routers.forEach(router => {
            if (router.parent && (router.state + '').indexOf(router.parent.state + '.') !==
              -1 &&
              ($state.current.name + '').indexOf(router.parent.state + '.') !== -1 &&
              router.hidden !== true && router.hiddenSecond !== true && router.level <=
              2
            ) {
              hasSecondNav = true;
            }
          });

          if (hasSecondNav) {
            $('body').addClass(cls);
          } else {
            $('body').removeClass(cls);
            $element.addClass('second-nav').addClass('show');
          }

          $rootScope.$broadcast('update.second.menu');

          $scope.hasSecondNav = hasSecondNav;
        });
      } else {
        $('body').addClass(cls);
        $rootScope.$broadcast('update.second.menu');
      }

      $scope.$on('$destroy', e => {
        $('body').removeClass(cls);
        $(window).off('resize', $scope.resize);
        $rootScope.$broadcast('update.second.menu');
      });
    }],
    link(scope, element, attrs, controllers) {
      $(window).on('resize', resize);
      $(window).on('scroll', resize);

      scope.$watch(() => {
        return $(window).width();
      }, d => {
        resize();
      });

      scope.resize = resize;

      $timeout(() => {
        resize();
      });

      function resize() {
        const header = $('.header').eq(0);
        let minWidth = parseInt(header.css('min-width'), 10);

        if ($(window).width() > minWidth) {
          minWidth = $(window).width();
        }

        $(element).css({
          'min-width': minWidth,
          top: header.outerHeight() - $(window).scrollTop(),
        });
      }
    }
  };
}

maSiderMenu.$inject = ['$state', '$rootScope'];

function maSiderMenu($state, $rootScope) {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      routers: '=maRouters',
      title: '@maTitle',
      offsetTop: '@maOffsetTop',
      leftScroll: '@maLeftScroll',
    },
    template: function(element, attrs) {
      if (attrs.maSiderMenu !== undefined) {
        element.removeAttr('ma-sider-menu');
        return element[0].outerHTML;
      }
      return maSiderMenuTpl;
    },
    controller: ['$scope', '$element', '$timeout', function($scope, $element, $timeout) {
      const cls = 'has-sider-menu';

      $scope.$state = $state;

      $('body').addClass(cls);

      if (!$rootScope.$siderMenuCount) {
        $rootScope.$siderMenuCount = 0;
      }
      $rootScope.$siderMenuCount++;

      $scope.$watch('routers', d => {
        $timeout(() => {
          $scope.$broadcast('update.sider.menu.cls');
        }, 600);
      });

      $scope.$on('$destroy', e => {
        $rootScope.$siderMenuCount--;
        if ($rootScope.$siderMenuCount <= 0) {
          $('body').removeClass(cls);
        }
        $(window).off('scroll', setTop);
        $(window).off('resize', setTop);
      });

      // 绑定全局滚动，相对顶部
      $(window).on('scroll', setTop);
      $(window).on('resize', setTop);
      $scope.$on('update.second.menu', setTop);

      $timeout(() => {
        setTop();
      });

      function setTop() {
        const header = $('body > .header');
        const offsetTop = parseFloat($scope.offsetTop) || 0;
        const leftScroll = $scope.leftScroll !== undefined;
        let top = header.height() - $(window).scrollTop();

        if ($('.header-fixed').length) {
          top = header.height();
        }

        if ($('.has-second-nav').length) {
          top += $('.second-nav').height();
        }

        top += offsetTop;

        if (top < 0) {
          top = 0;
        }

        $($element).css({
          top
        });

        if (leftScroll) {
          $($element).css({
            left: -$(window).scrollLeft(),
          });
        }
      }
    }],
    link(scope, element, attrs, controllers) {
      if (attrs.maSiderMenu !== undefined) {
        const items = $(element).find('.sider-menu-item');

        items.each((i) => {
          if (items.eq(i).find('> a').next('.sider-menu-content').length) {
            const icon = $('<i class="iconfont icon-down"></i>');
            const a = items.eq(i).find('> a');
            a.append(icon).addClass('arrow');

            icon.bind('click', toggleMenu);
            if (a.attr('ma-toggle') !== undefined) {
              a.bind('click', toggleMenu);
            }
          }
        });
      }

      function toggleMenu(e) {
        e.stopPropagation();

        let icon = $(this);
        let a = icon.parent();

        if (icon.get(0).tagName.toLowerCase() === 'a') {
          icon = icon.find('.iconfont');
          a = icon.parent();
        }

        if (icon.hasClass('icon-down')) {
          icon.removeClass('icon-down');
          icon.addClass('icon-up');
        } else {
          icon.addClass('icon-down');
          icon.removeClass('icon-up');
        }

        a.next().toggleClass('hide');
      }
    }
  };
}

maSiderMenuContent.$inject = ['$state', '$timeout', '$rootScope', '$compile'];

function maSiderMenuContent($state, $timeout, $rootScope, $compile) {
  return {
    restrict: 'E',
    replace: true,
    // require: ['^maSiderMenu'],
    scope: {
      routers: '=maRouters',
      parentRouter: '=maParentRouter',
    },
    template: maSiderMenuContentTpl,
    controller: ['$scope', function($scope) {
      $scope.$state = $state;
      $scope.itemClick = itemClick;
      $scope.iconClick = iconClick;
      $scope.isParent = isParent;
      $scope.isActive = isActive;
      expandCurrentMenu();

      $scope.$on('update.sider.menu.cls', expandCurrentMenu);
      $scope.$on('$stateChangeSuccess', expandCurrentMenu);

      function expandCurrentMenu(routers) {
        const cState = $state.current.name + '';
        const currentUrl = $state.href(cState, $state.params);
        const isFromParent = angular.isArray(routers);

        if (isFromParent || $scope.routers) {
          angular.each(isFromParent ? routers[0] : $scope.routers, router => {
            const routerUrl = $state.href(router.state, router.params);

            if (cState.indexOf(router.state + '.') !== -1) {
              router.expand = true;
            }
            if (isFromParent) {
              if (isActive(router)) {
                routers[1].expand = true;
              }
            } else if (!!$scope.parentRouter && isActive(router)) {
              $scope.parentRouter.expand = true;
            }

            router.cls = '';
            router.cls += isActive(router) ? 'active ' : '';
            router.cls += router.routers && router.routers.length ? 'arrow ' : '';
            router.cls += isParent(currentUrl, routerUrl) ? 'parent ' : '';

            if (router.routers && router.routers.length) {
              expandCurrentMenu([router.routers, router]);
            }
          });
        }
      }

      function itemClick(router, $event) {
        if (router.routers && router.routers.length && angular.isNull(router.state)) {
          toggleMenu(router, $event);
        } else {
          $state.go(router.state, router.params);
        }

        if (router.routers && router.routers.length) {
          router.expand = true;
        }
      }

      function iconClick(router, $event) {
        $event.stopPropagation();
        toggleMenu(router, $event);
      }

      function toggleMenu(router, $event) {
        let el = $($event.target);
        let content = null;
        let height = 0;

        if (el.get(0).tagName.toLowerCase() !== 'a') {
          el = el.parents('a');
        }

        content = el.next('.sider-menu-content');

        content.find('> *').each(function() {
          height += $(this).outerHeight();
        });

        content.height(height);
        $timeout(function() {
          router.expand = !router.expand;
        });
      }

      function isParent(currentUrl, routerUrl) {
        return (currentUrl + '').indexOf(routerUrl + '/') !== -1 && currentUrl !== routerUrl;
      }

      function isActive(router) {
        const urls = [];
        const params = $.extend(true, {}, router.params);
        const currentUrl = $state.href($state.current.name, $state.params);
        let active = false;

        urls.push($state.href(router.state, params));

        if (router.activeParams && router.activeParams.length) {
          router.activeParams.forEach(d => {
            urls.push($state.href(router.state, $.extend(true, params, d)));
          });
        }

        active = (currentUrl && urls.indexOf(currentUrl) !== -1) || (
          isParent(
            $state.href($state.current.name, $state.params), urls[0]) && !(router.routers &&
            router.routers.length)
        );

        if (active === false && router.childs && router.childs.length) {
          router.childs.forEach(d => {
            if ($state.current.name && $state.current.name === d.state) {
              if (angular.isEmpty(d.params)) {
                active = true;
              } else {
                let count = 0;
                let sameCount = 0;
                angular.each(d.params, (v, k) => {
                  if ($state.params[k] == v) {
                    sameCount++;
                  }
                  count++;
                });
                active = count === sameCount;
              }
            }
          });
        }

        return active;
      }
    }],
    link(scope, element, attrs, controllers) {
      const target = $(element);

      scope.$watch('routers', routers => {
        let index = -1;

        target.html('');

        if (angular.isEmpty(routers)) {
          return;
        }

        angular.each(routers, item => {
          index++;
          const itemElement = $(maSiderMenuContentItemTpl.replace(/&&\{index\}/g, index));
          target.append(itemElement);

          scope[`router${index}`] = item;
        });
        $compile(target.contents())(scope);
        $timeout();
      });
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

      $timeout(updateMinHeight);
      $(window).resize(updateMinHeight);

      function updateMinHeight() {
        element.css({
          minHeight: $(window).height() - element.offset().top,
        });
      }
    }
  };
}
