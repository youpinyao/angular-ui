import moduleName from './name.js';

angular.module(moduleName)
  .directive('maMenu', maMenu);

maMenu.$inject = ['$state'];

function maMenu($state) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      routers: '=maRouters',
    },
    template: `<div class="nav">
      <ul>
        <li
          ng-repeat="router in routers"
          ng-class="{active: $state.current.name === router.state}"
        >
          <a
            href="javascript:void(0)"
            ma-click="$state.go(router.state)"
          >{{router.title}}</a>
        </li>
      </ul>
    </div>`,
    link: function (scope, element, attrs, controllers) {
      scope.$state = $state;
    }
  };
}
