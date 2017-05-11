export default `<div class="second-nav" ng-class="{show: hasSecondNav}">
  <ul class="clearfix">
    <li
      ng-repeat="router in routers"
      ng-if="router.state.indexOf(router.parent.state + '.') !== -1 && $state.current.name.indexOf(router.parent.state + '.') !== -1"
      ng-class="{active: $state.href($state.current.name, $state.params) === $state.href(router.state, router.params) || $state.current.name.indexOf(router.state + '.') !== -1}">
      <a
        href="javascript:void(0)"
        ma-click="$state.go(router.state, router.params)"
      >{{router.title}}</a>
    </li>
  </ul>
</div>`;
