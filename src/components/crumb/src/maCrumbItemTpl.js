export default `<span class="crumb-item">
  <span>
    <a ng-if="href" href="{{href}}" ng-transclude></a>
    <span ng-if="!href" ng-transclude></span>
  </span>
  <span>/</span>
</span>`;
