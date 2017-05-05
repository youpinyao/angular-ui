export default `<div class="nav">
  <ul>
    <li
      ng-repeat="router in routers"
      ng-if="!router.parent"
      ng-class="{active: $state.current.name === router.state || $state.current.name.indexOf(router.state + '.') !== -1}"
    >
      <a
        href="javascript:void(0)"
        ma-click="$state.go(router.state)"
      >{{router.title}}</a>
    </li>
  </ul>
  <div ng-transclude></div>
</div>`;
