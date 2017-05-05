export default `<div class="second-nav" ng-show="hasSecondNav">
  <ul>
    <li
      ng-repeat="router in routers"
      ng-if="router.state.indexOf(router.parent.state + '.') !== -1 && $state.current.name.indexOf(router.parent.state + '.') !== -1"
      ng-class="{active: $state.current.name === router.state || $state.current.name.indexOf(router.state + '.') !== -1}">
      <a
        href="javascript:void(0)"
        ma-click="$state.go(router.state)"
      >{{router.title}}</a>
    </li>
  </ul>
</div>`;
